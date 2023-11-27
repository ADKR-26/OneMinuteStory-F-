import { GET_STORY_DATA, SET_STORY_DATA, DELETE_STORY_DATA, SET_TITLE_ID, SIGN_UP, SIGN_IN } from "./action-types";

const initialState = {
    storyData: [],
    addedStory: {},
    deletedStory: {},
    titleId: null,
    currentUser: null,
}

const storyReducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_STORY_DATA: 
            return { ...state, storyData: action.payload };

        case SET_STORY_DATA:
            return { ...state, addedStory: action.payload };

        case DELETE_STORY_DATA:
            return { ...state, deletedStory: action.payload };
        case SET_TITLE_ID:
            return { ...state, titleId: action.payload}
        case SIGN_IN:
            return { ...state, currentUser: action.payload};
        case SIGN_UP:
            return { ...state, currentUser: action.payload};

        default: return state;
    }
}

export default storyReducer;