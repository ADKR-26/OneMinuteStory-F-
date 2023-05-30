import StoryCard from "../storyCard/StoryCard"
import { getStoryData, setStoryData } from '../../store/action';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input } from 'antd';

const { TextArea } = Input;

function HomePage() {

    const dispatch = useDispatch();
    const [story, setStory] = useState('');

    const StoryData = useSelector((state) => state?.oneMinuteStory?.storyData);

    // console.log("THE DATA", StoryData);

    useEffect(() => {
        dispatch(getStoryData());
    }, [story])                     // to be checked with StoryData

    const handlePaste = (e) => {
        e.preventDefault(); 
    };

    const handleAddStory = () => {
        // Handle adding the story logic here
        dispatch(setStoryData(story))
        console.log('Button', story);
        setStory('');
    };

    return (
        <div>
            {StoryData.map((data) => {
                return <StoryCard key={data._id} storyData={data.story} id={data._id} />
            })}

            <div className="flex justify-center items-center mt-8">
                <TextArea
                    style={{ width: 900, height: 300 }}
                    placeholder="Write your Story Here..."
                    autoSize={{
                        minRows: 2,
                        maxRows: 100,
                    }}
                    value={story}
                    onChange={(e) => setStory(e.target.value)}
                    onPaste={handlePaste}
                />
            </div>

            <div className="flex justify-center items-center mt-8">
                <Button type="primary" size="large" onClick={handleAddStory}>
                    Add Story
                </Button>
            </div>
        </div>
    )
}

export default HomePage