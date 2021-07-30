import React from 'react'
import "./input.css"
const Input = ({message,setMessage,sendmessage})=>{
    return(
        <form className="form">
            <input placeholder="type your message here"
            className="input"
            type="text"
            value={message}
            onChange={(event)=>setMessage(event.target.value)}
            onKeyPress={(event)=>event.key==='Enter'?sendmessage(event):null} />
        <button className="sendbutton" onClick={(event)=>sendmessage(event)}>SEND</button>
        </form>

    )
}
export default Input