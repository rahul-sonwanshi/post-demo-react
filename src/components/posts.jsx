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
  };

  async componentDidMount() {
    const { data: posts } = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    this.setState({ posts });
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
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://jsonplaceholder.typicode.com/posts";
    const deleteReq = await axios.delete(proxyurl + url + "/" + postId);
    console.log(deleteReq);
    if (deleteReq) {
      this.setState({ showDeleteDiv: true, showDiv: false });
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
          <div>{this.state.displayBody}</div>

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
      </React.Fragment>
    );
  }
}

export default Posts;
