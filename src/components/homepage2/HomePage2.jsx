import { Button } from "antd";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStoryData } from "../../store/action";
import { NavLink } from "react-router-dom";

function HomePage2() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStoryData());
    }, []);

    return (
        <div>
            <div className="flex justify-center">
                <div className="text-center">
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-5xl font-bold mb-40 mt-40">
                            One Minute Story
                        </p>
                        <p className="text-2xl font-semibold mb-40">
                            Ignite creativity in 60 seconds! Choose a title,
                            feel the rush, and craft captivating tales against
                            the clock.
                            <br />
                            Join a vibrant community of storytellers for an
                            exhilarating journey.
                        </p>
                        <div className="flex gap-6">
                            <Button className="text-2xl h-20 bg-blue-900 text-white uppercase font-semibold py-2 rounded-3xl shadow-xl transform hover:-translate-y-2">
                                <NavLink to="/view_stories">
                                    View Stories
                                </NavLink>
                            </Button>
                            <Button className="text-2xl h-20 bg-blue-900 text-white uppercase font-semibold py-2 rounded-3xl shadow-xl transform hover:-translate-y-2">
                                <NavLink to="/add_story">Add Story</NavLink>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage2;
