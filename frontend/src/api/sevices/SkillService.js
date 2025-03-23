import { BaseService } from "./BaseService";

export class SkillService extends BaseService {
  constructor() {
    super("/Skill");
  }

  async getByUser(id){
    return await this.axiosInstance.get(`${this.requestMapping}/byUser/${id}`)
  }
}