import React from 'react'
// import { BrowserRouter as Router } from 'react-router-dom';
// import { Switch, Route } from 'react-router-dom';
import {
    Routes,
    Route,
} from 'react-router-dom';
import HomePage2 from '../components/homepage2/homepage2';
import StoryFeed from '../pages/StoryFeed';
import ViewTile from '../pages/ViewTile';
import AddStory from '../pages/AddStory';

function AppRouter() {
    return (
        <Routes>
            {/* <Switch> */}
            <Route exact path="/" element={<HomePage2/>} />
            <Route path="/story_details" element={<StoryFeed/>} />
            <Route path="/view_stories" element={<ViewTile />} />
            <Route path="/add_story" element={<AddStory />} />
            {/* Additional routes */}
            {/* </Switch> */}
        </Routes>
    )
}

export default AppRouter