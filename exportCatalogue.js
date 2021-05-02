import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { SiteClient } = require('datocms-client');
const client = new SiteClient('872014ed11bee32b3a6aa5b0db309f');
const fs = require('fs');
const path = require('path');
const request = require('request');


// for (let art of catalogue) {
//     let newArticle = art;
//     newArticle.current_price = parseFloat(newArticle.current_price)
//     newArticle.raw_price = parseFloat(newArticle.raw_price)
//     newArticle.discount = parseInt(newArticle.discount)
//     newArticle.like_count = parseInt(newArticle.like_count)
//     newArticle.is_new = newArticle.is_new == 'true' ? true : false
//     delete newArticle.id
//     console.log("newArticle", newArticle);
//     const record = await client.items.create({
//         itemType: '694849', // <- that's the ID of our dog_breed model
//         category: newArticle.category,
//         subcategory: newArticle.subcategory,
//         name: newArticle.name,
//         currentPrice: newArticle.current_price,
//         rawPrice: newArticle.raw_price,
//         discount: newArticle.discount,
//         likeCount: newArticle.like_count,
//         isNew: newArticle.is_new,
//         variation0Color: newArticle.variation_0_color,
//         variation1Color: newArticle.variation_1_color,
//         variation0Thubnail: newArticle.variation_0_thubnail,
//         variation0Image: newArticle.variation_0_image,
//         variation1Thubnail: newArticle.variation_1_thubnail,
//         variation1Image: newArticle.variation_1_image,
//         imageUrl: newArticle.image_url,
//         sku: newArticle.sku
//     });
//     console.log(record);
// }
client.items.all({}, { allPages: true })
    .then(response => {
        fs.writeFileSync('records.json', JSON.stringify(response, null, 2));
    })

