import express from 'express';
import dotenv from 'dotenv';
import routes from './routes/routes.js';
import morgan from 'morgan';
import mongoose from 'mongoose';
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors';
import passport from 'passport'
import './auth/auth.js';
import privateRoutes from './routes/privateRoutes.js';
import bodyParser from 'body-parser';
// Path avec ES module

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config();
const PORT = process.env.PORT || 3002;
const app = express();
app.use(express.static('client/build'))
const allowlist = process.env.CORS.split(";");
console.log("allowlist", allowlist);
var corsOptions = {
    origin: function (origin, callback) {
        console.log("origin", origin);
        if (origin == undefined) {
            callback(null, true)
        }
        else if (allowlist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    optionsSuccessStatus: 200 // For legacy browser support
}
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// morgan error support
app.use(morgan('dev'))
// Support JSON-encoded bodies
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({
    extended: true
}));
// Support JSON-encoded bodies
app.use(bodyParser.json());
app.use('/private', passport.authenticate('jwt', { session: false }), privateRoutes)

app.use(routes);
app.listen(PORT, () => {
    console.log(` Server is listening on port ${PORT}`);
})


