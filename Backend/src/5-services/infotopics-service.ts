import { ResourceNotFoundError } from "../2-models/client-errors";
import InfoTopicModel from "../2-models/infotopic-model";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import imageHandler from "../4-utils/image-handler";
import CategoryModel from "../2-models/category-model";

// It is by category and not a fetch-all, as it is presented in the front-end by categories but never all at once, so better to do it here than to retrieve all
// and then implement front-end logic to filter them
async function getInfoTopicsByCategory(categoryId: number): Promise<InfoTopicModel[]> {

    const sql = `
        SELECT *,
        CONCAT('${appConfig.imagesUrl}', imageName)
        AS imageUrl
        FROM infoTopics
        WHERE categoryId = ?`;

    const infoTopics = await dal.execute(sql, [categoryId]);
    infoTopics.forEach(infoTopic => delete infoTopic.imageName);

    return infoTopics;
}

async function getSpecificInfoTopic(infoId: number): Promise<InfoTopicModel> {

    const sql = `
        SELECT *,
        CONCAT('${appConfig.imagesUrl}', imageName)
        AS imageUrl
        FROM infoTopics
        WHERE infoId = ?`;

    const infoTopics = await dal.execute(sql, [infoId]);

    const infoTopic = infoTopics[0];
    if (!infoTopic) throw new ResourceNotFoundError(infoId);

    delete infoTopic.image;
    delete infoTopic.imageName;

    return infoTopic;
}

async function getAllCategories(): Promise<CategoryModel[]> {

    const sql = `
        SELECT *
        FROM infoTopicCategories`;

    const categories = await dal.execute(sql);
    
    return categories;
}

async function addInfoTopic(infoTopic: InfoTopicModel): Promise<InfoTopicModel> {

    // Joi validation
    infoTopic.validatePost();

    // We delete the frontend sent name, and use imageHandler to save the file under a new uuid with the original extension.
    let imageName = null;
    if (infoTopic.image) {
        imageName =  await imageHandler.saveImage(infoTopic.image);
        infoTopic.imageUrl = appConfig.imagesUrl + imageName;
    }

    const sql = `
        INSERT INTO infoTopics
        VALUES(DEFAULT, ?, ?, ?, ?)`;

    const result: OkPacket = await dal.execute(sql, 
        [infoTopic.title, infoTopic.description, infoTopic.categoryId, imageName]);

    infoTopic.infoId = result.insertId;
    delete infoTopic.image;
    
    return infoTopic;
}

async function updateInfoTopic(infoTopic: InfoTopicModel): Promise<InfoTopicModel> {

    // Joi validation
    infoTopic.validatePut();

    let imageName = await getInfoTopicImageName(infoTopic.infoId);
    if (infoTopic.image) {
        imageName = await imageHandler.updateImage(infoTopic.image, imageName);  
        infoTopic.imageUrl = appConfig.imagesUrl + imageName;
    }

    const sql = `
        UPDATE infoTopics
        SET title = ?, description = ?, categoryId = ?, imageName = ?
        WHERE infoId = ?`;

    const result: OkPacket = await dal.execute(sql, 
        [infoTopic.title, infoTopic.description, infoTopic.categoryId, imageName, infoTopic.infoId]);
    
    if (result.affectedRows === 0) throw new ResourceNotFoundError(infoTopic.infoId);

    delete infoTopic.image;

    return infoTopic; 
}

// Internally used function to retrieve the imageName (or null if doesn't exist) when the frontend updates a infoTopic
async function getInfoTopicImageName(infoId: number): Promise<string> {
    
    const sql = `
        SELECT imageName
        FROM infoTopics
        WHERE infoId = ?`;

    const infoTopics = await dal.execute(sql, [infoId]);
    const infoTopic = infoTopics[0];

    if (!infoTopic) return null;

    const imageName = infoTopic.imageName;
    return imageName;
}

async function deleteInfoTopic(infoId: number): Promise<void> {

    let imageName = await getInfoTopicImageName(infoId);

    const sql = `
        DELETE FROM infoTopics
        WHERE infoId = ?`;

    const result: OkPacket = await dal.execute(sql, [infoId]);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(infoId);

    await imageHandler.deleteImage(imageName);
}

export default {
    getInfoTopicsByCategory,
    getSpecificInfoTopic,
    getAllCategories,
    addInfoTopic,
    updateInfoTopic,
    deleteInfoTopic
}