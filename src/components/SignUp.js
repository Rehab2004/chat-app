
import React,{useState} from 'react'

import {connect} from 'react-redux'
import { signUp } from '../actions/auth'
//import { authSucces,authError } from '../actions/auth'
//import { auth } from '../services/firebase'
import { Redirect } from 'react-router-dom'

export const SignUp =(props)=>{
  const{dispatch,auther}=props
  const[firstName,setFirstName]=useState('')
  const[lastName,setLastName]=useState('')
  const[email,setEmail]=useState('')
  const[password,setPass]=useState('')
  
  

  const handleSubmit=(e)=>{
      e.preventDefault()
     dispatch (signUp({firstName,lastName,email,password}))
      setFirstName('')
      setLastName('')
      setEmail('')
      setPass('')
      
  }
  if(auther.authenticated){
      return <Redirect to={"/chat"}/>
  }
    return(
        <div className="container">
        <h3>SignUp to  my chat App</h3>
        <form onSubmit={handleSubmit}>
        <div>
             <input type="text" placeholder="first name" value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
             </div>
             <div>
             <input type="text" placeholder="lastName" value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
             </div>
         <div>
             <input type="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
             </div>
             <div>
             <input type="password" placeholder="password"value={password} onChange={(e)=>setPass(e.target.value)}/>
         </div>
         <button type="submit">submit</button>
        </form>
        </div>
    )
}
const mapStateToProps=({auther})=>{
    return{
        auther
    }
}

export default connect(mapStateToProps)(SignUp)