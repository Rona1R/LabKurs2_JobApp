import { axiosInstance } from "./axioxInstance";

export class UserService{

    axiosInstance;
    requestMapping;

    constructor(){
        this.axiosInstance = axiosInstance;
        this.requestMapping = "/User";
    }

    async getAllWithRoles(){
        return await this.axiosInstance.get(`${this.requestMapping}/WithRoles`);
    }
    
}