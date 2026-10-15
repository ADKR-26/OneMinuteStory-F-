import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../PrivateRoute.jsx";
import { renderWithProviders } from "../../test/utils.jsx";

// Mirrors the AppRouter shape: PrivateRoute wraps /profile, /sign-in is the redirect target
const renderAt = (route, preloadedState) =>
  renderWithProviders(
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<div>Profile page</div>} />
      </Route>
      <Route path="/sign-in" element={<div>Sign in page</div>} />
    </Routes>,
    { route, preloadedState }
  );

// Shape the reducer stores after SIGN_IN: the axios response, whose body holds currentUser
const signedInWithEmail = {
  currentUser: { data: { currentUser: { email: "a@b.com" } } },
};
const signedInNoEmail = {
  currentUser: { data: { currentUser: {} } },
};

describe("PrivateRoute", () => {
  // KNOWN BUG: `const { currentUser } = state...currentUser.data` throws when
  // nobody is signed in (the initial state is currentUser: null).
  it("throws when no user has ever signed in (known bug, characterized)", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderAt("/profile", { currentUser: null })).toThrow(TypeError);
    spy.mockRestore();
  });

  it("renders the child route when the user has no email", () => {
    renderAt("/profile", signedInNoEmail);

    expect(screen.getByText("Profile page")).toBeInTheDocument();
  });

  // KNOWN BUG: the check looks inverted. A user *with* an email is redirected
  // to /sign-in, and the protected page is shown to a user without one.
  it("redirects a user who has an email to /sign-in (known inverted check, characterized)", () => {
    renderAt("/profile", signedInWithEmail);

    expect(screen.getByText("Sign in page")).toBeInTheDocument();
    expect(screen.queryByText("Profile page")).not.toBeInTheDocument();
  });
});
