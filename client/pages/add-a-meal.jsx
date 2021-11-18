import React from 'react';

export default class AddaMeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      dayId: 'default',
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
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dayId, mealName, mealDescription } = this.state;
    const newMeal = { mealName, mealDescription, dayId };

    fetch('/api/days/meals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newMeal)
    })
      .then(response => response.json())
      .then(newMeal => {})
      .catch(error => {
        console.error('Error:', error);
      });

    window.location.hash = `#calendar?dayId=${dayId}`;
    this.setState({
      days: [],
      dayId: 0,
      mealName: '',
      mealDescription: ''
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
        <h2>Add a Meal</h2>
        <form className='create-new-meal-exercise-form' onSubmit={this.handleSubmit}>

          <select
                  className='new-meal-exercise-select'
                  name = 'dayId'
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
