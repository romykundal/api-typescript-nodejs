import Agenda from "agenda";
import { Db } from "mongodb";
import config from "../config";

export default ({ mongoConnection }: { mongoConnection: Db }) => {
  return new Agenda({
    mongo: mongoConnection,
    db: { address: config.DB_URI }
  });
  /**
   * This voodoo magic is proper from agenda.js so I'm not gonna explain too much here.
   * https://github.com/agenda/agenda#mongomongoclientinstance
   */
};
