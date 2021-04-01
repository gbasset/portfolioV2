import React, { useState } from 'react'
import picture1 from '../../pictures/monde.jpg';
import picture2 from '../../pictures/foret.jpg';
import picture3 from '../../pictures/encoreautre.jpg';
import picture4 from '../../pictures/montagne.jpg';
import picture5 from '../../pictures/otremontagne.jpg';
export default function News() {
    const [images, setImages] = useState([])
    const [imageActive, setImageActive] = useState(0)
    const [imagesToMap, setImagesToMap] = useState([
        {
            url: picture1,
            id: 0,
            name: "La nature est brute"
        },
        {
            url: picture2,
            id: 1,
            name: "La nature est lumineuse"
        },
        {
            url: picture3,
            id: 2,
            name: "La nature est sinueuse"
        },
        {
            url: picture4,
            id: 3,
            name: "La nature est profonde"
        },
        {
            url: picture5,
            id: 4,
            name: "La nature trace nos chemins"
        },
    ])
    return (
        <div>
            <h1>News</h1>
            <div class="container">
                {imagesToMap.map(img =>
                    <div className={imageActive === img.id ? "pannel active" : "pannel"}
                        onClick={() => setImageActive(img.id)}
                        style={{
                            backgroundImage: "url(" + `${img.url}` + ")",
                        }}>
                        <button>See More</button>
                        <h3> {img.name} </h3>
                    </div>
                )}
            </div>
        </div>
    )
}
