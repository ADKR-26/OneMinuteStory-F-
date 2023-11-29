import { useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useDispatch } from 'react-redux';
import { setStoryData } from '../store/action';

function AddExistingStory({ title }) {

    // console.log("TITLEEE", title);

    const dispatch = useDispatch();
    const setTitle = title;
    const [timer, setTimer] = useState(null);
    const [remainingTime, setRemainingTime] = useState(60);
    const [isTyping, setIsTyping] = useState(false);
    // const [formData, setFormData] = useState({});
    const [timerStarted, setTimerStarted] = useState(false);

    const [form] = Form.useForm();

    const onFinish = (values) => {
        // setFormData(values);
        console.log('Success:', values);
        const data = {
            title: values.title,
            story: [
                {
                    content: values.story
                }
            ]
        }
        dispatch(setStoryData(data.title, data.story))
        // console.log('FORM DATA:', form.getFieldsValue());
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        console.log("ERROR");
    };

    useEffect(() => {
        if (remainingTime === 0) {
            const button = document.getElementById('submit-button');
            const resetButton = document.getElementById('reset-button');
            if (button) {
                button.click();
            }

            setTimeout(() => {
                resetButton.click();
            }, 1000);
        }
    }, [remainingTime]);

    const handleTyping = () => {
        if (!timerStarted) {
            setIsTyping(true);
            setTimerStarted(true);
            setTimer(setTimeout(handleTimeout, 60000));
            setRemainingTime(5);
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
                form={form}
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
                    title: setTitle
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
                        // placeholder="Please enter your title here!"
                        autoSize={{
                            minRows: 2,
                            maxRows: 10,
                        }}
                        disabled
                    // defaultValue={setTitle}
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
                            id="submit-button"
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
                            id="reset-button"
                            htmlType="button"
                            className="bg-blue-600 hover:bg-blue-500 transition duration-300"
                            onClick={resetData}
                        >
                            Reset
                        </Button>
                    </div>
                </Form.Item>

                {remainingTime > 0 ?
                    <p></p>
                    :
                    <p>Time Expired!! Your story is submitted..</p>
                }

                <p className="flex justify-center mt-8">
                    The Story will auto Submit when timer reaches to zero.
                </p>
            </Form>

            {/* FORM END */}

            {/* {isTyping && ( */}
            <div className="mt-4 text-center text-lg font-bold">
                {remainingTime > 0 ? `Time Remaining: ${remainingTime} seconds` : 'Time Expired'}
            </div>
            {/* )} */}
        </div>
    );
}

export default AddExistingStory;
