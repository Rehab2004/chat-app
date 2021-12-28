//import './App.css'

import React from 'react'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
//import Loader from 'react-loading'
//import Nav from './layout/Nav'
import Home from './Home'
import SignUp from './SignUp'
import SignIn from "./SignIn"
import Chat from './ChatPage'
import Register from './Register'
//import { auth } from '../services/firebase'

/*const PrivateRoute = ({component:Component,...rest})=>(
  <Route {...rest} render={(props)=>
   props.authenticated?(
    <Component {...props}/>):(
    <Redirect  to={{
      pathname: '/signIn',
      state: { from: props.location }
    }}/>)}
    />
  
  )*/
const App=(props)=>{
  console.log(props)
 
  
    
    return(
      <BrowserRouter>
      
      <Switch>
        
       <Route exact path="/" component={Home}/>
        <Route path="/signIn" exact component={SignIn}/>
        <Route exact path="/signUp"  component={SignUp}/>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/chat" component={Chat}/>
      </Switch>
      </BrowserRouter>
      
  
    
    )
}
function mapStateToProps({auther}){
  return{
      auther
  }
}
export default connect(mapStateToProps)(App)
