import React from 'react';
import Shape from '../nodes/Shape';
import ImageComponent from '../nodes/Image';
import Markup from '../nodes/Markup';
import Text from '../nodes/Text';
import { data } from '../data/data';
import {images} from '../data/randomImages';
import Toolbar from './Toolbar';
import Transformer from './Transformer';
import { v4 as uuidv4 } from 'uuid';
import svgPanZoom from 'svg-pan-zoom';

class Canvas extends React.Component{
  state = {
    nodes:[],
    pointer_type:'SELECT',
    transformerData:null,
    selectedId:null,
    count: 0,
    startTime:new Date(),
    endTime:new Date(),
  }

  setPointerType = (type) => {
    this.setState({pointer_type:type})
  }

  componentDidMount(){
    //Get all the shapes
    // this.setState({nodes:data.children});
    // window.addEventListener('keydown', this.onKeyDown);
    // window.addEventListener('keyup', () => {
    //   var panZoom = svgPanZoom('#svg-container');
    //   panZoom.disablePan();
    // });

    // document.getElementById('svg-container').addEventListener('load', function(){
    // var panZoom = svgPanZoom('#svg-container');

    // panZoom.disablePan();
      
    // panZoom.enableZoom();
    // })

    // rendering 1000 images
    this.setState({startTime: new Date()})
    for(let i=0;i<500; i++){
      let allNodes = this.state.nodes;
      let url = this.getRandomImageSource();
        this.getMeta(
          url,
          (width, height) => { 
            const tempImageData = {
              id:uuidv4(),
              "type":"IMAGE",
              "absoluteBounds":{
                "x":this.getRandomArbitrary(0, window.innerWidth),
                "y":this.getRandomArbitrary(0, window.innerHeight),
                width:width, 
                height:height
              },
              "image":{
                "src":url
              }
            };
            allNodes.push(tempImageData);
            this.setState({"nodes": allNodes});
          }
        )
      }
  }

  getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  increaseImageLoadCount = () => {
    this.setState({count: this.state.count+1, endTime: new Date()})
  } 

  getTimeDifference = () => {
    if(this.state.startTime && this.state.endTime){
      var delta = Math.abs(this.state.startTime.valueOf() - this.state.endTime.valueOf()) / 1000;

      // calculate (and subtract) whole days
      var days = Math.floor(delta / 86400);
      delta -= days * 86400;

      // calculate (and subtract) whole hours
      var hours = Math.floor(delta / 3600) % 24;
      delta -= hours * 3600;

      // calculate (and subtract) whole minutes
      var minutes = Math.floor(delta / 60) % 60;
      delta -= minutes * 60;

      // what's left is seconds
      var seconds = delta % 60;  // in theory the modulus is not required

      return `${minutes} minutes ${seconds} seconds`
    }
  }

  getRandomImageSource = () => {
    const min = Math.ceil(0);
    const max = Math.floor(images.length);
    return images[Math.floor(Math.random() * (max - min) + min)]; //The maximum is exclusive and the minimum is inclusive
  }

  getMeta = (url, callback) => {
    var img = new Image();
    img.src = url;
    img.onload = () => { callback(img.width, img.height) }
  }

  onMouseDown = (e) => {
    const x = e.pageX;
    const y = e.pageY;
    let allNodes = this.state.nodes;
    this.startPos = {x, y};
    switch(this.state.pointer_type){
      case 'RECTANGLE':
        const tempRectData = {
          id:uuidv4(),
          "type":"SHAPE",
          "shapeType":"RECTANGLE",
          "absoluteBounds":{
            "x":x,
            "y":y,
            "width":100,
            "height":100
          },
          "fill":"#FFFFFF",
          "stroke":{
            "strokeWidth":4, 
            "strokeColor":"#000000"
          }
        }
        allNodes.push(tempRectData);
        this.setState({"nodes": allNodes});
        this.drawing = true;
        break;
      case 'ELLIPSE':
        const tempEllipseData = {
          id:uuidv4(),
          "type":"SHAPE",
          "shapeType":"ELLIPSE",
          "absoluteBounds":{
            "x":x,
            "y":y,
            "width":100,
            "height":100
          },
          "fill":"#FFFFFF",
          "stroke":{
            "strokeWidth":4, 
            "strokeColor":"#000000"
          }
        }
        allNodes.push(tempEllipseData);
        this.setState({"nodes": allNodes});
        this.drawing = true;
        break;
      case 'MARKUP':
        const tempMarkupData = {
          id:uuidv4(),
          "type":"MARKUP",
          "stroke":{
            "strokeWidth":4, 
            "strokeColor":"#000000"
          },
          path:[
            {x, y}
          ]
        }
        allNodes.push(tempMarkupData);
        this.setState({"nodes": allNodes});
        this.drawing = true;
        break;
      case 'IMAGE':
        let url = this.getRandomImageSource();
        this.getMeta(
          url,
          (width, height) => { 
            const tempImageData = {
              id:uuidv4(),
              "type":"IMAGE",
              "absoluteBounds":{
                "x":x,
                "y":y,
                width:width, 
                height:height
              },
              "image":{
                "src":url
              }
            };
            allNodes.push(tempImageData);
            this.setState({"nodes": allNodes});
           }
        );
        break;
      default:
        break;
    }
  }

