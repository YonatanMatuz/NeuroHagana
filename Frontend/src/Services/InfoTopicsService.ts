import axios from "axios";
import InfoTopicModel from "../Models/InfoTopicModel";
import { InfoTopicsActionType, infoTopicsStore } from "../Redux/InfoTopicsState";
import appConfig from "../Utils/AppConfig";
import CategoryModel from "../Models/CategoryModel";

class InfoTopicsService {

    public async getInfoTopicsByCategory(categoryId: number): Promise<InfoTopicModel[]> {
        const response = await axios.get<InfoTopicModel[]>(appConfig.infoTopics.fetchAllInCategoryUrl + categoryId);
        const infoTopics = response.data;
        return infoTopics;
    }

    public async getSpecificInfoTopic(infoId: number): Promise<InfoTopicModel> {

        const infoTopics = infoTopicsStore.getState().infoTopics;
        let infoTopic = infoTopics.find(i => i.infoId === infoId);

        if(!infoTopic) {
            const response = await axios.get<InfoTopicModel>(appConfig.infoTopics.baseUrl + infoId);
            infoTopic = response.data;
        }

        return infoTopic; 
    }

    public async getAllCategories(): Promise<CategoryModel[]> {
        const response = await axios.get<CategoryModel[]>(appConfig.infoTopics.getCategoriesUrl);
        const categories = response.data;
        return categories;
    }
    
    // ------------------------------- Admin only functions ------------------------------------ //
    
    public async addInfoTopic(infoTopic: InfoTopicModel): Promise<InfoTopicModel> {

        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.post<InfoTopicModel>(appConfig.infoTopics.baseUrl, infoTopic, { headers });

        const addedInfoTopic = response.data;
        infoTopicsStore.dispatch({ type: InfoTopicsActionType.AddInfoTopic, payload: addedInfoTopic });

        return addedInfoTopic;
    }

    public async updateInfoTopic(infoTopic: InfoTopicModel): Promise<void> {
        
        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.put<InfoTopicModel>(appConfig.infoTopics.baseUrl + infoTopic.infoId, infoTopic, { headers });

        const updatedInfoTopic = response.data;
        infoTopicsStore.dispatch({ type: InfoTopicsActionType.UpdateInfoTopic, payload: updatedInfoTopic });
    }

    public async deleteInfoTopic(infoId: number): Promise<void> {
        await axios.delete<InfoTopicModel>(appConfig.infoTopics.baseUrl + infoId);
        infoTopicsStore.dispatch({ type: InfoTopicsActionType.DeleteInfoTopic, payload: infoId });
    }
}

const infoTopicsService = new InfoTopicsService();

export default infoTopicsService;