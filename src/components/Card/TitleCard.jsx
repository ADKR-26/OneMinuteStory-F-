import { Button, Card } from "antd";
import { NavLink } from "react-router-dom";
import { actionSetTitleId, deleteStoryData } from "../../store/action";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";

function TitleCard({ titleData, id, email }) {
    const currentUser = useSelector(
        (state) => state?.oneMinuteStory?.currentUser?.data
    );

    // console.log("EMAIL", email);

    const dispatch = useDispatch();

    const setTitleId = () => {
        dispatch(actionSetTitleId(id));
        // console.log("DATA DELETED");
    };

    const deleteStory = (id) => {
        dispatch(deleteStoryData(id));
        // window.location.reload();          //! will reload / re-render when data is deleted not working
    };

    return (
        <div className="flex justify-center">
            {/* Current Stories */}
            <Card
                key={id}
                // className="border border-black-1100 rounded-lg"
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 900,
                    marginBottom: 10,
                    border: "2px solid rgba(150, 150, 150, 1)",
                }}
            >
                {currentUser?.email === email ? (
                    <DeleteOutlined
                        className="absolute top-0 right-1 cursor-pointer"
                        onClick={() => deleteStory(id)}
                    />
                ) : (
                    ""
                )}
                <p className="p-10"> {titleData} </p>
                <Button onClick={setTitleId}>
                    <NavLink
                        to={{
                            pathname: "/story_details",
                            // state: { key: demo }
                        }}
                    >
                        View
                    </NavLink>
                </Button>
            </Card>
        </div>
    );
}

export default TitleCard;
