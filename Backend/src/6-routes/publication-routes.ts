import express, { NextFunction, Request, Response } from "express";
import publicationService from "../5-services/publications-service";
import PublicationModel from "../2-models/publication-model";
import verifyAdmin from "../3-middleware/verify-admin";

const router = express.Router();

// ---------------------------- None-User / User Routes ---------------------------------- //

// GET - fetches all publications
router.get("/publications", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const publications = await publicationService.getAllPublications();
        response.json(publications);
    }
    catch (err: any) {
        next(err);
    }
});

// GET - fetches a specific publication
router.get("/publications/:publicationId", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const publicationId = +request.params.publicationId;
        const publication = await publicationService.getSpecificPublication(publicationId);
        response.json(publication);
    }
    catch (err: any) {
        next(err);
    }
});

// --------------------------------------------------------------------------------------- //

// --------------------------------------- Admin Routes ---------------------------------- //

// POST - add a new publication
router.post("/publications", verifyAdmin, async( request: Request, response: Response, next: NextFunction ) => {
    try {
        request.body.image = request.files?.image;
        const publication = new PublicationModel(request.body);
        const addedPublication = await publicationService.addPublication(publication);
        response.status(201).json(addedPublication);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT - update a existing publication
router.put("/publications/:publicationId", verifyAdmin, async( request: Request, response: Response, next: NextFunction ) => {
    try {
        request.body.image = request.files?.image;
        const publication = new PublicationModel(request.body);
        publication.publicationId = +request.params.publicationId;
        const updatedPublication = await publicationService.updatePublication(publication);
        response.status(201).json(updatedPublication);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE - a existing publication
router.delete("/publications/:publicationId", verifyAdmin, async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const publicationId = +request.params.publicationId;
        await publicationService.deletePublication(publicationId);
        response.status(204).json();
    }
    catch (err: any) {
        next(err);
    }
});

// --------------------------------------------------------------------------------------- //

export default router;