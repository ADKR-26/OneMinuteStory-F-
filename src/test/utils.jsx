import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";
import storyReducer from "../store/reducer";

// Real reducer + thunk middleware (RTK includes thunk) under the same
// `oneMinuteStory` key the app uses, so selectors work unchanged.
export function createTestStore(preloadedState = {}) {
  return configureStore({
    reducer: { oneMinuteStory: storyReducer },
    preloadedState: { oneMinuteStory: { ...storyReducer(undefined, { type: "@@INIT" }), ...preloadedState } },
  });
}

export function renderWithProviders(
  ui,
  { preloadedState = {}, route = "/", store = createTestStore(preloadedState) } = {}
) {
  return {
    store,
    ...render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </Provider>
    ),
  };
}
