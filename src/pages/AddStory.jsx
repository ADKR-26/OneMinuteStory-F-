import { useState, useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
import { getStoryData, setStoryData } from "../store/action";
import { useNavigate } from "react-router-dom";

function AddStory({ titleData }) {
    const dispatch = useDispatch();
    const currentUser = useSelector(
        (state) => state?.oneMinuteStory?.currentUser?.data
    );

    const navigate = useNavigate();

    // console.log("User", currentUser);

    // const [timer, setTimer] = useState(null);
    const [remainingTime, setRemainingTime] = useState(5);
    const [isTyping, setIsTyping] = useState(false);
    const [titleEntered, setTitleEntered] = useState(true);
    const [title, setTitle] = useState(titleData);
    // const [formData, setFormData] = useState({});
    const [timerStarted, setTimerStarted] = useState(false);

    const [form] = Form.useForm();

    // console.log("Title", title);
    // console.log("EMAILLL", currentUser);

    const onFinish = (values) => {
        // setFormData(values);
        if (currentUser?.email) {
            console.log("Success:", values);
            const data = {
                title: values.title,
                story: [
                    {
                        content: values.story,
                    },
                ],
                writerName: currentUser?.username,
                // email: currentUser.email,
            };
            // setRemainingTime(5);
            // setTimerStarted(false);
            setIsTyping(false);
            resetData();
            console.log("EMAILLL", currentUser);
            dispatch(
                setStoryData(
                    data.title,
                    data.story,
                    currentUser?.email,
                    currentUser?.username
                )
            );

            setTimeout(() => {
                dispatch(getStoryData());
            }, 500);
        } else {
            navigate("/sign-in");
        }

        // console.log('FORM DATA:', form.getFieldsValue());
    };

    const handleTitleChange = (e) => {
        const newTitle = e.target.value;
        setTitle(newTitle);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    // automatically clicks submit button after time expires and then resets form
    useEffect(() => {
        if (remainingTime === 0) {
            const button = document.getElementById("submit-button");
            const resetButton = document.getElementById("reset-button");
            if (button) {
                button.click();
            }

            setTimeout(() => {
                resetButton.click();
            }, 1000);
        }
    }, [remainingTime]);

    // to check whether the user has started typing his/her story or not
    const handleTyping = () => {
        if (!timerStarted) {
            setIsTyping(true);
            setTimerStarted(true);
            // setTimer(setTimeout(handleTimeout, 5000));
            // setRemainingTime(5);
        }
    };

    const handleTimeout = () => {
        console.log("Timer expired!");
        setIsTyping(false);
    };

    if (remainingTime === 0) {
        console.log("Timer expired!");
    }

    const resetData = () => {
        setIsTyping(false);
        setTimerStarted(false);
        // setRemainingTime(5);
        setTitle(titleData);
        // setStoryText('')
        setTimeout(() => {
            setRemainingTime(5);
            form.resetFields();
        }, 500);
        // form.resetFields();
    };

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
        <div className="flex flex-col items-center justify-center">
            {!currentUser?.email ? (
                <h1 className="text-7xl text-red-500 mt-80">
                    {" "}
                    Please Sign In before adding story
                </h1>
            ) : (
                <>
                    <h4>
                        {" "}
                        Timer will start as soon as you starts typing your story
                    </h4>

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
                            title: titleData ? title : "",
                        }}
                        disabled={currentUser?.email ? false : true}
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
                                    message: "Please enter your title here!",
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
                                disabled={titleData ? true : false}
                                onChange={handleTitleChange}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Story"
                            name="story"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter your story here!",
                                },
                            ]}
                        >
                            {/* <Input.Password /> */}
                            <TextArea
                                className="w-96 h-48"
                                placeholder="Enter Your Story Here"
                                disabled={title === undefined ? true : false}
                                autoSize={{
                                    minRows: 2,
                                    maxRows: 10,
                                }}
                                onPaste={(e) => e.preventDefault()}
                                // onCopy={(e) => e.preventDefault()}
                                // onCut={(e) => e.preventDefault()}
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
                                    htmlType="submit"
                                    id="submit-button"
                                    size="large"
                                    className="bg-blue-600 hover:bg-blue-500 transition duration-300"
                                >
                                    Add Story, button to be removed
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

                        {remainingTime > 0 ? (
                            <p></p>
                        ) : (
                            <p>Time Expired!! Your story is submitted..</p>
                        )}

                        <p className="flex justify-center mt-8">
                            The Story will auto Submit when timer reaches to
                            zero.
                        </p>
                    </Form>

                    {/* FORM END */}

                    <div className="mt-4 text-center text-lg font-bold">
                        {remainingTime > 0
                            ? `Time Remaining: ${remainingTime} seconds`
                            : "Time Expired"}
                    </div>
                </>
            )}
        </div>
    );
}

export default AddStory;
