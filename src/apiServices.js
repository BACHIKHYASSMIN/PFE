// src/services/apiService.js
import axios from 'axios';

const API_URL = 'http://localhost:2000/api';

const getMonuments = async () => {
  try {
    const response = await axios.get(`${API_URL}/MonumentData`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
 export { getMonuments};

 const getPlaces = async () => {
  try {
    const response = await axios.get(`${API_URL}/PlaceData`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
 export { getPlaces};

const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/ProductData`);
    return  response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export {getProducts}

const getBuildings = async () => {
  try {
    const response = await axios.get(`${API_URL}/BuildingData`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export {getBuildings}

const getMaterials = async () => {
  try {
    const response = await axios.get(`${API_URL}/MaterialData`);
    return  response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export {getMaterials}

const getNodes = async () => {
  try {
    const response = await axios.get(`${API_URL}/node`);
    return  response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export {getNodes};

const getGraph = async () => {
  try {
    const response = await axios.get(`${API_URL}/nodes`);
    return  response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export {getGraph};

const getAllData = async () => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return  response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export {getAllData};

const getPeriodes = async () => {
  try {
    const response = await axios.get(`${API_URL}/PeriodeData`);
    return  response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export {getPeriodes};

const getColors = async () => {
  try {
    const response = await axios.get(`${API_URL}/ColorsData`);
    return  response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
export {getColors };

