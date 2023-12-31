import { useState, useEffect, useCallback } from "react";
import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setStoryData } from "../../store/action";
import { useNavigate } from "react-router-dom";

import "./addStory.scss";

function AddStory({ titleData }) {
  const dispatch = useDispatch();
  const currentUser = useSelector(
    (state) => state?.oneMinuteStory?.currentUser?.data
  );

  const navigate = useNavigate();
  const [remainingTime, setRemainingTime] = useState(60);
  const [isDisable, setDisable] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {
    setDisable(true);
    if (currentUser?.email) {
      const payload = {
        title: values.title,
        story: [
          {
            content: values.story,
          },
        ],
        writerName: currentUser?.username,
      };
      setIsTyping(false);
      resetData();
      dispatch(
        setStoryData(
          {
            title: payload?.title,
            story: payload?.story,
            email: currentUser?.email,
            username: payload.writerName,
          },
          navigate("/")
        )
      );
    } else {
      navigate("/sign-in");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (remainingTime === 0) {
    console.log("Timer expired!");
  }

  const resetData = useCallback(() => {
    setTimeout(() => {
      form.resetFields();
      setRemainingTime(60);
      setDisable(false);
    }, 2000);
    setIsTyping(false);
  }, [form]);

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

  // automatically clicks submit button after time expires and then resets form
  useEffect(() => {
    if (remainingTime === 0) {
      form.submit();
      resetData();
    }
  }, [form, remainingTime, resetData]);

  const formStyleProp = {
    labelCol: {
      span: 8,
    },
    style: {
      maxWidth: 600,
    },
  };

  const componentProps = {
    isTyping,
    isDisable,
    remainingTime,
    setIsTyping,
  };

  const formProps = {
    name: "basic",
    form,
    onFinish,
    onFinishFailed,
    initialValues: {
      title: titleData || "",
    },
    autoComplete: "off",
    ...formStyleProp,
  };

  return <FromContainer formProps={formProps} componentProp={componentProps} />;
}

function FromContainer({ formProps, componentProp }) {
  const { isTyping, setIsTyping, isDisable, remainingTime } = componentProp;
  return (
    <div className="add-story-wrapper">
      <div className="add-story-left-container">
        <Form className="w-80" {...formProps}>
          <Form.Item
            name="title"
            rules={[
              {
                required: true,
                message: () => (
                  <>
                    What should I call this 🤨 <strong>A tragedy</strong>
                  </>
                ),
              },
            ]}
          >
            <Input.TextArea
              rows={2}
              disabled={isDisable}
              onChange={() => setIsTyping(true)}
              placeholder="Choose your title"
              style={{
                resize: "none",
              }}
            />
          </Form.Item>
          <Form.Item
            name="story"
            rules={[
              {
                required: isTyping,
                message: "Story without a story ehhh!!!",
              },
            ]}
          >
            <Input.TextArea
              className="h-48"
              placeholder="Tell your story here...."
              cols={60}
              rows={18}
              disabled={!isTyping || isDisable}
              onPaste={(e) => e.preventDefault()}
              style={{
                resize: "none",
              }}
            />
          </Form.Item>
          <ButtonComponent />
        </Form>
      </div>
      <div className="add-story-right-container">
        <div>
          <p>Tell your story in words, But time is going.</p>
        </div>
        <div>
          <p>Timer will start as soon as you start typing your story</p>
        </div>
        <div>
          <span>Timer: </span>
          <span className={remainingTime > 20 ? "good" : "late"}>
            {remainingTime}s
          </span>
        </div>
      </div>
    </div>
  );
}

function ButtonComponent() {
  return (
    <div className="control-btn-container">
      <Button className="w-full" type="primary" htmlType="submit">
        Add
      </Button>
      <Button type="default">Want more time ?</Button>
    </div>
  );
}

export default AddStory;
