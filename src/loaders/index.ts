import expressLoader from "./express";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import Logger from "./logger";
//We have to import at least all the events once so they can be triggered
import "./events";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info("✌️ DB loaded and connected!");

  const cityModel = {
    name: "cityModel",
    model: (await import("../models/city")).default
  };

  // It returns the agenda instance because it's needed in the subsequent loaders
  const { agenda } = dependencyInjectorLoader({
    mongoConnection,
    models: [
      cityModel
    ],
  });
  Logger.info("✌️ Dependency Injector loaded");

  expressLoader({ app: expressApp });
  Logger.info("✌️ Express loaded");
};
