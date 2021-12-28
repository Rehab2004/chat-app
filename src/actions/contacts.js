

import firebase from "firebase/app"
import { firestore,storage } from "../services/firebase"
import {v4 as uuid} from 'uuid'
export const GET_CONTACTS_SUCCES="GET_CONTACTS_SUCCES"
export const EMPTY_CONTACT="EMPTY_CONTACT"
export const GET_CONTACTS_FAILD="GET_CONTACTS_FAILD"
export const GET_FRIENDS="GET_FRIENDS"
export const ADD_FRIEND="ADD_FRIEND"
export const ADD_FRIEND_FAILD="ADD_FRIEND_FAILD"
export const SEND_MESSAGES="SEND_MESSAGES"
export const NEW_MESSAGE="NEW_MESSAGE"
export const SEND_IMG_SUCCESS="SEND_IMG_SUCCESS"
export const SEND_AUDIO="SEND_AUDIO"
export const RECIVE_AUDIO="RECIVE_AUDIO"

export const getContacts=(uid)=>{
    return (dispatch)=>{
   
        
    
     firestore().collection("users").onSnapshot((query)=>{
         let contacts=[]
         query.forEach((doc)=>{
             if(doc.data().uid !== uid){
             
              contacts.push(doc.data())
             }
         })
         dispatch({type:GET_CONTACTS_SUCCES,payload:{contacts}})
     })
       

    }
}
  


export const getFriends=(uid)=>{
    return(dispatch)=>{
       
        firestore().collection('users').doc(uid).onSnapshot((snapshot)=>{
            const friendsIds= snapshot.data().friends
            //console.log(friendsIds)
            const friends=[]
            friendsIds.map((id)=>{
               firestore().collection('users').doc(id).get().then((doc)=>{
                   friends.push(doc.data())})
               
            })
            dispatch({type:GET_FRIENDS,payload:{friends}})
        })
                
    }
}
export const addContact=(uid,userId)=>{
    return (dispatch)=>{
   
        firestore().collection('users').doc(userId).update({friends:firebase.firestore.FieldValue.arrayUnion(uid)})
       firestore().collection('users').doc(uid).update({friends:firebase.firestore.FieldValue.arrayUnion(userId)})
        .then(()=>{
            dispatch({type:ADD_FRIEND})
        })
         .catch((error)=>{
             dispatch({type:ADD_FRIEND_FAILD,payload:{error}})
         })
      
    }
}

export const getPrevMessages =(userId,uid)=>{
    return  (dispatch)=>{
        
        //firestore().collection('messages').doc().set({...obj})

        
        // .then(()=>{  
            const arr=[userId,uid].sort().join(",")
          firestore().collection('messages').where('users','==',arr)
           
           .orderBy('createdAt','asc')
           
           .get()
           .then((docs)=>{
          /* .onSnapshot((query)=>{
              const messages=[]
               query.forEach((doc)=>{
               
                   messages.push(doc.data())
                   
               })*/
        
             const messages=[]
             docs.forEach((doc)=>{
                
                   messages.push(doc.data())
                 
             }) 
               dispatch({type:SEND_MESSAGES,payload:{messages}})       
           })
                         
}

}

export const newMessage=(uid_1,uid_2,content)=>{
    return dispatch=>{
        const message=  { users:[uid_1,uid_2].sort().join(","),
        sender:uid_1,
        message:content,
        isMedia:false,
        createdAt:new Date(),
        timestamp:`${new Date().getHours().toString().padStart(2,"0")}:${new Date().getMinutes().toString().padStart(2,"0")}`
        }
        firestore().collection('messages').add({...message})
         

        .then(()=>{
                
            dispatch({type:NEW_MESSAGE,payload:{message}})
        })
    }
}
export const sendImage=(obj)=>{
    return async (dispatch)=>{
        const upload= storage().ref('media').child(uuid()).put(obj.img)
        upload.on(
            'state_changed',
           function(_){},
            
           function (error){
            console.log(error)
        },
       function(){
       
        upload.snapshot.ref.getDownloadURL().then((url)=>{
             const message={
                users:[obj.user_uid_1,obj.user_uid_2].sort().join(","),
                sender:obj.user_uid_1,
                message:url,
                isMedia:true,
                createdAt:new Date(),
                timestamp:`${new Date().getHours().toString().padStart(2,"0")}:${new Date().getMinutes().toString().padStart(2,"0")}`
             }
            firestore().collection('messages').add({...message})
                      
            
           dispatch({type:NEW_MESSAGE,payload:{message}})
            })
        }
    
    )
    }     
     
    }
