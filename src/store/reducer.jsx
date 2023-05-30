import { GET_STORY_DATA, SET_STORY_DATA, DELETE_STORY_DATA } from "./action-types";

const initialState = {
    storyData: [],
    addedStory: {},
    deletedStory: {},
}

const storyReducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_STORY_DATA: 
            return { ...state, storyData: action.payload };

        case SET_STORY_DATA:
            return { ...state, addedStory: action.payload };

        case DELETE_STORY_DATA:
            return { ...state, deletedStory: action.payload };

        default: return state;
    }
}

export default storyReducer;