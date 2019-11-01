import React from "react";
import { Router, RouteComponentProps, Link } from "@reach/router";
import "./App.css";
import { Home } from "./Home";
import { Survey } from "./Survey";
import { NotFound } from "./NotFound";

export const App: React.FC = () => {
  return (
    <div className="container">
      <Link to="/">
        <header className="App-header">Friend Finder</header>
      </Link>
      <Router>
        <RouterPage default pageComponent={<NotFound />} />
        <RouterPage path="/" pageComponent={<Home />} />
        <RouterPage path="/survey" pageComponent={<Survey />} />
      </Router>
    </div>
  );
};

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps
) => props.pageComponent;
