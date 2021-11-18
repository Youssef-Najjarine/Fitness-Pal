import React from 'react';

export default function Footer(props) {
  return (
    <>
      <footer>
        <div className="footer-display">
          <div className="calendar">
          <a href='#calendar?dayId=1' className="fas fa-calendar-alt"></a>
          </div>
          <div className="calculator">
          <a href="#CalorieCalculator" className="fas fa-calculator"></a>
          </div>
          <div className="add-icon">
          <a href="#AddNewMealOrExercise" className="fas fa-plus"></a>
        </div>
        </div>
      </footer>
    </>
  );
}
