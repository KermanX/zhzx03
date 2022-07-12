import Router from "@koa/router";
import { writeFileSync } from "fs";

export default function (router: Router) {
  router.get("/git/port", async (ctx) => {
    ctx.body = 1111;
  });
  router.post("/git/pubkey/add", async (ctx) => {
    const { pubkey } = ctx.request.body;
    writeFileSync("./pubkey.txt", pubkey);
  });
}
