import { Service, Inject } from "typedi";
import { ICity } from "../interfaces";
@Service()
export default class CityService {
  constructor(
    @Inject("cityModel") private cityModel: Models.CityModel
  ) {
  }

  public getCity(keyword:any) {
    let search = {};
    if(keyword && keyword !=""){
      search = {name: { $regex: '.*' + keyword + '.*' } }
    }
    
    const cities = this.cityModel.find(search);
    return cities;
  }

}
