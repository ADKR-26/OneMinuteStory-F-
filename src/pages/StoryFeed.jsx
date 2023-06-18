import { useSelector } from "react-redux";

function StoryFeed() {
    const titleId = useSelector((state) => state?.oneMinuteStory?.titleId);
    const storyData = useSelector((state) => state?.oneMinuteStory?.storyData);

    const specificStory = storyData.find((item) => item._id === titleId);

    console.log("IDDDDDDDDDDDDD", specificStory);

    return (
        <div>
            {specificStory ? (
                <div>
                    <h2>{specificStory.title}</h2>
                    {specificStory.story.map((story) => (
                        <div key={story._id}>{story.content}</div>
                    ))}
                </div>
            ) : (
                <div>No story found</div>
            )}
        </div>
    );
}

export default StoryFeed;
