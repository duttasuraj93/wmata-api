import React from 'react'

const CarCountFilter = ({ value, options, onChange }) => {
    return (
        <div>
            <div>Car Count:</div>
            <select onChange={(e) => onChange('CarCount', parseInt(e.target.value))} value={value} name="CarCount" id="CarCount">
                <option value="all">All</option>
                {
                    options.map(item => <option key={item} value={item}>{item}</option>)
                }
            </select>
        </div>
    )
}

export default CarCountFilter