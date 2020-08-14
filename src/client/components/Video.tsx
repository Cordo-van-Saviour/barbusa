import * as React from 'react';
import { IAppProps } from '../App';
import { Redirect } from 'react-router';

class Video extends React.Component<any> {
  constructor(props: IAppProps) {
    super(props);
  }

  render() {

    if (!this.props.location.room) {
      return <Redirect to='/'/>;
    }

    return (
      <div>
        <h1>This is Video</h1>
          <h2>Room id: {this.props.location.room}</h2>
        <div id="video-grid">
        </div>
      </div>
    );
  }
};

export default Video;
