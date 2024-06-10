import { useState } from "react";
import "./YesNoButton.css"; // Make sure to import the CSS file

const YesNoToggle = () => {
  const [isYes, setIsYes] = useState(false);

  const handleToggle = () => {
    setIsYes(!isYes);
  };

  return (
    <div className="form-check form-switch yes-no-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="yesNoSwitch"
        checked={isYes}
        onChange={handleToggle}
      />
      <label className="form-check-label" htmlFor="yesNoSwitch"></label>
    </div>
  );
};
export default YesNoToggle;
