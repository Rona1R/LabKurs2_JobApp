import { axiosInstance } from "./axioxInstance";

export class UserService{

    axiosInstance;
    requestMapping;

    constructor(){
        this.axiosInstance = axiosInstance;
        this.requestMapping = "/User";
    }
    async getAll(){
        return await this.axiosInstance.get(this.requestMapping);
    }
    
    async getAllWithRoles(){
        return await this.axiosInstance.get(`${this.requestMapping}/WithRoles`);
    }

    async getById(id){
        return await this.axiosInstance.get(`${this.requestMapping}/${id}`);
    }

    async update(id,data) {
        return await this.axiosInstance.put(`${this.requestMapping}/${id}`,data);
    }

    
}