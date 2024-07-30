# Recipes sharing platform

Recipe sharing platform is an app for sharing and discovering recipes, connecting culinary enthusiasts in a vibrant community.

### User Registration and Authentication

- Register, log in, and log out securely.

### Administrator Capabilities

- Admins can add necessary recipe categories.

### Recipe Management

- Authenticated users can create, edit, and delete recipes with titles, ingredients, steps, and images.
- Categorize recipes and search by title, ingredients, or category.
- Users can edit or delete only their own recipes.

### Visitor Interaction

- View recipes, likes.

### User Interaction

- Like, comment on, and save favorite recipes.
- Follow other users.

### Recipe Discovery

- Featured recipes on the homepage.
- Random recipe suggestions.

### User Profile

- Display recipes, followers, and following.
- Customize profile and upload a profile picture.

# Project start

Dowload or clone repository.

## Database

After you have opened the project, start the terminal and in main branch and enter this code :

git update-index --skip-worktree back/src/main/resources/application.properties

### For local database:

1. Download included sql file.
2. Comment out remote dabase in application.propterites in back folder.
3. Create the database with the same name as the file name.
4. Import sql file.

### For remote database:

1. Open applciation.properties
1. Comment out local database code. If you haven't changed anything leave it as is.

## Back End

The back end is built with Spring Boot. To run the back end, follow these instructions:

1. Install Java JDK if needed. You can download it from [Java JDK](https://java.sun.com). Choose the latest LTS version.
2. Check `application.properties` in the project directory and make adjustments if necessary.
3. Open the project with IntelliJ (recommended) [download here](https://www.jetbrains.com/idea/download/?section=windows).
4. Run the application from IntelliJ.

## Front End

The front end is written in React. To run the front end, follow these steps:

1. If your machine doesn't have Node.js download it [here](https://nodejs.org/en) to check type in terminal node -v.
2. Install npm if needed in terminal run cooman `npm install -g npm`
3. Install all dependencies: `npm install` or `npm i.
4. Replace .env copy with .env and replace your url example : "[localhost://8080](http://localhost:8080)"
5. Start the development server: `npm run dev`
6. Click or paste on the link.

## Team

| QA                                                         | DEV                                                 |
| ---------------------------------------------------------- | --------------------------------------------------- |
| [Liucija Ivanauskienė](https://github.com/Liucija65)       | [Gintarė Ragaišienė](https://github.com/gintare)    |
| [Vladimir Michailov](https://github.com/VladimirMichailov) | [Slavomir Michailin](https://github.com/SMichailin) |
| [Alina Trečiokė](https://github.com/AlinaTrecioke)         | [Ovidijus Eitminavičius](https://github.com/Ovii2)  |
| [Gintaras Jezepčikas](https://github.com/gjezepcikas)      |

### Technologies used

Back-end

1. Java
2. Spring boot 3+
3. Spring security 6+
4. MySql databse
5. Selenium

Front-end

1. React
2. CSS
3. Bootstrap
