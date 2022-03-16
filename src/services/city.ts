import { Service, Inject } from "typedi";
import { ICity } from "../interfaces";
@Service()
export default class CityService {
  constructor(
    @Inject("cityModel") private cityModel: Models.CityModel
  ) {
  }

  public getCity(keyword: any) {
    let search: any;
    let arrayOfKeyword = [];
    if (keyword && keyword != "") {

      if (keyword.indexOf(',') > -1) {
        arrayOfKeyword = keyword.split(',');
        search = {
          $match: {
            $and: [
              { name: { '$regex': arrayOfKeyword[0], '$options': 'i' } },
              { state: { '$regex': arrayOfKeyword[1], '$options': 'i' } }
            ]
          }
        }

      } else {
        search = {
          $match: {
            $or: [
              { name: { '$regex': keyword, '$options': 'i' } },
              { state: { '$regex': keyword, '$options': 'i' } }
            ]
          }
        }

      }

    }

    let query = [
      search,
      {
        $project: {
          _id: 1,
          flips: '$flips',
          name: '$name',
          state: '$state'
        }
      }
    ];

    const cities = this.cityModel.aggregate(query);
    return cities;
  }
}
