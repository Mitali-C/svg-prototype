import {BaseNode} from "./BaseNode";

class Image extends BaseNode{
  data:any;
  constructor(props: any){
    super(props.data.absoluteBounds);
    this.state = props;
    this.data = props.data;
  }

  onSelect = () => {
    this.props.onClick(this.props.data.id);
  }

  render(){
    return(
      <>
      <foreignObject x={this.data.absoluteBounds?.x} 
        y={this.data.absoluteBounds?.y} 
        width={this.data.absoluteBounds?.width} 
        height={this.data.absoluteBounds?.height}
        style={{overflow:'visible'}} onClick={this.onSelect}>
        <textarea disabled={true} style={{width:'100%', height:'inherit', background:'transparent', border:'none', resize:'none'}}>{this.data.text.value}</textarea>
        </foreignObject>
      </>
    )
  }
}

export default Image;