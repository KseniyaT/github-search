# Hello Friends!
Let's start :smiley:

## Note: Before using the app
1) Create a [github personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
),
2) In the root of the repository, add the `.env` file, add the created token to this file with key **GITHUB_ACCESS_TOKEN** (for an example, see the `.env.example` file)

## Usage
### Install instruction:
1. Download the app
2. Add `.env` file to the root, add your personal github token
3. Install packages: run in the command line, navigate to the root directory of your project
  ```sh
  npm install
  ```
4. Run
  ```sh
  npm run dev
  ```
5. Open http://localhost:8080 in your browser

### Usage instrustion:
1. Open Home page\
i. Input a search request to find a repository by name, author or text in description\
ii. Press "search" button\
iii. As a result, upon successful processing of the request, a list of repositories that match the request will be displayed\
iv. Choose one of them or see others by clicking on the "Next" button

2. When you click on one of the repositories, a window will open with that repository.\
You will see its title, as well as the name of the author and the name of the repository.\
Below there will be a form to search for repository issues, if any. You can enter a keyword to search in the titles and in the body of issues.\
i. In the list of issue cards, you can click "view issue" to open a window with a list of all the comments for that issue.\
Or you can click on "view source" to open the issue's github in a new window

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:8080) to view it in the browser.

### `npm run test`

Launches the test.

### `npm run prod`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

