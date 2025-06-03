# React Customer Rewards Program

## Features

- Calculates reward points based on purchase amount
- Monthly and transaction-wise summaries
- Mock data in `public/transactions.json`
- Filters by years and month
- Also expand and collaps feature to check transaction wise data

## How to Run

1. Clone the repo
2. Run `npm install`
3. Place `transactions.json` in `public/`
4. Run `npm start`

## Test

```bash
npm test
```
## Application screen shots
1.Main page ![image](https://github.com/user-attachments/assets/a65314bf-2a14-4ec3-b7a7-41746c9bc63b
2. dropdown year ![image](https://github.com/user-attachments/assets/5a02b818-af9f-4cec-885f-20abb33ce6c2)
3. dropdown months ![image](https://github.com/user-attachments/assets/e1b9c2ba-4ff0-440d-bb7f-dfe553966a13)
4. expand and collaps feature for transaction wise details ![image](https://github.com/user-attachments/assets/ca0e2a96-3dad-40fd-8ce8-50046e7346ba
5. Pagination ![image](https://github.com/user-attachments/assets/ba989c57-b51b-4c43-97ae-f5062143565a)
6. React toast sucess ![image](https://github.com/user-attachments/assets/fec0f896-4a5f-4127-b2e8-bc52ed7d4857)
7. React toast loding ![image](https://github.com/user-attachments/assets/52b91c28-1739-48cb-8547-f99aadbd7d72)
8. React toast error ![image](https://github.com/user-attachments/assets/0b0a23a4-345e-4dfe-8545-cf697cbb3a47)








## Test report
![image](https://github.com/user-attachments/assets/b67199b0-55e6-4d29-8263-095995dd75f6)

## Project Structure

- `App.js`: Main component
- `utils/rewardCalculation.js`: Points logic
- `util/daysCalculaion.js`: current year, last 5 years, and 12 months logic file
- `styles/CustomerTable.js`: tailwing inline css
- `hooks/useCustomerData.js`: customermap transaction logic
- `hooks/usePaginatedCustomers.js`: pagination logic
- `public/data/transactions.json`: customer json data
- `constant/constants.js`: constants file
- `api/useTransactions.js`: api call using "useQuery" also using "react-hot-toast" logging information on UI.
- `components/CustomerTable.test.jsx`: test file
- `components/CustomerTable.jsx`: component having logic and jsx part
- `components/TransactionDetails.jsx`: transaction details logic
- `components/FilterBar.js`: component having months and year logic for dropdown

## IMP NOTE :  we have used React-query for api call instead of useEffect below is main diffrence
useEffect + fetch is like building everything manually: you fetch data, manage loading and error states, and update your state. It gives full control but requires more boilerplate.

useQuery, on the other hand, is a powerful abstraction from React Query that automatically handles loading, error, caching, and background refetching for you. It makes data-fetching declarative, efficient, and easier to manage, especially in apps with shared or frequently-changing data.

## React query and react toast for logging:
React Query (@tanstack/react-query)
React Query is a powerful data-fetching library for managing server state in React applications. It simplifies API requests with built-in caching, background updates, and automatic re-fetching.

React Hot Toast (react-hot-toast)
React Hot Toast provides lightweight and customizable toast notifications for React apps. It's used to show success, error, and loading messages in a user-friendly way.




