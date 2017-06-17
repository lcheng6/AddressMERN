var React = require("react");
var Results = require("./Results.js");

var History = React.createClass({
  render: function(){
  return (
    <div>
    <div className="panel panel-default">
  <div className="panel-heading">
    <h3 className="panel-title">Search History</h3>
  </div>
  <div className="panel-body">
   <h3>{this.props.address}</h3>
  </div>
</div>
</div>
  );
}
})

module.exports = History;