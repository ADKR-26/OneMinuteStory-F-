import { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';

function AddStory() {
    const [timer, setTimer] = useState(null);
    const [remainingTime, setRemainingTime] = useState(60);
    const [isTyping, setIsTyping] = useState(false);
    // const [storyText, setStoryText] = useState('');
    const [timerStarted, setTimerStarted] = useState(false);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
        // console.log(getFieldsValues(true))
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    

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

    const resetData = () => {
        setIsTyping(false);
        setTimerStarted(false);
        setRemainingTime(60);
        // setStoryText('')
        form.resetFields();
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

            {/* FORM */}

            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 600,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Title"
                    name="title"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your title here!',
                        },
                    ]}
                >
                    {/* <Input /> */}
                    <TextArea
                        className="w-96 h-48"
                        placeholder="Please enter your title here!"
                        autoSize={{
                            minRows: 2,
                            maxRows: 10,
                        }}
                    // onChange={handleTyping}
                    />
                </Form.Item>

                <Form.Item
                    label="Story"
                    name="story"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter your story here!',
                        },
                    ]}
                >
                    {/* <Input.Password /> */}
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
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <div className="flex justify-center mt-8">
                        <Button
                            type="primary"
                            htmlType='submit'
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
                            htmlType="button"
                            className="bg-blue-600 hover:bg-blue-500 transition duration-300"
                            onClick={resetData}
                        >
                            Reset
                        </Button>
                    </div>
                </Form.Item>
            </Form>

            {/* FORM END */}

            {/* <TextArea
                className="w-96 h-48"
                placeholder="Write Your Story Title Here"
                autoSize={{
                    minRows: 2,
                    maxRows: 10,
                }}
            onChange={handleTyping}
            />
            <br />
            <TextArea
                className="w-96 h-48"
                placeholder="Enter Your Story Here"
                autoSize={{
                    minRows: 2,
                    maxRows: 10,
                }}
                value={storyText}    this is causing some problem to be checked
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
            </div> */}

            {/* {isTyping && ( */}
            <div className="mt-4 text-center text-lg font-bold">
                {remainingTime > 0 ? `Time Remaining: ${remainingTime} seconds` : 'Time Expired'}
            </div>
            {/* )} */}
        </div>
    );
}

export default AddStory;
