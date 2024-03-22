import UserModel from "../Models/UserModel";
import { jwtDecode } from "jwt-decode";
import notifyService from "./NotifyService";

class CyberService {

  // Fetches the current user logged in
  public async fetchUser(): Promise<UserModel> {
      const token = sessionStorage.getItem("token");
      const user = jwtDecode<{ user : UserModel }>(token).user;
      if(!user) return null;
      return user;
  }
  
  public async verifyAdmin(): Promise<boolean> {

      try {
        const token = sessionStorage.getItem("token");
        const user = jwtDecode<{ user: UserModel }>(token).user;

        // Check if user.roleId matches admin role value (1)
        return user.roleId === 1; 
      }

      catch (err: any) {
        notifyService.error(err);
      }

    }
}

const cyberService = new CyberService();

export default cyberService;