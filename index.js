"use strict";
require("@std/esm")
module.exports = {
  require("./config/server.mjs").default;
  require("./config/dbConnection.mjs");
}
