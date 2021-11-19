require('dotenv/config');
const pg = require('pg');
const express = require('express');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const ClientError = require('./client-error');

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

app.use(staticMiddleware);

const jsonMiddleware = express.json();

app.use(jsonMiddleware);

app.use(errorMiddleware);

app.get('/api/days', (req, res) => {

  const sql = `
    select *
      from "days"
     order by "dayId"
  `;

  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/days/:dayId/meals', (req, res) => {
  const { dayId } = req.params;
  const sql = `
    select *
      from "meals"
      where "dayId"= $1
     order by "mealId"
  `;
  const params = [dayId];

  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.get('/api/days/:dayId/exercises', (req, res) => {
  const { dayId } = req.params;
  const sql = `
    select *
      from "exercises"
      where "dayId"= $1
     order by "exerciseId"
  `;
  const params = [dayId];

  db.query(sql, params)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/days/meals', (req, res) => {
  const userId = 1;
  // const userId = req.user.userId;
  const { mealName, mealDescription, dayId } = req.body;
  if (!mealName || !mealDescription) {
    throw new ClientError(400, 'Please enter a valid meal name and description.');
  }
  const sql = `
    insert into "meals" ("mealName", "mealDescription", "dayId", "userId")
    values ($1, $2, $3, $4)
    returning *
  `;
  const params = [mealName, mealDescription, dayId, userId];
  db.query(sql, params)
    .then(result => {
      const [meal] = result.rows;
      res.status(201).json(meal);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.post('/api/days/exercises', (req, res) => {
  const userId = 1;
  // const userId = req.user.userId;
  const { exerciseName, exerciseDescription, dayId } = req.body;
  if (!exerciseName || !exerciseDescription) {
    throw new ClientError(400, 'Please enter a valid exercise name and description.');
  }
  const sql = `
    insert into "exercises" ("exerciseName", "exerciseDescription", "dayId", "userId")
    values ($1, $2, $3, $4)
    returning *
  `;
  const params = [exerciseName, exerciseDescription, dayId, userId];
  db.query(sql, params)
    .then(result => {
      const [exercise] = result.rows;
      res.status(201).json(exercise);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
