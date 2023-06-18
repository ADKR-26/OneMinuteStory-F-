import { useState, useEffect } from 'react';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';

function AddStory() {
    const [timer, setTimer] = useState(null);
    const [remainingTime, setRemainingTime] = useState(60);
    const [isTyping, setIsTyping] = useState(false);
    const [storyText, setStoryText] = useState('');
    const [timerStarted, setTimerStarted] = useState(false);

    const handleTyping = () => {
        if (!timerStarted) {
            setIsTyping(true);
            setTimerStarted(true);
            setTimer(setTimeout(handleTimeout, 60000));
            setRemainingTime(10);
        }
    };

    const handleTimeout = () => {
        console.log('Timer expired!');
        setIsTyping(false);
        // Perform any actions you want when the timer expires
    };

    if (remainingTime === 0) {
        console.log('Timer expired!');
    }

    const resetData =  () => {
        setIsTyping(false);
        setTimerStarted(false);
        setRemainingTime(60);
        setStoryText('')
    }

    useEffect(() => {
        if (remainingTime > 0 && isTyping) {
            const countdown = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);

            return () => {
                clearInterval(countdown);
            };
        }
    }, [remainingTime, isTyping]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold mb-4">Add New Story</h2>

            <TextArea
                className="w-96 h-48"
                placeholder="Write Your Story Title Here"
                autoSize={{
                    minRows: 2,
                    maxRows: 10,
                }}
            // onChange={handleTyping}
            />
            <br />
            <TextArea
                className="w-96 h-48"
                placeholder="Enter Your Story Here"
                autoSize={{
                    minRows: 2,
                    maxRows: 10,
                }}
                // value={storyText}    this is causing some problem to be checked
                onChange={handleTyping}
            />
            <div className="flex justify-center mt-8">
                <Button
                    type="primary"
                    size="large"
                    className="bg-blue-600 hover:bg-blue-500 transition duration-300"
                >
                    Add Story
                </Button>
            </div>

            <div className="flex justify-center mt-8">
                <Button
                    type="primary"
                    size="large"
                    className="bg-blue-600 hover:bg-blue-500 transition duration-300"
                    onClick={resetData}
                >
                    Reset
                </Button>
            </div>

            {isTyping && (
                <div className="mt-4 text-center text-lg font-bold">
                    {remainingTime > 0 ? `Time Remaining: ${remainingTime} seconds` : 'Time Expired'}
                </div>
            )}
        </div>
    );
}

export default AddStory;
