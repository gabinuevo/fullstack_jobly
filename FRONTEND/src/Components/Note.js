import React, { Component } from 'react';

import "../Styles/Note.css"

class Note extends Component {
  render() {
    return (
      <div className="Note">
        <div className="Note-Text">
          {this.props.note}
        </div>
      </div>
    );
  }
}

export default Note;