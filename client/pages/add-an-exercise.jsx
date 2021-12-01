import React from 'react';
import ClientError from '../../server/client-error';
export default class AddanExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      dayId: 'default',
      exerciseName: '',
      exerciseDescription: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('/api/days')
      .then(response => response.json())
      .then(data => {
        this.setState({ days: data });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const currentUserJSON = localStorage.getItem('currentUser');
    const { dayId, exerciseName, exerciseDescription } = this.state;
    const newExercise = { exerciseName, exerciseDescription, dayId };
    if (dayId === 'default') {
      throw new ClientError(400, 'Please enter a valid Day of the week.');
    } else if (currentUserJSON !== null) {
      const currentUser = JSON.parse(currentUserJSON);
      const { token } = currentUser;
      fetch('/api/days/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(newExercise)
      })
        .then(response => response.json())
        .then(newExercise => { })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      fetch('/api/days/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newExercise)
      })
        .then(response => response.json())
        .then(newExercise => { })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    window.location.hash = `#calendar?dayId=${dayId}`;
    this.setState({
      days: [],
      dayId: 'default',
      exerciseName: '',
      exerciseDescription: ''
    });
  }

  handleDays() {
    const days = this.state.days;
    return days.map(day => {
      return <option key={day.dayId} value={day.dayId}>{day.day}</option>;
    });
  }

  handleChange(event) {
    const value = event.target.value;

    const name = event.target.name;

    this.setState({ [name]: value });

  }

  render() {
    return (
      <main className='create-new-meal-exercise'>
        <h2>Add an Exercise</h2>
        <form className='create-new-meal-exercise-form' onSubmit={this.handleSubmit}>

          <select
            className='new-meal-exercise-select'
            name='dayId'
            value={this.state.dayId}
            onChange={this.handleChange}>
            <option value="default" disabled>Day of Week</option>
            <>
              {this.handleDays()}
            </>
          </select>

          <input
            placeholder='Exercise Name...'
            required
            className="meal-exercise-name"
            id="exerciseName"
            name="exerciseName"
            type="text"
            onChange={this.handleChange}
            value={this.state.exerciseName}
          />

          <textarea
            required
            rows="10"
            placeholder='Exercise Description...'
            className="meal-exercise-description"
            id="exerciseDescription"
            name="exerciseDescription"
            type="text"
            onChange={this.handleChange}
            value={this.state.exerciseDescription}
          >
          </textarea>
          <div className="meal-exercise-cancel-submit">
            <a href="#calendar?dayId=1">Cancel</a>
            <button>Save</button>
          </div>
        </form>
      </main>
    );
  }
}
