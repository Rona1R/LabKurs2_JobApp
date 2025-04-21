import { BaseService } from "./BaseService";

export class InstitutionService extends BaseService {
  constructor() {
    super("/Institutions");
  }
}