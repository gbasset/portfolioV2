import Tag from '../models/tagModels.js';


export const addTag = async (req, res) => {
    const tag = new Tag(req.body);
    try {
        await tag.save()
        res.status(200).send(tag)
    } catch (err) {
        res.status(500).send(err)
    }
}
export const getTags = async (req, res) => {
    try {
        const tags = await Tag.find({});
        tags && res.status(200).send(tags)
    } catch (err) {
        res.status(500).send(err)
    }
}
export const getTagById = async (req, res) => {
    try {
        const tag = await Tag.find({ _id: req.params.id });
        if (!tag) {
            res.status(404).send("Pas de tag avec cet id")
        }
        tag && res.status(200).send(tag)
    } catch (err) {
        res.status(500).send(err)
    }
}

export const updateTagById = async (req, res) => {
    try {
        const tag = await Tag.findByIdAndUpdate(req.params.id, req.body);
        await tag.save() && res.send(tag)
    } catch (err) {
        res.status(500).send(err)
    }
}
export const deleteTagById = async (req, res) => {
    try {
        const tag = await Tag.findByIdAndDelete(req.params.id);
        if (!tag) {
            res.status(404).send("Pas de tag avec cet id")
        }
        res.status(200).send('La suppression du tag est terminée')
    } catch (err) {
        res.status(500).send(err)
    }
}