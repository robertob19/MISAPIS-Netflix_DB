import { Router } from "express";
import netflixRoutes from "./netflix.routes.js";

const indexRoutes = Router();

indexRoutes.use("/netflix", netflixRoutes);

export default indexRoutes;
