# Fitness Pal

A dynamic HTML, CSS, and React solo project.

I built this project so users interested in benefiting their health and overall well being.Users can create a custom meal and exercise plan for the week. 

Here is a link to **Fitness Pal**:

[Fitness Pal](https://fitness-pal1.herokuapp.com/)

**Technologies used:**
- HTML
- CSS
- JavaScript
- React
- Argon2
- Express
- Webpack
- Babel
- pg
- Figma's wireframing tools to better plan for and organize the application before beginning the project.
- Applied *CSS3* media queries to achieve an application that is more responsive towards mobile users.

**Features:**

- Add custom Meal plan
- Add custom Exercise plan
- Calorie calculator
- Sign Up/Sign in
- Edit meal plans
- Edit exercise plans
- Edit Basal metabolic rate(BMR)
- Delete meal plans
- Delete exercise plans

![add-meal-exercise-plan-demo](https://user-images.githubusercontent.com/71291742/145139885-328b3b4b-0219-4fc4-b21f-3be4d4a13cf3.gif)

![calorie-calculator--demo](https://user-images.githubusercontent.com/71291742/145140001-89284dcb-e01b-4d6d-8e45-252df8a28025.gif)



**Stretch features:**

- Users can add a cookBook of favorite recipes
- Users can view recipes and workout regimens of friends
- Users can be matched with a personal trainer that best suits their needs.

### System Requirements

- Node.js 10 or higher
- NPM 6 or higher
- MongoDB 4 or higher

### Getting Started

1. Clone the repository.

    ```shell
    git clone git@github.com:Youssef-Najjarine/Fitness-Pal.git
    cd sgt-react
    ```

2. Install all dependencies with NPM.

    ```shell
    npm install
    ```

3. Import the  database.

    ```shell
    npm run db:import
    ```

4. Once PostgreSQL is started enter pgweb --db=fitnessPal in a new terminal.

    ```shell
    sudo service postgresql start
    ```
5. Enter http://localhost:8081 into your window to view database.


6. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```

