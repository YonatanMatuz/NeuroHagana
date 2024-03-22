import express, { Request, Response, NextFunction } from "express";
import infotopicService from "../5-services/infotopics-service";
import InfoTopicModel from "../2-models/infotopic-model";
import verifyAdmin from "../3-middleware/verify-admin";

const router = express.Router();

// ---------------------------- None-User / User Routes ---------------------------------- //

// GET - fetches all info topics by their their category
router.get("/infotopics/by-category/:categoryId", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const categoryId = +request.params.categoryId;
        const infoTopics = await infotopicService.getInfoTopicsByCategory(categoryId);
        response.json(infoTopics);
    }
    catch (err: any) {
        next(err);
    }
});

// GET - retrieves all info topic assigned categories
router.get("/infotopics/categories", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const categories = await infotopicService.getAllCategories();
        response.json(categories);
    }
    catch (err: any) {
        next(err);
    }
});

// GET - fetches a specific info topic
router.get("/infotopics/:infoId", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const infoId = +request.params.infoId;
        const infoTopic = await infotopicService.getSpecificInfoTopic(infoId);
        response.json(infoTopic);
    }
    catch (err: any) {
        next(err);
    }
});


// --------------------------------------------------------------------------------------- //


// --------------------------------------- Admin Routes ---------------------------------- //

// POST - add a new info topic
router.post("/infotopics", verifyAdmin, async( request: Request, response: Response, next: NextFunction ) => {
    try {
        request.body.image = request.files?.image;
        const infoTopic = new InfoTopicModel(request.body);
        const addedInfoTopic = await infotopicService.addInfoTopic(infoTopic);
        response.status(201).json(addedInfoTopic);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT - update a existing info topic
router.put("/infotopics/:infoId", verifyAdmin, async( request: Request, response: Response, next: NextFunction ) => {
    try {
        request.body.image = request.files?.image;
        const infoTopic = new InfoTopicModel(request.body);
        infoTopic.infoId = +request.params.infoId;
        const updatedInfoTopic = await infotopicService.updateInfoTopic(infoTopic);
        response.status(201).json(updatedInfoTopic);
    }
    catch (err: any) {
        next(err);
    }
});

// DELETE - a existing infoTopic
router.delete("/infotopics/:infoId", verifyAdmin, async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const infoId = +request.params.infoId;
        await infotopicService.deleteInfoTopic(infoId);
        response.status(204).json();
    }
    catch (err: any) {
        next(err);
    }
});

// --------------------------------------------------------------------------------------- //

export default router;