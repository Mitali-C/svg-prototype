import React from 'react';
import interact from 'interactjs';

type Props = {
  data:any,
  id:string,
  resizeElement: any,
  moveElement: any,
};
type State = {
  // count: number; // like this
};
class Transformer extends React.Component<Props, State>{

  addTransformer = () => {
    interact(`.${this.props.id}`)
    .draggable({
      onmove: this.dragMoveListener
    })
    .resizable({
      preserveAspectRatio: false,
      edges: { left: true, right: true, bottom: true, top: true }
    })
    .on('resizemove',  (event) => {
      var target = event.target,
          x = (parseFloat(target.getAttribute('data-x')) || 0),
          y = (parseFloat(target.getAttribute('data-y')) || 0);

      // update the element's style
      target.style.width  = event.rect.width + 'px';
      target.style.height = event.rect.height + 'px';

      // translate when resizing from top or left edges
      x += event.deltaRect.left;
      y += event.deltaRect.top;

      target.style.webkitTransform = target.style.transform =
          'translate(' + x + 'px,' + y + 'px)';

      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
      target.textContent = event.rect.width + '×' + event.rect.height;
      const data = {
        x: this.props.data.absoluteBounds.x+event.deltaRect.left, y: this.props.data.absoluteBounds.y+event.deltaRect.top, width:event.rect.width/2, height: event.rect.height/2
      }
      console.log(data)
      // this.props.resizeElement(this.props.id, data);
    });
  }

  dragMoveListener = (event:any) =>{
    console.log('dragMoveListener:', event)
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
      'translate(' + x + 'px, ' + y + 'px)';

    // update the position attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    const data = {x: event.rect.left, y: event.rect.top}
    this.props.moveElement(this.props.id, data);
  }
  onClick = () => {
    console.log('CLICKED!');
    this.addTransformer();
  }

  render(){
    const {data} = this.props;
    return(
      <g id={`group-${this.props.id}`} onClick={this.onClick}>
        {
          data!==null && (
            <>
            <rect id={this.props.id} className={`${this.props.id}`} x={data.absoluteBounds.x} y={data.absoluteBounds.y} width={data.absoluteBounds.width} height={data.absoluteBounds.height} stroke="#6cb7ff" fill="transparent" stroke-width="1"></rect>
            {/* connecting lines */}
            {/* top left */}
            <circle cx={data.absoluteBounds.x} cy={data.absoluteBounds.y} r="5" stroke="#6cb7ff" stroke-width="1" fill="#FFF" />
            {/* bottom right */}
            <circle cx={data.absoluteBounds.x+(data.absoluteBounds.width)} cy={data.absoluteBounds.y+(data.absoluteBounds.height)} r="5" stroke="#6cb7ff" stroke-width="1" fill="#FFF" />
            {/* top right */}
            <circle cx={data.absoluteBounds.x+(data.absoluteBounds.width)} cy={data.absoluteBounds.y} r="5" stroke="#6cb7ff" stroke-width="1" fill="#FFF" />
            {/* bottom left */}
            <circle cx={data.absoluteBounds.x} cy={data.absoluteBounds.y+(data.absoluteBounds.height)} r="5" stroke="#6cb7ff" stroke-width="1" fill="#FFF" />
            </>
          )
        }
      </g>
    )
  }
}

export default Transformer;