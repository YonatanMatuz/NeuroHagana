import axios from "axios";
import PublicationModel from "../Models/PublicationModel";
import appConfig from "../Utils/AppConfig";
import { PublicationsActionType, publicationsStore } from "../Redux/PublicationsState";


class PublicationsService {

    public async getAllPublications(): Promise<PublicationModel[]> {

        let publications = publicationsStore.getState().publications;

        if(publications.length === 0) {
            
            const response = await axios.get<PublicationModel[]>(appConfig.publications.baseUrl);
            publications = response.data;

            publicationsStore.dispatch({ type: PublicationsActionType.FetchPublications, payload: publications });
        }

        return publications;
    }

    public async getSpecificPublication(publicationId: number): Promise<PublicationModel> {

        const publications = publicationsStore.getState().publications;
        let publication = publications.find(p => p.publicationId === publicationId);

        if(!publication) {
            const response = await axios.get<PublicationModel>(appConfig.publications.baseUrl + publicationId);
            publication = response.data;
        }

        return publication;
    }

    // ------------------------------- Admin only functions ------------------------------------ //
    
    public async addPublication(publication: PublicationModel): Promise<void> {

        const headers = {"Content-Type": "multipart/form-data" };
        const response = await axios.post<PublicationModel>(appConfig.publications.baseUrl, publication, { headers });

        const addedPublication = response.data;
        publicationsStore.dispatch({ type: PublicationsActionType.AddPublication, payload: addedPublication });
    }

    public async updatePublication(publication: PublicationModel): Promise<void> {

        const headers = { "Content-Type": "multipart/form-data" };
        const response = await axios.put<PublicationModel>(appConfig.publications.baseUrl + publication.publicationId, publication, { headers });

        const updatedPublication = response.data;
        publicationsStore.dispatch({ type: PublicationsActionType.UpdatePublication, payload: updatedPublication });
    }

    public async deletePublication(publicationId: number): Promise<void> {
        await axios.delete<PublicationModel>(appConfig.publications.baseUrl + publicationId);
        publicationsStore.dispatch({ type: PublicationsActionType.DeletePublication, payload: publicationId });
    }
}

const publicationsService = new PublicationsService();

export default publicationsService;