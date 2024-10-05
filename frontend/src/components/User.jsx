import React from 'react';

function User({ users }) {
  return (
    <div className="flex flex-col p-4">
      <h2 className="text-lg font-bold mb-2">Connected Users</h2>
      <ul className="list-none">
        {users.map((user) => (
          <li key={user.id} className="py-1">
            {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default User;