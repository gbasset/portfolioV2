import express from 'express';
import { getHello, getTest, getProjects, getProjectById } from '../controllers/projectsControllers.js';
import { postEmail } from '../controllers/EmailControllers.js';
import { catchErrors } from '../helpers.js';
import passport from 'passport';
import '../auth/auth.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';

import cors from 'cors';
// Path avec ES module
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config();

const router = express.Router();
router.get("/test", getTest);

// For projects
// router.post("/projects", catchErrors(addProject));
router.get("/projects", getProjects);
router.get("/project/:id", getProjectById);
// for the production
router.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
})
// Email
router.post("/message", postEmail);

//Auth
router.post('/signup',
    passport.authenticate('signup', { session: false }),
    async (req, res, next) => {
        res.json({
            message: 'Le compte a bien été créé',
            user: req.user
        })
    }
)
//Auth log
router.post('/login',
    (req, res, next) => {
        passport.authenticate('login',
            async (err, user) => {
                console.log("user", user);
                try {
                    if (err || !user) {
                        const error = new Error('Une erreur est survenue.')
                        return next(error)
                    }
                    req.login(user, { session: false }, async error => {
                        if (error) return next(error)
                        console.log(user);
                        const body = { _id: user._id, email: user.email, isAdmin: user.isAdmin }
                        const token = jwt.sign({ user: body }, process.env.SECRET, {
                            expiresIn: "10h" // it will be expired after 10 hours
                            //expiresIn: "20d" // it will be expired after 20 days
                            //expiresIn: 120 // it will be expired after 120ms
                            //expiresIn: "20s" // it will be expired after 120s
                        })
                        res.json({ token, body })
                    })
                } catch (error) {
                    return next(error)
                }
            })(req, res, next)
    })



export default router;