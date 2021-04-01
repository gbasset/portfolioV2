import express from 'express';
import { getHello, getTest, getProjects, getProjectById } from '../controllers/projectsControllers.js';
import { postEmail } from '../controllers/EmailControllers.js';
import { catchErrors } from '../helpers.js';
import passport from 'passport';
import '../auth/auth.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.get("/", getHello);

router.get("/test", getTest);

// For projects
// router.post("/projects", catchErrors(addProject));
router.get("/projects", getProjects);
router.get("/project/:id", getProjectById);

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
                console.log(user);
                try {
                    if (err || !user) {
                        const error = new Error('Une erreur est survenue.')
                        return next(error)
                    }
                    req.login(user, { session: false }, async error => {
                        if (error) return next(error)
                        console.log(user);
                        const body = { _id: user._id, email: user.email, isAdmin: user.isAdmin }
                        const token = jwt.sign({ user: body }, process.env.SECRET)
                        res.json({ token, body })
                    })
                } catch (error) {
                    return next(error)
                }
            })(req, res, next)
    })


export default router;