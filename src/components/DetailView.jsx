require("./DetailView.scss");
var React = require("react");

function customSort(a, b) {
  if (a === 'alpha') return -1;
  if (b === 'alpha') return 1;
  if (a === 'visible') return -1;
  if (b === 'visible') return 1;
  if (a === 'position.x') return -1;
  if (b === 'position.x') return 1;
  if (a === 'position.y') return -1;
  if (b === 'position.y') return 1;
  if (a === 'rotation') return -1;
  if (b === 'rotation') return 1;
  if (a === 'scale.x') return -1;
  if (b === 'scale.x') return 1;
  if (a === 'scale.y') return -1;
  if (b === 'scale.y') return 1;
  if (a === 'pivot.x') return -1;
  if (b === 'pivot.x') return 1;
  if (a === 'pivot.y') return -1;
  if (b === 'pivot.y') return 1;

  if (a === 'blendMode') return -1;
  if (b === 'blendMode') return 1;
  if (a === 'tint') return -1;
  if (b === 'tint') return 1;

  if (a === 'dirty') return -1;
  if (b === 'dirty') return 1;
  if (a === 'boundsDirty') return -1;
  if (b === 'boundsDirty') return 1;
  if (a === 'cachedSpriteDirty') return -1;
  if (b === 'cachedSpriteDirty') return 1;
  if (a === 'glDirty') return -1;
  if (b === 'glDirty') return 1;
  if (a === 'interactive') return -1;
  if (b === 'interactive') return 1;
  if (a === 'renderable') return -1;
  if (b === 'renderable') return 1;

  if (a === 'filling') return -1;
  if (b === 'filling') return 1;
  if (a === 'fillColor') return -1;
  if (b === 'fillColor') return 1;
  if (a === 'fillAlpha') return -1;
  if (b === 'fillAlpha') return 1;

  if (a === 'lineColor') return -1;
  if (b === 'lineColor') return 1;
  if (a === 'lineAlpha') return -1;
  if (b === 'lineAlpha') return 1;
  if (a === 'lineWidth') return -1;
  if (b === 'lineWidth') return 1;

  if (a === 'boundsPadding') return -1;
  if (b === 'boundsPadding') return 1;
  if (a === 'filterArea') return -1;
  if (b === 'filterArea') return 1;


  if (a === 'isMask') return -1;
  if (b === 'isMask') return 1;
  if (a === 'worldAlpha') return -1;
  if (b === 'worldAlpha') return 1;
  if (a < b) return -1;
  if (b < a) return 1;
  return 0;
}

var DetailView = React.createClass({
  getDetailViewColor: function (property, value) {
    if (['fillColor', 'lineColor', 'tint'].indexOf(property) !== -1) {
      var styles = {};
      var hex;
      if (value === null) {
        return <span><span className="detailview__value">{value}</span></span>
      } else if (value === 0) {
        hex = '#000000'
        styles.backgroundColor = hex;
        return <span>
          <span className="detailview__value">{value} [{hex}]</span>
          <span className="detailview__color" style={styles}></span>
        </span>
      } else {
        hex = '#' + Number(value).toString(16);
        styles.backgroundColor = hex;
        return <span>
          <span className="detailview__value">{value} [{hex}]</span>
          <span className="detailview__color" style={styles}></span>
        </span>
      }
    }
    return <span><span className="detailview__value">{value}</span></span>;
  },
	render: function () {
		var data = this.props.data;
		var formatted = {};
		Object.keys(data).forEach( property => {
			if (property[0] === '_' || ['children', 'parent', 'worldTransform', 'graphicsData', 'currentPath'].indexOf(property) !== -1) {
				return;
			}
			var value = data[property];
			var type = typeof value;
      var hex;
			if (type === 'string' || type === 'number') {
				formatted[property] = value;
			} else if (type === 'boolean') {
				formatted[property] = value ? 'true' : 'false'
			} else if (value === null) {
				formatted[property] = 'null';
			} else if (type === 'object') {
				Object.keys(value).forEach( _property => {
					var _value = value[_property];
					var _type = typeof _value;
					if (_type === 'string' || _type === 'number') {
						formatted[property + '.' + _property] = _value
					} else if (_type === 'boolean') {
						formatted[property + '.' + _property] = _value ? 'true' : 'false'
					} else {
						formatted[property + '.' + _property] = '...' + _type
					}
				})
			} else {
				formatted[property] = '...' + type
			}
		});
		var fields = [];
    var sorted = Object.keys(formatted).sort(customSort);
    var label;
    var value;
    for (var i = 0, l = sorted.length; i < l; i++) {
      label = sorted[i];
      value = formatted[label];
      fields.push(<div key={label}>
        <span className="detailview__label">{label}</span>
        {this.getDetailViewColor(label, value)}
      </div>);
    }
		return <div className="detailview">{fields}</div>
	}
});
module.exports = DetailView;
