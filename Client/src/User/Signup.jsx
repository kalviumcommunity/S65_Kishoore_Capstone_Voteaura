import React, { useState, useEffect } from "react"
import "./Signup.css"
import axios from "axios"
import Navbar from "../Navbar/Navbar"
import { useNavigate } from "react-router-dom"
import { stateDistrictData } from "../stateDistrict"

export default function SignupPage() {
  const navigate = useNavigate()
  const [idProofImages, setIdProofImages] = useState([null, null])
  const [udidImages, setUdidImages] = useState([null, null])
  const [profileImage, setProfileImage] = useState(null)
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [emailVerified, setEmailVerified] = useState(false)
  const [timer, setTimer] = useState(0)
  const [otpSent, setOtpSent] = useState(false)
  const [buttonState, setButtonState] = useState("send")
  const [selectedState, setSelectedState] = useState("")
  const [districts, setDistricts] = useState([])
  const [selectedDistrict, setSelectedDistrict] = useState("")

  useEffect(() => {
    let interval
    if (timer > 0 && !emailVerified) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [timer, emailVerified])

  const handleImageUpload = (e, index, type) => {
    const file = e.target.files[0]
    if (!file) return
    if (type === "id") {
      const updated = [...idProofImages]
      updated[index] = file
      setIdProofImages(updated)
    } else if (type === "udid") {
      const updated = [...udidImages]
      updated[index] = file
      setUdidImages(updated)
    } else if (type === "profile") {
      setProfileImage(file)
    }
  }

  const sendOtp = async () => {
    if (!email) return alert("Please enter an email first")
    try {
      const res = await axios.post("https://s65-kishoore-capstone-voteaura.onrender.com/api/send-otp", { email })
      alert(res.data.message, otpSent)
      setOtpSent(true)
      setTimer(60)
      setButtonState("verify")
    } catch (err) {
      alert("Failed to send OTP")
      console.error(err)
    }
  }

  const verifyOtp = async () => {
    try {
      const res = await axios.post("https://s65-kishoore-capstone-voteaura.onrender.com/api/verify-otp", { email, otp })
      if (res.data.success) {
        setEmailVerified(true)
        setTimer(0)
        setButtonState("verified")
        alert("Email verified successfully")
      } else {
        alert("Incorrect OTP")
      }
    } catch {
      alert("OTP verification failed")
    }
  }

  const handleOtpButtonClick = () => {
    if (buttonState === "send") sendOtp()
    else if (buttonState === "verify") verifyOtp()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!emailVerified) return alert("Please verify your email before submitting")
    const formData = new FormData()
    formData.append("name", e.target.fullName.value)
    formData.append("phone", phone)
    formData.append("email", email)
    formData.append("UDid", e.target.udid.value)
    formData.append("state", selectedState)
    formData.append("district", selectedDistrict)
    idProofImages.forEach((img) => {
      if (img) formData.append("proof", img)
    })
    udidImages.forEach((img) => {
      if (img) formData.append("UDidimg", img)
    })
    if (profileImage) {
      formData.append("passportImage", profileImage)
    }
    try {
      const res = await axios.post("https://s65-kishoore-capstone-voteaura.onrender.com/api/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      alert("Signup successful", res)
      navigate("/")
    } catch {
      alert("Signup failed")
    }
  }

  return (
    <div className="signup-page">
      <Navbar />
      <div className="signup-container">
        <h2>Personal Details</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label>Applicant's Full Name*</label>
            <input type="text" name="fullName" placeholder="Applicant's Full Name" required />
          </div>
          <div className="form-group">
            <label>Applicant Mobile No.*</label>
            <input type="tel" name="phone" placeholder="Enter 10-digit mobile number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Applicant Email Id*</label>
            <input type="email" name="email" placeholder="e.g. abcd@xyz.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div style={{ marginTop: "10px" }}>
              {timer > 0 && buttonState !== "verified" && (
                <p style={{ color: "gray", marginBottom: "5px" }}>Resend in {timer}s</p>
              )}
              <button
                type="button"
                className="otp-button"
                onClick={handleOtpButtonClick}
                disabled={buttonState === "verified"}
              >
                {buttonState === "send" ? "Send OTP" : buttonState === "verify" ? "Verify OTP" : "Verified"}
              </button>
              {buttonState === "verify" && (
                <input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={{ marginLeft: "10px" }}
                />
              )}
            </div>
          </div>
          <div className="form-group">
            <label>UDID Number*</label>
            <input type="text" name="udid" placeholder="Enter UDID Number" required />
          </div>
          <div className="form-group">
            <label>Upload Profile Photo*</label>
            <div className="image-box" onClick={() => document.getElementById("profile").click()}>
              {profileImage ? (
                <img src={URL.createObjectURL(profileImage)} alt="Profile" />
              ) : (
                "Upload Profile Photo"
              )}
              <input id="profile" type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload(e, 0, "profile")} />
            </div>
          </div>
          <div className="form-group">
            <label>Upload ID Proof Images*</label>
            <div className="image-upload-boxes">
              {[0, 1].map((index) => (
                <div className="image-box" key={index} onClick={() => document.getElementById(`id-${index}`).click()}>
                  {idProofImages[index] ? (
                    <img src={URL.createObjectURL(idProofImages[index])} alt="ID Proof" />
                  ) : (
                    "Upload ID Proof"
                  )}
                  <input id={`id-${index}`} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload(e, index, "id")} />
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Upload UDID Images*</label>
            <div className="image-upload-boxes">
              {[0, 1].map((index) => (
                <div className="image-box" key={index} onClick={() => document.getElementById(`udid-${index}`).click()}>
                  {udidImages[index] ? (
                    <img src={URL.createObjectURL(udidImages[index])} alt="UDID" />
                  ) : (
                    "Upload UDID Image"
                  )}
                  <input id={`udid-${index}`} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleImageUpload(e, index, "udid")} />
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Select State*</label>
            <select
              name="state"
              value={selectedState}
              onChange={(e) => {
                const state = e.target.value
                setSelectedState(state)
                setDistricts(stateDistrictData[state] || [])
                setSelectedDistrict("")
              }}
              required
            >
              <option value="">Select State</option>
              {Object.keys(stateDistrictData).map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Select District*</label>
            <select
              name="district"
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              required
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district} value={district}>{district}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  )
}
