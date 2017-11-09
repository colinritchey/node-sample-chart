import React from 'react';

const Legend = ({ data, displayLegend }) => {
  if(displayLegend){
    let colors = ['#e0440e', '#e6693e', '#ec8f6e'];

    return (
      <div className='chart-legend'>
        {Object.keys(data).map((el, idx) => {
          return (
              <span key={el} className='legend-item'>
                <div className='block-item'
                  style={{backgroundColor: colors[idx]}}></div>
                <span> {el}</span>
              </span>
            )
          }
        )}
      </div>
    )
  } else {
    return '';
  }
}

export default Legend;
