import React from 'react'
import { trainColors } from '../utils/trainColors'

const Train = ({item}) => {
  return (
    <div className='train'>
        <h4>{item.TrainNumber}</h4>
        <div>
            <div className='train-color-container'>
                <div>Train Color: </div><div className='train-color' style={{backgroundColor: trainColors[item.LineCode ? item.LineCode : 'BK']}}></div>
            </div>
            <h5>Car Count: {item.CarCount}</h5>
            <h5>Service Type: {item.ServiceType}</h5>
        </div>
    </div>
  )
}

export default Train