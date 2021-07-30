import React,{useState} from "react";
import "./join.css";
import { Link } from "react-router-dom";
const Join = () => {
    const [name,setName]= useState('');
    const[room,setRoom] = useState('');
    return(
        <div className="joinoutercontainer">
            <div className="joininnercontainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joininput" type="text" onChange={(event)=>setName(event.target.value)} />  </div>
                <div><input placeholder="Room" className="joininput mt-20" type="text" onChange={(event)=>setRoom(event.target.value)}/>  </div>
                <Link onClick={(event) => (!name || !room)?event.preventDefault():null} to={`/chat?name=${name}&room=${room}`}>
                <button className="button mt-20" type="submit">SIGN IN</button>
                </Link>
                </div>     
                
        </div>
    )
}

export default Join