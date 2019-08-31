import { withRouter } from "react-router-dom";
import { useEffect } from "react";

const ScrollToTop = ({ children, location: { pathname } }: any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
};

export default withRouter(ScrollToTop);
