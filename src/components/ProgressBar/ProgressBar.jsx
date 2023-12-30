import PropTypes from 'prop-types';
import './ProgressBar.css';

const ProgressBar = ({ percentage }) => {
  const boundedPercentage = Math.min(100, Math.max(0, percentage));

  return (
    <div className="progress-bar mt-2 shadow-[0_5px_2px_0px_rgba(0,0,0,0.3)] shadow-black">
      <div className="progress" style={{ width: `${boundedPercentage}%` }}></div>
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired
};

export default ProgressBar;
