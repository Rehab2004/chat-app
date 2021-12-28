import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import './index.css'
import App from './components/App'
import reducer from './reducers'
//import middleware from './middleware'
import { Provider } from 'react-redux'
import { createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import logger from './middleware/logger'
import { applyMiddleware } from 'redux'
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase'
import firebase from './services/firebase'
import { reduxFirestore,getFirestore } from 'redux-firestore'
//import reportWebVitals from './reportWebVitals';
const composeEnhancers= compose( 
  applyMiddleware(thunk.withExtraArgument({getFirebase,getFirestore}),logger),
  reduxFirestore(firebase),
  reactReduxFirebase(firebase)
)
const store = createStore (reducer, composeEnhancers)
 
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
