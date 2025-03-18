import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessTokenAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    }
    catch (err) {
        console.log("Something went wrong while generating tokens", + err);
    }
}

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if ([email, username, password].some((field) => field?.trim() === "")
    ) {
        return res.status(400).json({ message: "All fileds are required" });
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });
    if (existedUser) {
        return res.status(409).json({ message: "User already exist" });
    }

    // add the user
    const user = await User.create({
        username,
        email,
        password
    });

    await user.save();

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        return res.status(500).json({ messsage: "Something went wrong" })
    }

    return res.status(201).json(
        createdUser
    );

});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    console.log(isPasswordValid);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "Incorrect Password" });
    }

    const { accessToken, refreshToken } = await generateAccessTokenAndRefreshTokens(user._id);

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    }

    console.log(loggedInUser);
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json({ loggedInUser, accessToken, refreshToken });

});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ message: "User Logged Out" });
});

const getUserProfile = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
    });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshAccessToken || req.body.refreshAccessToken;
    if (!incomingRefreshToken) {
        return res.status(401).json({ message: "Unauthorized Request" });
    }


    try {
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id);
        if (!user) {
            return res.status(401).json({ message: "Invalid refreshToken" });
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            return res.status(401).json({ message: "Refresh token is expired" });
        }

        const options = {
            httpOnly: true,
            secure: true
        }
        const { accessToken, newRefreshToken } = await generateAccessAndRefreshTokens(user._id);

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", newRefreshToken, options)
            .json({ accessToken, refreshToken: newRefreshToken }, "Access Token refreshed")
    } catch (error) {
        return res.status(401).json({ message: error?.message || "Refresh token is expired" });
    }

});



export {
    registerUser,
    loginUser,
    logoutUser,
    getUserProfile,
    refreshAccessToken,
}
