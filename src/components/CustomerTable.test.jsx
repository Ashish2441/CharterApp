import { render, screen, fireEvent } from "@testing-library/react";
import CustomerTable from "./CustomerTable";
import "@testing-library/jest-dom";

// MOCK useCustomerData
jest.mock("../hooks/useCustomerData", () => ({
  useCustomerData: jest.fn(),
}));
import { useCustomerData } from "../hooks/useCustomerData";

// MOCK calculatePoints logic (optional since we now mock hook data)
jest.mock("../util/rewardCalculation", () => ({
  calculatePoints: jest.fn((amount) => {
    if (typeof amount !== "number") return 0;
    if (amount > 100) return (amount - 100) * 2 + 50;
    if (amount > 50) return amount - 50;
    return 0;
  }),
}));

beforeEach(() => {
  useCustomerData.mockReturnValue({
    customers: [],
    customerMap: {},
  });
});

const currentYear = new Date().getFullYear();

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

  it("displays rounded reward points for fractional values", () => {
    const testDate = new Date().toISOString();

    useCustomerData.mockReturnValue({
      customers: [
        [
          "C030",
          {
            purchases: { June: 120.45 },
            monthly: { June: 90.9 },
            total: 90.9,
            transactions: {
              June: [
                {
                  amount: 120.45,
                  transactionId: "TXN100",
                  date: testDate,
                  points: 90.9,
                },
              ],
            },
          },
        ],
      ],
      customerMap: {},
    });

    render(<CustomerTable data={[]} selectedMonth="" selectedYear={new Date().getFullYear()} />);

    // ✅ More reliable matcher for split-node structure
    expect(screen.getAllByText((_, element) => element?.textContent?.replace(/\s+/g, "").includes("June:91")).length).toBeGreaterThanOrEqual(1);

    // ✅ Total points check
    expect(screen.getAllByText("91").length).toBeGreaterThanOrEqual(2);
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
});
