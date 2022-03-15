import { NextFunction, Request, Response } from "express";
import { IPagination } from "../../interfaces";

const paginatedResults = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const reqQuery = { ...req.query };

    const removeFields = ["page", "limit"];

    // Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    const pageParams: IPagination = {
      page: +req.query.page || 1,
      limit: +req.query.limit || 25
    };

    req["pageParams"] = pageParams;

    return next();
  } catch (e) {
    return next(e);
  }
};

export default paginatedResults;
