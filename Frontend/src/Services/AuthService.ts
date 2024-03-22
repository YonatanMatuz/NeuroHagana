import axios from "axios";
import appConfig from "../Utils/AppConfig";
import { AuthActionType, authStore } from "../Redux/AuthState";
import CredentialsModel from "../Models/CredentialsModel";

class AuthService {

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(appConfig.auth.loginUrl, credentials);
        const token = response.data;
        authStore.dispatch({ type: AuthActionType.Login, payload: token });
    }

    public logout(): void {
        authStore.dispatch({ type: AuthActionType.Logout });
    }

}

const authService = new AuthService();

export default authService;