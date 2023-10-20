import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
//import { useMutation } from '@apollo/client';
//import LOGIN_MUTATION from './graphql/loginmutations'; // Import the login mutation
import logSvg from '../logo.svg';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  //const [loginMutation] = useMutation(LOGIN_MUTATION);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // const { data } = await loginMutation({
      //   variables: { email, password },
      // });
      try {
        const response = await fetch("/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }), // Include userType in the JSON data
        });
  
        if (response.ok) {
          let body = await response.json();
          sessionStorage.setItem("token", body.token)
          history.push("/");
        } else {
          console.log("Registration failed");
        }
      } catch (error) {
        console.log("Network error:", error);
      }

      // Assuming login is successful, redirect to another page
      history.push('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={logSvg} alt="Logo" style={{ width: '50%', height: 'auto' }} />
      </div>
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginBottom: '10px' }}
          />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <button onClick={() => history.push('/register')}>Register</button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;