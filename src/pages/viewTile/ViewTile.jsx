import { useSelector } from "react-redux";
import TitleCard from "../../components/Card/TitleCard";
import { useEffect } from "react";

import "./viewTile.scss";

function ViewTile() {
  const titleData = useSelector(
    (state) => state?.oneMinuteStory?.storyData || []
  );

  const renderTile = (data) => {
    return data?.map((tile) => {
      return (
        <TitleCard
          key={tile.id}
          id={tile.id}
          title={tile.title}
          story={tile.story}
          author={tile.author}
          email={tile.email}
        />
      );
    });
  };

  useEffect(() => {
    // console.log("");
  }, [titleData]);

  return (
    <div>
      <p className="text-5xl flex justify-center mb-20 mt-20 font-bold">
        STORY DATA
      </p>
      {typeof titleData == Array && renderTile(titleData)}
    </div>
  );
}

export default ViewTile;
