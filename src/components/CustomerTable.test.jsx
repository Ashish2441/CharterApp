import { render, screen, fireEvent } from "@testing-library/react";
import CustomerTable from "./CustomerTable";
import "@testing-library/jest-dom";

// MOCK useCustomerData
jest.mock("../hooks/useCustomerData", () => ({
  useCustomerData: jest.fn(),
}));
import { useCustomerData } from "../hooks/useCustomerData";
import { calculatePoints } from "../util/rewardCalculation";

beforeEach(() => {
  useCustomerData.mockReturnValue({
    customers: [],
    customerMap: {},
  });
});
const currentYear = new Date().getFullYear();

describe("CustomerTable Component", () => {
  it("renders 'No Transactions' if no data", () => {
    render(<CustomerTable data={[]} selectedMonth="" selectedYear="" />);
    expect(screen.getByText(/No transactions/i)).toBeInTheDocument();
  });

  it("renders customer rows", () => {
    useCustomerData.mockReturnValue({
      customers: [
        ["C1", { purchases: {}, monthly: {}, total: 0, transactions: {} }],
        ["C2", { purchases: {}, monthly: {}, total: 0, transactions: {} }],
      ],
      customerMap: {},
    });

    render(<CustomerTable data={[]} selectedMonth="" selectedYear={currentYear} />);
    expect(screen.getByText("C1")).toBeInTheDocument();
    expect(screen.getByText("C2")).toBeInTheDocument();
    expect(screen.getByText(/Total Points/i)).toBeInTheDocument();
  });

  it("expands transaction list when ➕ is clicked", async () => {
    const date = new Date().toISOString();
    useCustomerData.mockReturnValue({
      customers: [
        [
          "C1",
          {
            purchases: {},
            monthly: {},
            total: 10,
            transactions: {
              June: [
                {
                  transactionId: "TXN1",
                  amount: 100,
                  date,
                  points: 50,
                },
                {
                  transactionId: "TXN2",
                  amount: 200,
                  date,
                  points: 250,
                },
              ],
            },
          },
        ],
      ],
      customerMap: {},
    });

    render(<CustomerTable data={[]} selectedMonth="" selectedYear={currentYear} />);
    fireEvent.click(screen.getByText("➕"));
    const testId = "transactions-June";
    expect(await screen.findByTestId(testId)).toBeInTheDocument();
    expect(await screen.findByText(/TXN1/)).toBeInTheDocument();
    expect(await screen.findByText(/TXN2/)).toBeInTheDocument();
  });

  it("paginates results", () => {
    const customers = Array.from({ length: 8 }, (_, i) => [`C${i + 1}`, { purchases: {}, monthly: {}, total: 100, transactions: {} }]);

    useCustomerData.mockReturnValue({
      customers,
      customerMap: {},
    });

    render(<CustomerTable data={[]} selectedMonth="" selectedYear={currentYear} />);

    for (let i = 1; i <= 5; i++) {
      expect(screen.getByText(`C${i}`)).toBeInTheDocument();
    }

    fireEvent.click(screen.getByText(/Next/i));

    for (let i = 6; i <= 8; i++) {
      expect(screen.getByText(`C${i}`)).toBeInTheDocument();
    }
  });
  it("should return rewards points for purchases", () => {
    const testCases = [
      { amount: 120, expected: 90 },
      { amount: 200, expected: 250 },
      { amount: 90, expected: 40 },
      { amount: 40, expected: 0 },
    ];

    testCases.forEach(({ amount, expected }) => {
      expect(calculatePoints(amount)).toBe(expected);
    });
  });
  it("should return rewards points for fraction amount purchases", () => {
    const testCases = [
      { amount: 120.45, expected: 91 },
      { amount: 220.3, expected: 291 },
      { amount: 65.45, expected: 15 },
    ];
    testCases.forEach(({ amount, expected }) => {
      expect(calculatePoints(amount)).toBe(expected);
    });
  });
});
