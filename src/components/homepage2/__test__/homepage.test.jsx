// import React from "react";
// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import { BrowserRouter } from "react-router-dom"; // You need to wrap your component with BrowserRouter for NavLink to work
// import { Provider } from "react-redux"; // Assuming you are using Redux
// import configureStore from "redux-mock-store"; // You need to mock your Redux store
// import HomePage2 from "./HomePage2.jsx"; // Adjust the import path as needed

// // Mocking Redux store
// const mockStore = configureStore([]);
// const store = mockStore({});

// describe("HomePage2 Component", () => {
//     beforeEach(() => {
//         render(
//             <Provider store={store}>
//                 <BrowserRouter>
//                     <HomePage2 />
//                 </BrowserRouter>
//             </Provider>
//         );
//     });

//     it("renders homepage with buttons", () => {
//         // Ensure that the title and description are rendered
//         expect(screen.getByText("One Minute Story")).toBeInTheDocument();
//         expect(
//             screen.getByText(
//                 "Ignite creativity in 60 seconds! Choose a title, feel the rush, and craft captivating tales against the clock. Join a vibrant community of storytellers for an exhilarating journey."
//             )
//         ).toBeInTheDocument();

//         // Ensure that the buttons for viewing and adding stories are rendered
//         expect(screen.getByText("View Stories")).toBeInTheDocument();
//         expect(screen.getByText("Add Story")).toBeInTheDocument();
//     });

//     it('redirects to view stories page when "View Stories" button is clicked', () => {
//         // Click the "View Stories" button
//         userEvent.click(screen.getByText("View Stories"));

//         // Ensure that the URL changes to the correct route
//         expect(window.location.pathname).toEqual("/view_stories");
//     });

//     it('redirects to add story page when "Add Story" button is clicked', () => {
//         // Click the "Add Story" button
//         userEvent.click(screen.getByText("Add Story"));

//         // Ensure that the URL changes to the correct route
//         expect(window.location.pathname).toEqual("/add_story");
//     });
// });


import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import HomePage2 from "../HomePage2";

const mockStore = configureStore([]);

describe("HomePage2 Component", () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            storyData: [],
        });
    });

    it("should dispatch getStoryData action on component mount", () => {
        const getStoryDataMock = jest.fn();
        render(
            <Provider store={store}>
                <HomePage2 getStoryData={getStoryDataMock} />
            </Provider>
        );

        expect(getStoryDataMock).toHaveBeenCalled();
    });

    it("should not dispatch getStoryData action if storyData is already present", () => {
        const getStoryDataMock = jest.fn();
        const storyData = [
            { id: 1, title: "Story 1", content: "Content 1" },
            { id: 2, title: "Story 2", content: "Content 2" },
        ];
        store = mockStore({ storyData });

        render(
            <Provider store={store}>
                <HomePage2 getStoryData={getStoryDataMock} />
            </Provider>
        );

        expect(getStoryDataMock).not.toHaveBeenCalled();
    });
});
// </Provider>