import React from 'react';
import img1 from '../images/image1.jpeg';
import '../css/result.css'

const result = () => {

    const colorMatchingPercentage = 80;
    const patternMatchingPercentage = 60;
  
  return (
    <div className="container">
    <div className="image-container">
      {/* Live feed */}
      <img src={img1} alt="Live feed" />
    </div>
    <div className="output-container">
      <div className="output-box">
        <p>% of color matching: {colorMatchingPercentage}%</p>
      </div>
      <div className="output-box">
        <p>% of pattern matching: {patternMatchingPercentage}%</p>
      </div>
    </div>
  </div>
  )
}

export default result;