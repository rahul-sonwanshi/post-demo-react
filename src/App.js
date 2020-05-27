import React from "react";
import "./App.css";
import { Route, Link, Switch } from "react-router-dom";
import Posts from "./components/posts";
import Home from "./components/home";
import NewPost from "./components/new-post";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Link className="tab" to="/posts">
          Posts
        </Link>
        <Link className="tab" to="/new-post">
          New Posts
        </Link>
        <div className="content">
          <Switch>
            <Route path="/posts" component={Posts} />
            <Route path="/new-post" component={NewPost} />
            <Route path="/" component={Home} />
          </Switch>
        </div>
      </React.Fragment>
    </div>
  );
}

export default App;
