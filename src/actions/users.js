import API from "utils/client/axiosConfig";

/**
 * @function createUser - attempts to create a new user in DB.
 * @returns {promise}
 */
export const createUser = ({ formProps }) => () =>
  API.post("users/create", { ...formProps });

/**
 * @function deleteUser - attempts to delete a user from DB.
 * @returns {promise}
 */
export const deleteUser = id => () => API.delete(`users/delete/${id}`);

/**
 * @function fetchUsers - attempts to fetchUsers users from DB.
 * @returns {promise}
 */
export const fetchUsers = () => () => API.get("users");

/**
 * @function updateUser - attempts to update a current user in DB.
 * @returns {promise}
 */
export const updateUser = ({ formProps, id }) => () =>
  API.put(`users/update/${id}`, { ...formProps });

/**
 * @function seedDB - attempts to seed the DB with data.
 * @returns {promise}
 */
export const seedDB = () => () => API.post("users/seed");
