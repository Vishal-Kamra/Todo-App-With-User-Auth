import React, {createContext, useState, useEffect} from "react"
import firebase from "../Firebase/Firebase"

var authContext = createContext(null)

export const AuthContextProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null)
    const [pending, setPending] = useState(true)

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user)=>{
            setCurrentUser(user)
            setPending(false)
        })
    },[])

    if(pending){
        return <h1>Please Wait ...</h1>
    }

    return(
        <authContext.Provider value={{currentUser}}>
            {children}
        </authContext.Provider>
    )
}

export default authContext;