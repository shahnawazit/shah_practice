import React from 'react'
import './Login.css'
import Logo from '../../../public/HindalcoLogo.jpg' 
export default function Login() {
  return (
    <> 
   <div id="loginPage" className="page active">
    <div className="card">
        <div style={{textAlign: "center"}}>
        <img style={{width: "100px"}} src={Logo} alt="Logo"/>
        </div>
      <h2> Welcome </h2>
      <div className="muted">Log in to continue</div>

      <div className="field">
        <label>Email</label>
        <input type="email" placeholder="Enter email" />
      </div>

      <div className="field">
        <label>Password</label>
        <input type="password" placeholder="Enter password" />
      </div>

      <button className="btn">Login</button>
      <div className="switch">Don't have an account? <a href="#" onclick="showSignup()">Sign up</a></div>
    </div>
  </div>
    </>
  )
}
