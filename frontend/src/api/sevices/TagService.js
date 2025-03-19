import { BaseService } from "./BaseService";

export class TagService extends BaseService{
    constructor() {
        super("/Tag");
    }
}