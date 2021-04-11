import React from 'react'
import './TextAreaCustom.css'
export default function TextAreaCustom({ onChangeFunction, name, value, label }) {
    return (
        <div className="container-textarea-custom">
            <label htmlFor="name">{label}</label>
            <textarea
                name={name}
                value={value}
                onChange={(e) => onChangeFunction(e)} />
        </div>
    )
}
