import { BaseService } from "./BaseService";

export class JobApplicationService extends BaseService {
  constructor() {
    super("/JobApplication");
  }

  async hasApplied(userId,jobId){
        return await this.axiosInstance.get(`${this.requestMapping}/hasApplied/${userId}/${jobId}`)
  }
}