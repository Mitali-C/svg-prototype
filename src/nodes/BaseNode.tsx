import React from 'react';

interface NodeState {
  data:any,
  onClick:any

}

interface NodeProps {
  data:any,
  onClick:any
}

class BaseNode extends React.Component<NodeState, NodeProps>{
  constructor(props: NodeProps)
  {
      super(props)
      this.state = props
  }

  onClick = () => {
    // implemented in children
  }

  render(){
    return(
      <rect x={this.state.data.absoluteBounds.x} y={this.state.data.absoluteBounds.y} width={this.state.data.absoluteBounds.width} height={this.state.data.absoluteBounds.height}></rect>
    )
  }
}

export {BaseNode};