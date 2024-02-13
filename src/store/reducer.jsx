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
    UPDATE_USER,
    DELETE_USER,
    SIGNOUT_USER,
    UPDATE_USER_ERROR,
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
    updateError: false
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

        case UPDATE_USER:
            console.log("HERE", action);
            return { ...state, currentUser: action.payload, updateError: action.updateError };

        case UPDATE_USER_ERROR:
            console.log("HERE", action);
            return { ...state, updateError: action.payload };
        
        case DELETE_USER:
            return { ...state, currentUser: null };

        case SIGN_IN:
            return { ...state, currentUser: action.payload };

        case SIGNOUT_USER:
            return { ...state, currentUser: null };

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
