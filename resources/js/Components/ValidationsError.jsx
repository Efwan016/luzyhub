// resources/js/Components/ValidationErrors.jsx
import React from "react";

export default function ValidationErrors({ errors }) {
    if (!errors || Object.keys(errors).length === 0) return null;

    return (
        <div className="mb-4 bg-red-900/20 border border-red-500 text-red-400 rounded-lg p-3">
            <ul className="list-disc list-inside text-sm">
                {Object.keys(errors).map((key) => (
                    <li key={key}>{errors[key]}</li>
                ))}
            </ul>
        </div>
    );
}
