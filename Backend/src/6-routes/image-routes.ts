import express, { NextFunction, Request, Response } from "express";
import imageHandler from "../4-utils/image-handler";

const router = express.Router()

// GET use the database stored imageName to get the file itself, this is in a seperate file as it is used by all that require a stored image 
router.get("/images/:imageName", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const imageName = request.params.imageName;
        const imagePath = imageHandler.getImagePath(imageName);
        response.sendFile(imagePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;