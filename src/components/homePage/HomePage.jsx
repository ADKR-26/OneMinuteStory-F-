import StoryCard from "../storyCard/StoryCard"
import { getStoryData } from '../../store/action';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function HomePage() {
    
    const dispatch = useDispatch();

    const StoryData = useSelector((state) => state?.oneMinuteStory?.storyData)
    console.log("THE DATA", StoryData);
    useEffect(() => {
        dispatch(getStoryData());
    }, [])
    return (
        <div>
            {StoryData.map((data) => {
                return <StoryCard key={data._id} storyData = {data.story} />
            })}
        </div>
    )
}

export default HomePage