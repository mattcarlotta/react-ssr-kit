import { resolve } from "path";
import express from "express";
import { currentDirectory } from "../../../envs";

//= =============================================================================//
// SERVE PRODUCTION ASSETS                                                        /
//= =============================================================================//

export default app => {
  app.use(express.static(resolve(`${currentDirectory}/public`)));
};
