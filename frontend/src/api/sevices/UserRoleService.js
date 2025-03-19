import { axiosInstance } from "./axioxInstance";

export class UserRoleService {
  axiosInstance;
  requestMapping;

  constructor() {
    this.axiosInstance = axiosInstance;
    this.requestMapping = "/UserRole";
  }

  async create(userId, role) {
    return await this.axiosInstance.post(
      `${this.requestMapping}?userId=${userId}&role=${role}`
    );
  }

  async delete(userId, role) {
    return await this.axiosInstance.delete(
      `${this.requestMapping}?userId=${userId}&role=${role}`
    );
  }
}
