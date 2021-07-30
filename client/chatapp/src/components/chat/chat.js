import React, {useState,useEffect} from "react"
import queryString from 'query-string';
import io from 'socket.io-client';
import Infobar from "../Infobar/Infobar"
import "./chat.css"
import Input from "../input/input"
import Messages from "../Messages/Messages"


let socket;
const Chat = ({location}) => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const ENDPOINT = 'localhost:5000'
    const [show,setShow]=useState(false)

    useEffect(()=>{
        const {name,room}= queryString.parse(location.search)
    
socket = io(ENDPOINT, { transports: [ "websocket", "polling", "flashsocket" ] });
        
        setName(name)
        setRoom(room)        
        
         socket.emit('join',{name,room},()=>{}
         )
        return()=>{
            socket.emit('disconnect')
            socket.off()
        }
    },[ENDPOINT, location.search] );

  useEffect(()=>{
      socket.on('message',(message)=>{
setMessages([...messages,message]);
      });
      socket.on("roomdata", ({ users }) => {
          
        setUsers(users);
      });
  },[messages]) 

  const sendmessage = (event) =>{
    event.preventDefault()
    if(message)
    {
          socket.emit('sendmessage',message,() => setMessage(''))
               
    }

    }
    return(
        <div className="outercontainer">
        
            <div className="container">
                <Infobar rooma ={room} users= {users}/>
            <button className="leave" id="view" onClick={()=>setShow(!show)}>VIEW ALL USERS</button>
                <Messages messages={messages} name={name} />
                <div>{show?<div className="usersee">{users ? (
          <div>
            <h1>CURRENT USERS IN THE ROOM:</h1>
            <div className="activecontainer">
              <p >
                {users.map(({name}) => (
                    
                  <div key={name} className="activeitem">
                    
                    {name} 
                
                  </div>
                ))}
              </p>
            </div>
          </div>
        )
        : null
    }</div>:null
    }
    </div>
                
            <Input message={message} setMessage={setMessage} sendmessage={sendmessage} />
            
            </div>
            
        </div>
    )
}
export default Chat