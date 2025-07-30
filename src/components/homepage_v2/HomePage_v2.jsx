import { Button } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStoryData } from "../../store/action";
import { NavLink } from "react-router-dom";
import { PenTool, Zap, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Homepage } from "../../constants/storyConstants";

import "./homepage_v2.scss";

function HomePage2() {
  const dispatch = useDispatch();
  const storyData = useSelector(
    (state) => state?.oneMinuteStory?.storyData
  );

  useEffect(() => {
    if (storyData?.length === 0) {
      dispatch(getStoryData());
    }
  }, []);

  return (
    <section id="homepage-jsx">
      <div className="main-container">
        <div className="container">
          <motion.p
            className="title"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>
              Stories Born from
              <span>Collective Imagination</span>
            </h1>
            <p className="my-paragraph">
              Join a community of storytellers crafting
              collaborative narratives one scene at a time.
              Every 60 seconds brings new possibilities.
            </p>

            <div className="button-group">
              <button className="start-writing-btn">
                <NavLink
                  to="/add_story"
                  className="link-content"
                >
                  <PenTool className="icon" />
                  <span>Start Writing</span>
                </NavLink>
              </button>

              <button className="browse-stories-btn">
                <NavLink to="/view_stories">
                  Browse Stories
                </NavLink>
              </button>
            </div>
          </motion.p>
        </div>

        <div className="features">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="animated-grid"
          >
            <div className="feature-box">
              <div className="icon-circle">
                <Zap className="icon" />
              </div>
              <h3>60-Second Scenes</h3>
              <p>
                Write under pressure. Create magic in
                moments.
              </p>
            </div>

            <div className="feature-box">
              <div className="icon-circle">
                <Users className="icon" />
              </div>
              <h3>Collaborative</h3>
              <p>
                Build stories together with writers
                worldwide.
              </p>
            </div>

            <div className="feature-box">
              <div className="icon-circle">
                <PenTool className="icon" />
              </div>
              <h3>Immersive</h3>
              <p>
                Cinematic reading experience that
                captivates.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HomePage2;
