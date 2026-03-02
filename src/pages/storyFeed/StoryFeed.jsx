import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddStory from "../addStory/AddStory";
import {
  generateStoryData,
  getStoryData,
  setStoryData,
  generateCoverImage,
  getCoverImage
} from "../../store/action";
import { useDispatch } from "react-redux";

import "./storyFeed.scss";
import { Button, Switch } from "antd";
import test_image from "../../assets/test_image.png";

function StoryFeed() {
  const dispatch = useDispatch();
  const [generatedStory, setGeneratedStory] = useState("");
  const [generatedStoryDataAdded, setGeneratedStoryDataAdded] = useState(false);
  const [disabledGenerateButton, setDisabledGenerateButton] = useState(false);

  const [image, setImage] = useState("");

  const [paraOption, setOption] = useState(true);
  const titleId = useSelector((state) => state?.oneMinuteStory?.titleId);
  const storyData = useSelector((state) => state?.oneMinuteStory?.storyData);
  const generatedStoryData = useSelector((state) => state?.oneMinuteStory);
  const coverImage = useSelector(
    (state) => state?.oneMinuteStory?.generatedCoverImage?.image
  );
  const currentUser = useSelector(
    (state) => state?.oneMinuteStory?.currentUser?.data
  );
  console.warn("STORY FEED RENDERED", storyData);
  console.warn("titleId", titleId);
  const specificStory = storyData?.find((item) => item?._id === titleId);
  console.warn("specificStory", specificStory);

  useEffect(() => {
    const storyId = specificStory._id;

    // if (specificStory) {
    //   console.info("Specific Story:", specificStory);
    //   setImage(specificStory?.mainCoverImage);
    // } else {
    //   setImage(test_image);
    // }
    // // Fetch story data when the component mounts
    // dispatch(getStoryData());
    // getCoverImage(storyId);
    showCoverImageOnLoad(storyId);
  },[image])

  const optionRender = (story) => {
    console.log("Rendering story with option:", story, paraOption);
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

  const handleAddGeneratedStory = () => {
    const data = {
      title: specificStory.title,
      story: [
        {
          content: generatedStory,
        },
      ],
      writerName: currentUser?.username,
      // email: currentUser.email,
    };
    dispatch(
      setStoryData(
        data?.title,
        data?.story,
        currentUser?.email,
        currentUser?.username
      )
    );
    setGeneratedStoryDataAdded(true);
    setTimeout(() => {
      dispatch(getStoryData());
    }, 500);
  };

  const handleGenerateCoverImage = async () => {
    // console.info("Generating cover image for story:", specificStory.title);
    // console.info("Generating cover image...", specificStory);
    const storyId = specificStory._id;
    const combinedStory = specificStory.scenes
      .map((item) => item.content)
      .join(" ");
    // await dispatch(generateCoverImage(combinedStory, storyId));
    const newImage = await generateCoverImage(combinedStory, storyId);
    console.warn("combinedStory:", combinedStory);
    console.warn("Generated Image:", newImage);

    // const coverImageData = await getCoverImage(storyId);
    // console.warn("Before", image);
    setImage(newImage?.image);
    // console.warn("After", image);
  };

  const showCoverImageOnLoad = async (storyId) => {
    const check = await getCoverImage(storyId);
    console.error("Fetching cover image for storyId:", check);
    setImage(check.mainCoverImage);
  }

  const handleGenerateStory = async () => {
    try {
      const combinedStory = specificStory.story
        .map((item) => item.content)
        .join(" ");

      //TODO: send combinedStory to the backend

      // await dispatch(generateStoryData(specificStory.story));
      await dispatch(generateStoryData(combinedStory));
      setDisabledGenerateButton(true);
      // console.log(
      //   "RESULT ACTION",
      //   generatedStoryData.generatedStory.data.generatedStoryData
      // );
      setGeneratedStory(
        generatedStoryData.generatedStory.data.generatedStoryData // TODO: make this look better
      );
      setGeneratedStoryDataAdded(false);
      setTimeout(() => {
        setDisabledGenerateButton(false);
      }, 5000);
    } catch (error) {
      setGeneratedStory(
        "Sorry, we could not generate a story for you. Please try again later."
      );
      setTimeout(() => {
        setDisabledGenerateButton(false);
      }, 5000);
      console.error("Error generating story:", error);
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
            <div className="imageContainer">
              <img src={image} alt="Cover Image" />
            </div>
            <div className="story-container">
              {optionRender(specificStory.scenes)}
            </div>

            {currentUser?.email ? (
              <div>
                <div
                  className={
                    disabledGenerateButton
                      ? "disabled-button-container"
                      : "button-container"
                  }
                >
                  <Button
                    disabled={disabledGenerateButton}
                    onClick={handleGenerateStory}
                    title={
                      disabledGenerateButton
                        ? "Please wait for 5 seconds"
                        : undefined
                    }
                  >
                    AUTO GENERATE STORY
                  </Button>

                  {/* {image && (
                    <img
                      src={image}
                      alt="Generated"
                      style={{
                        width: "200px",
                        height: "200px",
                        border: "2x solid red",
                      }}
                    />
                  )} */}
                  <Button
                    // disabled={disabledGenerateButton}
                    onClick={handleGenerateCoverImage}
                    // title={
                    //   disabledGenerateButton
                    //     ? "Please wait for 5 seconds"
                    //     : undefined
                    // }
                  >
                    Generate Cover Image
                  </Button>
                </div>
                {generatedStory ? (
                  // <div>{generatedStory}</div>
                  <div>
                    <div className="generatedStory-container">
                      {generatedStory}
                    </div>
                    <div
                      className={
                        generatedStoryDataAdded
                          ? "disabled-button-container"
                          : "button-container"
                      }
                    >
                      <Button
                        onClick={handleAddGeneratedStory}
                        disabled={generatedStoryDataAdded}
                        title={
                          generatedStoryDataAdded
                            ? "Story already added"
                            : "Add story"
                        }
                      >
                        Loved what&#39;s generated ! <br></br> Click here to add
                        it
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="generatedStory-container">
                    {" "}
                    GENERATED STORY WILL SHOW HERE
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
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
