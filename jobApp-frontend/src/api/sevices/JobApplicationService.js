import { BaseService } from "./BaseService";

export class JobApplicationService extends BaseService {
  constructor() {
    super("/JobApplication");
  }

  async hasApplied(userId,jobId){
    return await this.axiosInstance.get(`${this.requestMapping}/hasApplied/${userId}/${jobId}`)
  }

  async getByJob(jobId){
    return await this.axiosInstance.get(`${this.requestMapping}/byJob/${jobId}`);
  }

  async getApplicationsByEmployer(employerId, params = {}) {
    return await this.axiosInstance.get(
      `${this.requestMapping}/byEmployer/${employerId}`,
      { params }
    );
  }

  async getApplicationsByApplicant(applicantId, params = {}) {
    return await this.axiosInstance.get(
      `${this.requestMapping}/byApplicant/${applicantId}`,
      { params }
    );
  }

  async getJobsAppliedByUser(applicantId){
    return await this.axiosInstance.get(
      `${this.requestMapping}/jobs/${applicantId}`
    );
  }

  async getCompaniesUserAppliedTo(applicantId){
    return await this.axiosInstance.get(
      `${this.requestMapping}/companies/${applicantId}`
    );
  }
}