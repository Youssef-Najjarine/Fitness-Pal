import React from 'react';
import deleteEntry from './delete-entries';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      exercises: [],
      days: [],
      RDA: 0
    };
    this.getData = this.getData.bind(this);
  }

  getData() {
    const { dayId, token } = this.props;
    fetch('/api/users', {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        let [rda] = data;
        rda = rda.RDA;
        this.setState({ RDA: rda });
      });

    fetch('/api/days', {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ days: data });
      });

    fetch(`/api/days/${dayId}/meals`, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ meals: data });
      });

    fetch(`/api/days/${dayId}/exercises`, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ exercises: data });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dayId !== this.props.dayId || prevProps.user !== this.props.user) {
      this.getData();
    }
  }

  componentDidMount() {
    const { dayId, token } = this.props;
    fetch('/api/users', {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        let [rda] = data;
        rda = rda.RDA;
        this.setState({ RDA: rda });
      });

    fetch('/api/days', {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ days: data });
      });

    fetch(`/api/days/${dayId}/meals`, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ meals: data });
      });

    fetch(`/api/days/${dayId}/exercises`, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ exercises: data });
      });
  }

  handleMeals() {
    const meals = this.state.meals;
    return meals.map(meal => {
      return <li key={meal.mealId} className='row-meal-exercise'>
        <div>
          <label>{meal.mealName}</label>
          <p>{meal.mealDescription}</p>
        </div>
        <div>
          <a href={`#editAMeal?dayId=${meal.dayId}?mealId=${meal.mealId}`} className="fas fa-edit blue-text"></a>
          <button onClick={() => deleteEntry('meal', meal.mealId, this.getData)} className="fas fa-trash-alt red-text"></button>
        </div>
      </li>;
    });
  }

  handleExercises() {
    const exercises = this.state.exercises;
    return exercises.map(exercise => {
      return <li key={exercise.exerciseId} className='row-meal-exercise'>
        <div>
          <label>{exercise.exerciseName}</label>
          <p>{exercise.exerciseDescription}</p>
        </div>
        <div>
          <a href={`#editAExercise?dayId=${exercise.dayId}?exerciseId=${exercise.exerciseId}`} className="fas fa-edit blue-text"></a>
          <button onClick={() => deleteEntry('exercise', exercise.exerciseId, this.getData)} className="fas fa-trash-alt red-text"></button>
        </div>
      </li>;
    });
  }

  handleDays() {
    const days = this.state.days;
    return days.map(day => {
      return <a key={day.dayId}
                className={this.getDaysClassName(day.dayId)}
                href={`#calendar?dayId=${day.dayId}`}
                >{day.day}</a>;
    });

  }

  getDaysClassName(dayId) {
    return dayId === Number(this.props.dayId)
      ? 'active'
      : 'not-active';
  }

  getBmr() {
    return this.state.RDA === 0
      ? 'N/A'
      : this.state.RDA;
  }

  render() {

    return (
      <main>
        <div className='column-full bmr'><h2>Basal metabolic rate (BMR): {this.getBmr()}</h2></div>
        <div className='days-buttons'>
        {this.handleDays()}
        </div>
        <ul className='row'>
          <div className='column-half'>
            <h3>Meals</h3>
              {this.handleMeals()}
              <div>
            </div>
            </div>

          <div className='column-half'>
            <h3 className='exercises-h3'>Exercises</h3>
              {this.handleExercises()}
            </div>
        </ul>
      </main>
    );
  }
}
