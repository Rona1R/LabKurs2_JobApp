import { axiosInstance } from "./axioxInstance";

export class JobDetailsService{
    axiosInstance;
    requestMapping = "";
  
    constructor() {
      this.axiosInstance = axiosInstance;
      this.requestMapping = "JobDetails";
    }
  
    async create(data) {
      return await this.axiosInstance.post(this.requestMapping, data);
    }
  
    async update(id,data) {
      return await this.axiosInstance.put(this.requestMapping+`/${id}`, data);
    }
  
    async getByJob(id) {
      return await this.axiosInstance.get(`${this.requestMapping}/${id}`);
    }
  
    // async delete(id) {
    //   return await this.axiosInstance.delete(`${this.requestMapping}/${id}`);
    // }
}