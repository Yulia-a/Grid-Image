import React, { Component } from 'react';
import GridItem from './GridItem';
import Masonry from 'masonry-layout';
import LightBox from './../components/LightBox';

class GridImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: 0,
      imageIndex: 0,
      isOpen: false,
      initPoint: 0,
      finalPoint: 0
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.handleWheel = this.handleWheel.bind(this);
    this.handleSwipeStart = this.handleSwipeStart.bind(this);
    this.handleSwipeEnd = this.handleSwipeEnd.bind(this);
    this.handleListener = this.handleListener.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {
    const grid = this.gridList;
    const initMasonry = () => (
      this.msnry = new Masonry(grid, {
        itemSelector: '.grid-item',
        gutter: 10,
        columnWidth: 300,
        isFitWidth: true
      })
    );
    initMasonry();

  }

  componentDidUpdate(prevProps) {
    if (this.props.list.length !== prevProps.list.length) {
      this.msnry.reloadItems();
      this.msnry.layout();
    }
  }

  handleListener() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener('touchstart', this.handleSwipeStart);
    document.addEventListener('touchend', this.handleSwipeEnd);

    if ('onwheel' in document) {
      document.addEventListener("wheel", this.handleWheel);
    } else if ('onmousewheel' in document) {
      document.addEventListener("mousewheel", this.handleWheel);
    } else {
      document.addEventListener("MozMousePixelScroll", this.handleWheel);
    }
  };

  handleClose(){
    this.setState({ isOpen: false });

    document.removeEventListener("keydown", this.handleKeydown);

    if ('onwheel' in document) {
      document.removeEventListener("wheel", this.handleWheel);
    } else if ('onmousewheel' in document) {
      document.removeEventListener("mousewheel", this.handleWheel);
    } else {
      document.removeEventListener("MozMousePixelScroll", this.handleWheel);
    }
  }

  handleWheel(e) {
    e.stopPropagation();
    e.preventDefault();
    const { imageIndex } = this.state;
    const { list } = this.props;
    e = e || window.event;
    const delta = e.deltaY || e.detail || e.wheelDelta;
    delta > 0 ?
      this.setState({
        imageIndex: (imageIndex + 1) % list.length,
      })
      :
      this.setState({
        imageIndex: (imageIndex + list.length - 1) % list.length,
      });
  };

  handleKeydown(e){
    const { imageIndex, isOpen } = this.state;
    const { list } = this.props;
    if(isOpen) {
      switch (e.keyCode) {
        case 37:
          this.setState({
            imageIndex: (imageIndex + list.length - 1) % list.length,
          });
          break;
        case 39:
          this.setState({
            imageIndex: (imageIndex + 1) % list.length,
          });
          break;
        default:
          break;
      }
    }
  }

  handleSwipeStart(e){

    const point = e.changedTouches[0];
    this.setState({ initPoint: point });

  }

  handleSwipeEnd(e) {

    const point = e.changedTouches[0];
    this.setState({ finalPoint: point });

    const {imageIndex, initPoint, finalPoint} = this.state;
    const { list } = this.props;

    const xAbs = Math.abs(initPoint.pageX - finalPoint.pageX);
    const yAbs = Math.abs(initPoint.pageY - finalPoint.pageY);
    if (xAbs > 20) {
      if (xAbs > yAbs) {
        if (finalPoint.pageX < initPoint.pageX) {
          this.setState({
            imageIndex: (imageIndex + list.length - 1) % list.length,
          });
        }
        else {
          this.setState({
            imageIndex: (imageIndex + 1) % list.length,
          });
        }
      }
    }
  };

  handleClick(newIndex) {
    this.handleListener();
    this.setState({ imageUrl: this.props.list[newIndex].src });
    this.setState({ imageIndex: newIndex });
    this.setState({ isOpen: true });

  };

  render() {
    const { imageIndex, isOpen } = this.state;
    const { list } = this.props;
    return (
      <div className="grid-wrapper">
        <div className="grid-list" ref={(grid) => (this.gridList= grid)}>
          {
            list.map((item, index) => {
              return (
                <GridItem
                  key={index}
                  src={item.src}
                  id={index}
                  onClickItem={this.handleClick}
                >
                </GridItem>
              );
            })
          }
          {
            isOpen &&
            <LightBox
              src={list[imageIndex].src}
              onClose={this.handleClose}
              onNextSrc={() => this.setState({
                imageIndex: (imageIndex + 1) % list.length,
              })}
              onPrevSrc={() => this.setState({
                imageIndex: (imageIndex + list.length - 1) % list.length,
              })}
            />
          }
        </div>
      </div>
    )
  }
}

export default GridImage;