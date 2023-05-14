import { consola } from "consola";

import app from "./app";

app.listen(app.get("port"), () => {
  /**
   *  Log infomation after everything is started.
   */
  if (process.env.NODE_ENV !== "test") {
    consola.log("----------------------------------------");
    consola.info(`Environment: ${app.get("env")}`);
    consola.info(`App URL: http://${app.get("host")}:${app.get("port")}`);
    consola.log("----------------------------------------");
  }
});
