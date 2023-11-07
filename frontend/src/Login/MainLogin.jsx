import React from "react";
import "./MainLogin.css";
import chatbubble from '../Assets/Login/chatbubble.svg'

export default function MainLogin() {
  return (
    <section className="mainloginwrapper">
      <div className="wrapper-adjust">
        <div className="form-parent">
          <div className="form-content">
            <div className="form-img">
                <div className="chatwrap">
                    <img src={chatbubble} alt="" /> 
                </div>
            </div>
            <div className="form-name">
                <span>StarEcom</span>
            </div>
            <div className="form-inputs">
              <div className="user">
                <label> Username </label>
                <input type="text" placeholder="username" />
              </div>
              <div className="pass">
                <label>Password</label>
                <input type="password" />
              </div>
              <div className="submit-form">
                <button type="button"> Submit </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
