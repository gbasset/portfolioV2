import { cloudinary } from '../utils/cloudinary.js';


export const getImages = async (req, res) => {
    const { resources } = await cloudinary.search
        .expression('folder:projects')
        .sort_by('public_id', 'desc')
        .execute();
    res.send(resources);
}


export const postImages = async (req, res) => {
    try {
        const fileStr = req.body.data;
        console.log("fileStr", req.body);
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'ml_default',
            use_filename: true,
            unique_filename: false
        });
        console.log(uploadResponse);
        res.json({ msg: 'ok' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
}