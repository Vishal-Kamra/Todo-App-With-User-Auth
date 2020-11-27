import React, {useState} from "react"
import {signInWithGoogle, createUser, signInWithFacebook} from "../Firebase/Firebase"
import googleIcon from "../../Assets/Icons/google.svg";
import facebookIcon from "../../Assets/Icons/facebook.svg";
import {Link} from "react-router-dom"

const CreateUser = () => {
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
        createUser(email, password)
    }

    return(
        <>
            <form onSubmit={(e)=>submit(e)} className="user-form">
                <h1>Sign Up</h1>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Email"/>
                <br />
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password"/>
                <br />
                <input type="submit" value="Sign up" />
                <Link to="/login"><button>Sign In</button></Link>
            </form>
            <div className="auth-providers">
                <p>Or Sign Up with</p>
                <button onClick={()=>googleSignin()}><img src={googleIcon} /></button>
                <button onClick={()=>facebookSignin()}><img src={facebookIcon} /></button>
            </div>
        </>
    )
}

export default CreateUser;