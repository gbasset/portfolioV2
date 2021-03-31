import passport from 'passport';
import { Strategy } from 'passport-local';
import dotenv from 'dotenv';
import UserModel from '../models/userModels.js';
import JWT from 'passport-jwt'
const { Strategy: JWTstrategy, ExtractJwt } = JWT;

dotenv.config();

passport.use('signup',
    new Strategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        async (req, email, password, done) => {
            try {
                const isAdmin = req.body.isAdmin
                const user = await UserModel.create({ email, password, isAdmin })
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        })
)
passport.use('login',
    new Strategy({
        usernameField: 'email',
        passwordField: 'password',
    },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email })
                if (!user) {
                    return done(null, false, { message: "Pas d'utilisateur avec ce mail" })
                }
                const validate = await user.isValidPassword(password)
                if (!validate) {
                    return done(null, false, { message: "Erreur de connexion ." })
                }
                return done(null, user, { message: "Connexion réussie." })
            } catch (error) {
                return done(error)
            }
        })
)
passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.SECRET,
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token')
        },
        async (token, done) => {
            try {
                return done(null, token.user)
            } catch (error) {
                done(error)
            }
        })
)
export default passport
