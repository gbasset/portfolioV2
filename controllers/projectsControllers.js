import Project from '../models/projectModels.js';

export const getHello = (_, res) => {
    res.send("hello").status(200);
};
export const getTest = (req, res) => {
    res.send({
        name: "HEHEHE"
    });
}
export const addProject = async (req, res) => {
    const project = new Project(req.body);
    try {
        await project.save()
        res.status(200).send(project)
    } catch (err) {
        res.status(500).send(err)
    }
}
export const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        projects && res.status(200).send(projects)
    } catch (err) {
        res.status(500).send(err)
    }
}
export const getProjectById = async (req, res) => {
    try {
        const project = await Project.find({ _id: req.params.id });
        if (!project) {
            res.status(404).send("Pas de projet avec cet id")
        }
        project && res.status(200).send(project)
    } catch (err) {
        res.status(500).send(err)
    }
}
export const updateProjectById = async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(req.params.id, req.body);
        await project.save();
        res.send(project)
    } catch (err) {
        res.status(500).send(err)
    }
}
export const deleteProjectById = async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            res.status(404).send("Pas de projet avec cet id")
        }
        res.status(200).send('La suppression est terminée')
    } catch (err) {
        res.status(500).send(err)
    }
}