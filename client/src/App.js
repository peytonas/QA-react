import React, { Component } from 'react';
import NavBar from './Navbar';
import Question from './Question';
import Questions from './Questions';
import Profile from './Profile'
import Callback from './Callback';
import NewQuestion from './NewQuestion';
import SecuredRoute from './SecuredRoute';
import { Route, withRouter } from 'react-router-dom';
import auth0Client from './Auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkingSession: true,
    }
  }
  async componentDidMount() {
    if (this.props.location.pathname === '/callback') {
      this.setState({ checkingSession: false });
      return;
    };
    try {
      await auth0Client.silentAuth();
      this.forceUpdate();
    } catch (err) {
      if (err.error !== 'login_required') console.log(err.error);
    }
    this.setState({ checkingSession: false });
  }
  render() {
    return (
      <div className="text-dark">
        <NavBar />
        <Route exact path='/' component={Questions} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/question/:questionId' component={Question} />
        <Route exact path='/callback' component={Callback} />
        <SecuredRoute path='/new-question'
          component={NewQuestion}
          checkingSession={this.state.checkingSession} />
      </div>
    );
  }
}

export default withRouter(App);