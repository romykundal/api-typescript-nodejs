import { NextFunction, Request, Response } from "express";
import { ISortation } from "../../interfaces";
import {SortationOrderTypes} from "../../models/enums"

const sortedResults = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqQuery = { ...req.query };

    const removeFields = ["order", "orderBy"];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    const sortParams: ISortation = {
      order: <SortationOrderTypes>req.query.order,
      orderBy: <string>req.query.orderBy
    };

    req["sortParams"] = sortParams;
    return next();
  } catch (e) {
    return next(e);
  }
};

export default sortedResults;
