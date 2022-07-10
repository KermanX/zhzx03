import Koa from 'koa'
import qs from 'querystring'

const app = new Koa();


// logger
app.use(async (ctx, next) => {
    await next();
});

// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// Allow CORS
app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
    ctx.set('Access-Control-Allow-Credentials', "true");
    await next();
});

// response
app.use(async ctx => {
    switch (ctx.method) {
        case "GET":
            getMain(ctx);
            break;
        case "POST":
            function paresPostData(ctx) {
                return new Promise((resolve, reject) => {
                    try {
                        let postData = ''
                        ctx.req.addListener('data', (data) => {
                            postData += data
                        })
                        ctx.req.on('end', () => {
                            resolve(postData)
                        })
                    } catch (err) {
                        reject(err)
                    }
                })
            }
            let postData = await paresPostData(ctx);
            postMain(ctx, postData);
            break;
        case "OPTIONS":
            ctx.set('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
            ctx.set('Access-Control-Allow-Headers', 'x-requested-with, accept, origin, content-type');
            ctx.set('Access-Control-Max-Age', '1728000');
            ctx.body = "";
            break;
        default:
            throw new Error();
    }
});

// error
app.on('error', (err, ctx) => {
 
});

let server = app.listen(1234);

function exit() {
    server.close();
}

// example: "/1234/foo/bar" -> "1234"
function solveRoomId(path: string): string {
    path = path.substring(1);
    let roomId = "";
    for (let c of path) {
        if (c === '/') break;
        else roomId += c;
    }
    logEvent(fieldServer, chalk`RoomId solved: {rgb(0,122,204) #${roomId}}`);
    return roomId;
}

let gdata = new Object;
function getMain(ctx: Koa.Context) {
    let path = ctx.request.path;
    if (path === '/') {
        ctx.set('Content-Type', 'text/html');
        ctx.body = `<html>
<head>
</head>
<body>
<p>
Hello World. url = ${ctx.request.url}. db-name = ${ctx.sql.config.database}
</p>
<img src="favicon.ico"/>
</body>
</html>`;
    } else if (path === '/favicon.ico') {
        //let img = connection.query('SELECT img FROM user_img_tbl WHERE user_id=1;');

        //setTimeout(() => { log(img);}, 5000);

        //ctx.set('Content-Type', 'image/jpeg');
        //ctx.body = img.values[0];
    } else if (path === '/value') {
        ctx.body = gdata[ctx.request.query.name as string];
    } else if (path.startsWith('/room')) {
        path = path.substring('/room'.length);
        let roomId = solveRoomId(path);
        logEvent(fieldServer, chalk`{rgb(0,122,204) ${logTableChar.LT}Room#${roomId}} START`);
        logStack.push(chalk`{rgb(0,122,204)  ${logTableChar.L}}`);
        path = path.substring(roomId.length + 1);
        if (path.startsWith('/chat')) {
            path = path.substring('/chat'.length);
            if (path.startsWith('/all')) {
                if (!roomData.has(roomId)) {
                    roomData.set(roomId, {
                        chatMessages: []
                    });
                    logEvent(fieldServer, `Generate data for Room#${roomId}.`);
                }
                ctx.body = roomData.get(roomId).chatMessages;
                logEvent(fieldServer, `Get chat messages.`);
            }
        }
        logStack.pop();
        logEvent(fieldServer, chalk`{rgb(0,122,204) ${logTableChar.LB}Room#${roomId}} END`);
    }
}

interface Room {
    chatMessages: {
        from: string,
        content: string
    }[]
}
let roomData = new Map<string, Room>();

function postMain(ctx: Koa.Context, postData: unknown) {
    let path = ctx.request.path;
    if (path === '/value') {
        const data = qs.parse(postData as string);
        gdata[data.name as string] = data.value;
        ctx.body = `seted: (${ctx.request.url}) ${data.name}=${data.value}`;
    } else if (path === '/close') {
        ctx.body = 'server will be closed in 2s!'
        setTimeout(exit, 2000);
    } else if (path.startsWith('/room')) {
        path = path.substring('/room'.length);
        let roomId = solveRoomId(path);
        logEvent(fieldServer, chalk`{rgb(0,122,204) ${logTableChar.LT}Room#${roomId}} START`);
        logStack.push(chalk`{rgb(0,122,204)  ${logTableChar.L}}`);
        path = path.substring(roomId.length + 1);
        if (path.startsWith('/chat')) {
            path = path.substring('/chat'.length);
            if (path.startsWith('/add')) {
                if (!roomData.has(roomId)) {
                    logError(fieldServer, `No data for room#${roomId}.`);
                    ctx.status = 404;
                    ctx.body = "No data.";
                } else {
                    let data = JSON.parse(postData as string);
                    roomData.get(roomId).chatMessages.push({
                        from: "unknown",
                        content: data["content"]
                    });
                    let maxContent = 30;
                    let displayContent = data["content"].length > maxContent ? data["content"].substring(0, maxContent - 3) + chalk.white("...") : data["content"];
                    logEvent(fieldServer, chalk`Add chat message: {bgGray \"${displayContent}\"}.`);
                    ctx.body = "Received.";
                }
            }
        }
        logStack.pop();
        logEvent(fieldServer, chalk`{rgb(0,122,204) ${logTableChar.LB}Room#${roomId}} END`);
    }
}