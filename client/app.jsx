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
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      this.setState({ route: parseRoute(window.location.hash) });
    });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === 'calendar' || route.path === '') {
      const dayId = route.params.get('dayId') || 1;
      return <Calendar dayId={dayId} />;
    } else if (route.path === 'CalorieCalculator') {
      return <CalorieCalculator />;
    } else if (route.path === 'AddNewMealOrExercise') {
      return <AddNewMealOrExercise />;
    } else if (route.path === 'addaNewMeal') {
      return <AddaMeal />;
    } else if (route.path === 'addaNewExercise') {
      return <AddanExercise />;
    } else if (route.path === 'editAMeal') {
      return <EditAMeal/>;
    } else if (route.path === 'editAExercise') {
      return <EditAExercise/>;
    }
  }

  render() {
    const { route } = this.state;
    const dayId = route.params.get('dayId');
    return (
      <div className='container'>
        <Header logo= 'Fitness PaL'/>
        { this.renderPage() }
        <Footer dayId={dayId}/>
      </div>
    );
  }
}

// http://localhost:3000/
