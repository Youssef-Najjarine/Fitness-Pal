import React from 'react';
import ClientError from '../../server/client-error';
export default class CalorieCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gender: 'default',
      age: '',
      weight: '',
      height: '',
      activityLevel: 'default'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let bmr = 0;
    const { gender, age, weight, height, activityLevel } = this.state;
    if (gender === 'default' || activityLevel === 'default') {
      throw new ClientError(400, 'Please provide a valid gender and activity level.');
    }
    if (gender === 'Male') {
      bmr = 66.47 + (13.75 * (Number(weight) / 2.205)) + (5.003 * (Number(height) * 2.54)) - (6.755 * Number(age));
    } else if (gender === 'Female') {
      bmr = 655.1 + (9.563 * (Number(weight) / 2.205)) + (1.850 * (Number(height) * 2.54)) - (4.676 * Number(age));
    }

    if (activityLevel === 'sedentary') {
      bmr = bmr * 1.2;
    } else if (activityLevel === 'lightly active') {
      bmr = bmr * 1.375;
    } else if (activityLevel === 'moderately active') {
      bmr = bmr * 1.55;
    } else if (activityLevel === 'active') {
      bmr = bmr * 1.725;
    } else {
      bmr = bmr * 1.9;
    }
    bmr = ~~bmr;
    const newObject = { bmr };
    const { token } = this.props;
    fetch('/api/users/:userId', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(newObject)
    })
      .then(response => response.json())
      .then(data => { })
      .catch(error => {
        console.error('Error:', error);
      });

    window.location.hash = '#calendar?dayId=1';
    this.setState({
      gender: 'default',
      age: '',
      weight: '',
      height: '',
      activityLevel: 'default'
    });
  }

  handleChange(event) {
    const value = event.target.value;

    const name = event.target.name;

    this.setState({ [name]: value });
  }

  render() {
    return (
      <main className= 'calorie-calculator'>
      <h2>Calorie Calculator</h2>
        <h3>Fill out the form and press “Submit” to calculate your daily calorie needs</h3>
        <form onSubmit={this.handleSubmit}>
      <div className='row'>
        <label>Gender</label>
            <select
                    name="gender"
                    value={this.state.gender}
                    onChange={this.handleChange}>
              <option value="default" disabled>Select Your Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
      </div>
            <div className='row'>
              <label>Age</label>
              <input
                    required
                    type='text'
                    placeholder= 'Please enter your age...'
                    onChange={this.handleChange}
                    value={this.state.age}
                    id='age'
                    name='age'
              />
            </div>
          <div className='row'>
            <label>Weight</label>
            <input
                    required
                    type='text'
                    placeholder='Please enter your weight in lbs...'
                    onChange={this.handleChange}
                    value={this.state.weight}
                    id='weight'
                    name='weight'
            />
          </div>
          <div className='row'>
            <label>Height</label>
            <input
                  required
                  type='text'
                  placeholder='Please enter your height in inches...'
                  onChange={this.handleChange}
                  value={this.state.height}
                  id='height'
                  name='height'
            />
          </div>
          <div className='row'>
            <label className='activityLevelLabel'>Activity Level</label>
            <select
                    name="activityLevel"
                    value={this.state.activityLevel}
                    onChange={this.handleChange}
                    >
              <option value="default" disabled>Select your level of activity</option>
              <option value="sedentary">Sedentary</option>
              <option value="lightly active">Lightly Active (1-3 days a week)</option>
              <option value="moderately active">Moderately Active (3-5 days a week)</option>
              <option value="active">Active (6-7 days a week)</option>
              <option value="very active">Very Active (7 days a week)</option>
            </select>
          </div>
            <span className="meal-exercise-cancel-submit-calorie-calc">
            <a href="#calendar?dayId=1">Cancel</a>
              <button className='calorie-calculator-submit'>Submit</button>
            </span>
      </form>
      </main>
    );
  }
}
