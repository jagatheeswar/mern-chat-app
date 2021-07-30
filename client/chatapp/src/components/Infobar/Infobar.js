import React,{useState}from "react"
import './Infobar.css'



const Infobar = ({rooma,users})=>{

    return(
    <div className="infobar">
        <div className="leftinnercontainer">
    
            <h3>Room Name: {rooma}</h3>

        </div>
        <div className="rightinnercontainer">
            <a href="/"><button className="leave">LEAVE ROOM</button></a>
        </div>
    </div>
    )
}
export default Infobar