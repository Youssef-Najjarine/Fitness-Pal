import React from 'react';
import ClientError from '../../server/client-error';
import parseRoute from '../lib/parse-route';
export default class EditAExercise extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      dayId: parseRoute(window.location.hash).params.get('dayId'),
      exerciseName: '',
      exerciseDescription: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { token } = this.props;
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
    const hashArray = window.location.hash.split('?');
    const exerciseId = new URLSearchParams(hashArray[2]).get('exerciseId');
    fetch(`/api/exercises/${exerciseId}`, {
      method: 'GET',
      headers: {
        'x-access-token': token
      }
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ exerciseName: data.exerciseName, exerciseDescription: data.exerciseDescription });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { token } = this.props;
    const hashArray = window.location.hash.split('?');
    const exerciseId = new URLSearchParams(hashArray[2]).get('exerciseId');
    const { dayId, exerciseName, exerciseDescription } = this.state;
    const updatedExercise = { exerciseName, exerciseDescription, dayId };
    if (dayId === 'default') {
      throw new ClientError(400, 'Please enter a valid Day of the week.');
    } else {

      fetch(`/api/exercises/${exerciseId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },
        body: JSON.stringify(updatedExercise)
      })
        .then(response => response.json())
        .then(updatedExercise => { })
        .catch(error => {
          console.error('Error:', error);
        });

      window.location.hash = `#calendar?dayId=${dayId}`;
      this.setState({
        days: [],
        dayId: 'default',
        exerciseName: '',
        exerciseDescription: ''
      });
    }
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
        <h2>Edit Exercise</h2>
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
            placeholder='exercise Name...'
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
