const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const router = new Router();
const User = require('./model/user');
const mongoose = require('mongoose');
const db = require('./config/key').mongoURI;
const cors = require('@koa/cors');
const serve = require('koa-static');

mongoose.connect(db)
    .then(() => console.log('Mongo Connected'))
    .catch(err => console.log(err));
app.use(cors());
app.use(bodyParser({
    formidable: { uploadDir: './uploads' },
    multipart: true,
    urlencoded: true
}));

const multer = require('koa-multer');

const upload = multer({ dest: 'uploads/' });

router.get('/user', async (ctx, next) => {
    var user = await User.find({}, (err, user) => {

        return user
    })
    await next();
    ctx.response.body = user
})



router.post('/user', upload.single('picture'), async (ctx, next) => {
    try {
        if (!ctx.req.file) {
            ctx.response.status = 401;
            ctx.response.body = 'Please provide an image';
        }
        const newUser = new User({
            name: ctx.req.body.name,
            age: ctx.req.body.age,
            picture: ctx.req.file.filename,
        })
        newUser.save();
        ctx.response.status = 200;
        ctx.response.body = 'abc';
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }

})

router.put('/user/:id', upload.single('picture'), async (ctx, next) => {
    try {
        let query = { _id: ctx.params.id };
        let updateUser = {
            name: ctx.req.body.name,
            age: ctx.req.body.age,
            picture: ctx.req.file.filename,
        }
        let user = await User.findOneAndUpdate(query, updateUser, { new: true });
        ctx.response.body = user.name;
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }

})

router.delete('/deleteUser/:id', async (ctx, next) => {
    try {

        let query = { _id: ctx.params.id };
        await User.findOneAndRemove(query).then(() => console.log('delete Success'));
    } catch (err) {
        ctx.status = err.status || 500;
        ctx.body = err.message;
    }
});

// app.use(async function (ctx, next) {
//     await next();
//     console.log(3);
//     console.log(1);
// });

// app.use(async (ctx, next) => {
//     console.log('in here');
//     await next();
//     console.log('out here');
// })

// // response
// app.use(async (ctx, next) => {
//     await next();
//     console.log(2);


// });

// app.use(async (ctx, next) => {
//     const start = Date.now();
//     await next();
//     const ms = Date.now() - start;
//     console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
//   });



app.use(router.routes());

app.use(router.allowedMethods());
app.use(serve('./uploads'));
app.listen(5000);