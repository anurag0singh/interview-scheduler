import client from "./index";

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

export const getAllInterviewsForAUserOnThisDay = async ({id, date, startTime, endTime}) => {
  const startTimeObj = new Date(date + " " + startTime);
  const endTimeObj = new Date(date + " " + endTime);
  const start = startTimeObj.toISOString();
  const end = endTimeObj.toISOString();
  console.log(id, date, startTime, endTime);
  return await client.post('/conflicts', {id, start, end}).then(res => res.data);
}