import { axiosInstance } from "./axioxInstance";

export class UserProfileService{

    axiosInstance;
    requestMapping;

    constructor(){
        this.axiosInstance = axiosInstance;
        this.requestMapping = "/UserProfile";
    }

    async getById(id){
        return await this.axiosInstance.get(`${this.requestMapping}/${id}`);
    }

    async update(id,data) {
        return await this.axiosInstance.put(`${this.requestMapping}/${id}`,data);
    }

    // async post(data){
    //     return await this.axiosInstance.post(`${this.requestMapping}`,data);
    // }
    
}