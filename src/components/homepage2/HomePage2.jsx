import { Button, Card } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getStoryData } from '../../store/action';
import TitleCard from '../Card/TitleCard';
import { Intro } from '../../assets/Data';
import Header from '../header/Header';
import { NavLink } from 'react-router-dom';

function HomePage2() {

    const dispatch = useDispatch();

    // console.log("INTRO", Intro[0].Introduction)

    useEffect(() => {
        dispatch(getStoryData());
    }, [])

    // const StoryTitleData = useSelector((state) => state?.oneMinuteStory?.storyData);
    // console.log("DATA", StoryTitleData);

    return (
        <div>
            {/* <Header /> */}
            <div className="flex justify-center">
                <div className="text-center">
                    <div className="flex flex-col justify-center items-center h-screen">
                        <Card
                            // className='mx-auto'
                            style={{
                                display: 'flex',
                                fontSize: 18,
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: 500,
                                width: 1000,
                                marginBottom: 10,
                                border: '4px solid rgba(150, 150, 150, 1)'
                            }}
                        >
                            {Intro[0].Introduction}
                        </Card>

                        <Button>
                            <NavLink to="/view_stories">View Stories</NavLink>
                        </Button>
                        <Button>
                            <NavLink to="/add_story">Add Story</NavLink>
                        </Button>
                    </div>
                    {/* <h2 className="text-2xl font-bold mb-4 text-center mx-auto ">
                        {Intro[0].Introduction}
                    </h2> */}

                    {/* <h2 className="text-2xl font-bold mb-4">Add New Story</h2>
                    <TextArea
                        className="w-96 h-48"
                        placeholder="Write Story Title"
                        autoSize={{
                            minRows: 2,
                            maxRows: 10,
                        }}
                    />
                    <div className="flex justify-center items-center mt-8">
                        <Button
                            type="primary"
                            size="large"
                            className="bg-blue-600 hover:bg-blue-500 transition duration-300"
                        >
                            Add Story
                        </Button>
                    </div> */}
                </div>
            </div>

            {/* <h1> STORY DATA </h1>
            {
                StoryTitleData.map((data) => (
                    <TitleCard key={data._id} id={data._id} titleData={data.title} />
                ))
            } */}

        </div >
    )
}

export default HomePage2