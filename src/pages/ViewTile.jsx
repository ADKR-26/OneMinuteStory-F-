import { useSelector } from "react-redux"
import TitleCard from "../components/Card/TitleCard";

function ViewTile() {

    const titleData = useSelector((state) => state?.oneMinuteStory?.storyData);

    return (
        <div>
            <h1> STORY DATA </h1>
            {
                titleData.map((data) => (
                    <TitleCard key={data._id} id={data._id} titleData={data.title} />
                ))
            }
        </div>
    )
}

export default ViewTile