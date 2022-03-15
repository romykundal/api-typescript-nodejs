import { NextFunction, Request, Response } from "express";

const selectedResults = () => async (req: Request, res: Response, next: NextFunction) => {
  const reqQuery = { ...req.query };

  const removeFields = ["select"];

  // Loop over removeFields and delete them from reqQuery
  removeFields.forEach((param) => delete reqQuery[param]);

  //Create Query String
  let queryStr = JSON.stringify(reqQuery);

  // Create opertors ($gt, $gte, etc)
  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  req.query = JSON.parse(queryStr);

  let selectParams;

  selectParams = {
    select: <string>req.query.select
  };

  req["selectParams"] = selectParams;
  next();
};

export default selectedResults;
