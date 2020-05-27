import React, { Component } from "react";
import axios from "axios";

class Posts extends Component {
  state = {
    posts: [],
    title: "",
    body: "",
    showAdded: false,
  };

  constructor() {
    super();
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd = async () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://jsonplaceholder.typicode.com/posts"; // site that doesn’t send Access-Control-*
    console.log(this.state);
    const obj = { title: this.state.title, body: this.state.body };
    const { data: post } = await axios.post(proxyurl + url, obj);
    console.log(post);
    if (post) {
      this.setState({ showAdded: true });
    }
  };

  updateTitle = (event) => {
    this.setState({ title: event.target.value });
    console.log(this.state.title);
  };

  updateBody = (event) => {
    this.setState({ body: event.target.value });
    console.log(this.state.body);
  };

  render() {
    return (
      <React.Fragment>
        <div className="post-container">
          <h1>Add a Post</h1>
          <h4>Title</h4>
          <input type="text" name="title" onChange={this.updateTitle}></input>
          <h4>Content</h4>
          <input
            type="text"
            name="body"
            type="text"
            name="body"
            onChange={this.updateBody}
          ></input>
        </div>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add Post
        </button>
        <div
          className="message"
          style={{ display: this.state.showAdded ? "block" : "none" }}
        >
          Post Deleted.
        </div>
      </React.Fragment>
    );
  }
}

export default Posts;
