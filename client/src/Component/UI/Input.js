import React from 'react'
import './Input.css'
export default function Input({ name, value, label }) {
    return (
        <div className="input-container">
            <label htmlFor="name">{label}</label>
            <input
                className="input-text-name-zone"
                id={name}
                name={name}
                type="text"
                value={value ? value : ''}
                readOnly
            />
        </div>
    )
}
