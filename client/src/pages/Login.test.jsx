
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import Login from "./Login";

const { loginMock } = vi.hoisted(() => ({
  loginMock: vi.fn()
}));

vi.mock("../AuthContext", () => ({
  useAuth: () => ({
    login: loginMock
  })
}));

function LocationDisplay() {
  const location = useLocation();
  return <p>Current page: {location.pathname}</p>;
}

function renderLogin() {
  return render(
    <MemoryRouter initialEntries={["/login"]}>
      <Login />
      <LocationDisplay />
    </MemoryRouter>
  );
}

describe("Login Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should require email and password", () => {
    renderLogin();

    expect(screen.getByLabelText(/email address/i)).toBeRequired();
    expect(screen.getByLabelText(/password/i)).toBeRequired();
  });

  it("should display an error when login fails", async () => {
    fetch.mockResolvedValue({
      ok: false,
      json: async () => ({
        message: "Invalid email or password"
      })
    });

    renderLogin();

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "wrong@example.com" }
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" }
    });

    fireEvent.click(screen.getByRole("button", {
      name: /login to account/i
    }));

    expect(
      await screen.findByText("Invalid email or password")
    ).toBeInTheDocument();

    expect(loginMock).not.toHaveBeenCalled();
  });

  it("should log in successfully and redirect to home", async () => {
    const userData = {
      token: "test-token",
      user: {
        name: "Test User",
        email: "test@example.com",
        role: "user"
      }
    };

    fetch.mockResolvedValue({
      ok: true,
      json: async () => userData
    });

    renderLogin();

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" }
    });

    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" }
    });

    fireEvent.click(screen.getByRole("button", {
      name: /login to account/i
    }));

    expect(await screen.findByText("Current page: /")).toBeInTheDocument();

    expect(loginMock).toHaveBeenCalledWith(userData);

    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/auth/login",
      expect.objectContaining({
        method: "POST"
      })
    );
  });
});
