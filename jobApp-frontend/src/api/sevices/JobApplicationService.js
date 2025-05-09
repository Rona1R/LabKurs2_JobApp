import { BaseService } from "./BaseService";

export class JobApplicationService extends BaseService {
  constructor() {
    super("/JobApplication");
  }
}