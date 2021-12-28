
import React,{useState} from "react"

import {connect} from "react-redux"
import { Redirect } from "react-router-dom"
//import { authSucces } from "../actions/auth"
import { signIn } from "../actions/auth"
import'../styles/login.css'

const SignIn=(props)=>{
    console.log(props)
    const {dispatch,auther}=props
   const [email,setEmail]= useState('')
   const [password,setPass]=useState('')
   
   
 
   const handleSubmit=(e)=>{
       e.preventDefault()
      dispatch (signIn({email,password}))
    
       setPass('')
       setEmail('')
       
   }
   if(auther.user){
       
        return <Redirect to ="/chat" />
       
   }
    return(
        
        <div className="container content">
            
            <h3>Login</h3>
            
            
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div>
                    <input type="password" placeholder="password" value={password} onChange={(e)=>setPass(e.target.value)}/>
                </div>
                <button type="submit" disabled={email|password===''}>Login</button>
            </form>
            
        </div>
    )
}
const mapStateToProps=({auther})=>{
    return{
        auther

    }
}

export default connect(mapStateToProps)(SignIn)