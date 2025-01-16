import React from 'react';
import '../css/tabs.css';

const Tabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="tabs">
      <button
        className={`tab ${activeTab === 'inbox' ? 'active' : ''}`}
        onClick={() => onTabChange('inbox')}
      >
        Inbox
      </button>
      <button
        className={`tab ${activeTab === 'archived' ? 'active' : ''}`}
        onClick={() => onTabChange('archived')}
      >
        All Calls
      </button>
    </div>
  );
};

export default Tabs;
