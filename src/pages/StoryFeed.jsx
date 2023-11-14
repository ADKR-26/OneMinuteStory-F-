import { useSelector } from "react-redux";
import AddStory from "./AddStory";
import AddExistingStory from "../components/AddExistinStory";

function StoryFeed() {
    const titleId = useSelector((state) => state?.oneMinuteStory?.titleId);
    const storyData = useSelector((state) => state?.oneMinuteStory?.storyData);

    const specificStory = storyData.find((item) => item._id === titleId);

    // console.log("IDDDDDDDDDDDDD", specificStory);
    return (
        <div>
            {specificStory ? (
                <div>
                    <div className="mb-5 mt-5 text-3xl">{specificStory.title.toUpperCase()}</div>
                    {specificStory.story.map((story) => (
                        <div key={story._id}>{story.content}</div>
                    ))}
                </div>
            ) : (
                <div>No story found</div>
            )}
            <AddExistingStory title={specificStory.title} />
        </div>
    );
}

export default StoryFeed;
