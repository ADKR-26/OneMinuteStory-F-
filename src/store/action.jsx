import axios from "axios";

const url = import.meta.env.VITE_API_URL;

import {
    GET_STORY_DATA,
    SET_STORY_DATA,
    DELETE_STORY_DATA,
    SET_TITLE_ID,
    SIGN_UP,
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

export const actionGetStoryData = (data) => ({
    type: GET_STORY_DATA,
    payload: data,
});

export const actionSetStoryData = (data) => ({
    type: SET_STORY_DATA,
    payload: data,
});

export const actionDeleteStoryData = (data) => ({
    type: DELETE_STORY_DATA,
    payload: data,
});

export const actionSignUpUser = (data) => ({
    type: SIGN_UP,
    payload: data,
});

export const actionSignInUser = (data) => ({
    type: SIGN_IN,
    payload: data,
});

export const actionSignInUserGoogle = (data) => ({
    type: SIGN_IN_GOOGLE,
    payload: data,
});

export const actionSignUpUserGoogle = (data) => ({
    type: SIGN_UP_GOOGLE,
    payload: data,
});

export const actionUpdateUser = (data, error) => ({
    type: UPDATE_USER,
    payload: data,
    updateError: error,
});

export const actionUpdateUserError = (data) => ({
    type: UPDATE_USER_ERROR,
    payload: data,
});

export const actionSignOut = (data) => ({
    type: SIGNOUT_USER,
    payload: data,
});

export const actionDeleteUserData = (data) => ({
    type: DELETE_USER,
    payload: data,
});

export const actionSetTitleId = (data) => ({
    // console.log("DATA", data);
    type: SET_TITLE_ID,
    payload: data,
});

export const signUpUserRequest = () => ({ type: SIGN_UP_USER_REQUEST });

export const signUpUserSuccess = (userData) => ({
    type: SIGN_UP_USER_SUCCESS,
    payload: userData,
});

export const signUpUserFailure = (error) => ({
    type: SIGN_UP_USER_FAILURE,
    payload: error,
});

// Functions

export function getStoryData() {
    console.log("Working");
    return (dispatch) => {
        try {
            axios
                .get(`${url}/api/getStoryData`)
                .then((response) => {
                    const data = response.data;
                    console.log(data);
                    dispatch(actionGetStoryData(data));
                })
                .catch((error) => {
                    const data = error.response;
                    dispatch(actionGetStoryData(data));
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    };
}

export function setStoryData(title, story, email, username) {
    console.log("DATAAAAAA", title, story, email, username);
    return (dispatch) => {
        try {
            axios
                .post(`${url}/api/addStory`, {
                    title,
                    story,
                    email,
                    author: username,
                })
                .then((response) => {
                    dispatch(actionSetStoryData(response));
                    console.log("Response", response);
                })
                .catch((error) => {
                    const data = error.response;
                    dispatch(actionSetStoryData(data));
                    console.log("Set Story Error", error);
                });
        } catch (error) {
            console.log(error);
        }
    };
}

export function deleteStoryData(id) {
    return (dispatch) => {
        try {
            axios
                .delete(`${url}/api/deleteStory/${id}`)
                .then((response) => {
                    dispatch(actionDeleteStoryData(response.data.deletedStory));
                    dispatch(getStoryData());
                    console.log("Response", response.data.deletedStory);
                })
                .catch((error) => {
                    const data = error.response;
                    dispatch(actionDeleteStoryData(data));
                    console.log("Delete Story Error", error);
                });
        } catch (error) {
            console.log(error);
        }
    };
}

export function signInUser(email, password) {
    // console.log("DATAAAAAA", email, password);
    return (dispatch) => {
        try {
            axios
                .post(`${url}/OMS-api/auth/signin`, {
                    email,
                    password,
                    googleUsed: false
                })
                .then((response) => {
                    dispatch(actionSignInUser(response));
                    // console.log("Response", response);
                })
                .catch((error) => {
                    const data = error.response;
                    dispatch(actionSignInUser(data));
                    dispatch(signUpUserFailure(true));
                    console.log("Sign IN error", error);
                });
        } catch (error) {
            console.log(error);
        }
    };
}

export function signUpUser(username, email, password) {
    // console.log("DATAAAAAA", username, email, password);
    return (dispatch) => {
        dispatch(signUpUserRequest());
        try {
            axios
                .post(`${url}/OMS-api/auth/signup`, {
                    username,
                    email,
                    password,
                    googleUsed: false
                })
                .then((response) => {
                    dispatch(actionSignUpUser(response));
                    dispatch(signUpUserSuccess(response.data));
                    // console.log("Response", response);
                })
                .catch((error) => {
                    const data = error.response;
                    dispatch(actionSignUpUser(data));
                    dispatch(signUpUserFailure(error));
                    console.log("Sign up error", error);
                });
        } catch (error) {
            console.log(error);
        }
    };
}

export function signInUserGoogle(email, googleUsed) {
    // console.log("DATAAAAAA", email);
    return (dispatch) => {
        try {
            axios
                .post(`${url}/OMS-api/auth/google`, { email, googleUsed })
                .then((response) => {
                    dispatch(actionSignInUserGoogle(response));
                    // console.log("Response", response);
                })
                .catch((error) => {
                    const data = error.response;
                    dispatch(actionSignInUserGoogle(data));
                    console.log("Sign IN error", error);
                });
        } catch (error) {
            console.log(error);
        }
    };
}

export function signUpUserGoogle(name, email, photo, googleUsed) {
    photo = photo.toString();
    return (dispatch) => {
        try {
            axios
                .post(`${url}/OMS-api/auth/google`, {
                    name,
                    email,
                    photo,
                    googleUsed
                })
                .then((response) => {
                    dispatch(actionSignUpUserGoogle(response));
                    console.log("Response", response);
                })
                .catch((error) => {
                    const data = error.response;
                    dispatch(actionSignUpUserGoogle(data));
                    console.log("Sign Up google error", error);
                });
        } catch (error) {
            console.log(error);
        }
    };
}

export function updateUser(
    username,
    email,
    profilePicture,
    password,
    currentUserID
) {
    // console.log("DATAAAAAA", email);
    return (dispatch) => {
        try {
            axios
                .post(`${url}/OMS-api/user/update/${currentUserID}`, {
                    username,
                    email,
                    profilePicture,
                    password,
                })
                .then((response) => {
                    const updateError = false;
                    dispatch(actionUpdateUser(response, updateError));
                    dispatch(getStoryData());
                    // console.log("Response", response);
                })
                .catch((error) => {
                    const updateError = true;
                    dispatch(actionUpdateUserError(updateError));
                    // const data = error.response;
                    // dispatch(actionSignInUserGoogle(data));
                    console.log("Update User Error", error.message);
                });
        } catch (error) {
            console.log(error);
        }
    };
}

export function deleteUser(currentUserID) {
    return (dispatch) => {
        try {
            axios
                .delete(`${url}/OMS-api/user/delete/${currentUserID}`)
                .then((response) => {
                    dispatch(actionDeleteUserData(response));
                    console.log("User Deleted", response);
                })
                .catch((error) => {
                    const data = error.response;
                    dispatch(actionDeleteUserData(data));
                    console.log("Error in delete User", error);
                });
        } catch (error) {
            console.log(error);
        }
    };
}

export function signOutUser() {
    return (dispatch) => {
        try {
            axios
                .get(`${url}/OMS-api/auth/signout`)
                .then((response) => {
                    dispatch(actionSignOut(response));
                    console.log("User SignOut Success", response);
                })
                .catch((error) => {
                    const data = error.response;
                    dispatch(actionSignOut(data));
                    console.log("Error in Signout User", error);
                });
        } catch (error) {
            console.log(error);
        }
    };
}

export function likeStory(storyID, email) {
    return (dispatch) => {
        try {
            axios
                .post(`${url}/api/likedBy/${storyID}`, { email })
                .then((response) => {
                    // Dispatch your action with the response data if needed
                    dispatch(getStoryData());
                    console.log("Response", response.data);
                })
                .catch((error) => {
                    // Handle error response
                    console.log("Error LikeStory", error);
                });
        } catch (error) {
            console.log("Error LikeStory", error);
        }
    };
}
