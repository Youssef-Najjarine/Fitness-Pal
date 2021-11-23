import React from 'react';
import ClientError from '../../server/client-error';
import parseRoute from '../lib/parse-route';
export default class EditAMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      dayId: parseRoute(window.location.hash).params.get('dayId'),
      mealName: '',
      mealDescription: ''
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
    const hashArray = window.location.hash.split('?');
    const mealId = new URLSearchParams(hashArray[2]).get('mealId');
    fetch(`/api/meals/${mealId}`, {
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => {
        this.setState({ mealName: data.mealName, mealDescription: data.mealDescription });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const hashArray = window.location.hash.split('?');
    const mealId = new URLSearchParams(hashArray[2]).get('mealId');
    const { dayId, mealName, mealDescription } = this.state;
    const updatedMeal = { mealName, mealDescription, dayId };
    if (dayId === 'default') {
      throw new ClientError(400, 'Please enter a valid Day of the week.');
    } else {

      fetch(`/api/meals/${mealId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedMeal)
      })
        .then(response => response.json())
        .then(newMeal => { })
        .catch(error => {
          console.error('Error:', error);
        });

      window.location.hash = `#calendar?dayId=${dayId}`;
      this.setState({
        days: [],
        dayId: 'default',
        mealName: '',
        mealDescription: ''
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
        <h2>Edit Meal</h2>
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
            placeholder='Meal Name...'
            required
            className="meal-exercise-name"
            id="mealName"
            name="mealName"
            type="text"
            onChange={this.handleChange}
            value={this.state.mealName}
          />

          <textarea
            required
            rows="10"
            placeholder='Meal Description...'
            className="meal-exercise-description"
            id="mealDescription"
            name="mealDescription"
            type="text"
            onChange={this.handleChange}
            value={this.state.mealDescription}
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
