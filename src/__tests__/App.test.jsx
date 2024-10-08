import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import { within } from "@testing-library/react";

describe("App", () => {
  it("should render users", () => {
    const { container } = render(<App usersData={[]} />);
    expect(container).toMatchSnapshot();
  });
});

describe("When there is only 1 user", () => {
  describe("Edit Button is Clicked", () => {
    it("should render save button", async () => {
      render(
        <App
          usersData={[
            {
              id: 1,
              username: "John",
              email: "john@gmail.com",
            },
          ]}
        />
      );
      const editButton = screen.getByRole("button", { name: "Edit" });
      await userEvent.click(editButton);
      const saveButton = screen.getByRole("button", { name: "Save" });
      expect(saveButton).toBeInTheDocument();
    });

    it("should display username & email input fields", async () => {
      render(
        <App
          usersData={[
            {
              id: 1,
              username: "John",
              email: "john@gmail.com",
            },
          ]}
        />
      );
      const editButton = screen.getByRole("button", { name: "Edit" });
      await userEvent.click(editButton);
      expect(screen.getByLabelText("Username:")).toBeInTheDocument();
      expect(screen.getByLabelText("Email:")).toBeInTheDocument();
    });
  });
});

describe("When there are 2 users", () => {
  it("should have 2 users", () => {
    render(
      <App
        usersData={[
          {
            id: 1,
            username: "John",
            email: "john@gmail.com",
          },
          {
            id: 2,
            username: "Michael",
            email: "michael@gmail.com",
          },
        ]}
      />
    );

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Michael")).toBeInTheDocument();
  });

  it("should display save button for 1st user when edit button is clicked", async () => {
    render(
      <App
        usersData={[
          {
            id: 1,
            username: "John",
            email: "john@gmail.com",
          },
          {
            id: 2,
            username: "Michael",
            email: "michael@gmail.com",
          },
        ]}
      />
    );
    const userDetails = screen.getByTestId("user-details-1");
    expect(within(userDetails).queryByText("Michael")).toBeNull();
    const editBtn = within(userDetails).getByRole("button", { name: "Edit" });
    await userEvent.click(editBtn);
    expect(
      within(userDetails).getByRole("button", { name: "Save" })
    ).toBeInTheDocument();
  });

  it("should edit 2nd username and save the updated one", async () => {
    render(
      <App
        usersData={[
          {
            id: 1,
            username: "John",
            email: "john@gmail.com",
          },
          {
            id: 2,
            username: "Michael",
            email: "michael@gmail.com",
          },
        ]}
      />
    );
    const userDetails = screen.getByTestId("user-details-2");
    await userEvent.click(
      within(userDetails).getByRole("button", { name: "Edit" })
    );
    await userEvent.type(
      within(userDetails).getByLabelText("Username:"),
      "123"
    );
    await userEvent.click(
      within(userDetails).getByRole("button", { name: "Save" })
    );
    expect(within(userDetails).queryByLabelText("Username:")).toBeNull();
    expect(within(userDetails).getByText("Michael123")).toBeInTheDocument();
  });
});

describe("updating UserContext", () => {
  it("should update displayName", async () => {
    render(<App usersData={[]} />);

    // Debug the DOM to check if the component is rendered correctly
    screen.debug();

    // Wait for the input to be rendered
    const input = await screen.findByLabelText("UpdateName:");
    await userEvent.type(input, "RakaZone Gaming");

    const button = screen.getByRole("button", { name: "Save Display Name" });
    await userEvent.click(button);

    // Use a regular expression to match the text
    const displayNameElement = screen.getByText(
      /DisplayName:\s*RakaZone Gaming/i
    );

    expect(displayNameElement).toBeInTheDocument();
  });
});
