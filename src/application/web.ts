import expres from "express";
import { publicRouter } from "../routes/public-api";
import { errMiddleware } from "../middlerware/error-middleware";

export const web = expres();
web.use(expres.json());
web.use(publicRouter);
web.use(errMiddleware);