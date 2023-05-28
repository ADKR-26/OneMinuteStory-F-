import { GET_STORY_DATA } from "./action-types";

const initialState = {
    storyData: []
}

const storyReducer = (state = initialState, action) => {
    switch(action.type) {

        case GET_STORY_DATA: 
            return { ...state, storyData: action.payload };

        default: return state;
    }
}

export default storyReducer;