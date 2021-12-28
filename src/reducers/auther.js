import { SIGN_UP_REQUEST,SIGN_UP_SUCCES,SIGN_UP_FAILED,
    SIGN_IN_REQUEST,
    SIGN_IN_SUCCES,SIGN_IN_FAILED,
LOGOUT_SUCCES,LOGOUT_FAILD} from "../actions/auth";
let iniState={
    user:undefined,
    authenticating:false,
    authenticated:false,
    error:null,
    
}
export function authReducer(state=iniState,action){
   
        switch(action.type){
           case SIGN_UP_REQUEST:
               
               return{
                   ...state,
                   authenticating:true,

               }
               case SIGN_UP_SUCCES:
                   return{
                       ...state,
                       user:action.payload.user,
                       authenticating:false,
                       authenticated:true
                   }
                   case SIGN_UP_FAILED:
                       return{
                           ...state,
                           error:action.payload.error
                       }
                       case SIGN_IN_REQUEST:
               
                        return{
                            ...state,
                            authenticating:true,
         
                        }
                        case SIGN_IN_SUCCES:
                            return{
                                ...state,
                                user:action.payload.user,
                                authenticating:false,
                                authenticated:true
                            }
                            case SIGN_IN_FAILED:
                                return{
                                    ...state,
                                    error:action.payload.error
                                }
                            case LOGOUT_SUCCES:
                                return{
                                   ...iniState
                                }
                                case LOGOUT_FAILD:
                                    return{
                                        ...state,
                                        error:action.payload.error
                                    }

               default: return state
        }

    
}