import React from 'react';

function AdminView({ setView, handleLogout }) {
  return (
    <div className="app">
      <header className="header">
        <h1>Admin Dashboard</h1>
        <div className="header-right">
          <button onClick={() => setView('customer')} className="switch-btn">
            Customer View
          </button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>
      <div className="admin-main">
        <h2>Product Management</h2>
        <p>Admin features coming soon...</p>
      </div>
    </div>
  );
}

export default AdminView;