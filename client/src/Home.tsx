import React from "react";
import { Link } from "@reach/router";
const Home: React.FC = () => {
  return (
    <div>
      <h2>Click below to start the survey and find a friend!</h2>
      <Link to="survey">
        <button>Start Survey</button>
      </Link>
    </div>
  );
};

export default Home;
