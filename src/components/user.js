


import React from 'react'
import '../styles/user.css'
import *  as profile from  '../assets/user.png'


export const User=(props)=>{
const{user}=props
    return(
        <div className="user">
            
            <img src={user.photoURL?user.photoURL: profile} alt="img" />
            
            <p>{`${user.firstName} ${user.lastName}`}</p>
            <span style={{background:user.isOnline===true?"yellowgreen":"gray"}}></span>
        </div>
    )
}