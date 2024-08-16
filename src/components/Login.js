// // // /client/src/components/Login.js
// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import '../styles/AuthStyles.css';

// // const Login = () => {
// //   return (
// //     <div className="auth-container">
// //       <div className="auth-box">
// //         <h2>Sign In</h2>
// //         <form>
// //           <input type="email" placeholder="Email" />
// //           <input type="password" placeholder="Password" />
// //           <button type="submit">Sign In</button>
// //         </form>
// //         <p>or</p>
// //         <a href="/auth/google">
// //           <button className="google-btn">Login with Google</button>
// //         </a>
// //         <p>
// //           Don't have an account? <Link to="/register">Sign Up</Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;
// // /client/src/components/Login.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/AuthStyles.css';

// const Login = () => {
//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Sign In</h2>
//         <form>
//           <input type="email" placeholder="Email" />
//           <input type="password" placeholder="Password" />
//           <button type="submit">Sign In</button>
//         </form>
//         <p>or</p>
//         <a href="/auth/google">
//           <button className="google-btn">Login with Google</button>
//         </a>
//         <p>
//           Don't have an account? <Link to="/register">Sign Up</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
// client/src/components/Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/AuthStyles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/login', { email, password }, { withCredentials: true });
      toast.success(res.data.message);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Sign In</button>
        </form>
        <p>or</p>
        <a href="http://localhost:5000/auth/google">
          <button className="google-btn">Login with Google</button>
        </a>
        <p>
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;