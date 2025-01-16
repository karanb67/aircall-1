import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Tabs from './components/Tabs.jsx';
import ActivityFeed from './components/ActivityFeed.jsx';
import BottomNav from './components/BottomNav.jsx';
import './css/app.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('inbox');

  return (
    <div className="app">
      <Header />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <ActivityFeed activeTab={activeTab} />
      <BottomNav />
    </div>
  );
};

export default App;
