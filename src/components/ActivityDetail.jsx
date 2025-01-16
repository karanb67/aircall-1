import React, { useEffect, useState } from 'react';
import { fetchActivityDetail } from '../services/api';

const ActivityDetail = ({ callId, onClose }) => {
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCallDetail = async () => {
      try {
        const data = await fetchActivityDetail(callId);
        setCall(data);
      } catch (error) {
        console.error('Failed to fetch call detail:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCallDetail();
  }, [callId]);

  if (loading) return <div>Loading...</div>;
  if (!call) return <div>No call details found.</div>;

  return (
    <div className="call-detail">
      <h2>Call Details</h2>
      <p><strong>From:</strong> {call.from}</p>
      <p><strong>To:</strong> {call.to}</p>
      <p><strong>Via:</strong> {call.via}</p>
      <p><strong>Duration:</strong> {call.duration} seconds</p>
      <p><strong>Call Type:</strong> {call.call_type}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ActivityDetail;
