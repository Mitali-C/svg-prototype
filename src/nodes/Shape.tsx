import {BaseNode} from "./BaseNode";


class Rectangle extends BaseNode{
  data:any;
  onClick:any;
  constructor(props: any){
    super(props.data);
    this.state = props;
    this.data = props.data;
  }

  onSelect = () => {
    this.props.onClick(this.props.data.id);
  }

  renderShape = () => {
    switch(this.data.shapeType){
      case 'RECTANGLE':
        return <rect x={this.data.absoluteBounds?.x} y={this.data.absoluteBounds?.y} width={this.data.absoluteBounds?.width} height={this.data.absoluteBounds?.height} stroke={this.data.stroke?.strokeColor} fill={this.data.fill} stroke-width={this.data.stroke?.strokeWidth} onClick={this.onSelect}></rect>;
      case 'ELLIPSE':
        return <ellipse cx={this.data.absoluteBounds?.x +(this.data.absoluteBounds?.width/2)} cy={this.data.absoluteBounds?.y+(this.data.absoluteBounds?.height/2)} rx={this.data.absoluteBounds?.width/2} ry={this.data.absoluteBounds?.height/2} stroke={this.data.stroke?.strokeColor} fill={this.data.fill} stroke-width={this.data.stroke?.strokeWidth} onClick={this.onSelect}></ellipse>;
      default: 
        return;
    }
  }

  render(){
    return(
      <>
      {this.renderShape()}
      </>
    )
  }
}

export default Rectangle;