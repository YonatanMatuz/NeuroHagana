import { createStore } from "redux";
import InfoTopicModel from "../Models/InfoTopicModel";

export class InfoTopicsState {
    public infoTopics: InfoTopicModel[] = [];
}

export enum InfoTopicsActionType {
    AddInfoTopic,
    UpdateInfoTopic,
    DeleteInfoTopic
}

export interface InfoTopicsAction {
    type: InfoTopicsActionType;
    payload: any;
}

export function infoTopicsReducer(currentState = new InfoTopicsState(), action: InfoTopicsAction): InfoTopicsState {

    const newState = { ...currentState };

    switch (action.type) {

        case InfoTopicsActionType.AddInfoTopic:
            newState.infoTopics.push(action.payload);
            break;

        case InfoTopicsActionType.UpdateInfoTopic:
            const indexToUpdate = newState.infoTopics.findIndex(i => i.infoId === action.payload.infoId);
            if(indexToUpdate >= 0) {
                newState.infoTopics[indexToUpdate] = action.payload;
            }
            break;

        case InfoTopicsActionType.DeleteInfoTopic:
            const indexToDelete = newState.infoTopics.findIndex(i => i.infoId === action.payload)
            if(indexToDelete >= 0) {
                newState.infoTopics.splice(indexToDelete, 1);
            }
            break;
    }

    return newState;
}

export const infoTopicsStore = createStore(infoTopicsReducer);