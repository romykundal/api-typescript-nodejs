import { Router, Request, Response, NextFunction } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import { Container } from "typedi";
import { City } from "../../services";
import { SortClient, PaginateClient } from "../../utils";

import { asyncHandler, sorter, paginator } from "../middlewares";
import { IPagination, ISortation, SortationOrderTypesEnum } from "../../interfaces";

const route = Router();

export default (app: Router) => {
  app.use("/cities", route);

  route.get("",
    celebrate({
      [Segments.QUERY]: Joi.object({
        order: Joi.string().valid(...SortationOrderTypesEnum).optional().label("Sort Order"),
        orderBy: Joi.string().optional().label("Sort By"),
        page: Joi.string().optional().label("Page Number"),
        limit: Joi.string().optional().label("Page Limit"),
        searchKeyword: Joi.string().optional().label("keyword for city name")
      })
    }),
    sorter,
    paginator,
    asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
      
      const cityService = Container.get(City);
      const sortInstance = Container.get(SortClient);
      const paginateInstance = Container.get(PaginateClient);
      const sortFields: ISortation = req["sortParams"];
      const paginateFields: IPagination = req["pageParams"];
      let keyword = req.query.searchKeyword;
      const cityDataQuery = cityService.getCity(keyword);
      const sortedCityDataQuery = sortInstance.toSort(cityDataQuery, sortFields);
      const paginatedUsersData = await paginateInstance.toPage(sortedCityDataQuery, paginateFields);
      return res.status(200).json(paginatedUsersData);
    })
  );

};
