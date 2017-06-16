import React, { Component } from 'react';

class GridItem extends Component {
  render(){
    const { id, src, onClickItem, onLoad } = this.props;
    return (
      <div className="grid-item">
        <img src={src} onClick={() => onClickItem(id)} alt="" onLoad={onLoad} />
      </div>
    );
  }
}

export default GridItem;