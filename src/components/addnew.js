import { useCallback, useRef, useState, React } from "react";
import Webcam from "react-webcam";

const Addnew = () => { 
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [name, setName] = useState("");
  const uploadURL = `${process.env.REACT_APP_BACKEND_API}/upload`;

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    try {
      const response = await fetch(uploadURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, image: imageSrc }),
      });

      if (response.ok) {
        console.log("Data uploaded successfully");
        // setImgSrc(imageSrc);
      } else {
        console.error("Failed to upload data");
      }
    } catch (error) {
      console.error("Error uploading data", error);
    }
  }, [webcamRef, name]);

  const retake = () => {
    setImgSrc(null);
    setName("");
  };

  return (
    <div className="container">
      {imgSrc ? (
        <div>
          <img src={imgSrc} alt="webcam" />
          <p>Name: {name}</p>
        </div>
      ) : (
        <div>
          <Webcam height={600} width={600} ref={webcamRef} screenshotFormat="image/jpeg"/>
          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      )}
      <div className="btn-container">
        {imgSrc ? (
          <button onClick={retake}>Retake photo</button>
        ) : (
          <button onClick={capture}>Capture photo</button>
        )}
      </div>
    </div>
  );
};

export default Addnew;
