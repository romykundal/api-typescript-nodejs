import { Service } from "typedi";
import { IPagination, IRecords } from "../interfaces";

@Service()
export default class PaginateClient {
  constructor() { }

  public async toPage(modelQuery, paginateRules: IPagination) {
    const page = paginateRules.page;
    const limit = paginateRules.limit;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = (await modelQuery).length;

    modelQuery = modelQuery.skip(startIndex).limit(limit);

    // executing query
    const results = await modelQuery;

    const Pagination: IRecords = {
      page,
      count: results.length,
      totalCount: total,
      totalPages: Math.ceil(total / limit),
      records: results
    };

    return Pagination;
  }
}
