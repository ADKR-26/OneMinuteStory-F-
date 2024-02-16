import React from "react";
import { Button } from "antd";

import "./about.scss";
import { NavLink } from "react-router-dom";

function About() {
    return (
        <section id="about-jsx">
            <div className="about-page">
                <p className="title">Welcome to One Minute Story!</p>
                <p>
                    <b>Unleash Your Creativity in Just One Minute!</b> One
                    Minute Story is here to ignite your imagination and
                    challenge you to craft captivating tales in just 60 seconds.
                </p>
                <p>
                    <b>How does it work?</b>
                    <ol>
                        <li>
                            It's simple yet exhilarating! Choose a title that
                            inspires you, and the clock will start ticking the
                            moment you begin typing.
                        </li>
                        <li>
                            Feel the rush as you weave your narrative, racing
                            against time to craft a story that will leave your
                            readers spellbound.
                        </li>
                    </ol>
                </p>
                <p>
                    <b>Our Motive</b>
                </p>
                <ol>
                    <li>
                        To create a platform where people can share their own
                        thoughts for a story they are reading.
                    </li>
                    <li>
                        Multiple writers will make the story either very
                        interesting or very boring. All depends on you.
                    </li>
                    <li>
                        So make sure to give a good reading on previous story
                        content before starting to type.
                    </li>
                    <li>
                        A specific time limit is added so that it wouldn't take
                        much of your time. And if you want to add more then go
                        on, but remember the timer will always follow you.
                    </li>
                </ol>
                <br />
                <p>
                    <b>
                        We don't want full story from you. You just need to make
                        the pillar of the story and then rest will continued by
                        other story writers
                    </b>
                </p>
                <p>
                    <b>
                        So what are you waiting for let's begin an Interesting
                        Story ...
                    </b>
                </p>

                <div className="button-container">
                    {/* <button> Let's Begin</button> */}
                    <Button>
                        <NavLink to="/add_story">Let's Begin</NavLink>
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default About;
