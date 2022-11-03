import { useCallback } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router-dom";
import "./Nav.css";
import Shape from "../../assets/images/arrow-left.png";

function Nav(props) {

  const { backTo } = props;
  const navigate = useNavigate();

  const onBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <nav>
      <button 
        type="button"
        onClick={onBack}
        className="backButton"
      >
        <img src={Shape} />
      </button>
    </nav>
  );
};

Nav.propTypes = {
  backTo: PropTypes.string,
};

Nav.defaultProps = {
  backTo: null
};

export default Nav;
