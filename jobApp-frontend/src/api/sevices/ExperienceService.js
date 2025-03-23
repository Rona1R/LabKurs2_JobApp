import { BaseService } from "./BaseService";

export class ExperienceService extends BaseService {
  constructor() {
    super("/Experience");
  }

  async getByUser(id){
    return await this.axiosInstance.get(`${this.requestMapping}/byUser/${id}`)
  }
}