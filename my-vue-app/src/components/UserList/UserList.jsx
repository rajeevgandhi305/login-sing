import React, { useState, useEffect } from 'react';
import axios from 'axios';

// import'./UserList.css';

function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('jwtToken'));

  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) {
        setError('Authentication token not found');
        return;
      }

      try {
        const response = await axios.get('http://localhost:4446/api/getallUser', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsers(response.data);
        setError(null);
      } catch (error) {
        setError('Error fetching user data');
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('jwtToken', newToken);
  };

  return (
    <div>
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div>
          <h2>User List</h2>
          {error && <p>{error}</p>}
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <div className='AllUserList'>
                <p>ID: {user.id}</p>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Age: {user.age}</p>
                <p>Role: {user.roles}</p>
                </div>
              </li>
              
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserList;
