import Router from "@koa/router";

export default function (router: Router) {
  router.get("/", async (ctx) => {
    ctx.body = "Hello World!";
  });
}
