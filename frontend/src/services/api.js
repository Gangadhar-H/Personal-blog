import axios from 'axios';

const API_URL = 'http://localhost:5000/api/v1';

// Blog Post APIs
const fetchPosts = async () => {
    try {
        const response = await axios.get(`${API_URL}/blogs/posts`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log("Error loading posts", error);
        return [];
    }
};

const fetchSinglePost = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/blogs/posts/${id}`);
        return response.data;
    } catch (error) {
        console.log("Error loading post ", error);
        return [];
    }
}

const onPostSubmit = async (data) => {
    try {
        // Call your API endpoint to create a new blog post
        const response = await axios.post(`${API_URL}/blogs`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });

        console.log('Post created successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating post:', error.response?.data || error.message);
        return { error: error.response?.data || "Something went wrong" };
    }
}

const onPostDelete = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/blogs/posts/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })
        console.log('Post deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting post:', error.response?.data || error.message);
        return { error: error.response?.data || "Something went wrong" };
    }
}

const onPostUpdate = async (id, formData) => {
    try {
        const response = await axios.put(`${API_URL}/blogs/posts/${id}`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        console.log("Post deleted successfully: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating post:', error.response?.data || error.message);
        return { error: error.response?.data || "Something went wrong" };
    }
}


const checkAuthor = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/blogs/posts/checkAuthor/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });

        if (response.status === 200) {
            return true;
        }

    } catch (error) {
        return false;
    }
}

const toggleLikePost = async (id) => {
    try {
        const response = await axios.post(`${API_URL}/blogs/posts/${id}/likes`, {}, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting post:', error.response?.data || error.message);
        return { error: error.response?.data || "Something went wrong" };
    }
}

// User APIs

const onRegisterSubmit = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/user/register`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('User registered successfully', response.data);
        return response.data;
    } catch (error) {
        console.error('Error registering:', error.response?.data || error.message);
        return { error: error.response?.data || "Something went wrong" };
    }
}

const onLoginSubmit = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/user/login`, data, {
            header: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });
        console.log('User logged in successfully', response.data);
        return response.data;
    } catch (error) {
        console.error('Error Logging in:', error.response?.data || error.message);
        return { error: error.response?.data || "Something went wrong" };
    }
}

const checkAuth = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/me`, {
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        return null;
    }
}

const onLogoutSubmit = async () => {
    try {
        const response = await axios.post(`${API_URL}/user/logout`, {}, {
            withCredentials: true,
        })

        return false;
    } catch (error) {
        console.error("Logout failed:", error.response?.data || error.message);
    }
}

const fetchUserProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/user/me`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        return null;
    }
}

const updateProfile = async (userData) => {
    try {
        const response = await axios.put(`${API_URL}/user/profile/update`, userData, {
            withCredentials: true,
        });
        console.log("Response Data", response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error.response?.data || error.message);
    }
}

export {
    fetchPosts,
    fetchSinglePost,
    onPostSubmit,
    onPostDelete,
    onPostUpdate,
    checkAuthor,
    toggleLikePost,
    onRegisterSubmit,
    onLoginSubmit,
    checkAuth,
    onLogoutSubmit,
    fetchUserProfile,
    updateProfile
};
