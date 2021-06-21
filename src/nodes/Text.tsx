import {BaseNode} from "./BaseNode";

class Image extends BaseNode{
  data:any;
  constructor(props: any){
    super(props.data.absoluteBounds);
    this.state = props;
    this.data = props.data;
  }

  render(){
    return(
      <>
      <text 
        x={this.data.absoluteBounds?.x} 
        y={this.data.absoluteBounds?.y} 
        width={this.data.absoluteBounds?.width} 
        height={this.data.absoluteBounds?.height}
        style={{overflow:'visible'}}
      >{this.data.text.value}</text>
      </>
    )
  }
}

export default Image;