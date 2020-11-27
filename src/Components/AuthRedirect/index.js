import React, {useContext} from "react"
import authContext from "../AuthProvider"
import {Route, Redirect} from "react-router-dom"

const AuthRedirect = ({component : Component, ...rest}) => {

    const {currentUser} = useContext(authContext)

    return(
        <Route 
            {...rest}
            render={(routeProps)=>
                    !!currentUser ? 
                    <Redirect to="/" /> 
                    : 
                    <Component {...routeProps} />
            }
        />
    )
}

export default AuthRedirect