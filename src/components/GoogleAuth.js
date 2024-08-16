// /client/src/components/GoogleAuth.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoogleAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get('http://localhost:5000/api/current_user');
      setUser(response.data);
    };

    fetchUser();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user.firstName}!</h2>
          <a href="/api/logout">Logout</a>
        </div>
      ) : (
        <div>
          <a href="/auth/google">Login with Google</a>
        </div>
      )}
    </div>
  );
};

export default GoogleAuth;