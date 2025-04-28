import { axiosInstance } from "./axioxInstance";

export class SavedJobService { 
    axiosInstance;
    requestMapping = "";
  
    constructor() {
      this.axiosInstance = axiosInstance;
      this.requestMapping = "/SavedJob";
    }

    async getSavedJobsByUser(userId){
        return await this.axiosInstance.get(`${this.requestMapping}/byUser/${userId}`);
    }
}