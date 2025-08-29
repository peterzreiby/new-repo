import React, { useState } from 'react';
import  Store from './Store';
import { useNavigate } from 'react-router-dom';
import '../Styles/Register.css'
export function LoginPage() {
  //state for the email input 
  const [email, setEmail] = useState("");
  //state for the password input 
  const [password, setPassword] = useState("");
  //state to track the currently logged-in user if "currentUser" exists in localStorage, it will be parsed and used
  const [loggedIn, setLoggedIn] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
    );
    const navigate = useNavigate();
    //handler for the back button
    const backHandler=(e)=>{
      e.preventDefault();// prevent page reload
      setLoggedIn(null);// clear local state because loggedIn is what my component uses to decide what to render:
      navigate("/"); // go back to landing page
    }

  // form submit handler for login
  const submitHandler = (e) => {
    e.preventDefault();// prevent form refresh
    // load all saved users from localStorage
    const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
     // check if a user exists with matching email + password
    const foundUser = savedUsers.find(
      (user) => user.Email === email && user.PassWord === password
    );
    
    if (foundUser) {
      // Success --> show welcome alert
      alert(`Welcome back ${foundUser.firstname}`);
      // save the logged-in user to localStorage (so session persists)
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      // update state
      setLoggedIn(foundUser);
      //navigate directly to the store
      navigate("/Store");

    } else {
      // if no match found
      alert("there's a problem");
      //go back to the landing page
      navigate("/")
    }
  };

  const handleLogout = () => {
    
    localStorage.removeItem("currentUser");// remove user from storage
    setLoggedIn(null);// clear local state
    navigate("/"); // go back to landing page
  };
  // if user is already logged in, render the store component directly
  if (loggedIn) {
    return <Store user={loggedIn} onLogout={handleLogout} />;
  }

  return (
    <form onSubmit={submitHandler} className='form'>
      <h2>Login</h2>
      <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)} 
        className='form'
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        className='form'
      />
      <button type="submit" className='button'>Login</button>
      <button type="button" onClick={backHandler} className='button'> back</button>
    </form>
  );
}
