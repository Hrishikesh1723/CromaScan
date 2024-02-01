import { wait } from "@testing-library/user-event/dist/utils";
import axios from "axios";
import { useCallback, useRef, useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Webcam from "react-webcam";


const CustomWebcam = () => {
    const location = useLocation();
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [colorResult, setColorResult] = useState();
    const [patternResult, setPatternResult] = useState();
    const image1 = location.state.image;
    const fetchURL1 = `${process.env.REACT_APP_BACKEND_API}/colorCompare`;
    const fetchURL2 = `${process.env.REACT_APP_BACKEND_API}/patternCompare`;

    const colorCompare = async (image2) => {
        const data = {image_base64_1:image1, image_base64_2:image2};
        try {
            const response = await axios.post(fetchURL1, data);
            console.log(response.data);
            setColorResult(response.data)
          } catch (error) {
            console.error(error);
          }

    };

    const patternCompare = async (image2) => {
        const data = {image_base64_1:image1, image_base64_2:image2};

        try {
            const response = await axios.post(fetchURL2, data);
            console.log(response.data);
            setPatternResult(response.data)
          } catch (error) {
            console.error(error);
        }
    };

    // create a capture function
    const capture = useCallback( async ()=> {
        console.log("uduwbg")
        const imageSrc = webcamRef.current.getScreenshot();
        setImgSrc(imageSrc);
        console.log(imageSrc);
        return Promise.resolve(), imageSrc;
    }, [webcamRef]);

    const compare = async () => {
        const img = await capture();
        console.log(img)
        await colorCompare(img);
        await patternCompare(img);
    }

    

    const retake = () => {
        setImgSrc(null);
      };

    return (
        <div className="container">
      <div className="webcam-info-container">
        <div className="webcam-container">
          {imgSrc ? (
            <img src={imgSrc} alt="webcam" />
          ) : (
            <Webcam
              height={600}
              width={600}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
            />
          )}
          <div className="btn-container">
            {imgSrc ? (
              <button onClick={retake}>Retake photo</button>
            ) : (
              <button onClick={compare}>Capture photo</button>
            )}
          </div>
        </div>
        <div className="info-container">
          <table className="info-table">
            <thead>
              <tr>
                <th>Color Match Percentage</th>
                <th>Pattern Match Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{colorResult? colorResult.similarityPercentage: <>Loading</>}</td>
                <td>{patternResult? patternResult.similarity_percentage: <>Loading</>}</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    );
  };
  
  export default CustomWebcam;