  onMouseMove = (e) => {
    if(this.drawing){
      const x = e.pageX;
      const y = e.pageY;
      this.endPos = {x, y}
      let delta = {delX: this.endPos.x - this.startPos.x,delY: this.endPos.y - this.startPos.y}
      let {delX, delY} = delta;
      let tempNodes = this.state.nodes;
      let lastNode = tempNodes.pop();
      switch(this.state.pointer_type){
        case 'MARKUP':
          let path = lastNode.path;
          path.push(this.endPos);
          lastNode.path = path;
          tempNodes.push(lastNode);
          this.setState({nodes: tempNodes})
          break;
        case 'ELLIPSE':
          lastNode.absoluteBounds.width = delX;
          lastNode.absoluteBounds.height = delY;
          tempNodes.push(lastNode);
          this.setState({nodes: tempNodes})
          break;
        case 'RECTANGLE':
          lastNode.absoluteBounds.width = delX;
          lastNode.absoluteBounds.height = delY;
          tempNodes.push(lastNode);
          this.setState({nodes: tempNodes})
          break;
        default:
          break;
      }
    }
  }

  onMouseUp = (e) => {
    this.drawing = false;
  }

  setTransformer = (id) => {
    const nodes = this.state.nodes;
    for(let i = 0; i < nodes.length; i++){
      if(nodes[i].id===id){
        console.log(id, nodes[i], nodes)

        this.setState({selectedId:id, transformerData: nodes[i]});
        return;
      }
    }
  }

  moveElement = (id, data) => {
    // console.log('moving')
    console.log(id, data)

    const nodes = this.state.nodes;
    for(let i = 0; i < nodes.length; i++){
      if(nodes[i].id===id){
        nodes[i].absoluteBounds.x = data.x
        nodes[i].absoluteBounds.y = data.y
        this.setState({nodes: nodes});
        return;
      }
    }
  }

  resizeElement = (id, data) => {
    // console.log('moving')
    console.log(id, data)

    const nodes = this.state.nodes;
    for(let i = 0; i < nodes.length; i++){
      if(nodes[i].id===id){
        // nodes[i].absoluteBounds.x = data.x
        // nodes[i].absoluteBounds.y = data.y
        nodes[i].absoluteBounds.width = data.width
        nodes[i].absoluteBounds.height = data.height

        this.setState({nodes: nodes});
        return;
      }
    }
  }

  onKeyDown = (e) => {
    if(e.keyCode===16){
      var panZoom = svgPanZoom('#svg-container');
      panZoom.enablePan();
    }
  }

  render(){
    return(
      <div>
      <div style={{display:'flex', flexWrap:'wrap'}}>
        <p style={{marginRight:'2rem'}}>
          <span style={{fontWeight:'bold', textDecoration:'underline'}}>Time</span>: {this.getTimeDifference()} 
        </p>
        <p><span style={{fontWeight:'bold', textDecoration:'underline'}}>Count</span>: {this.state.count}</p>
      </div>
        {/* <Toolbar setPointerType={this.setPointerType}></Toolbar> */}
        <svg style={{minHeight:'100vh', width:'100%'}} onMouseDown={this.onMouseDown} onMouseMove={this.onMouseMove} onMouseUp={this.onMouseUp} id="svg-container">
          {/* render all shapes */}
          {
            this.state.nodes.filter(x=>x.type==='SHAPE').map((shape, index) => (
              <Shape data={shape} key={index} onClick={this.setTransformer}></Shape>
            ))
          }
          {/* render all images */}
          {
            this.state.nodes.filter(x=>x.type==='IMAGE').map((image, index) => (
              <ImageComponent data={image} key={index} onClick={this.setTransformer} increaseImageLoadCount={this.increaseImageLoadCount}></ImageComponent>
            ))
          }
          {/* render all text */}
          {
            this.state.nodes.filter(x=>x.type==='TEXT').map((text, index) => (
              <Text data={text} key={index} onClick={this.setTransformer}></Text>
            ))
          }
          {/* render all markups */}
          {
            this.state.nodes.filter(x=>x.type==='MARKUP').map((markup, index) => (
              <Markup data={markup} key={index} onClick={this.setTransformer}></Markup>
            ))
          }
          {/* <use xlinkHref={`#group-${this.state.selectedId}`} /> */}
          <Transformer 
              data={this.state.transformerData} 
              id={this.state.selectedId} 
              moveElement={this.moveElement} 
              resizeElement={this.resizeElement}>

              </Transformer>

        </svg>
      </div>
    )
  }
}

export default Canvas;