import React, { useEffect, useState } from 'react'
import classes from './ImageItem.module.css';
import { BsFillTrashFill } from 'react-icons/bs';
export default function ImageItem({ image, setelementToDelete, selectImage, projectData, imageHome }) {
    const [classesOfImage, setclassesOfImage] = useState("")
    function FileConvertSize(aSize) {
        aSize = Math.abs(parseInt(aSize, 10));
        var def = [[1, 'octets'], [1024, 'ko'], [1024 * 1024, 'Mo'], [1024 * 1024 * 1024, 'Go'], [1024 * 1024 * 1024 * 1024, 'To']];
        for (var i = 0; i < def.length; i++) {
            if (aSize < def[i][0]) return (aSize / def[i - 1][0]).toFixed(2) + ' ' + def[i - 1][1];
        }
    }
    const size = FileConvertSize(image.bytes);
    const getImagesSelected = () => {
        if (projectData && !imageHome) {
            const classeToMap = projectData.images.find(img => img.name === image.public_id) ? classes.imageTransformSelected : "";
            console.log(classeToMap);
            setclassesOfImage(classeToMap)
        } else if (projectData && imageHome) {
            const classeToMap = projectData.imageHome.name === image.public_id ? classes.imageTransformSelected : "";
            console.log(classeToMap);
            setclassesOfImage(classeToMap)
        }
    }
    useEffect(() => {
        getImagesSelected()
    }, [image, selectImage])

    return (
        <div className={classes.imageContainer}
            onClick={selectImage ? () => selectImage(image) : null}>
            <img
                className={classesOfImage}
                src={image.secure_url} alt={image.filename} />
            <span> {size} . {image.format}</span>
            {/* <span className="delete-item" onClick={() => setelementToDelete(image)}>
                <BsFillTrashFill />
            </span> */}
        </div>
    )
}
