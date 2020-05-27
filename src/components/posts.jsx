import React, { Component } from "react";
import axios from "axios";

class Posts extends Component {
  state = {
    posts: [],
    showDiv: false,
    displayTitle: "",
    displayBody: "",
    displayPostId: "",
    showDeleteDiv: false,
    showLoader: false,
  };

  async componentDidMount() {
    this.setState({ showLoader: true });
    const { data: posts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    this.setState({ posts, showLoader: false });
  }

  handleShowDiv = (postId) => {
    // const { data: showDiv } = true;
    this.setState({
      showDiv: !this.state.showDiv,
      displayTitle: this.state.posts[postId - 1].title,
      displayBody: this.state.posts[postId - 1].body,
      displayPostId: postId - 1,
    });
    // this.setState({ });
    console.log(this.state.posts[0], postId);
  };

  handleDelete = async (postId) => {
    this.setState({ showLoader: true, showDiv: false });
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://jsonplaceholder.typicode.com/posts";
    const deleteReq = await axios.delete(proxyurl + url + "/" + postId);
    console.log(deleteReq);
    if (deleteReq) {
      this.setState({ showDeleteDiv: true, showDiv: false, showLoader: false });
    }
  };

  render() {
    return (
      <React.Fragment>
        <div className="post-container">
          {this.state.posts.slice(0, 4).map((post) => (
            <div
              key={post.id}
              className="post col-lg-3"
              onClick={() => {
                this.handleShowDiv(post.id);
              }}
            >
              {post.title}
            </div>
          ))}
        </div>
        <div
          style={{ display: this.state.showDiv ? "block" : "none" }}
          className="show-post"
        >
          <div>{this.state.displayTitle}</div>
          <p>{this.state.displayBody}</p>

          <button
            className="btn btn-primary"
            onClick={() => {
              this.handleDelete(this.state.displayPostId);
            }}
          >
            Delete
          </button>
        </div>
        <div
          className="message"
          style={{ display: this.state.showDeleteDiv ? "block" : "none" }}
        >
          Post Added.
        </div>
        <div
          style={{ display: this.state.showLoader ? "block" : "none" }}
          className="loader message"
        ></div>
      </React.Fragment>
    );
  }
}

export default Posts;
