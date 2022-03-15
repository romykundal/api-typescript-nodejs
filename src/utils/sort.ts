import { Service } from "typedi";
import { ISortation } from "../interfaces";

@Service()
export default class SortClient {
  constructor() { }

  public toSort(modelQuery, sortRules: ISortation) {
    if (sortRules.orderBy) {
      const sortBy = (sortRules.orderBy as string)
        .split(",")
        .map(v => sortRules.order == "ascend" ? `${v}` : `-${v}`)
        .join(" ");
      modelQuery = modelQuery.sort(sortBy);
    } else {
      modelQuery = modelQuery.sort("-createdAt");
    }

    return modelQuery;
  }
}
