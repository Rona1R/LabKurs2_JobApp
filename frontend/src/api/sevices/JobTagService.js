import { BaseService } from "./BaseService";

export class JobTagService extends BaseService{
    constructor() {
        super("/JobTag");
    }

    async getTagsByJob(jobId){
        return await this.axiosInstance.get(`${this.requestMapping}/getByJob/${jobId}`);
    }

    async addJobTags(data){
        return await this.axiosInstance.post(`${this.requestMapping}/addJobTags`,data);
    }
}