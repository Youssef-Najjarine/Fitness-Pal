import React from 'react';
import parseRoute from './lib/parse-route';
import Header from './pages/header';
import Footer from './pages/footer';
import Calendar from './pages/calendar';
import CalorieCalculator from './pages/calorie-calculator';
import AddNewMealOrExercise from './pages/add-new-meal-or-exercise';
import AddaMeal from './pages/add-a-meal';
import AddanExercise from './pages/add-an-exercise';
import EditAMeal from './pages/edit-a-meal';
import EditAExercise from './pages/edit-an-exercise';
import SignUpOrSignIn from './pages/sign-up-or-sign-in';
import CreateAccount from './pages/create-account';
import SignIn from './pages/sign-in';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      token: null,
      route: parseRoute(window.location.hash)
    };
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
    const userJSON = window.localStorage.getItem('currentUser');
    const user = userJSON ? JSON.parse(userJSON).name : null;
    const token = userJSON ? JSON.parse(userJSON).token : null;
    this.setState({ user: user, token: token });
  }

  handleSignIn(currentUser) {
    window.localStorage.setItem('currentUser', JSON.stringify(currentUser));
    this.setState({ user: currentUser.name, token: currentUser.token });
  }

  renderPage() {
    const { route, user, token } = this.state;
    if (!user) {
      return <SignIn handleSignIn={this.handleSignIn}/>;
    } else if (route.path === 'calendar' || route.path === '') {
      const dayId = route.params.get('dayId') || 1;
      return <Calendar dayId={dayId} user={user} token={token}/>;
    } else if (route.path === 'CalorieCalculator') {
      return <CalorieCalculator token={token}/>;
    } else if (route.path === 'AddNewMealOrExercise') {
      return <AddNewMealOrExercise />;
    } else if (route.path === 'addaNewMeal') {
      return <AddaMeal token={token}/>;
    } else if (route.path === 'addaNewExercise') {
      return <AddanExercise token={token}/>;
    } else if (route.path === 'editAMeal') {
      return <EditAMeal token={token}/>;
    } else if (route.path === 'editAExercise') {
      return <EditAExercise token={token}/>;
    } else if (route.path === 'SignUpOrSignIn') {
      return <SignUpOrSignIn/>;
    } else if (route.path === 'createAccount') {
      return <CreateAccount/>;
    } else if (route.path === 'signIn') {
      return <SignIn handleSignIn={this.handleSignIn}/>;
    }
  }

  render() {
    const { route, user } = this.state;
    const dayId = route.params.get('dayId');
    return (
      <div className='container'>
        <Header logo='Fitness PaL' user={user}/>
        { this.renderPage() }
        <Footer dayId={dayId}/>
      </div>
    );
  }
}

// http://localhost:3000/
