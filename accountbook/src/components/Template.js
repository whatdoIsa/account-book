import "./Template.scss";
import { SlCalculator } from "react-icons/sl";

const Template = ({ children }) => {
  return (
    <div className="Template">
      <div className="AppTitle">
        <div className="NavigationMenu">
          <SlCalculator />
        </div>
        <div>심플 가계부</div>
      </div>
      <div className="AppContent">{children}</div>
    </div>
  );
};

export default Template;
