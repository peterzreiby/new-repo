import React, { useState } from 'react'
import { useInput } from '../hooks/useInput'
import { useNavigate } from 'react-router-dom';
import '../Styles/Register.css'
export function Register() {
    //to keep track of  registered users from the locla storage
    const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
    });

    const [firstname, bindfirstname, resetfirstname] = useInput('');
    const [lastname, bindlastname, resetlastname] = useInput('');
    const [role, bindRole, resetRole] = useInput('');
    const [PassWord, bindPassWord, resetPassWord] = useInput('');
    const [Email, bindEmail, resetEmail] = useInput('');
    //hook to navigate between the pages 
    const navigate=useNavigate();
    //handler for back button to navigate to the previous
    const backHandler=(e)=>{
        e.preventDefault();
        setUser(null);//clears the state of the current user
        navigate("/");//redirect to the landing page 
        window.location.reload();//forcing the page to reload
    }

    //handler for the form submit
    const submitHandler = (e) => {
        e.preventDefault();
        //getting all the exiting users from the local storage
        const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
        // Regex definitions
        const nameRegex = /^[A-Za-z]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        // Check if all fields are filled
        if (!firstname || !lastname || !role || !PassWord || !Email) {
            alert("Please fill in all fields before submitting!");
            return;
        }

        // Validate names
        if (!nameRegex.test(firstname)) {
            alert("Firstname must contain only letters!");
            return;
        }
        if (!nameRegex.test(lastname)) {
            alert("Lastname must contain only letters!");
            return;
        }

        // Validate email
        if (!emailRegex.test(Email)) {
            alert("Please enter a valid email address!");
            return;
        }
        //Check if email already exists in my local storage 
        const emailExists = savedUsers.some((user) => user.Email === Email);

        if (emailExists) {
            alert("This email is already registered. Please use another one or login.");
          
            return; //  rja3o la wara khallouna nehke dawle nehna hon 

        }


        // Validate password
        if (!passwordRegex.test(PassWord)) {
            alert("Password must be at least 8 characters, include 1 uppercase and 1 number!");
            return;
        }

        // creating a new user object
        const newUser = { firstname, lastname, Email, PassWord, role };
        
        setUser((prevUser) => {
            const updatedUsers = [...prevUser, newUser];
            localStorage.setItem("users", JSON.stringify(updatedUsers));
            return updatedUsers;
        });

        // Reset inputs after successfull registration
        resetfirstname();
        resetlastname();
        resetRole();
        resetPassWord();
        resetEmail();

        alert("User registered successfully!");
        // navigating to the login page directly after successful registration 
        navigate("/LoginPage")

    };


    return (
    <>
        <h1>Register Page</h1>
        <form onSubmit={submitHandler} className="form">
            <input type="text" placeholder="Firstname" {...bindfirstname}  className="form"/>
            <input type="text" placeholder="Lastname" {...bindlastname} className="form" />
            
            <select {...bindRole}>
                <option value="" disabled>Select Role</option>
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
            </select>
            
            <input type="email" placeholder="Email(eg user@example.com)" {...bindEmail} className="form"/>
            <input type="password" placeholder="Password" {...bindPassWord}  className="form"/>
            <button className="button">Submit</button>
            <button type="button" onClick={backHandler} className="button">back</button>
        </form>
    </>
    );
}
