import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Video from './components/Video';
import { Redirect } from 'react-router';
import { v4String } from 'uuid/interfaces';

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.state = {
      room: undefined,
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
      return <Redirect to={room}/>;
    }


    return (
      <main className="container my-5">
        <main>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route component={Video}/>
          </Switch>
        </main>

      </main>
    );
  }
}


export interface IAppProps {
  location: {
    room: v4String;
  }
}

export interface IAppState {
  room: v4String;
}


export default App;
