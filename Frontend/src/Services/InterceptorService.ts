import axios from "axios";
import { authStore } from "../Redux/AuthState";

class InterceptorService {

    public create(): void {

        axios.interceptors.request.use(requestObject => {

            if (authStore.getState().token) {
                requestObject.headers.setAuthorization("Bearer " + authStore.getState().token);
            }

            return requestObject;
        })
    }
}

const interceptorService = new InterceptorService();

export default interceptorService;