import { Router } from "express";
import { city } from "./routes";

// guaranteed to get dependencies
export default () => {
  const app = Router();

  city(app);
  // routeNotFound(app);
  return app;
};
