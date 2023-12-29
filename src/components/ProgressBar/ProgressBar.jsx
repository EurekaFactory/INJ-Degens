import PropTypes from 'prop-types';
import './ProgressBar.css'; // Import the CSS file for styling

const ProgressBar = ({ percentage }) => {
  const boundedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${boundedPercentage}%` }}></div>
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default ProgressBar;
