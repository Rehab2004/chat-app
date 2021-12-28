import { auth,firestore } from "../services/firebase"
export const SIGN_UP_REQUEST="SIGN_UP_REQUEST"
export const SIGN_UP_SUCCES="SIGN_UP_SUCCES"
export const SIGN_UP_FAILED="SIGN_UP_FAILED"
export const SIGN_IN_REQUEST="SIGN_IN_REQUEST"
export const SIGN_IN_SUCCES="SIGN_IN_SUCCES"
export const SIGN_IN_FAILED="SIGN_IN_FAILED"
export const LOGOUT_SUCCES="LOGOUT_SUCCES"
export const LOGOUT_FAILD="LOGOUT_FAILED"




export const signUp=(user)=>{
    return (dispatch)=>{
        dispatch({type:SIGN_UP_REQUEST,payload:{msg:"signup request"}})
     auth().createUserWithEmailAndPassword(user.email,user.password)
     .then((data)=>{
       
        firestore().collection('users').doc(data.user.uid).set({
            firstName:user.firstName,
            lastName:user.lastName,
            email:user.email,
            uid:data.user.uid,
            photoURL:data.user.photoURL?data.user.photoURL:"",
    
           
            friends:[],
            createdAt:new Date(),
            isOnline:true
        })
            const loggedUser={
                firstName:user.firstName,
                lastName:user.lastName,
                uid:data.user.uid,
                
                email:user.email
            }
           // firestore().localStorage.setItem('user',JSON.stringify(loggedUser))
        
        dispatch({type:SIGN_UP_SUCCES,payload:{user:loggedUser}})
     }).catch(error=>{
         console.log(error)
         dispatch({type:SIGN_UP_FAILED,payload:{error:error}})
     })

    }
}

export const signIn=(user)=>{
    return(dispatch)=>{
        dispatch({type:SIGN_IN_REQUEST})
        auth().signInWithEmailAndPassword(user.email,user.password)
       
        .then((data)=>{
            firestore().collection("users").doc(data.user.uid).update({isOnline:true})
            firestore().collection("users").doc(data.user.uid).get().then((doc)=>{
                //const name=data.user.displayName.split(` `)
         
              
                const loggedInUser={
                    firstName:doc.data().firstName,
                    lastName:doc.data().lastName,
                    uid:doc.data().uid,
                    photoURL:doc.data().photoURL,
                    email:user.email
                }
                dispatch({type:SIGN_IN_SUCCES,payload:{user:loggedInUser}})
            })
          
        }).catch(error=>{
           dispatch({type:SIGN_IN_FAILED,payload:{error:error}})
        })
    }
}

export const signOut=(uid)=>{
    return (dispatch)=>{
        firestore().collection("users").doc(uid).update({
            isOnline:false 
   })
        auth().signOut()
        .then(()=>{
           // localStorage.clear()
            dispatch({type:LOGOUT_SUCCES,payload:{meg:"logout succes"}})
           
        }).catch(error=>{
            dispatch({type:LOGOUT_FAILD,payload:{error:error}})
        })
    }
}