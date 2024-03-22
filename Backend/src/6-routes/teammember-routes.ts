import express, { NextFunction, Request, Response } from "express";
import teamMemberService from "../5-services/teammembers-service";
import TeamMemberModel from "../2-models/teammember-model";
import verifyAdmin from "../3-middleware/verify-admin";

const router = express.Router();

// ---------------------------- None-User / User Routes ---------------------------------- //

// GET fetches all team members with their assigned categories
router.get("/team-members", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const teamMembers = await teamMemberService.getAllTeamMembers();
        response.json(teamMembers);
    }
    catch (err: any) {
        next(err);
    }
});

// GET retrieves all team member assigned categories
router.get("/team-members/categories", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const categories = await teamMemberService.getAllCategories();
        response.json(categories);
    }
    catch (err: any) {
        next(err);
    }
});


// GET fetches a specific team member
router.get("/team-members/:teamMemberId", async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const teamMemberId = +request.params.teamMemberId;
        const teamMember = await teamMemberService.getSpecificTeamMember(teamMemberId);
        response.json(teamMember);
    } 
    catch (err: any) {
        next(err);
    }
});

// --------------------------------------------------------------------------------------- //

// --------------------------------------- Admin Routes ---------------------------------- //

// POST add a new team member
router.post("/team-members", verifyAdmin, async( request: Request, response: Response, next: NextFunction ) => {
    try {
        request.body.image = request.files?.image;
        const teamMember = new TeamMemberModel(request.body);
        const addedTeamMember = await teamMemberService.addTeamMember(teamMember);
        response.status(201).json(addedTeamMember);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT update a existing team member
router.put("/team-members/:teamMemberId", verifyAdmin, async( request: Request, response: Response, next: NextFunction ) => {
    try {
        request.body.image = request.files?.image;
        const teamMember = new TeamMemberModel(request.body);
        teamMember.teamMemberId = +request.params.teamMemberId;
        const updatedTeamMember = await teamMemberService.updateTeamMember(teamMember);
        response.status(201).json(updatedTeamMember);
    } 
    catch (err: any) {
        next(err);
    }
});

// DELETE a existing team member
router.delete("/team-members/:teamMemberId", verifyAdmin, async( request: Request, response: Response, next: NextFunction ) => {
    try {
        const teamMemberId = +request.params.teamMemberId;
        await teamMemberService.deleteTeamMember(teamMemberId);
        response.status(204).json();
    }
    catch (err: any) {
        next(err);
    }
});

// --------------------------------------------------------------------------------------- //

export default router;