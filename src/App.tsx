import React from 'react';
import { DataProvider } from './context/DataContext';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-gray-50">
        <Dashboard />
      </div>
    </DataProvider>
  );
}

export default App;