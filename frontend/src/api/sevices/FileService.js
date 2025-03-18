import { axiosInstance } from "./axioxInstance";

export class FileService{
    axiosInstance;
    requestMapping = "";
  
    constructor() {
      this.axiosInstance = axiosInstance;
      this.requestMapping = "/Uploads";
    }
    
    async create(data, fileType) {
      return await this.axiosInstance.post(`${this.requestMapping}/upload?fileType=${fileType}`, data);
    }
    
    async delete(fileName, fileType) {
      return await this.axiosInstance.delete(`${this.requestMapping}/delete/${fileName}?fileType=${fileType}`);
    }
}