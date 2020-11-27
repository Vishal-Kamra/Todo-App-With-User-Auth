import React, {useState} from "react"
import {signInWithGoogle, signIn, signInWithFacebook} from "../Firebase/Firebase"
import googleIcon from "../../Assets/Icons/google.svg";
import facebookIcon from "../../Assets/Icons/facebook.svg";
import { Link } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const googleSignin = () =>{
        signInWithGoogle()
    }
    const facebookSignin = () =>{
        signInWithFacebook()
    }
    const submit = (e) =>{
        e.preventDefault()
        signIn(email, password)
    }
    return(
        <>
            <form onSubmit={(e)=>submit(e)} className="user-form">
                <h1>Sign In</h1>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                <br />
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                <br />
                <input type="submit" value="Sign In" />
                <Link to="/signup"><button>Create New Account</button></Link>
            </form>
            <div className="auth-providers">
                <p>Or Sign in with</p>
                <button onClick={()=>googleSignin()}><img src={googleIcon} /></button>
                <button onClick={()=>facebookSignin()}><img src={facebookIcon} /></button>
            </div>
        </>
    )
}

export default Login;