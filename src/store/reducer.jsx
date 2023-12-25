import {
    GET_STORY_DATA,
    SET_STORY_DATA,
    DELETE_STORY_DATA,
    SET_TITLE_ID,
    SIGN_IN,
    SIGN_IN_GOOGLE,
    SIGN_UP_GOOGLE,
    SIGN_UP_USER_REQUEST,
    SIGN_UP_USER_SUCCESS,
    SIGN_UP_USER_FAILURE,
} from "./action-types";

const initialState = {
    storyData: [],
    addedStory: {},
    deletedStory: {},
    titleId: null,
    currentUser: null,
    loading: false,
    error: false,
    user: null,
};

const storyReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_STORY_DATA:
            return { ...state, storyData: action.payload };

        case SET_STORY_DATA:
            return { ...state, addedStory: action.payload };

        case DELETE_STORY_DATA:
            return { ...state, deletedStory: action.payload };

        case SET_TITLE_ID:
            return { ...state, titleId: action.payload };

        case SIGN_IN:
            return { ...state, currentUser: action.payload };

        // case SIGN_UP:
        //     return { ...state, currentUser: action.payload};

        case SIGN_IN_GOOGLE:
            return { ...state, currentUser: action.payload };

        case SIGN_UP_GOOGLE:
            return { ...state, currentUser: action.payload };

        case SIGN_UP_USER_REQUEST:
            return { ...state, loading: true, error: null, user: null };

        case SIGN_UP_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: action.payload,
            };

        case SIGN_UP_USER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
                user: null,
            };

        default:
            return state;
    }
};

export default storyReducer;
