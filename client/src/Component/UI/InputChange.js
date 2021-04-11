import React from 'react'
import './Input.css'
export default function Input({ name, value, label, onChangeFunction, type, width = '' }) {
    return (
        <div className="input-container">
            <label htmlFor="name">{label}</label>
            <input
                style={{ width: width }}
                className="input-text-name-zone"
                id={name}
                name={name}
                type={type}
                value={value ? value : ''}
                onChange={(e) => onChangeFunction(e)}
            />
        </div>
    )
}
