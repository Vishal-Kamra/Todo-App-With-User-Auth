import React, {useContext} from "react"
import { Redirect, Route } from "react-router-dom"
import authContext from "../AuthProvider"

const PrivateRoute = ({component: Component, ...rest}) => {
    const {currentUser} = useContext(authContext)
    return(
        <Route 
            {...rest}
            render={(routeProps)=>
                    !!currentUser ? 
                        <Component {...routeProps} />    
                        :
                        <Redirect to="/login" />
                    }
        />
    )
}

export default PrivateRoute