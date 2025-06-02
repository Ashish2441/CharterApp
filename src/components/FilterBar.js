import PropTypes from "prop-types";
import {
  LAST_THREE_MONTH,
  SELECT_MONTH,
  EMPTY_STRING,
  ONE,
} from "../data/constant";
import { currentYear, lastFiveYears, months } from "../util/daysCalculaion";
import { classes } from "../styles/classMap";

const FilterBar = ({
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
}) => {
  return (
    <div className={classes.filterBar}>
      <select
        className={classes.select}
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
        className={classes.select}
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

FilterBar.propTypes = {
  selectedMonth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selectedYear: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
};

export default FilterBar;
