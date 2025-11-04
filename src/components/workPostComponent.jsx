
import React from "react";

/**
 * WorkPostComponent displays a single work post.
 * @param {Object} props
 * @param {string} props.title - Title of the work.
 * @param {string} props.description - Short description.
 * @param {string} props.images - Image URL (string).
 * @param {string} props.content - Main content.
 */
function WorkPostComponent({ title, description, images, content }) {
    return (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
            {images && (
                <img
                    src={images}
                    alt={title}
                    className="w-full h-64 object-cover rounded mb-4"
                />
            )} {/**decide image location on ui later */}

            <h2 className="text-2xl font-bold text-gray-900 mb-2">{title}</h2>

            {description && (
                <p className="text-gray-600 mb-4">{description}</p>
            )}

            {content && (
                <div className="text-gray-800">{content}</div>
            )}
        </div>
    );
}


export default WorkPostComponent;


