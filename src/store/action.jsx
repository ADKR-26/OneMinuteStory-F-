import axios from "axios";

import { GET_STORY_DATA, SET_STORY_DATA, DELETE_STORY_DATA, SET_TITLE_ID } from "./action-types";

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