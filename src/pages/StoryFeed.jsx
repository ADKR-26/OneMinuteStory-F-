import { useSelector } from "react-redux";
import AddStory from "./AddStory";

function StoryFeed() {
    const titleId = useSelector((state) => state?.oneMinuteStory?.titleId);
    const storyData = useSelector((state) => state?.oneMinuteStory?.storyData);

    const specificStory = storyData?.find((item) => item?._id === titleId);

    console.log("Specific Story", specificStory);

    return (
        <div>
            {specificStory ? (
                <div>
                    <div className="mb-5 mt-5 text-3xl flex justify-center">
                        <label htmlFor="" className="font-bold">
                            {" "}
                            Title:&nbsp;
                        </label>
                        {specificStory.title.toUpperCase()}
                    </div>
                    <div>
                        {specificStory.story.map((story) => (
                            <div key={story._id} className="flex justify-center">&nbsp;{story.content}  </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>No story found</div>
            )}
            <AddStory titleData={specificStory.title} />
        </div>
    );
}

export default StoryFeed;
