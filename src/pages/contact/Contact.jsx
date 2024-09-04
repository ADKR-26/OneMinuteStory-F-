import { useRef, useState } from "react";
import "./contact.scss";

import emailjs from "@emailjs/browser";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";

function Contact() {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [formComplete, setFormComplete] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [dataSent, setDataSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    if (form.name && form.email && form.message) {
      setFormComplete(true);
    } else {
      // alert("Please fill in all fields before sending.");
      setFormComplete(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setButtonClicked(true);
      return;
    }
    setButtonClicked(true);
    if (formComplete) {
      setButtonClicked(false);
      setLoading(true);

      // console.log(form);

      emailjs
        .send(
          "service_6scoudi",
          "template_waqa5fd",
          {
            from_name: form.name,
            to_name: "Aaditya",
            from_email: form.email,
            to_email: "adityavishwakarma2011@gmail.com",
            message:
              "Message -> " +
              form.message +
              "\n --message-end-- \n " +
              "Sender's Email -> " +
              form.email +
              "\n from OMS",
          },
          "-I4bcO95uFf75ftMh"
        )
        .then(
          () => {
            setLoading(false);
            setDataSent(true);
            // alert('Thank you. I will get back to you as soon as possible.')
            setForm({
              name: "",
              email: "",
              message: "",
            });

            setTimeout(() => {
              setDataSent(false);
            }, 3000);
          },
          (error) => {
            setLoading(false);
            console.log(error);
            alert("Something went wrong");
          }
        );
    } else {
      null;
    }
  };

  return (
    <section id="contact-jsx">
      {/* <p className="sm:text-[18px] text-[14px] text-secondary uppercase tracking-wider">Get in touch</p> */}

      <h3 className="text-black font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px]">
        <div className="flex gap-4 text-3xl text-blue-900">
          <a href="https://github.com/ADKR-26">
            <AiOutlineGithub />
          </a>
          <a href="https://www.linkedin.com/in/aaditya-kumar26/">
            <AiOutlineLinkedin />
          </a>
        </div>
        Contact
      </h3>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="mt-12 flex flex-col gap-8"
      >
        <label className="flex flex-col">
          <span className="text-black font-medium mb-4">Your Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="What's your name?"
            className="bg-tertiary 
                py-4 
                px-6
                placeholder:text-secondary
                text-black
                rounded-lg
                outlined-none
                border-none
                font-medium"
          />
          {!form.name && buttonClicked && (
            <p className="text-red-500">Please enter your name</p>
          )}
        </label>

        <label className="flex flex-col">
          <span className="text-black font-medium mb-4">Your Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="What's your email?"
            className="bg-tertiary 
                py-4 
                px-6
                placeholder:text-secondary
                text-black
                rounded-lg
                outlined-none
                border-none
                font-medium"
          />
          {!form.email && buttonClicked && (
            <p className="text-red-500">Please enter your email</p>
          )}
        </label>
        <label className="flex flex-col">
          <span className="text-black font-medium mb-4">Your Message</span>
          <textarea
            rows="7"
            type="text"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="What do you want to say?"
            className="bg-tertiary 
                py-4 
                px-6
                placeholder:text-secondary
                text-black
                rounded-lg
                outlined-none
                border-none
                font-medium"
          />
          {!form.message && buttonClicked && (
            <p className="text-red-500">Please enter your message</p>
          )}
        </label>

        <button
          type="submit"
          className="bg-tertiary
              py-3
              px-8
              outline-none
              w-fit
              text-black
              font-bold
              shadow-md
              shadow-primary
              rounded-xl"
          // disabled={!form.name || !form.email || !form.message || loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>

        {dataSent && (
          <p className="text-green-500">
            Thank you. I will get back to you as soon as possible.
          </p>
        )}

        {/* <div className="flex gap-4 text-3xl">
          <a href="https://github.com/ADKR-26">
            <AiOutlineGithub />
          </a>
          <a href="https://www.linkedin.com/in/aaditya-kumar26/">
            <AiOutlineLinkedin />
          </a>
        </div> */}

        {/* {dataSent && (
          <p className="text-green-500">
            Thank you. I will get back to you as soon as possible.
          </p>
        )} */}
      </form>
    </section>
  );
}

export default Contact;
