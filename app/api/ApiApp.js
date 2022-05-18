import APIKit from "./axiosApi";
import axios from "axios";
class ApiApp {

    static ApisType = (url, method = 'post', params = {}) => {
        switch (method) {
            case "post":
                return axios.post(url, params)
                break;
            case "get":
                return axios.get(url)
                break;
            case "delete":
                return axios.delete(url)
                break;
        }
    }

    //ILJ Apis
    static getHotels = () => {
        return ApiApp.ApisType('http://fake-hotel-api.herokuapp.com/api/hotels', 'get');
    }

    static getHotelsFilter = () => {
        //const search = store.getState().search;
        //console.log("APi buscadore","------->",search)
        return ApiApp.ApisType('http://fake-hotel-api.herokuapp.com/api/hotels', 'get');
    }



}

export default ApiApp;
