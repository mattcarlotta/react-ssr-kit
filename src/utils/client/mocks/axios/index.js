import MockAdapter from "axios-mock-adapter";
import axios from "utils/client/axiosConfig";

const mockAxios = new MockAdapter(axios);

export default mockAxios;
