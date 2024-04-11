import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { SearchProvider } from "./context/SearchContext";

describe("App component and Search operation", () => {
  test("check navbar component", () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );
    const navbarElement = screen.getByText(/Team/i);
    expect(navbarElement).toBeInTheDocument();
  });

  test("check fetchUsers function is called on component mount", () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );
    const fetchUsers = jest.fn();
    fetchUsers();
    expect(fetchUsers).toHaveBeenCalled();
  });

  test("check search component and it can be typed", () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );
    const searchElement = screen.getByPlaceholderText(/Search.../i);
    expect(searchElement).toBeInTheDocument();
    searchElement.focus();
    // Type 'Tes' in the search input
    fireEvent.change(searchElement, { target: { value: "Tes" } });
    expect(searchElement).toHaveValue("Tes");
  });

  test("check search component and it can be cleared", () => {
    render(
      <SearchProvider>
        <App />
      </SearchProvider>
    );
    const searchElement = screen.getByPlaceholderText(/Search.../i);
    expect(searchElement).toBeInTheDocument();
    searchElement.focus();
    // Type 'Tes' in the search input
    fireEvent.change(searchElement, { target: { value: "Tes" } });
    expect(searchElement).toHaveValue("Tes");
    // Clear the search input
    fireEvent.change(searchElement, { target: { value: "" } });
    expect(searchElement).toHaveValue("");
  });
});
