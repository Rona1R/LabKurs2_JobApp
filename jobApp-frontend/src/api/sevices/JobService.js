import { BaseService } from "./BaseService";

export class JobService extends BaseService {
  constructor() {
    super("/Job");
  }

  async getByEmployer(id) {
    return await this.axiosInstance.get(
      `${this.requestMapping}/byEmployer/${id}`
    );
  }

  async getPostingsWithFilters(params = {}) {
    const queryString = Object.entries(params)
      .reduce((accumulator, [key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) =>
            accumulator.push(
              `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
            )
          );
        } else {
          if (typeof value === "string" && value.trim() !== "") {
            accumulator.push(
              `${encodeURIComponent(key)}=${encodeURIComponent(value.trim())}`
            );
          }
          // Handle cases where value might be a non-string (like numbers or booleans)
          else if (
            value !== undefined &&
            value !== null &&
            typeof value !== "string"
          ) {
            accumulator.push(
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            );
          }
        }
        return accumulator;
      }, [])
      .join("&");
    return await this.axiosInstance.get(
      `${this.requestMapping}/filteredPosts?${queryString}`
    );
  }

  async getPostingsByCategory(categoryId, params = {}) {
    const queryString = Object.entries(params)
      .reduce((accumulator, [key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) =>
            accumulator.push(
              `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
            )
          );
        } else {
          if (typeof value === "string" && value.trim() !== "") {
            accumulator.push(
              `${encodeURIComponent(key)}=${encodeURIComponent(value.trim())}`
            );
          }
          // Handle cases where value might be a non-string (like numbers or booleans)
          else if (
            value !== undefined &&
            value !== null &&
            typeof value !== "string"
          ) {
            accumulator.push(
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            );
          }
        }
        return accumulator;
      }, [])
      .join("&");
    return await this.axiosInstance.get(
      `${this.requestMapping}/byCategory/${categoryId}?${queryString}`
    );
  }

  async getPostingsByTag(tagId, params = {}) {
    const queryString = Object.entries(params)
      .reduce((accumulator, [key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) =>
            accumulator.push(
              `${encodeURIComponent(key)}=${encodeURIComponent(item)}`
            )
          );
        } else {
          if (typeof value === "string" && value.trim() !== "") {
            accumulator.push(
              `${encodeURIComponent(key)}=${encodeURIComponent(value.trim())}`
            );
          }
          // Handle cases where value might be a non-string (like numbers or booleans)
          else if (
            value !== undefined &&
            value !== null &&
            typeof value !== "string"
          ) {
            accumulator.push(
              `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            );
          }
        }
        return accumulator;
      }, [])
      .join("&");
    return await this.axiosInstance.get(
      `${this.requestMapping}/byTag/${tagId}?${queryString}`
    );
  }

  async getMaxSalary() {
    return await this.axiosInstance.get(`${this.requestMapping}/maxSalary`);
  }

  async getMaxSalaryByCategory(categoryId) {
    return await this.axiosInstance.get(
      `${this.requestMapping}/maxSalary/byCategory/${categoryId}`
    );
  }

  async getMaxSalaryByTag(tagId) {
    return await this.axiosInstance.get(
      `${this.requestMapping}/maxSalary/byTag/${tagId}`
    );
  }

  async getDetails(id) {
    return await this.axiosInstance.get(`${this.requestMapping}/details/${id}`);
  }

  async getSimilarPostings(id) {
    return await this.axiosInstance.get(
      `${this.requestMapping}/similarPostings/${id}`
    );
  }
}
