import Router from "@koa/router";
import regGitAPIs from "./git-apis.js";

export default function (router: Router) {
  regGitAPIs(router);
}
