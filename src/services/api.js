import axios from 'axios';

const API_BASE_URL = 'https://aircall-api.onrender.com';

export const fetchActivities = async () => {
  const response = await axios.get(`${API_BASE_URL}/activities`);
  return response.data;
};

export const updateActivity = async (id, isArchived) => {
  await axios.patch(`${API_BASE_URL}/activities/${id}`, { is_archived: isArchived });
};

export const resetActivities = async () => {
  await axios.patch(`${API_BASE_URL}/reset`);
};
