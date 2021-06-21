import {BaseNode} from "./BaseNode";

class Markup extends BaseNode{
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
    const {path} = this.data;
    let renderPath = '';
    let points = path.slice(0);
    if (points.length > 0) {
      renderPath = `M ${points[0].x} ${points[0].y}`;
      var p1, p2, end;
      for (var i = 1; i < points.length - 2; i += 2) {
        p1 = points[i];
        p2 = points[i + 1];
        end = points[i + 2];
        renderPath += ` C ${p1.x} ${p1.y}, ${p2.x} ${p2.y}, ${end.x} ${end.y}`;
      }
    }
    return(
      <>
      <path id={this.data.id} className={`drag-svg-${this.data.id}`} key={renderPath} stroke="blue" strokeWidth={2} d={renderPath} fill="none"  onClick={this.onSelect}></path>
      </>
    )
  }
}

export default Markup;