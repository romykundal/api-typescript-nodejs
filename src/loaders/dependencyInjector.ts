import { Container } from "typedi";
import LoggerInstance from "./logger";
import agendaFactory from "./agenda";
import config from "../config";
import { Db } from "mongodb";

export default ({ mongoConnection, models }: { mongoConnection: Db; models: { name: string; model: any }[] }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    const agendaInstance = agendaFactory({ mongoConnection });

    Container.set("logger", LoggerInstance);

    LoggerInstance.info("✌️ Agenda injected into container");

    return { agenda: agendaInstance };
  } catch (e) {
    LoggerInstance.error("🔥 Error on dependency injector loader: %o", e);
    throw e;
  }
};
