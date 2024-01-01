import { useState } from "react";
import { useSelector } from "react-redux";
import AddStory from "../addStory/AddStory";

import "./storyFeed.scss";
import { Switch } from "antd";

function StoryFeed() {
  const [paraOption, setOption] = useState(true);
  const titleId = useSelector((state) => state?.oneMinuteStory?.titleId);
  const storyData = useSelector((state) => state?.oneMinuteStory?.storyData);

  const specificStory = storyData?.find((item) => item?._id === titleId);

  const optionRender = (story) => {
    if (paraOption) {
      return (
        <div className="storyFeed-paragraph">
          {story?.map((item) => item.content).join(" ")}
        </div>
      );
    } else {
      return story.map((story) => (
        <div key={story._id}>&nbsp;{story.content} </div>
      ));
    }
  };

  return (
    <section id="storyFeed-jsx">
      <div>
        {specificStory ? (
          <div className="main-container">
            <div className="title-container">
              <label htmlFor=""> Title:&nbsp;</label>
              {specificStory.title.toUpperCase()}
            </div>
            <span className="para-switch-container">
              {paraOption ? "Paragraph" : "Block"} :
              <Switch
                className="para-switch"
                onChange={(prev) => setOption(!prev)}
              />
            </span>
            <div className="story-container">
              {optionRender(specificStory.story)}
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
