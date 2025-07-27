import { useSelector } from "react-redux";
import TitleCard from "../../components/Card/TitleCard";
import { useEffect, useState } from "react";

import "./viewTile.scss";
import { getCoverImage } from "../../store/action";

function ViewTile() {
  const titleData = useSelector((state) => state?.oneMinuteStory?.storyData);
  const [coverImages, setCoverImages] = useState({});

  useEffect(() => {
    async function fetchImages() {
      if (!titleData) return;
      const images = {};
      for (const story of titleData) {
        try {
          const data = await getCoverImage(story._id);
          images[story._id] = data?.mainCoverImage;
        } catch {
          images[story._id] = '';
        }
      }
      setCoverImages(images);
    }
    fetchImages();
  }, [titleData]);

  // useEffect(() => {
  //     console.log("TIELT DATA", titleData);
  // }, [titleData]);

  return (
    <div>
      <p className="text-5xl flex justify-center mb-20 mt-20 font-bold">
        STORIES
      </p>
      {titleData?.map((data) => (
        <TitleCard
          key={data._id}
          id={data._id}
          titleData={data.title}
          email={data?.email}
          author={data?.author}
          likes={data?.likes}
          likedBy={data?.likedBy}
          coverImage={coverImages[data._id]}
        />
      ))}
    </div>
  );
}

export default ViewTile;
