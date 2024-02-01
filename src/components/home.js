import React, { useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import DropdownMenu from "./dropdownMenu";

const Home = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState([]); 
  const [selectedOption, setSelectedOption] = useState(null);
  const fetchURL = `${process.env.REACT_APP_BACKEND_API}/getImages`;

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch(fetchURL);
        if (response.ok) {
          const data = await response.json();
          setOptions(data);
        } else {
          console.error("Failed to fetch options:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = (image) => {
    // Perform action with the selected option
    navigate('/webcam',{state:{image:image}})
  };

  return (
    <div>
      <h1>Select Design:</h1>
      <DropdownMenu options={options} onSelect={handleSelect} />
      {selectedOption && (
        <div>
          <p>Selected Option: {selectedOption.name}</p>
          <img src={selectedOption.image} alt={selectedOption.label} />
          <button onClick={() => {handleSubmit(selectedOption.image)}}>Compare</button>
        </div>
      )}
      <p>
        <a href="#">
          <NavLink to="/addnew">Addnew  </NavLink>
        </a>
        to add a new design.
      </p>
    </div>
  );
};

export default Home;
