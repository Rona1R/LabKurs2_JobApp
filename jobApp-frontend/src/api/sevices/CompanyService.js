import { BaseService } from "./BaseService";

export class CompanyService extends BaseService {
  constructor() {
    super("/Company");
  }

  async validate(name) {
    return await this.axiosInstance.get(`${this.requestMapping}/validate?name=${name}`);
  }

  async validateOnUpdate(id,name){
    return await this.axiosInstance.get(`${this.requestMapping}/validate/${id}?name=${name}`);
  }

  async getByEmployer(id){
    return await this.axiosInstance.get(`${this.requestMapping}/byEmployer/${id}`);
  }

}