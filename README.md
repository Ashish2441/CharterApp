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
5. Pagination 




## Test report
![image](https://github.com/user-attachments/assets/b67199b0-55e6-4d29-8263-095995dd75f6)

## Project Structure

- `App.js`: Main component
- `utils/rewardCalculation.js`: Points logic
- `public/transactions.json`: Data
- `data/constant.js`: constants file
- `util/daysCalculaion.js`: current year, last 5 years, and 12 months logic file
- `components/CustomerTable.test.jsx`: test file
- `components/CustomerTable.jsx`: component having logic and jsx part
- `components/FilterBar.js`: component having months and year logic for dropdown
