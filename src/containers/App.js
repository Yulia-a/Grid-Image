import React from 'react';
import GridImage from './../components/GridImage';
import list from '../constants/list';

const App = () => {
  this.state = {
    list
  };
  return (
      <div>
        <GridImage list={this.state.list} />
      </div>
  );
};


export default App;