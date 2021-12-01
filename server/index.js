require('dotenv/config');
const pg = require('pg');
const jwt = require('jsonwebtoken');
const argon2 = require('argon2');
const express = require('express');
const ClientError = require('./client-error');
const errorMiddleware = require('./error-middleware');
const staticMiddleware = require('./static-middleware');
const authorizationMiddleware = require('./authorization-middleware');
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

app.use(authorizationMiddleware);
app.get('/api/users', (req, res) => {
  let userId = 1;
  if (req.user) {
    userId = req.user.userId;
  }
  const sql = `
    select  "RDA"
      from "users"
      where "userId" = $1
  `;
  const params = [userId];
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
  let userId = 1;
  if (req.user) {
    userId = req.user.userId;
  }
  const { dayId } = req.params;
  const sql = `
    select *
      from "meals"
      where "dayId"= $1 AND "userId" = $2
     order by "mealId"
  `;
  const params = [dayId, userId];

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
  let userId = 1;
  if (req.user) {
    userId = req.user.userId;
  }
  const { dayId } = req.params;
  const sql = `
    select *
      from "exercises"
      where "dayId"= $1 AND "userId" = $2
     order by "exerciseId"
  `;
  const params = [dayId, userId];

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

app.get('/api/meals/:mealId', (req, res) => {
  const mealId = parseInt(req.params.mealId, 10);
  const sql = `
    select *
      from "meals"
      where "mealId"= $1
  `;
  const params = [mealId];
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

app.get('/api/exercises/:exerciseId', (req, res) => {
  const exerciseId = parseInt(req.params.exerciseId, 10);
  const sql = `
    select *
      from "exercises"
      where "exerciseId"= $1
  `;
  const params = [exerciseId];
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
app.post('/api/days/meals', (req, res) => {
  let userId = 0;
  if (!req.user) {
    userId = 1;
  } else {
    userId = req.user.userId;
  }
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
  let userId = 0;
  if (!req.user) {
    userId = 1;
  } else {
    userId = req.user.userId;
  }
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

app.patch('/api/users/:userId', (req, res) => {
  let userId = 1;
  if (req.user) {
    userId = req.user.userId;
  }
  const { bmr } = req.body;
  if (!bmr) {
    throw new ClientError(400, 'please enter a valid bmr');
  }

  const sql = `
    update "users"
       set "createdAt" = now(),
           "RDA" = $1
     where "userId" = $2
     returning *
  `;
  const params = [bmr, userId];
  db.query(sql, params)
    .then(result => {
      const [todo] = result.rows;
      if (!todo) {
        throw new ClientError(400, `cannot find user with userId ${userId}`);
      }
      res.json(todo);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.patch('/api/meals/:mealId', (req, res) => {
  const { mealId } = req.params;
  const { mealName, mealDescription, dayId } = req.body;
  if (!mealId || !mealName || !mealDescription || !dayId) {
    throw new ClientError(400, 'please enter a valid meal name, meal description, and day of the week.');
  }

  const sql = `
    update "meals"
       set "mealName" = $1,
           "mealDescription" = $2,
           "dayId" = $3
     where "mealId" = $4
     returning *
  `;
  const params = [mealName, mealDescription, dayId, mealId];
  db.query(sql, params)
    .then(result => {
      const [updatedMeal] = result.rows;
      if (!updatedMeal) {
        throw new ClientError(400, `cannot find mealId with mealId ${mealId}`);
      }
      res.json(updatedMeal);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.patch('/api/exercises/:exerciseId', (req, res) => {
  const { exerciseId } = req.params;
  const { exerciseName, exerciseDescription, dayId } = req.body;
  if (!exerciseId || !exerciseName || !exerciseDescription || !dayId) {
    throw new ClientError(400, 'please enter a valid exercise name, exercise description, and day of the week.');
  }

  const sql = `
    update "exercises"
       set "exerciseName" = $1,
           "exerciseDescription" = $2,
           "dayId" = $3
     where "exerciseId" = $4
     returning *
  `;
  const params = [exerciseName, exerciseDescription, dayId, exerciseId];
  db.query(sql, params)
    .then(result => {
      const [updatedExercise] = result.rows;
      if (!updatedExercise) {
        throw new ClientError(400, `cannot find exerciseId with exerciseId ${exerciseId}`);
      }
      res.json(updatedExercise);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occurred'
      });
    });
});

app.delete('/api/meals/:mealId', function (req, res) {
  let { mealId } = req.params;
  mealId = Number(mealId);

  const text = `DELETE FROM "meals"
              where "mealId"=$1
              RETURNING *`;
  const value = [mealId];
  db.query(text, value, (err, res2) => {
    if (err) {
      return res.status(500).send({ error: 'database querying failed.' });
    } else {
      return res.sendStatus(204);
    }
  });
});

app.delete('/api/exercises/:exerciseId', function (req, res) {
  let { exerciseId } = req.params;
  exerciseId = Number(exerciseId);

  const text = `DELETE FROM "exercises"
              where "exerciseId"=$1
              RETURNING *`;
  const value = [exerciseId];
  db.query(text, value, (err, res2) => {
    if (err) {
      return res.status(500).send({ error: 'database querying failed.' });
    } else {
      return res.sendStatus(204);
    }
  });
});

app.post('/api/users/sign-up', (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    throw new ClientError(400, 'first name, last name, email, and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
        insert into "users" ("firstName", "lastName", "email", "hashedPassword", "RDA")
        values ($1, $2, $3, $4, $5)
        returning "userId", "firstName", "lastName", "createdAt"
      `;
      const params = [firstName, lastName, email, hashedPassword, 0];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/users/sign-in', (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword",
           "firstName",
           "lastName"
      from "users"
     where "email" = $1
  `;
  const params = [email];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword, firstName, lastName } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, fullName: firstName + ' ' + lastName };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
