
import { ADD_ACOUNT } from "../actions/users"

export function users(state={},action){
    switch(action.type){
        case ADD_ACOUNT:
            return{
                ...state,
            }
    }
}