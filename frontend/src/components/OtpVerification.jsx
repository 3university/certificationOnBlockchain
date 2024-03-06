import React, { useState } from "react";
import "../styles/Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authAction } from "../store";

const OTPVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [otp, setOTP] = useState("");

  const handleInputChange = (e) => {
    setOTP(e.target.value);
  };

  const checkValidation = () => {
    // Validation: Check if OTP is 6 digits
    if (otp.length !== 6) {
      alert("Please enter a 6-digit OTP");
      return false; // Stop form submission if validation fails
    }

    return true;
  };

  const sendOTP = async () => {
    try {
      // Send the OTP to the backend for verification
      const res = await axios.post("http://localhost:4000/api/verifyOTP", {
        otp,
      });
      const userData = await res.data.message;
      return userData;
    } catch (error) {
      console.log("Error while sending OTP to backend", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the OTP
    if (!checkValidation()) {
      return;
    }

    // Send OTP for verification
    sendOTP()
      .then(() => dispatch(authAction.login()))
      .then(() => navigate("/dashboard"));
  };

  return (
    <div>
      <h3>OTP Verification</h3>
      <div className="university-form mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-6 mx-auto">
              <form
                className="form-out border rounded p-4"
                onSubmit={handleSubmit}
              >
                <div className="form-group mb-3">
                  <label htmlFor="inputOTP">Enter OTP: </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter OTP"
                    name="otp"
                    onChange={handleInputChange}
                    value={otp}
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Verify OTP
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
