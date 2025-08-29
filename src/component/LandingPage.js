import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Styles/Register.css'
export default function LandingPage() {
    const navigate = useNavigate();
    const [hasUsers, setHasUsers] = useState(false);

    useEffect(() => {
        //getting the saved users from the localstorage (eza ma fi return an empty array)
        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
        //this step prevents my app from the endless redirect to the register page 
        const firstVisit = localStorage.getItem("firstVisit");

        // if no users exist and it's the very first visit
        if (savedUsers.length === 0 && !firstVisit) {
            // mark that we've already redirected once
            localStorage.setItem("firstVisit", "true");
            //navigate to the register page
            navigate("/register");
        } else {
            // otherwise, update state to indicate whether users exist
            setHasUsers(savedUsers.length > 0);
        }
    }, [navigate]);//if navigate function reference changes the useEffect rerun again

    return (
        <div>
            <div className='landing'>
            <h1 className="Greet">Welcome to My App</h1>
            <p className="option">Please choose an option:</p>
            
                <button onClick={() => navigate("/register")} className='button2'>Register</button>
                <button onClick={() => navigate("/LoginPage")} className='button2'>Login</button>
            </div>
        </div>
    );
}
