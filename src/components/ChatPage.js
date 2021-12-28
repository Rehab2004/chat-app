


import React,{useState,useEffect,useRef} from 'react'
import {connect} from 'react-redux'

import imageCompression from 'browser-image-compression'
//import { Redirect } from 'react-router-dom'

import '../styles/contacts.css' 
import'../styles/chat.css'
//import * as file from '../assets/file.png'
import { getContacts,addContact,getFriends,getPrevMessages ,newMessage,sendImage} from '../actions/contacts'
import { Redirect } from 'react-router-dom'

import {User} from './user'
import { Message } from './message'

const Chat=(props)=>{
    const{auther,dispatch,contacts}=props

    const[value,setValue]=useState('')
   
    const[start,setStart]=useState(false)
    
    const[friend,setFriend]=useState("")
    
    const[content,setContent]=useState('')
    
    




    useEffect(()=>{
         
            
              dispatch(getFriends(auther.user.uid))
             dispatch(getContacts(auther.user.uid))
        
         
    },[])

   
        
    

       
    const showResult=value===''?null:
    contacts.contacts.filter((item)=>item.firstName.toLowerCase().includes(value.toLowerCase()))

    const handleAddFriend=(user)=>{
        let userId=auther.user.uid
        let uid=user.uid
        
      
      dispatch(addContact(userId,uid))
      setStart(true)
      setFriend(user)
      
      setValue('')

    }
    

  

 
  const handleChat=(user)=>{
    let userId=auther.user.uid
    let uid=user.uid
    
       dispatch(getPrevMessages(userId,uid))
     setStart(true)
     setFriend(user)
  
  }



  const handleSubmit=(e)=>{
      e.preventDefault()
      let user=friend
      
      if(content!='' && user){
        dispatch(newMessage(auther.user.uid,
                             user.uid,
                             content
                         ))
                       }
                       setContent('')
  }
  
  const inputRef=useRef()
  
  const handleFile=async(e)=>{
      try{
          const image=e.currentTarget.files[0]
          const option={
              maxSizeMB:0.4,
              useWebWorker:true
          }

      

    const compressedImg=await imageCompression(image,option)
    let user=friend
    dispatch(sendImage({user_uid_1:auther.user.uid,
    user_uid_2:user.uid,
img:compressedImg,

}))
  }catch(error){
    console.log(error)
   }
  }



  /*const handleSelectImg=()=>{
      if(inputRef.current){
          inputRef.current.click()
      }
  }*/
  if(!auther.user){
      return <Redirect to="/signIn"/>
  }
   
    return(
        
        <div className="main">
             <div className="contacts">
           <input type="text" placeholder="search" value={value} onChange={(e)=>setValue(e.target.value)}/>
            
            
            
          
          {showResult&&showResult.length>0?showResult.map((user)=>(
              <div key={user.uid} onClick={()=>handleAddFriend(user)}>
              <User user={user} />
          </div>)):null}
           
      
    
      
          
      { contacts.friends&& contacts.friends.length > 0 ? contacts.friends.map((user)=>(
          
         
         <div key={user.uid} onClick={()=>handleChat(user)}>
              
             <User user={user} /> 
             </div>
      )):null}
      
      </div>
      
      
      {start&&(
             <div className="chat">
             <div className="header">
                 <User user={friend}/>
           </div>
             
        {contacts.messages.length>0?contacts.messages.map((msg)=>(
        
        <div key={msg.createdAt} style={{width:"auto",textAlign:msg.sender===auther.user.uid?"left":"right"}}>
             <Message message={msg} />
            </div>)):null}

            
        <div className="form">
        <form onSubmit={handleSubmit}>
           
            <input id="file" type="file" accept="image/*" name="attachmentInput" ref={inputRef} onChange={handleFile}/>
            <label htmlFor="file" className="icon">
            <i className="fas fa-link"></i>
            </label>
            <textarea cols="20" placeholder="type your msg" value={content} onChange={(e)=>setContent(e.target.value)}/>
            <button id="btn" type="submit"><span><i className="fas fa-paper-plane"></i></span></button>
           
            
           
            
        </form>
     </div>
            </div>)}
         
       </div>
        
        
        
    )
}

const mapStateToProps=({auther,contacts})=>{
    return{
        auther,
        contacts,
        
    }
}
export default connect(mapStateToProps)(Chat)