import { render, screen, fireEvent } from "@testing-library/react";
import CustomerTable from "./CustomerTable";
import "@testing-library/jest-dom";

// Mock calculatePoints to isolate logic
jest.mock("../util/rewardCalculation", () => ({
  calculatePoints: jest.fn((amount) => {
    if (typeof amount !== "number" || isNaN(amount)) return 0;
    if (amount > 100) return (amount - 100) * 2 + 50;
    if (amount > 50) return amount - 50;
    return 0;
  }),
}));

const sampleData = [
  {
    customerId: "C1",
    amount: 120,
    date: new Date().toISOString(),
    transactionId: "TXN1",
  },
  {
    customerId: "C1",
    amount: 80,
    date: new Date().toISOString(),
    transactionId: "TXN2",
  },
  {
    customerId: "C2",
    amount: 45,
    date: new Date().toISOString(),
    transactionId: "TXN3",
  },
];

describe("CustomerTable Component", () => {
  it("renders 'No Transactions' if no data", () => {
    render(<CustomerTable data={[]} selectedMonth="" selectedYear="" />);
    expect(screen.getByText(/No transactions/i)).toBeInTheDocument();
  });

  it("renders customer rows", () => {
    render(<CustomerTable data={sampleData} selectedMonth="" selectedYear={new Date().getFullYear()} />);
    expect(screen.getByText("C1")).toBeInTheDocument();
    expect(screen.getByText("C2")).toBeInTheDocument();
    expect(screen.getByText(/Total Points/i)).toBeInTheDocument();
  });

  it("shows monthly points and purchase amount", () => {
    render(<CustomerTable data={sampleData} selectedMonth="" selectedYear={new Date().getFullYear()} />);

    // Monthly details for purchase and points should be visible
    expect(screen.getByText(/Purchase Amount/i)).toBeInTheDocument();
    expect(screen.getByText(/Monthly Points/i)).toBeInTheDocument();
  });

  it("expands transaction list when ➕ is clicked", async () => {
    render(<CustomerTable data={sampleData} selectedMonth="" selectedYear={new Date().getFullYear()} />);

    const expandButton = screen.getAllByText("➕")[0];
    fireEvent.click(expandButton);

    // Wait for transaction details to appear using data-testid
    const month = new Date().toLocaleString("default", { month: "long" }); // same logic as in useCustomerData
    const testId = `transactions-${month}`;

    expect(await screen.findByTestId(testId)).toBeInTheDocument();
    expect(await screen.findByText(/TXN1/)).toBeInTheDocument();
    expect(await screen.findByText(/TXN2/)).toBeInTheDocument();
  });

  it("paginates results", () => {
    const bigData = Array.from({ length: 8 }, (_, i) => ({
      customerId: `C${i + 1}`,
      amount: 120,
      date: new Date().toISOString(),
      transactionId: `TXN${i + 1}`,
    }));

    render(<CustomerTable data={bigData} selectedMonth="" selectedYear={new Date().getFullYear()} />);

    // Page 1: show first 5 customers
    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(`C${i}`)).toBeInTheDocument();
    }

    // Go to next page
    fireEvent.click(screen.getByText(/Next/i));

    for (let i = 6; i <= 8; i++) {
      expect(screen.getByText(`C${i}`)).toBeInTheDocument();
    }
  });
});
