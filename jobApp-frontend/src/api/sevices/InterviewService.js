import { BaseService } from "./BaseService";

export class InterviewService extends BaseService {
  constructor() {
    super("/Interview");
  }

  async getByEmployer(userId){
    return await this.axiosInstance.get(`${this.requestMapping}/byEmployer/${userId}`);
  }
}