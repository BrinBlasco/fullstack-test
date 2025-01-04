
import React, { useState } from "react";
import '../styles/Forms.css';
import axios from "../../../AxiosConfig";

const AddressForm = () => {
    const [country, setCountry] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    //const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
      e.preventDefault();

      try {
        const res = await axios.post('/auth/protected');
        
      } catch (error) {
        setMessage("Error loggin in!");
      }
    };

    return (
      <>
          <form onSubmit={handleLogin} className="wrapper">
            <h1>Address</h1>
            <label htmlFor="country">Country*</label>
            <input
              type="text"
              name="country"
              id="country"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />

            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            
            {/* 
            <label htmlFor="state">State</label>
            <input
              type="text"
              name="state"
              id="state"
              placeholder="State"
              value={state}
              onChange={(e) => setState(e.target.value)}
            /> 
            */}

            <div style={{ display: "flex" }}> 
              <div style={{ width: "40%" }}>
                <label htmlFor="zip">Zip Code*</label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  placeholder="ZIP Code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  required
                />
              </div>
              <div style={{ width: "100% "}}>
              <label htmlFor="city">City*</label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit">Save</button>
        
            <p>{message}</p>
          </form>
      </>
    );
};

export default AddressForm