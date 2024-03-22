import { OkPacket } from "mysql";
import { UnauthorizedError, ValidationError } from "../2-models/client-errors";
import CredentialsModel from "../2-models/credentials-model";
import RoleModel from "../2-models/role-model";
import UserModel from "../2-models/user-model";
import cyber from "../4-utils/cyber";
import dal from "../4-utils/dal";

// Regiserting isn't currently needed as there are only admin functionalities,
// but the immediate features after 1.0 release require users, so I have implemented it in advance, the route is currently disabled.
// async function register(user: UserModel): Promise<string> {

//     user.validatePost();

//     const isTaken = await isEmailTaken(user.email);
//     if (isTaken) throw new ValidationError(`Email ${user.email} is already taken`);

//     user.password = cyber.hashPassword(user.password);
//     user.roleId = RoleModel.User;

//     const sql = `
//         INSERT INTO users
//         VALUES(DEFAULT, ?, ?, ?, ?, ?)`;

//     const result: OkPacket = await dal.execute(sql, 
//         [user.firstName, user.lastName, user.email, user.password, user.roleId]);
//     user.userId = result.insertId;
    
//     const token = cyber.createToken(user);
//     return token;
// }

// Internal use function for register validation
async function isEmailTaken(email: string): Promise<boolean> {

    const sql = `
        SELECT
        EXISTS(SELECT * FROM users WHERE email = ?)
        AS isTaken`;

    const result = await dal.execute(sql, [email]);
    const isTaken = result[0].isTaken;

    return isTaken === 1;
}

async function login(credentials: CredentialsModel): Promise<string> {

    credentials.password = cyber.hashPassword(credentials.password);

    const sql = `
        SELECT *
        FROM users
        WHERE email = ?
        AND password = ?`;

    const result = await dal.execute(sql, [credentials.email, credentials.password]);
    const user = result[0];

    if (!user) throw new UnauthorizedError("Incorrect email or password");

    const token = cyber.createToken(user);
    return token;
}

export default {
    login
}