import { useSelector } from "react-redux";
import AddStory from "../addStory/AddStory";

import "./storyFeed.scss";

function StoryFeed() {
    const titleId = useSelector((state) => state?.oneMinuteStory?.titleId);
    const storyData = useSelector((state) => state?.oneMinuteStory?.storyData);

    const specificStory = storyData?.find((item) => item?._id === titleId);

    console.log("Specific Story", specificStory);

    return (
        <section id="storyFeed-jsx">
            <div>
                {specificStory ? (
                    <div className="main-container">
                        <div className="title-container">
                            <label htmlFor=""> Title:&nbsp;</label>
                            {specificStory.title.toUpperCase()}
                        </div>
                        <div className="story-container">
                            {specificStory.story.map((story) => (
                                <div key={story._id}>
                                    &nbsp;{story.content}{" "}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div>No story found</div>
                )}
                <AddStory titleData={specificStory.title} />
            </div>
        </section>
    );
}

export default StoryFeed;
