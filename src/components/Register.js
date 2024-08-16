// // // /client/src/components/Register.js
// // import React from 'react';
// // import { Link } from 'react-router-dom';
// // import '../styles/AuthStyles.css';

// // const Register = () => {
// //   return (
// //     <div className="auth-container">
// //       <div className="auth-box">
// //         <h2>Sign Up</h2>
// //         <form>
// //           <input type="text" placeholder="First Name" />
// //           <input type="text" placeholder="Last Name" />
// //           <input type="email" placeholder="Email" />
// //           <input type="password" placeholder="Password" />
// //           <button type="submit">Sign Up</button>
// //         </form>
// //         <p>or</p>
// //         <a href="/auth/google">
// //           <button className="google-btn">Sign Up with Google</button>
// //         </a>
// //         <p>
// //           Already have an account? <Link to="/login">Sign In</Link>
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Register;
// // /client/src/components/Register.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../styles/AuthStyles.css';

// const Register = () => {
//   return (
//     <div className="auth-container">
//       <div className="auth-box">
//         <h2>Sign Up</h2>
//         <form>
//           <input type="text" placeholder="First Name" />
//           <input type="text" placeholder="Last Name" />
//           <input type="email" placeholder="Email" />
//           <input type="password" placeholder="Password" />
//           <button type="submit">Sign Up</button>
//         </form>
//         <p>or</p>
//         <a href="/auth/google">
//           <button className="google-btn">Sign Up with Google</button>
//         </a>
//         <p>
//           Already have an account? <Link to="/login">Sign In</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
// client/src/components/Register.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../styles/AuthStyles.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/auth/register', { firstName, lastName, email, password }, { withCredentials: true });
      toast.success(res.data.message);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">Sign Up</button>
        </form>
        <p>or</p>
        <a href="http://localhost:5000/auth/google">
          <button className="google-btn">Sign Up with Google</button>
        </a>
        <p>
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;