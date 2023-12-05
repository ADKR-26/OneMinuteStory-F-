import { useSelector } from "react-redux";
import TitleCard from "../components/Card/TitleCard";

function ViewTile() {
    const titleData = useSelector((state) => state?.oneMinuteStory?.storyData);

    return (
        <div>
            <p className="text-5xl flex justify-center mb-20 mt-20 font-bold"> STORY DATA </p>
            {titleData.map((data) => (
                <TitleCard
                    key={data._id}
                    id={data._id}
                    titleData={data.title}
                    email={data?.email}
                    author={data?.story[0]?.writerName}
                />
            ))}
        </div>
    );
}

export default ViewTile;
