import { OkPacket } from "mysql";
import PublicationModel from "../2-models/publication-model";
import appConfig from "../4-utils/app-config";
import dal from "../4-utils/dal";
import imageHandler from "../4-utils/image-handler";
import { ResourceNotFoundError } from "../2-models/client-errors";

async function getAllPublications(): Promise<PublicationModel[]> {

    const sql = `
        SELECT *,
        CONCAT('${appConfig.imagesUrl}', imageName)
        AS imageUrl
        FROM publications`;
        
    const publications = await dal.execute(sql);
    publications.forEach(publication => delete publication.imageName);

    return publications;
}

async function getSpecificPublication(publicationId: number): Promise<PublicationModel> {

    const sql = `
        SELECT *,
        CONCAT('${appConfig.imagesUrl}', imageName)
        AS imageUrl
        FROM publications
        WHERE publicationId = ?`;

    const publications = await dal.execute(sql, [publicationId]);

    const publication = publications[0];
    if (!publication) throw new ResourceNotFoundError(publicationId);

    delete publication.image;
    delete publication.imageName;

    return publication;
}

async function addPublication(publication: PublicationModel): Promise<PublicationModel> {

    // Joi validation
    publication.validatePost();

    // We delete the frontend sent name, and use imageHandler to save the file under a new uuid with the original extension.
    let imageName = null;
    if (publication.image) {
        imageName = await imageHandler.saveImage(publication.image);
        publication.imageUrl = appConfig.imagesUrl + imageName;
    }

    const sql = `
        INSERT INTO publications
        VALUES(DEFAULT, ?, ?, ?, ?, ?)`;

    const result: OkPacket = await dal.execute(sql,
        [publication.title, publication.description, publication.refUrl, publication.date, imageName]);

    publication.publicationId = result.insertId;
    delete publication.image;
    
    return publication;
}

async function updatePublication(publication: PublicationModel): Promise<PublicationModel> {

    // Joi validation
    publication.validatePut();

    let imageName = await getPublicationImageName(publication.publicationId);
    if (publication.image) {
        imageName = await imageHandler.updateImage(publication.image, imageName);
        publication.imageUrl = appConfig.imagesUrl + imageName;
    }

    const sql = `
        UPDATE publications
        SET title = ?, description = ?, refUrl = ?, date = ?, imageName = ?
        WHERE publicationId = ?`;

    const result: OkPacket = await dal.execute(sql,
        [publication.title, publication.description, publication.refUrl, publication.date, imageName, publication.publicationId]);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(publication.publicationId);

    delete publication.image;

    return publication;
}

// Internal use function, retrieves the stored imageName from a given publication (used for deleting and updating publication images)
async function getPublicationImageName(publicationId: number): Promise<string> {

    const sql = `
        SELECT imageName
        FROM publications
        WHERE publicationId = ?`;

    const publications = await dal.execute(sql,[publicationId]);
    const publication = publications[0];

    if (!publication) return null;

    const imageName = publication.imageName;
    return imageName;
}

async function deletePublication(publicationId: number): Promise<void> {

    let imageName = await getPublicationImageName(publicationId);

    const sql = `
        DELETE FROM publications
        WHERE publicationId = ?`;

    const result: OkPacket = await dal.execute(sql, [publicationId]);

    if (result.affectedRows === 0) throw new ResourceNotFoundError(publicationId);
    
    await imageHandler.deleteImage(imageName);
}

export default {
    getAllPublications,
    getSpecificPublication,
    addPublication,
    updatePublication,
    deletePublication
}