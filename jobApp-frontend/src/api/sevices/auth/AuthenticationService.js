import { axiosInstance } from "../axioxInstance";

export class AuthenticationService {
    axiosInstance;
    requestMapping = "";
  
    constructor() {
      this.axiosInstance = axiosInstance;
      this.requestMapping = "/Authentication";
    }
  
    async logIn(data) {
      return await this.axiosInstance.post(`${this.requestMapping}/login`, data);
    }

    async logOut(){
      return await this.axiosInstance.post(`${this.requestMapping}/logout`);    
    }

    
    async register(data) {
    return await this.axiosInstance.post(`${this.requestMapping}/create-account`, data);
    }
}