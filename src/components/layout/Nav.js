
import React from "react"
import { NavLink,Redirect } from "react-router-dom"
import {connect} from "react-redux"
import { signOut } from "../../actions/auth"



const Nav =(props)=>{
    const {auther,dispatch}=props
    const logOut=()=>{
        dispatch(signOut(auther.user.uid))
    }
   if(!auther.user){
       return(<Redirect to="/signIn"/>)
   }
    return(
        <div className="container">
            <nav style={{display:"flex",justifyContent:"space-around"}}>
                <div>
                   <h5>My Chat</h5>
                </div>
            
                <ul style={{display:"flex",justifyContent:"space-around"}}>
                    <li>
                        <NavLink to ="/signIn">Login</NavLink>
                    </li>
                    <li>
                        <NavLink to ="/signUp">SignUp</NavLink>
                    </li>
                    <li>
                        <NavLink to ="/register">register</NavLink>
                    </li>
                    <li>
                        <NavLink to ="/chat">Chat</NavLink>
                    </li>
                   
                </ul>
                
                <div>
                
                        <button onClick={logOut}>Logout</button>
                     
                </div>
            </nav>
        </div>
    )

}
const mapStateToProps=({auther})=>{
    return{
        auther
    }
}
export default connect(mapStateToProps)(Nav) 