import { Button, Card, Popconfirm, message } from "antd";
import { NavLink } from "react-router-dom";
import {
    actionSetTitleId,
    deleteStoryData,
    getStoryData,
} from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";

import "./titleCard.scss";

function TitleCard({ titleData, id, email, author }) {
    const currentUser = useSelector(
        (state) => state?.oneMinuteStory?.currentUser?.data
    );

    console.log(author);

    // console.log("EMAIL", email);

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
        console.log(e);
        deleteStory(id);
        message.success("Story Deleted !!");
    };

    // const confirm = () =>
    //     new Promise((resolve) => {
    //         setTimeout(() => {
    //             message.success("Story Deleted");
    //         }, 3000);
    //     });

    // const cancel = (e) => {
    //     console.log(e);
    //     message.error("Click on No");
    // };

    return (
        <div className="flex justify-center">
            {/* Current Stories */}
            <Card
                key={id}
                // className="w-400"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 900,
                    marginBottom: 10,
                    border: "2px solid rgba(150, 150, 150, 1)",
                    boxShadow: "10px 10px rgba(210, 210, 210, 1)",
                    // gap: "20px",
                    marginTop: "20px",
                }}
            >
                {currentUser?.email === email ? (
                    // <DeleteOutlined
                    //     className="absolute top-0 right-1 cursor-pointer text-2xl text-red-500"
                    //     onClick={() => deleteStory(id)}
                    // />

                    <Popconfirm
                        title="Delete the task"
                        description="Are you sure to delete this task?"
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
                        <DeleteOutlined className="absolute top-0 right-1 cursor-pointer text-2xl text-red-500" />
                    </Popconfirm>
                ) : (
                    ""
                )}
                <p className="p-10 text-2xl">
                    <label className="font-bold">Title:</label> {titleData}{" "}
                </p>
                <div className="flex justify-center">
                    <Button
                        onClick={setTitleId}
                        className="text-xl h-12 bg-blue-900 text-white uppercase font-semibold py-2 rounded-xl shadow-xl"
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
    );
}

export default TitleCard;
