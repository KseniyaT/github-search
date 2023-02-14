#Hello Friends!

##NOTE: Before using the app
1) create a [github personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
),
2) in the root of the repository, add the `.env` file, add the created token to this file with key **GITHUB_ACCESS_TOKEN** (for an example, see the `.env.example` file)

##Usage
###Install instruction:
1. Download the app
2. Add .env file to the root, add your personal github token
3. Install packages: run in the command line, navigate to the root directory of your project
  ```sh
  npm install
  ```
4. Run
  ```sh
  npm run dev
  ```
5. Open http://localhost:8080 in your browser

###Usage instrustion:
1. Open Home page
1.1. Input a search request to find a repository by name, author or text in description
1.2. Press "search" button
1.3. As a result, upon successful processing of the request, a list of repositories that match the request will be displayed
1.4. Choose one of them or see others by clicking on the "Next" button

2. When you click on one of the repositories, a window will open with that repository.
You will see its title, as well as the name of the author and the name of the repository.
Below there will be a form to search for repository issues, if any. You can enter a keyword to search in the titles and in the body of issues.
2.1. In the list of issue cards, you can click "view issue" to open a window with a list of all the comments for that issue. 
Or you can click on "view source" to open the issue's github in a new window

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:8080) to view it in the browser.

### `npm run test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run prod`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
