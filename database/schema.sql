-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
-- pgweb --db=fitnessPal
-- http://localhost:8081
drop schema "public" cascade;
create schema "public";
 CREATE TABLE "users" (
  "userId" serial NOT NULL,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "password" TEXT NOT NULL,
  "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
  "RDA" integer NOT NULL,
  CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "days" (
  "userId" integer NOT NULL,
  "dayId" serial NOT NULL,
  "day" TEXT NOT NULL,
  CONSTRAINT "days_pk" PRIMARY KEY ("dayId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "meals" (
  "mealId" serial NOT NULL,
  "mealName" TEXT NOT NULL,
  "mealDescription" TEXT NOT NULL,
  "dayId" integer NOT NULL,
  CONSTRAINT "meals_pk" PRIMARY KEY ("mealId")
) WITH (
  OIDS=FALSE
);
CREATE TABLE "exercises" (
  "exerciseId" serial NOT NULL,
  "exerciseName" TEXT NOT NULL,
  "exerciseDescription" TEXT NOT NULL,
  "dayId" integer NOT NULL,
  CONSTRAINT "exercises_pk" PRIMARY KEY ("exerciseId")
) WITH (
  OIDS=FALSE
);
ALTER TABLE "days" ADD CONSTRAINT "days_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "meals" ADD CONSTRAINT "meals_fk0" FOREIGN KEY ("dayId") REFERENCES "days"("dayId");
ALTER TABLE "exercises" ADD CONSTRAINT "exercises_fk0" FOREIGN KEY ("dayId") REFERENCES "days"("dayId");
