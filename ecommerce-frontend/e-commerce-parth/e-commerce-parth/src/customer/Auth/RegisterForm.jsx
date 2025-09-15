import { Grid, TextField, Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { getUser, register } from '../../State/Auth/Action';
import { store } from '../../State/store';

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const jwt=localStorage.getItem("jwt")
  const {auth}=useSelector(store=>store)

useEffect(()=>
{
  if(jwt)
  {
     dispatch(getUser(jwt))
  }
  },[jwt,auth.jwt])


 


  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Handling form submission...");

    const data = new FormData(event.currentTarget);

    const userData = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password")
    }
    dispatch(register(userData))
    console.log("UserData", userData)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flex: 1 }}>
            <TextField
              required
              id="firstName"
              name="firstName"
              label="First Name"
              fullWidth
              autoComplete="given-name"
            />
          </div>
          <div style={{ flex: 1 }}>
            <TextField
              required
              id="lastName"
              name="lastName"
              label="Last Name"
              fullWidth
              autoComplete="family-name"
            />
          </div>
        </div>
        <div>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            autoComplete="email"
            style={{ marginTop: "1rem" }}
          />
        </div>
        <div>
          <TextField
            required
            id="password"
            name="password"
            label="Password"
            fullWidth
            autoComplete="new-password"
            style={{ marginTop: "1rem" }}
          />
        </div>
        <div>
          <Button
            className="w-full bg-indigo-700 text-white p-2 my-4 rounded-lg"
            variant="contained"
            type="submit"
            size="large"
            sx={{
              padding: ".8rem 0",
              marginTop: "1rem",
              backgroundColor: "#9155FD",
            }}
          >
            Register
          </Button>
        </div>
      </form>

      <div className="flex items-center justify-center py-3">
        <p className="text-sm text-gray-600">
          if you have an account already?
        </p>
        <Button
          onClick={() => navigate("/login")}
          size="small"
          sx={{ marginLeft: '0.5rem' }}
        >
          Login
        </Button>
      </div>



    </div>
  );
};

export default RegisterForm;

