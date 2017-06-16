import React from 'react';

const LightBox = (props) => {
  const { src, onClose, onNextSrc, onPrevSrc } = props;
  return (
    <div className="lightbox">
      <div className="lightbox-nav">
        <div className="lightbox-close" onClick={onClose}>
          <i className="iconClose"> </i>
        </div>
        <div className="lightbox-next" onClick={onNextSrc}>
          <i className="iconNext"> </i>
        </div>
        <div className="lightbox-prev" onClick={onPrevSrc}>
          <i className="iconPrev"> </i>
        </div>
      </div>
      <div className="lightbox-wrapper" onClick={onClose}>
        <img className="current-image" src={src}  alt="" onClick={(e) => {
          e.stopPropagation();
        }} />
      </div>
    </div>
  );
};
export default LightBox;