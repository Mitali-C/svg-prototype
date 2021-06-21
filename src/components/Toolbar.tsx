import React from 'react';

interface Props {
  setPointerType: any,
  transformer: Transformer
}

class Toolbar extends React.Component<Props, {}>{

  setPointerType = (type: String) => {
    this.props.setPointerType(type);
  }

  render(){
    return(
      <div className="toolbar">
        <button onClick={()=>{this.setPointerType('SELECT')}}>Select</button>
        <button onClick={()=>{this.setPointerType('RECTANGLE')}}>Rectangle</button>
        <button onClick={()=>{this.setPointerType('ELLIPSE')}}>Ellipse</button>
        <button onClick={()=>{this.setPointerType('IMAGE')}}>Image</button>
        <button onClick={()=>{this.setPointerType('MARKUP')}}>Markup</button>
      </div>
    )
  }
}

export default Toolbar;