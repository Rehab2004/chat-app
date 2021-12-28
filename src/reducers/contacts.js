import { GET_CONTACTS_FAILD, GET_CONTACTS_SUCCES,SEND_MESSAGES,
    GET_FRIENDS,NEW_MESSAGE,SEND_AUDIO,RECIVE_AUDIO }
 from "../actions/contacts"

const intiState={
    contacts:[],
    friends:[],
    messages:[],
    
    
}

export function contactReducer(state=intiState,action){
    switch(action.type){
       case GET_CONTACTS_SUCCES:
           return{
               ...state,
               contacts:action.payload.contacts
           }
        case GET_CONTACTS_FAILD:
            return{
                ...state,
                error:action.payload.error
            }
        case GET_FRIENDS:
            return{
                ...state,
                friends:action.payload.friends
            }
       
        case SEND_MESSAGES:
            return{
                ...state,
                messages:action.payload.messages
            }
        case NEW_MESSAGE:
            return{
                ...state,
                messages:state.messages.concat(action.payload.message)
            }
        
    default: return state
        }
}