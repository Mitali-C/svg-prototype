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
      {/* <defs>
        <pattern  
                  id={`img-pattern-${this.data.id}`} 
                  x="0" 
                  y="0" 
                  width="1" 
                  height="1" 
                  viewBox={`0 0 ${this.data.absoluteBounds?.width} ${this.data.absoluteBounds?.height}`} 
                  >
          <image width={this.data.absoluteBounds?.width} height={this.data.absoluteBounds?.height}
                  preserveAspectRatio={"none"} onLoad={this.props.increaseImageLoadCount}
                href={this.data.image?.src}/>
        </pattern>
      </defs> */}
          <image width={this.data.absoluteBounds?.width} height={this.data.absoluteBounds?.height} x={this.data.absoluteBounds?.x} y={this.data.absoluteBounds?.y} 
                  preserveAspectRatio={"none"} onLoad={this.props.increaseImageLoadCount}
                href={this.data.image?.src}/>
      {/* <rect 
        id={this.data.id}
        className={`drag-svg-${this.data.id}`} 
        x={this.data.absoluteBounds?.x} y={this.data.absoluteBounds?.y} width={this.data.absoluteBounds?.width} height={this.data.absoluteBounds?.height} 
        fill={`url(#img-pattern-${this.data.id})`}  onClick={this.onSelect}></rect> */}
      </>
    )
  }
}

export default Image;