import React, { Component } from 'react';

class GridItem extends Component {
  render(){
    const { id, src, onClickItem } = this.props;
    return (
      <div className="grid-item">
        <img src={src} onClick={() => onClickItem(id)} alt="" />
      </div>
    );
  }
}

export default GridItem;