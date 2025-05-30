import {
  LAST_THREE_MONTH,
  SELECT_MONTH,
  EMPTY_STRING,
  ONE,
} from "../data/constant";
import { currentYear, lastFiveYears, months } from "../util/daysCalculaion";

const FilterBar = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-6">
      <select
        className="px-4 py-2 border rounded"
        value={selectedMonth}
        onChange={(e) => onMonthChange(e.target.value)}
      >
        {selectedYear === currentYear ? (
          <option value={`${EMPTY_STRING}`}>{LAST_THREE_MONTH}</option>
        ) : (
          <option value={`${EMPTY_STRING}`}>{SELECT_MONTH}</option>
        )}
        {months.map((m, i) => (
          <option key={i} value={i + ONE}>
            {m}
          </option>
        ))}
      </select>

      <select
        className="px-4 py-2 border rounded"
        value={selectedYear}
        onChange={(e) => onYearChange(Number(e.target.value))}
      >
        {lastFiveYears.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
