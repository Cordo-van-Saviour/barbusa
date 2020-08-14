import * as React from 'react';
import { IAppProps } from '../App';
import io from 'socket.io-client';
import { Redirect } from 'react-router';

class Video extends React.Component<any> {
  constructor(props: IAppProps) {
    super(props);
  }


  render() {

    if (!this.props.location.pathname.substr(1)) {
      return <Redirect to='/'/>;
    }

    const socket = io('http://localhost:3000');
    const loc = this.props.location.pathname.substr(1);

    socket.on('client-connected', clientId => {
      console.log(clientId);
    });

    socket.emit('join-room', loc, 10);

    return (
      <div>
        <h1>This is Video</h1>
        <h2>Room id: {loc}</h2>
        <div id='video-grid'>
        </div>
      </div>
    );
  }
};

export default Video;
