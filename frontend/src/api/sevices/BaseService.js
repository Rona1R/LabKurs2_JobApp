
import { axiosInstance } from "./axioxInstance";

export class BaseService {
    axiosInstance;
    requestMapping = "";
  
    constructor(requestMapping) {
      this.axiosInstance = axiosInstance;
      this.requestMapping = requestMapping;
    }
  
    async create(data) {
      return await this.axiosInstance.post(this.requestMapping, data);
    }
  
    async update(id,data) {
      return await this.axiosInstance.put(this.requestMapping+`/${id}`, data);
    }
  
    async getAll() {
      return await this.axiosInstance.get(`${this.requestMapping}`);
    }
  
    async getById(id) {
      return await this.axiosInstance.get(`${this.requestMapping}/${id}`);
    }
  
    async delete(id) {
      return await this.axiosInstance.delete(`${this.requestMapping}/${id}`);
    }
}