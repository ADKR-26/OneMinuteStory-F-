import axios from "axios";

import { GET_STORY_DATA } from "./action-types";

export const actionGetStoryData = (data) => ({
    type: GET_STORY_DATA,
    payload: data,
});

export function getStoryData() {
    console.log("Working");
    return (dispatch) => {
        try {
            axios.get('http://localhost:8000/getStoryData')
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