import React, { useEffect, useState } from 'react';
import { fetchActivities, updateActivity } from '../services/api';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import '../css/activityFeed.css';

const ActivityFeed = ({ activeTab }) => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCalls = async () => {
      setLoading(true);
      try {
        const data = await fetchActivities();
        setCalls(data);
      } catch (error) {
        console.error('Error fetching activities:', error);
      } finally {
        setLoading(false);
      }
    };
    loadCalls();
  }, []);

  const handleArchiveToggle = async (id, isArchived) => {
    await updateActivity(id, !isArchived);
    setCalls((prevCalls) =>
      prevCalls.map((call) =>
        call.id === id ? { ...call, is_archived: !isArchived } : call
      )
    );
  };

  const handleBulkAction = async () => {
    const isArchiving = activeTab === 'inbox';
    for (const call of calls) {
      if (call.is_archived !== isArchiving) {
        await updateActivity(call.id, isArchiving);
      }
    }

    setCalls((prevCalls) =>
      prevCalls.map((call) =>
        call.is_archived !== isArchiving ? { ...call, is_archived: isArchiving } : call
      )
    );
  };

  const groupByDate = (calls) => {
    const grouped = {};
    calls.forEach((call) => {
      const date = new Date(call.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(call);
    });
    return grouped;
  };

  const filteredCalls = calls.filter(
    (call) => call.is_archived === (activeTab === 'archived')
  );

  const groupedCalls = groupByDate(filteredCalls);

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="activity-feed">
      <Button
        variant={activeTab === 'inbox' ? 'danger' : 'success'}
        className="bulk-action-btn mb-3"
        onClick={handleBulkAction}
      >
        {activeTab === 'inbox' ? 'Archive All Calls' : 'Unarchive All Calls'}
      </Button>
      {Object.entries(groupedCalls).map(([date, calls]) => (
        <div key={date}>
          <h6 className="date-header">{date}</h6>
          {calls.map((call) => (
            <div
              key={call.id}
              className={`call-card ${
                call.call_type === 'missed' ? 'missed-call' : ''
              }`}
            >
              <div className="call-info">
                <FontAwesomeIcon
                  icon={faPhoneAlt}
                  className={`call-icon ${
                    call.direction === 'inbound' ? 'inbound' : 'outbound'
                  }`}
                />
                <div className="call-details">
                  <strong>{call.from}</strong>
                  <small>{call.direction === 'inbound' ? 'Incoming' : 'Outgoing'}</small>
                </div>
              </div>
              <div className="call-time">
                {new Date(call.created_at).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
              <Button
                variant={call.is_archived ? 'danger' : 'primary'}
                onClick={() => handleArchiveToggle(call.id, call.is_archived)}
              >
                {call.is_archived ? 'Unarchive' : 'Archive'}
              </Button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ActivityFeed;
