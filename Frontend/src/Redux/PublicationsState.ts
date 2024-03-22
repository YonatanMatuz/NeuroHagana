import { createStore } from "redux";
import PublicationModel from "../Models/PublicationModel";

export class PublicationsState {
    public publications: PublicationModel[] = [];
}

export enum PublicationsActionType {
    FetchPublications,
    AddPublication,
    UpdatePublication,
    DeletePublication
}

export interface PublicationsAction {
    type: PublicationsActionType;
    payload: any;
}

export function publicationsReducer(currentState = new PublicationsState(), action: PublicationsAction): PublicationsState {

    const newState = { ...currentState };

    switch (action.type) {

        case PublicationsActionType.FetchPublications :
            newState.publications = action.payload;
            break;

        case PublicationsActionType.AddPublication :
            newState.publications.push(action.payload);
            break;

        case PublicationsActionType.UpdatePublication :
            const indexToUpdate = newState.publications.findIndex(p => p.publicationId === action.payload.publicationId);
            if(indexToUpdate >= 0) {
                newState.publications[indexToUpdate] = action.payload;
            }
            break;

        case PublicationsActionType.DeletePublication :
            const indexToDelete = newState.publications.findIndex(p => p.publicationId === action.payload);
            if(indexToDelete >= 0) {
                newState.publications.splice(indexToDelete, 1);
            }
            break;
    }

    return newState;
}

export const publicationsStore = createStore(publicationsReducer);