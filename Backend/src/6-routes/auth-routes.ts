import express, { NextFunction, Request, Response } from "express";
import CredentialsModel from "../2-models/credentials-model";
import authService from "../5-services/auth-service";


const router = express.Router();

// Regiserting isn't currently needed as there are only admin functionalities,
// but the immediate features after 1.0 release require users, so I have implemented it in advance, the route is currently disabled on purpose.

// router.post("/auth/register", async( request: Request, response: Response, next: NextFunction ) => {
//     try {
//         const user = new UserModel(request.body);
//         const token = await authService.register(user);
//         response.status(201).json(token);
//     }
//     catch (err:any) {
//         next(err);
//     }
// });

router.post("/auth/login", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const credentials = new CredentialsModel(request.body);
        const token = await authService.login(credentials);
        response.json(token);
    }
    catch (err: any) {
       next(err); 
    }
});

export default router;