import { BaseService } from "./BaseService";

export class SavedJobCollectionService extends BaseService {
  constructor() {
    super("/SavedJobCollection");
  }

  async getCollectionsByUser(userId) {
    return await this.axiosInstance.get(`${this.requestMapping}/byUser/${userId}`);
  }

  async getPostsByCollection(collectionId){
    return await this.axiosInstance.get(`${this.requestMapping}/savedPostsByCollection/${collectionId}`);
  }
}