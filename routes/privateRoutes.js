import express from 'express';
import { getHello, getTest, addProject, getProjects, getProjectById, updateProjectById, deleteProjectById } from '../controllers/projectsControllers.js';
import { addLanguage, getLanguages, updateLanguageById, deletelanguageById, getLanguageById } from '../controllers/languagesControllers.js';
import { addTag, getTags, getTagById, updateTagById, deleteTagById } from '../controllers/tagsControllers.js';
import { getImages, postImages } from '../controllers/imagesControllers.js';
const router = express.Router();
router.get('/secret', (req, res) => {
    res.json({
        message: 'good',
        user: req.user,
        token: req.query.token
    })
})

//for projects
router.post("/projects", addProject);
router.patch("/project/:id/", updateProjectById);
router.delete("/project/:id", deleteProjectById);

//For the languages
router.get("/languages", getLanguages);
router.post("/languages", addLanguage);
router.patch("/languages/:id", updateLanguageById);
router.get("/languages/:id", getLanguageById);
router.delete("/languages/:id", deletelanguageById);

//For the tags

router.post("/tags", addTag);
router.patch("/tags/:id", updateTagById);
router.get("/tags/:id", getTagById);
router.get("/tags", getTags);
router.delete("/tags/:id", deleteTagById);

// images
router.get('/images', getImages);
router.post('/upload', postImages);

export default router