import React from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "./Customer";
import { Admin } from "./Admin";
import '../Styles/Register.css'

export default function Store() {
  // load the currently logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate=useNavigate()

  // if no user is logged in, show a message instead of the store
  if (!user) {
    return <h2>No user found. Please login again.</h2>;
  }
  //here if the role is admin we will show the admin page else we will show the customer page 
  return (
    <div>
      <h1>Welcome, {user.firstname} {user.lastname}!</h1>
      {user.role === "admin" ? <Admin /> : <Customer user={user} />}
      <button onClick={() => {
        localStorage.removeItem("currentUser");
        window.location.href = "/"; // go back to landing
      }} className='button5'>Logout</button>
    </div>
  );
}
