import React from 'react';
import { UserDashboard } from './features/users';

function App() {
  return (
    <div style={appStyle}>
      <UserDashboard />
    </div>
  );
}

const appStyle = {
  backgroundColor: '#09090a',
  minHeight: '100vh',
  padding: '2rem 1rem',
  display: 'flex',
  flexDirection: 'column',
};

export default App;
