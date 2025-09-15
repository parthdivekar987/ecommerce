import { Grid, TextField, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../State/Auth/Action';

const LoginForm = () => {
  const dispatch=useDispatch();

    const navigate=useNavigate();

    
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Handling form submission...");

        const data=new FormData(event.currentTarget);

        const userData={

          email:data.get("email"),
          password:data.get("password")
        }
        dispatch(login(userData))
        console.log("UserData", userData)
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", gap: "1rem" }}>
          
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
            Login
          </Button>
        </div>
      </form>

       <div className="flex items-center justify-center py-3">
              <p className="text-sm text-gray-600">
                if you dont have Account?
              </p>
              <Button
                onClick={() => navigate("/register")}
                size="small"
                sx={{ marginLeft: '0.5rem' }}
              >
                Register
              </Button>
            </div>
        </div>
    );
};

export default LoginForm;

