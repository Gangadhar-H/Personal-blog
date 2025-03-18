import React from 'react'
import './LoadingSpinner.css'

function LoadingSpinner() {
    return (
        <div className="spinner-container">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    );
}

export default LoadingSpinner