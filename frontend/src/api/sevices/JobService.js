import { BaseService } from "./BaseService";

export class JobService extends BaseService{
    constructor() {
        super("/Job");
    }

    async getPostingsWithFilters(params = {}) {
      const queryString = Object.entries(params).reduce((accumulator, [key, value]) => {
          if (Array.isArray(value)) {
              value.forEach(item => accumulator.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`));
          } else {
            if (typeof value === 'string' && value.trim() !== "") {
                accumulator.push(`${encodeURIComponent(key)}=${encodeURIComponent(value.trim())}`);
            }
            // Handle cases where value might be a non-string (like numbers or booleans)
            else if (value !== undefined && value !== null && typeof value !== 'string') {
                accumulator.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
            }
          }
          return accumulator;
      }, []).join('&');
      return await this.axiosInstance.get(`${this.requestMapping}/filteredPosts?${queryString}`);
  }
}