import { useSelector } from "react-redux";
import TitleCard from "../../components/Card/TitleCard";
import { useEffect } from "react";

import './viewTile.scss';

function ViewTile() {
    const titleData = useSelector((state) => state?.oneMinuteStory?.storyData);

    // console.log("TITLE DATA", titleData);

    useEffect(() => {
        // console.log("");
    }, [titleData]);

    return (
        <div>
            <p className="text-5xl flex justify-center mb-20 mt-20 font-bold"> STORY DATA </p>
            {titleData.map((data) => (
                <TitleCard
                    key={data._id}
                    id={data._id}
                    titleData={data.title}
                    email={data?.email}
                    author={data?.author}
                    likes={data?.likes}
                    likedBy={data?.likedBy}
                />
            ))}
        </div>
    );
}

export default ViewTile;
