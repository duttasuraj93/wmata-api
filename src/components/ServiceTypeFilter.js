import React from 'react'

const ServiceTypeFilter = ({ value, options, onChange }) => {
    return (
        <div>
            <div>Service Type:</div>
            <select onChange={(e) => onChange('ServiceType', e.target.value)} value={value} name="ServiceType" id="ServiceType">
                <option value="all">All</option>
                {
                    options.map(item => <option key={item} value={item}>{item}</option>)
                }
            </select>
        </div>
    )
}

export default ServiceTypeFilter