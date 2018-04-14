import React, { Component } from "react";
import { render } from "react-dom";
import SortableTree, {getFlatDataFromTree,getTreeFromFlatData} from "react-sortable-tree";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
     treeData : []
    };
  }
  componentDidMount() {
    var that = this;
    var finalTreeData;
   fetch('http://localhost:3300/api/treeData')
   .then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
  })
  .then(function(data) {
    console.log(data);
    that.setState({ treeData: data});
  });
  }
  render() {
    return (
      <div style={{ height: 500 }}>
        <SortableTree
          treeData={this.state.treeData}
          onChange={treeData => this.setState({ treeData })}
        />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
