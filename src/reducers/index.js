

import  {authReducer} from './auther'
import {contactReducer} from './contacts'
//import { firestoreReducer } from 'redux-firestore'
//import { firebaseReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'

export default combineReducers ({
       // firebase:firebaseReducer,
       //firestore: firestoreReducer,
        auther:authReducer,
        contacts:contactReducer
    
})