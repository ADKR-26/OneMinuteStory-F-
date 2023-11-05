import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getStoryData } from '../../store/action';
import StoryCard from '../Card/StoryCard';

function StoryData() {

    const dispatch = useDispatch();
    const [storyContent, setStoryContent] = useState('');

    const StoryContentData = useSelector((state) => state?.oneMinuteStory?.storyData);

    console.log(StoryContentData)
    
    useEffect(() => {
        dispatch(getStoryData());
    }, [])

    return (
        <div>
            { StoryContentData ?
                StoryContentData.map((data) => {
                    return <StoryCard key={data._id} storyData={data.story[0].content}/>
                }) : 
                <p>
                    NOT FOUND !!
                </p>
            }
        </div>
    )
}

export default StoryData