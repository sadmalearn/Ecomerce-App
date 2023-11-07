import React, { useEffect , useState } from "react";
import { useNavigate} from "react-router-dom";
import "./MainLogin.css";
import chatbubble from "../Assets/Login/chatbubble.svg";
import { url } from "../Constants/ApiUrlconstant";

export default function MainLogin() {

  var navigate = useNavigate();

  const [ username , setUsername ] = useState('')
  const [ password , setPassword ] = useState('')

  const validateSubmit = async () => {
    console.log("trigger the function")

    if( username == "" || password == ""){
      console.log("Should not empty")
    }else{

      let userObj = {
        username: username,
        password: password,
      }

      try{
        await fetch(url.login ,{
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(userObj)
        })
        .then( (res) => res.json())
        .then( (res) => {
          console.log(res)

          if(res.success){
              console.log("login successfull")
              navigate('/main')
          }
        })
      }catch(err){
        console.log("inside error")
        console.log(err)
      }


    }




  }
 
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
                <input type="text" value={username} onChange={ (e) => setUsername(e.target.value)} />
              </div>
              <div className="pass">
                <label>Password</label>
                <input type="password" value={password} onChange={ (e) => setPassword(e.target.value)} />
              </div>
              <div className="submit-form">
                <button type="button" onClick={validateSubmit}> Submit </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
