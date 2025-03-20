import { BaseService } from "./BaseService";

export class LanguageService extends BaseService {
  constructor() {
    super("/Language");
  }
}