


import React,{useState,useEffect} from 'react'
import {connect} from'react-redux'
import { addContact, getContacts, getFriends,getPrevMessages } from '../actions/contacts'
import { User } from './user'
import'../styles/contacts.css'

const Contacts=(props)=>{
    const{auther,contacts,dispatch}=props
    
    const {user:{uid}}=auther

  
  const[value,setValue]=useState("")
  //const[friend,setFriend]=useState("")
  //const[start,setStart]=useState(false)

  
useEffect(()=>{
   
    dispatch(getFriends(uid))
    
    dispatch(getContacts(uid))

},[])

   
    const showResult=value===''?null:
    contacts.contacts.filter((item)=>item.firstName.toLowerCase().includes(value.toLowerCase()))


    

    


    return(
        <div className="contacts">
            <div className="search">
            <input type="text" placeholder="search" value={value} onChange={(e)=>setValue(e.target.value)}/>
            <br></br>
      
      
          {showResult&&showResult.length>0?showResult.map((user)=>(
              <User user={user} key={user.uid}/>)):null}
           
      </div>
     
      <div className="friends">
      { contacts.friends&& contacts.friends.length > 0 ? contacts.friends.map((user)=>
         ( <User user={user} key={user.uid}/>)
       ):null}
      
      
      </div>
          </div>
        

    )
}

const mapStateToProps=({auther,contacts})=>{
    return{
        auther,
        contacts
    }
}

export default connect(mapStateToProps)(Contacts)