import { Request } from "express";
import { UnauthorizedError } from "../2-models/client-errors";
import UserModel from "../2-models/user-model";
import jwt from "jsonwebtoken";
import RoleModel from "../2-models/role-model";
import crypto from "crypto";


const secretKey = "oksdfnsdfjklnsdfjklcnasdkjnasdkjasbdklasjbdasjkb";

function createToken(user: UserModel): string {

    delete user.password;
    const container = { user };
    const options = { expiresIn: "3h" };

    const token = jwt.sign(container, secretKey, options);
    return token;
}

// Verify admin, used in middleware to secure admin routes
async function verifyAdmin(request: Request): Promise<boolean> {

    return new Promise<boolean>((resolve, reject) => {

        const header = request.header("authorization");

        if (!header) {
            reject(new UnauthorizedError("Access denied"));
            return;
        }

        // substring 7 because its always Bearer space
        const token = header.substring(7);

        if (!token) {
            reject(new UnauthorizedError("Access denied"));
            return;
        }

        jwt.verify(token, secretKey, (err, container: { user: UserModel }) => {

            if (err) {
                reject(new Error("Invalid token"));
                return;
            }

            const user = container.user;

            if (user.roleId !== RoleModel.Admin) {
                reject(new UnauthorizedError("Access denied"));
                return;
            }

            resolve(true);
        })
    });     
}

function hashPassword(plainText: string): string {

    const salt = "kljsdfgbkasklndaskjbasdjhlsdfblskdnmfakjdba";

    const hashedText = crypto.createHmac("sha512", salt).update(plainText).digest("hex");

    return hashedText;
}

export default {
    createToken,
    verifyAdmin,
    hashPassword
}
