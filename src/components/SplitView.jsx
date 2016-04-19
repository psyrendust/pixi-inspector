require("./SplitView.scss");
var React = require("react");

var SplitView = React.createClass({
  componentWillMount: function () {
    this.setState({
      pos: 200,
      dragging: false
    });
  },
  componentDidUpdate: function (props, state) {
    if (this.state.dragging && !state.dragging) {
      document.addEventListener('mousemove', this.onMouseMove);
      document.addEventListener('mouseup', this.onMouseUp);
    } else if (!this.state.dragging && state.dragging) {
      document.removeEventListener('mousemove', this.onMouseMove);
      document.removeEventListener('mouseup', this.onMouseUp);
    }
  },
  onMouseDown: function (e) {
    if (e.button !== 0) return;
    this.setState({
      dragging: true,
    });
    e.stopPropagation();
    e.preventDefault();
  },
  onMouseUp: function (e) {
    this.setState({dragging: false});
    e.stopPropagation();
    e.preventDefault();
  },
  onMouseMove: function (e) {
    if (!this.state.dragging) return;
    this.setState({
      pos: e.clientX
    });
    e.stopPropagation();
    e.preventDefault();
  },
	render: function () {
    var splitViewLeftStyle = {
      flexBase: this.state.pos + 'px',
      width: this.state.pos + 'px'
    };
    var splitViewHandleStyle = {
      left: this.state.pos + 'px'
    };
		return <div className="splitview">
			<div className="splitview__item" style={splitViewLeftStyle} key={0}>{this.props.children[0]}</div>
      <div className="splitview__item" key={1}>{this.props.children[1]}</div>
      <div className="splitview__resize" style={splitViewHandleStyle} onMouseDown={this.onMouseDown}></div>
		</div>
	}
});
module.exports = SplitView
