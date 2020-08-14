import * as React from 'react';
import { Redirect } from 'react-router';

class Home extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      room: '',
    };
  }

  async handleClick() {
    try {
      let r = await fetch('/api');
      let room = await r.json();
      await this.setState(room);
    } catch (error) {
      console.log(error);
    }
  }


  render() {
    const { room } = this.state;

    if (room) {
      return <Redirect to={{
        pathname: room,
        room
      }}/>;
    }

    return (
      <div>
        <h1>This is home</h1>
        <button onClick={this.handleClick.bind(this)}>Get A Room!</button>
      </div>
    );
  }
}


export interface IAppProps {
}

export interface IAppState {
  room: string;
}


export default Home;
