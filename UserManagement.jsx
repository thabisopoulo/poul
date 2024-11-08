// src/components/UserManagement.js
import React, { useState } from 'react';

const UserManagement = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);

    const addUser = () => {
        if (!username || !password) return;
        const newUser = { id: Date.now(), username, password }; // Simple user structure
        setUsers([...users, newUser]);
        setUsername('');
        setPassword('');
    };

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div>
            <h1>User Management</h1>
            <div>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={addUser}>Add User</button>
            </div>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username}
                        <button onClick={() => deleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;
