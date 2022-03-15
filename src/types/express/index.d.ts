import { Document, Model } from "mongoose";
import { ICity} from "../../interfaces";

declare global {
  namespace Express {
    export interface Request {
      
    }
  }
  namespace Models {
    export type CityModel = Model<ICity>;
  }
}
