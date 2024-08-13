import React from 'react'
import notfound from "../assets/notfound.png"

export default function NotFound(props) {
  return (
    <div style={{marginLeft:'35%'}}>
      <img src={notfound} alt='notfound' style={{height:'500px', width:'500px', marginTop:'50px'}} />
      <h1 style={{marginLeft:'130px'}}>{props.message}</h1>
    </div>
  )
}
