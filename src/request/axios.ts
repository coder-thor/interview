import axios, { AxiosRequestConfig, AxiosRequestHeaders } from "axios";

export const requestHeaders: AxiosRequestHeaders = {
	language: "zh_CN",
	"Content-Type": "application/json"
};

// axios请求配置
const requestConfig: AxiosRequestConfig = {
    baseURL: "http://3.141.23.218:5000",
    headers: requestHeaders,
    timeout: 30000,
	timeoutErrorMessage: "网络请求超时",
};

const axiosInstance = axios.create(requestConfig);


axiosInstance.interceptors.request.use((config) => {
    // 注入token
    config.data = {
        ...config.data,
        "login_token":"INTERVIEW_SIMPLY2021"
    }
    return config;
})

axiosInstance.interceptors.response.use(resp => {
    const { status, data } = resp;
    if (status !== 200) {
        alert("请求出错");
        return;
    }
    return data.data;
})

export default axiosInstance;