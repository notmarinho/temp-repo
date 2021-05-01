import React from 'react'
import './styles.css'

export default function index({
    value,
    handleChange
}) {
    return (
        <input
            className='text-input'
            type="search"
            value={value}
            onChange={handleChange}
            placeholder='Type your search'
        />
    )
}
