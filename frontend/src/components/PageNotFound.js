import {React} from "react";
import {Link} from "react-router-dom";

function PageNotFound() {
  return (
    <div>
      <h1>Page Not Found :/</h1>
      <h3>
        Go to the Home Page: <Link to="/"> HomePage</Link>
      </h3>
    </div>
  );
}

export default PageNotFound;
