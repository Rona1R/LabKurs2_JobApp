import { BaseService } from "./BaseService";

export class UserLanguageService extends BaseService {
  constructor() {
    super("/UserLanguage");
  }

  async getByUser(id){
    return await this.axiosInstance.get(`${this.requestMapping}/byUser/${id}`)
  }
}