


import React from 'react'

import '../styles/message.css'

export  const Message=(props)=>{

const {message}=props

    return(
        <div>
            {!message.isMedia?(
                <div className="text">
            <p>{message.message}
            <br></br>
            <span>{message.timestamp}</span>
            </p>
            </div>
            ):(<div className="img"><img src={message.message} alt=""/>
               <br></br>
            <span>{message.timestamp}</span>
            </div>)}
        </div>
    )

}