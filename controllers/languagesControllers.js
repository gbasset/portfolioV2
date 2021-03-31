import Language from '../models/languageModels.js';


export const addLanguage = async (req, res) => {
    const language = new Language(req.body);
    try {
        await language.save()
        res.status(200).send(language)
    } catch (err) {
        res.status(500).send(err)
    }
}
export const getLanguages = async (req, res) => {
    try {
        const languages = await Language.find({});
        languages && res.status(200).send(languages)
    } catch (err) {
        res.status(500).send(err)
    }
}
export const getLanguageById = async (req, res) => {
    try {
        const language = await Language.find({ _id: req.params.id });
        if (!language) {
            res.status(404).send("Pas de Language avec cet id")
        }
        language && res.status(200).send(language)
    } catch (err) {
        res.status(500).send(err)
    }
}

export const updateLanguageById = async (req, res) => {
    try {
        const language = await Language.findByIdAndUpdate(req.params.id, req.body);
        await language.save() && res.send(language)
    } catch (err) {
        res.status(500).send(err)
    }
}
export const deletelanguageById = async (req, res) => {
    try {
        const language = await Language.findByIdAndDelete(req.params.id);
        if (!language) {
            res.status(404).send("Pas de language avec cet id")
        }
        res.status(200).send('La suppression du language est terminée')
    } catch (err) {
        res.status(500).send(err)
    }
}