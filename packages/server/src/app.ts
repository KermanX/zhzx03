import Koa from 'koa'
import Router from '@koa/router'
import koaBodyparser from "koa-bodyparser";

import regPages from './pages.js';
import regAPIs from './apis.js';

const app = new Koa();
const router = new Router();

regPages(router);
regAPIs(router);

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(router.routes());
app.use(router.allowedMethods());
app.use(koaBodyparser());

// error
app.on('error', (err, ctx) => {
 console.log(err);
});

let server = app.listen(3000);

console.log("Server is running at http://localhost:3000");

function exit() {
    server.close();
}
