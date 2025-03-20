import { BaseService } from "./BaseService";

export class EducationService extends BaseService {
  constructor() {
    super("/Education");
  }

  async getByUser(id){
    return await this.axiosInstance.get(`${this.requestMapping}/byUser/${id}`)
  }
}