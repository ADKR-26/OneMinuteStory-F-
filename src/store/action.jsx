import axios from "axios";

import { GET_STORY_DATA, SET_STORY_DATA, DELETE_STORY_DATA, SET_TITLE_ID, SIGN_UP, SIGN_IN, SIGN_IN_GOOGLE, SIGN_UP_GOOGLE } from "./action-types";

export const actionGetStoryData = (data) => ({
    type: GET_STORY_DATA,
    payload: data,
});

export const actionSetStoryData = (data) => ({
    type: SET_STORY_DATA,
    payload: data,
})

export const actionDeleteStoryData = (data) => ({
    type: DELETE_STORY_DATA,
    payload: data,
})

export const actionSignUpUser = (data) => ({
    type: SIGN_UP,
    payload: data,
})

export const actionSignInUser = (data) => ({
    type: SIGN_IN,
    payload: data,
})

export const actionSignInUserGoogle = (data) => ({
    type: SIGN_IN_GOOGLE,
    payload: data,
})

export const actionSignUpUserGoogle = (data) => ({
    type: SIGN_UP_GOOGLE,
    payload: data,
})

export const actionSetTitleId = (data) => ({
    // console.log("DATA", data);
    type: SET_TITLE_ID,
    payload: data
})

export function getStoryData() {
    console.log("Working");
    return (dispatch) => {
        try {
            axios.get('http://localhost:3000/api/getStoryData')
                .then((response) => {
                    const data = response.data;
                    console.log(data);
                    dispatch(actionGetStoryData(data));
                })
                .catch((error) => {
                    const data = error.response;
                    dispatch(actionGetStoryData(data));
                    console.log(error);
                })
        }
        catch (error) {
            console.log(error);
        }
    }
}

export function setStoryData(title, story) {
    console.log("DATAAAAAA", title, story)
    return (dispatch) => {
        try {
            axios.post('http://localhost:3000/api/addStory', { title, story })
                .then((response) => {
                    dispatch(actionSetStoryData(response));
                    console.log("Response", response);
                })
                .catch((error) => {
                    const data = error.response;
                    dispatch(actionSetStoryData(data));
                    console.log("Set Story Error", error);
                })
        }
        catch (error) {
            console.log(error);
        }
    }
}

export function deleteStoryData(id) {
    return (dispatch) => {
        try {
            axios
                .delete(`http://localhost:3000/api/deleteStory/${id}`)
                .then((response) => {
                    dispatch(actionDeleteStoryData(response.data.deletedStory));
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
    console.log("DATAAAAAA", email, password)
    return (dispatch) => {
        try {
            axios.post('http://localhost:3000/OMS-api/auth/signin', { email, password })
                .then((response) => {
                    dispatch(actionSignInUser(response));
                    console.log("Response", response);
                })
                .catch((error) => {
                    const data = error.response;
                    dispatch(actionSignInUser(data));
                    console.log("Sign IN error", error);
                })
        }
        catch (error) {
            console.log(error);
        }
    }
}

export function signUpUser(username, email, password) {
    console.log("DATAAAAAA", username, email, password)
    return (dispatch) => {
        try {
            axios.post('http://localhost:3000/OMS-api/auth/signup', { username, email, password })
                .then((response) => {
                    dispatch(actionSignUpUser(response));
                    console.log("Response", response);
                })
                .catch((error) => {
                    const data = error.response;
                    dispatch(actionSignUpUser(data));
                    console.log("Sign up error", error);
                })
        }
        catch (error) {
            console.log(error);
        }
    }
}

export function signInUserGoogle(email) {
    console.log("DATAAAAAA", email)
    return (dispatch) => {
        try {
            axios.post('http://localhost:3000/OMS-api/auth/google', { email })
                .then((response) => {
                    dispatch(actionSignInUserGoogle(response));
                    console.log("Response", response);
                })
                .catch((error) => {
                    const data = error.response;
                    dispatch(actionSignInUserGoogle(data));
                    console.log("Sign IN error", error);
                })
        }
        catch (error) {
            console.log(error);
        }
    }
}

export function signUpUserGoogle(name, email, photo) {
    photo = photo.toString();
    return (dispatch) => {
        try {
            axios.post('http://localhost:3000/OMS-api/auth/google', { name, email, photo })
                .then((response) => {
                    dispatch(actionSignUpUserGoogle(response));
                    console.log("Response", response);
                })
                .catch((error) => {
                    const data = error.response;
                    dispatch(actionSignUpUserGoogle(data));
                    console.log("Sign Up google error", error);
                })
        }
        catch (error) {
            console.log(error);
        }
    }
}
