import React from 'react';

export default class CalorieCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: 'default'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ gender: event.target.value });
  }

  render() {
    return (
      <main className= 'calorie-calculator'>
      <h2>Calorie Calculator</h2>
        <h3>Fill out the form and press “Submit” to calculate your daily calorie needs</h3>
        <form>
      <div className='row'>
        <label>Gender</label>
            <select value={this.state.gender} onChange={this.handleChange}>
              <option value="default" disabled>Select Your Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
      </div>
            <div className='row'>
              <label>Age</label>
              <input
              type='text'
              placeholder= 'Please enter your age...'
              />
            </div>
          <div className='row'>
            <label>Weight</label>
            <input
              type='text'
              placeholder='Please enter your weight in lbs...'
            />
          </div>
          <div className='row'>
            <label>Height</label>
            <input
              type='text'
              placeholder='Please enter your height in inches...'
            />
          </div>
          <div className='row'>
            <label className='activityLevelLabel'>Activity Level</label>
            <select name="gender" id="gender">
              <option value="">Select your level of activity</option>
              <option value="sedentary">Sedentary</option>
              <option value="lightly active">Lightly Active (1-3 days a week)</option>
              <option value="moderately active">Moderately Active (3-5 days a week)</option>
              <option value="very active">Very Active (6-7 days a week)</option>
              <option value="extra active">Extra Active (7 days a week)</option>
            </select>
          </div>
            <button className='calorie-calculator-submit'>Submit</button>
      </form>
      </main>
    );
  }
}
