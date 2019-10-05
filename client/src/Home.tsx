import React from "react";
import { Link } from "@reach/router";
import { Button } from "react-materialize";

const Home: React.FC = () => {
  return (
    <div>
      <h2>Click below to start the survey and find a friend!</h2>
      <Link to="survey">
        <Button>Start Survey</Button>
      </Link>

      <footer>
        <Link to="api">
          <p className="api-link">View API Data</p>
        </Link>

        <iframe
          src="https://ghbtns.com/github-btn.html?user=cfbender&repo=friend-finder&type=star&count=true"
          frameBorder="0"
          scrolling="0"
          width="170px"
          height="20px"
        ></iframe>
      </footer>
    </div>
  );
};

export default Home;
