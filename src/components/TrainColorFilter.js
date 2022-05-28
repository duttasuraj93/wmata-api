import React from 'react'

const TrainColorFilter = ({ value, getColor, onChange }) => {

    return (
        <div>
            <div>Train Color:</div>
            <select onChange={(e) => onChange('LineCode', e.target.value)} value={value} name="LineCode" id="LineCode">
                <option value="all">All</option>
                {getColor()}
            </select>
        </div>
    )
}

export default TrainColorFilter