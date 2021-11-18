import React from 'react';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      meals: [],
      exercises: [],
      days: []
    };
  }

  getData() {
    const { dayId } = this.props;

    fetch('/api/days')
      .then(response => response.json())
      .then(data => {
        this.setState({ days: data });
      });

    fetch(`/api/days/${dayId}/meals`)
      .then(response => response.json())
      .then(data => {
        this.setState({ meals: data });
      });

    fetch(`/api/days/${dayId}/exercises`)
      .then(response => response.json())
      .then(data => {
        this.setState({ exercises: data });
      });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.dayId !== this.props.dayId) {
      this.getData();
    }
  }

  componentDidMount() {
    const { dayId } = this.props;

    fetch('/api/days')
      .then(response => response.json())
      .then(data => {
        this.setState({ days: data });
      });

    fetch(`/api/days/${dayId}/meals`)
      .then(response => response.json())
      .then(data => {
        this.setState({ meals: data });
      });

    fetch(`/api/days/${dayId}/exercises`)
      .then(response => response.json())
      .then(data => {
        this.setState({ exercises: data });
      });
  }

  handleMeals() {
    const meals = this.state.meals;
    return meals.map(meal => {
      return <li key={meal.mealId}>
        <div>
          <label>{meal.mealName}</label>
          <p>{meal.mealDescription}</p>
        </div>

        <div>

        </div>
      </li>;
    });
  }

  handleExercises() {
    const exercises = this.state.exercises;
    return exercises.map(exercise => {
      return <li key={exercise.exerciseId}>
        <div>
          <label>{exercise.exerciseName}</label>
          <p>{exercise.exerciseDescription}</p>
        </div>

        <div>

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

  render() {
    return (
      <main>
        <div className='days-buttons'>
        {this.handleDays()}
        </div>
        <ul className='row'>
          <div className='column-half'>
            <h3>Meals</h3>
              {this.handleMeals()}
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
