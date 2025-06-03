import PropTypes from "prop-types";
import { LAST_THREE_MONTH, SELECT_MONTH, EMPTY_STRING, ONE } from "../constant/constants";
import { currentYear, lastFiveYears, months } from "../util/daysCalculation";
import { classes } from "../styles/CustomerTable";

const FilterBar = ({ selectedMonth, selectedYear, onMonthChange, onYearChange }) => {
  return (
    <div className={classes.filterBar}>
      <select className={classes.select} value={selectedMonth} onChange={(e) => onMonthChange(e.target.value)}>
        {selectedYear === currentYear && <option value={`${EMPTY_STRING}`}>{LAST_THREE_MONTH}</option>}
        {selectedYear !== currentYear && <option value={`${EMPTY_STRING}`}>{SELECT_MONTH}</option>}
        {months.map((month, index) => (
          <option key={index} value={index + ONE}>
            {month}
          </option>
        ))}
      </select>

      <select className={classes.select} value={selectedYear} onChange={(e) => onYearChange(Number(e.target.value))}>
        {lastFiveYears.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
};

FilterBar.propTypes = {
  selectedMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
};

export default FilterBar;
