import axios from 'axios';

const BASE_URL = 'http://localhost:9000';

export const getAccount = () => axios.get(`${BASE_URL}/accounts`).then((res) => res.data);
export const getSubjects = () => axios.get(`${BASE_URL}/subjects`).then((res) => res.data);
export const getAccountById = (id) => axios.get(`${BASE_URL}/accounts/${id}`).then((res) => res.data);
export const getSubjectsById = (id) => axios.get(`${BASE_URL}/subjects/${id}`).then((res) => res.data);
export const addAccount = (course) => axios.post(`${BASE_URL}/accounts`, course).then((res) => res.data);
export const updateAccount = (id, course) =>
  axios.put(`${BASE_URL}/accounts/${id}`, course).then((res) => res.data);
export const deleteAccount = (id) => axios.delete(`${BASE_URL}/accounts/${id}`);
export const updateSubject = (id, subject) =>
  axios.put(`${BASE_URL}/subjects/${id}`, subject).then((res) => res.data);
export const deleteSubject = (id) => axios.delete(`${BASE_URL}/subjects/${id}`);
