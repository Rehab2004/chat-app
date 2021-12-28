

import React from "react"
import { Link, Redirect } from "react-router-dom"
import {connect} from "react-redux"

 
import "../styles/home.css"






const Home=(props)=>{
    const {auther}=props
    if(auther.user){
        return(<Redirect to="/signIn"/>)
    }
    return(
      <div className="container">
          <div className="icon">
          <i className="fab fa-facebook-messenger"></i>
          </div>
          <div className="content">
      <h1>welcom to our app</h1>
      <p>login first <Link to="/signIn" className="link">Login</Link></p>
      <p>create an acount <Link to="/signUp" className="link">SignUp</Link></p>
      </div>
      </div>
    )
  }
  const mapStateToProps=({auther})=>{
      return{
          auther
      }
  }

  export default connect(mapStateToProps)(Home)