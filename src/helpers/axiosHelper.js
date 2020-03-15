import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

/**
 * Gets the headers.
 *
 */
const getHeaders = () => {
    let authToken = localStorage.auth_token ? localStorage.auth_token : null;

    let config = {
        headers: {
            Authorization: authToken,
        },
    };
    return authToken ? config : {};
};

const checkError = error => {};

/**
 * Get call from Axios
 *
 * @param      {String}  url
 * @return     {Promise}
 */
const axiosGet = async url => {
    try {
        return await axios.get(`${BASE_URL}/${url}`, getHeaders());
    } catch (error) {
        checkError(error);
        throw error.response.data;
    }
};
/**
 * Post request from axios
 *
 * @param      {(Array|Object)}  data
 * @param      {String}          url
 * @return     {Promise}
 */
const axiosPost = async (data, url) => {
    try {
        return await axios.post(`${BASE_URL}/${url}`, data, getHeaders());
    } catch (error) {
        checkError(error);
        throw error.response.data;
    }
};

/**
 * Update request from axios.
 *
 * @param      {(Object|Array)}  data
 * @param      {String}          url
 * @return     {Promise}
 */
const axiosPut = async (data, url) => {
    try {
        return await axios.put(`${BASE_URL}/${url}`, data, getHeaders());
    } catch (error) {
        checkError(error);
        throw error.response.data;
    }
};

/**
 * Save request from axios
 *
 * @param      {Object}  oldTask
 * @param      {Object}  newTask
 * @param      {String}  url
 */
const axiosSave = async (oldTask, newTask, url) => {
    try {
        await axios.put(
            `${BASE_URL}/${url}`,
            {
                id: oldTask.id,
                task: newTask,
            },
            getHeaders(),
        );
    } catch (error) {
        checkError(error);
        throw error.response.data;
    }
};

/**
 * Delete call from axios
 *
 * @param      {Object}  taskToDelete
 * @param      {String}  url
 * @return     {Promise}
 */
const axiosDelete = async (taskToDelete, url) => {
    return axios
        .delete(`${BASE_URL}/${url}/${taskToDelete.id}`, getHeaders())
        .then(function(response) {})
        .catch(function(error) {});
};

export { axiosGet, axiosPost, axiosDelete, axiosSave, axiosPut };
