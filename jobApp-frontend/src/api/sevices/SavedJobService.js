import { axiosInstance } from "./axioxInstance";

export class SavedJobService {
  axiosInstance;
  requestMapping = "";

  constructor() {
    this.axiosInstance = axiosInstance;
    this.requestMapping = "/SavedJob";
  }

  async create(data){
    return await this.axiosInstance.post(`${this.requestMapping}`,data);
  }

  async getSavedJobsByUser(userId) {
    return await this.axiosInstance.get(
      `${this.requestMapping}/byUser/${userId}`
    );
  }

  async unsaveJob(savedJobId) {
    return await this.axiosInstance.delete(
      `${this.requestMapping}/${savedJobId}`
    );
  }

  async unsaveJobByUserAndJob(userId,jobId)
  {
    return await this.axiosInstance.delete(`${this.requestMapping}/byUserAndJob/${userId}/${jobId}`)
  }

  async isJobSaved(userId,jobId){
    return await this.axiosInstance.get(
      `${this.requestMapping}/isSaved/${userId}/${jobId}`
    );
  }

  async addToCollection(userId,jobId,collectionId){
    return await this.axiosInstance.put(`${this.requestMapping}/addToCollection/${userId}/${jobId}/${collectionId}`)
  }
}
