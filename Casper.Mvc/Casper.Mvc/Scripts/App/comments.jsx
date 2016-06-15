/*
  NOT PRODUCTION READY CODE, 
  HONEST ITS NOT!
*/

var CommentBox = React.createClass({

  getInitialState: function () {
    return {
      loading: true, 
      data: []
     };
  },

  componentDidMount: function () {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function (data) {
        this.setState({ data: data });
        this.setState({ loading: false });
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function () {
    return (
      <div>
        <h1>Comments</h1>
        { this.state.loading ? <img src="/content/gears.svg"/> : null}
        <CommentList data={this.state.data} />
      </div >
    );
  }
});



var CommentList = React.createClass({
  render: function () {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>);
  }
});



var Comment = React.createClass({

  rawMarkup: function () {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function () {
    var md = new Remarkable();
    return (
      <div className="comment alert alert-info">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup() } />
      </div>
    );
  }
});



ReactDOM.render(
  <CommentBox url="/react/data" />,
  document.getElementById('content')
);


