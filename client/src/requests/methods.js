import client from "./index";

const getToAndFromISODate = (startTime, endTime, date) => {
  const startTimeObj = new Date(date + " " + startTime);
  const endTimeObj = new Date(date + " " + endTime);
  const from = startTimeObj.toISOString();
  const to = endTimeObj.toISOString();
  return {from, to}
}

export const getAllParticipants = async () => {
  return await client.get('/users').then(res => res.data);
}

export const getAllInterviewsOnThisDay = async (date) => {
  return await client.post('/', { date }).then(res => res.data);
}

export const scheduleInterview = async (formData) => {
  return await client.post('/create', { formData }).then(res => res.data);
}

export const updateInterview = async ({id, formData}) => {
  return await client.put(`/${id}`, { formData }).then(res => res.data);
}
export const deleteInterview = async (id) => {
  return await client.delete(`/${id}`);
}

export const getAllInterviewsForAUserOnThisDay = async ({ids, date, startTime, endTime}) => {
  const {from, to} = getToAndFromISODate(startTime, endTime, date);
  return await client.post('/conflicts/', {ids, from, to}).then(res => res.data);
}

export const getAllInterviewsExceptOne = async ({id, ids, date, startTime, endTime}) => {
  const {from, to} = getToAndFromISODate(startTime, endTime, date);
  return await client.post(`/conflicts/${id}`, {ids, from, to}).then(res => res.data);
}

