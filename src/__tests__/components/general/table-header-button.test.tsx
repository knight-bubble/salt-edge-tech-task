import { TableHeaderButton } from "@/components/ui/table/table-header-button";
import type { Column } from "@tanstack/react-table";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const createMockColumn = (sortState: false | "asc" | "desc") =>
  ({
    getIsSorted: vi.fn().mockReturnValue(sortState),
    toggleSorting: vi.fn(),
    clearSorting: vi.fn(),
  }) as unknown as Column<unknown, unknown>;

describe("TableHeaderButton", () => {
  const label = "Test Column";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should apply descending sort when no sorting is active", () => {
    const mockColumn = createMockColumn(false);

    render(<TableHeaderButton column={mockColumn} label={label} />);

    const button = screen.getByRole("button", { name: label });
    fireEvent.click(button);

    expect(mockColumn.toggleSorting).toHaveBeenCalledWith(true, true);
    expect(mockColumn.clearSorting).not.toHaveBeenCalled();
  });

  it("should switch to ascending sort when currently in descending mode", () => {
    const mockColumn = createMockColumn("desc");

    render(<TableHeaderButton column={mockColumn} label={label} />);

    const button = screen.getByRole("button", { name: label });
    fireEvent.click(button);

    expect(mockColumn.toggleSorting).toHaveBeenCalledWith(false, true);
    expect(mockColumn.clearSorting).not.toHaveBeenCalled();
  });

  it("should clear sorting when currently in ascending mode", () => {
    const mockColumn = createMockColumn("asc");

    render(<TableHeaderButton column={mockColumn} label={label} />);

    const button = screen.getByRole("button", { name: label });
    fireEvent.click(button);

    // Should call clearSorting
    expect(mockColumn.clearSorting).toHaveBeenCalledWith();
    expect(mockColumn.toggleSorting).not.toHaveBeenCalled();
  });

  it("should display correct icon based on sort state", () => {
    // Test no sorting state - should show ArrowUpDown
    const noSortColumn = createMockColumn(false);
    const { rerender } = render(
      <TableHeaderButton column={noSortColumn} label={label} />,
    );

    let button = screen.getByRole("button", { name: label });
    expect(button).toBeInTheDocument();

    // Test ascending state - should show ArrowUp
    const ascColumn = createMockColumn("asc");
    rerender(<TableHeaderButton column={ascColumn} label={label} />);

    // Test descending state - should show ArrowDown
    const descColumn = createMockColumn("desc");
    rerender(<TableHeaderButton column={descColumn} label={label} />);

    button = screen.getByRole("button", { name: label });
    expect(button).toBeInTheDocument();
  });

  it("should render the provided label text", () => {
    const mockColumn = createMockColumn(false);
    const testLabel = "Custom Column Name";

    render(<TableHeaderButton column={mockColumn} label={testLabel} />);

    expect(screen.getByText(testLabel)).toBeInTheDocument();
  });

  it("should use ghost variant for the button", () => {
    const mockColumn = createMockColumn(false);

    render(<TableHeaderButton column={mockColumn} label={label} />);

    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });
});
