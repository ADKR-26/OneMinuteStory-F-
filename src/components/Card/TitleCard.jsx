import { Button, Card, Popconfirm, message } from "antd";
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import {
    actionSetTitleId,
    deleteStoryData,
    getStoryData,
    likeStory,
} from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import {
    DeleteOutlined,
    HeartOutlined,
    HeartFilled,
    QuestionCircleOutlined,
} from "@ant-design/icons";

import "./titleCard.scss";
// import { useState } from "react";

function TitleCard({ titleData, id, email, author, likes, likedBy }) {
    // const [liked, setLiked] = useState(false);

    const currentUser = useSelector(
        (state) => state?.oneMinuteStory?.currentUser?.data
    );

    // console.log(author);

    console.log("LIKED BY", likedBy);

    const dispatch = useDispatch();

    const setTitleId = () => {
        dispatch(actionSetTitleId(id));
        // console.log("DATA DELETED");
    };

    const deleteStory = (id) => {
        dispatch(deleteStoryData(id));

        setTimeout(() => {
            //TODO: Need to find a different way to rerender the data
            dispatch(getStoryData());
        }, 500);
    };

    const confirm = (e) => {
        // console.log(e);
        deleteStory(id);
        message.success("Story Deleted !!");
    };

    const likePost = async (id, email) => {
        try {
            dispatch(likeStory(id, email));
            // dispatch(getStoryData());
            // setLiked(!liked);
            console.log("CLICKED", id, email);
        } catch (error) {
            console.log("Error in liking Story");
        }
    };

    return (
        <section id="titleCard-jsx">
            <div className="main-container">
                {/* Current Stories */}
                <Card key={id} className="card-content">
                    {currentUser?.email === email ? (
                        <Popconfirm
                            title="Delete the Story"
                            description="Are you sure you want to delete this story?"
                            onConfirm={confirm}
                            // onCancel={cancel}
                            okText={
                                <span className="text-black font-semibold">
                                    Yes
                                </span>
                            }
                            cancelText={
                                <span className="text-red-500 font-semibold">
                                    No
                                </span>
                            }
                        >
                            <DeleteOutlined className="absolute top-0 right-4 cursor-pointer text-2xl text-red-500" />
                        </Popconfirm>
                    ) : (
                        ""
                    )}

                    {likedBy.includes(currentUser?.email) ? (
                        <HeartFilled
                            onClick={() => likePost(id, currentUser?.email)}
                            className="absolute bottom-6 right-4 cursor-pointer text-2xl text-red-500 "
                        />
                    ) : (
                        <HeartOutlined
                            onClick={() => likePost(id, currentUser?.email)}
                            className="absolute bottom-6 right-4 cursor-pointer text-2xl text-red-500 "
                        />
                    )}

                    <p className="absolute bottom-1 right-6 cursor-pointer text-1xl text-red-500">
                        {" "}
                        {likes}{" "}
                    </p>

                    <p className="p-10 text-2xl">
                        <label className="font-bold">Title:</label> {titleData}{" "}
                    </p>
                    <div className="flex justify-center">
                        <Button
                            className="button"
                            onClick={setTitleId}
                            // className="text-xl h-12 bg-blue-900 text-white uppercase font-semibold py-2 rounded-xl shadow-xl"
                        >
                            <NavLink
                                to={{
                                    pathname: "/story_details",
                                    // state: { key: demo }
                                }}
                            >
                                View
                            </NavLink>
                        </Button>
                    </div>
                    <div className="flex justify-center text-lg font-semibold">
                        <label htmlFor="">Author: {author} </label>
                    </div>
                </Card>
            </div>
        </section>
    );
}

TitleCard.propTypes = {
    titleData: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    likedBy: PropTypes.arrayOf(PropTypes.string).isRequired, // Ensure likedBy is an array of strings
}

export default TitleCard;
