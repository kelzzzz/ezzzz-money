import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
  };

  return isLoggedIn
    ? <Dashboard onLogout={handleLogout} />
    : <Login onLogin={() => setIsLoggedIn(true)} />;
}

export default App;