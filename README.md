# Web Development Workshop 
Welcome to the Web Development Workshop. We will be using React, NodeJS and Socket IO to create a swiping poll web application.

# Prerequisites
* Install Git to your computer: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

Install a text editing software such as VS Code / Notepad ++ / Sublime text etc
You can change the default text editor for git to the text editor of your choice: https://help.github.com/en/github/using-git/associating-text-editors-with-git

- [Visual Studio Code](https://code.visualstudio.com/): A text editor which we will be writing our code in.
- [Node.js](https://nodejs.org/en/): Used to run our javascript code.

## Windows

A video of the setup process has been recorded for you if you get stuck. https://youtu.be/Yv-Se-KbFa8

### Visual Studio Code

- Download the windows installer from https://code.visualstudio.com/
- Run the installer once downloaded
- Follow the installation steps

## Node.js

- Download the windows LTS installer from https://nodejs.org/en/download/
- Run the installer once downloaded
- Follow the installation steps
- Open the windows command prompt (search for cmd)
- Verify that node is installed by running `node --version`. The node version (e.g. v14.16.1) should be returned.

## MacOS

A video of the setup process has been recorded for you if you get stuck. https://www.youtube.com/watch?v=Ntv5XS4NBfU

We will use homebrew to install all of the software for mac. Install homebrew by pasting the following two commands into the terminal (spotlight and search for terminal).

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```
```
export PATH="/usr/local/bin:$PATH"
```

### Visual Studio Code

- Run the following command in the terminal

```
brew cask install visual-studio-code
```

### Node.js

- Run the following command in the terminal

```
brew install node
```

- Verify that node is installed by running `node --version`. The node version (e.g. v14.16.1) should be returned.

## This is the end of the pre-requisites! The steps below are for the practical, and you do NOT have to complete these right now (we'll go through them in the workshop)

# React frontend

React is a JS library for creating user interfaces. It is based around creating components for different parts of your website.

We will use `create-react-app` to create the initial project. This package will allow us to quickly get started with react by setting up all the boring stuff e.g. setting up a dev environment, setting up initial dependencies (seen in package.json), setting up build tools, settng up scripts to use, setting up transpilers so that can use the latest features of javascript. You can learn more about it here: https://create-react-app.dev/

-   First create a new folder where we want to our project to be. In VSCode go to Open Folder > Right Click > New Folder > Type a folder name > Select Folder to open it up

-   Open that folder in the terminal. In VSCode click Terminal button on topbar and press new terminal. This will automatically open terminal to right directory.

-   Run `npx create-react-app frontend`

## Components

A component could be a class or a function. For this workshop we will only consider functional components.

They are of the format:

```js
function Component() {
    return <div> </div>;
}

export default Component;
```

This defines a React component called "Component" that shows a empty `<div>` on the page. We export the component so other files (e.g. other components) in our project can use it.

We can use the component we just made in another component like so:

```js
import Component from "./path/to/component";

function AnotherComponent() {
    return (
        <div>
            <Component />
        </div>
    );
}
```

Lets make our first component: a Home Page component.

Create a new folder in /src called Pages and another folder within /Pages called Home. This will contain our Home Component and styling pages. Then create a new file in /src/Pages/Home called Home.js

```js
function Home() {
    return (
        <div className="homeContainer">
            <h1 className="heading"> Swipe Poll </h1>
            <div>
                <input
                    className="questionInput"
                    placeholder="Type a question..."
                />

                <input className="optionInput" placeholder="Type a option..." />

                <button className="addButton">Add</button>

                <button className="createButton">Create Poll</button>
            </div>
        </div>
    );
}

export default Home;
```

If we want to show this on the page, we will import it in `App.js` and use the component.

e.g.

```js
import Home from "./Pages/Home/Home";

function App() {
    return (
        <div>
            <Home />
        </div>
    );
}

export default App;
```

Because the functionality of the input element will be reused, lets make a custom element for it.

Make a folder in /src called Components and a file inside called `Input.js`

```js
function Input() {
    return <input />;
}

export default Input;
```

Lets use this component ins `Home.js` by:

-   importing Input

```js
import Input from "../../Components/Input";
```

-   replacing `<input>` with `<Input>`

## Props

Props (Properties) are inputs that are passed into a component.

To pass a prop, we specifiy a prop name and then the value.
e.g.
`<Header data="asd">`
In this case, the prop `data` is passed in with the value `"asd"`. To access this prop within the component we make a parameter and simply access the properties of the props object passed in.
e.g.

```js
function Header(props) {
    ...
    console.log(props.data)
    ...
}
```

Lets make our custom Input element take in props for placeholder and className.

In `Home.js`:

-   change `<Input />` to include props...

```js
<Input placeholder="Please enter question" className="questionInput">

<Input placeholder="Please enter option" className="optionInput">
```

Then in `Input.js`

```js
function Input(props) {
    return (
        <input placeholder={props.placeholder} className={props.className} />
    );
}
```

## Rendering lists

You can render lists of items using the `map()` function. The map() function accepts a function as an argument and creates a new list based on whats returned from calling that function on each element of the original list.

e.g.

```js
[1, 2].map((n) => <p>{n}</p>);
```

will result in

```js
[<p>1</p>, <p>2</p>];
```

In Home.js, lets create a dummy list to hold options and render out the list of items.

```js
function Home() {
    const options = ["option 1", "option 2", "option 3"]
    return (
                ...
                <button className="addButton">Add</button>

                <ul>
                    {
                       options.map(o => <li key={o}> {o} </li>)
                    }
                </ul>
            </div>
        </div>
    );
}
```

## State

State variables are special variables that when changed, cause the component to update/rerender.

For instance if we want to track the options we add, or the question we put in the input box, we use a state variable.

We create state variables using the `useState()` function.
This function returns a list with 2 items, the state variable (which we can use in jsx for example) and the function used to change the state variable. This list is typically destructured like so:

```js
const [question, setQuestion] = useState(“”);
```

As we want to create a state variable to track what the user has typed, lets create a state variable for that and pass them down to our custom Input component to update.

We also want to create a state variable for the options added. We attach a handler for the onClick property in the add button to update the options list.

In Home.js

```js
import { useState } from "react";
import Input from "../../components/Input";

export default function Home() {
    const [options, setOptions] = useState([]);
    const [question, setQuestion] = useState("");
    const [option, setOption] = useState("");

    return (
        <div className="homeContainer">
            <h1 className="heading"> Swipe Poll </h1>
            <div>
                <Input
                    className="questionInput"
                    placeholder="Type a question..."
                    value={question}
                    setValue={setQuestion}
                />

                <Input
                    className="optionInput"
                    placeholder="Add an option..."
                    value={option}
                    setValue={setOption}
                />

                <button
                    className="addButton"
                    onClick={() => {
                        setOptions([...options, option]);
                    }}
                >
                    Add
                </button>

                <ul>
                    {options.map((o) => (
                        <li className="listItem" key={o}>
                            {o}
                        </li>
                    ))}
                </ul>

                <button className="createButton">Create Poll</button>
            </div>
        </div>
    );
}
```

and in `Input.js`

```js
export default function Input({ className, placeholder, value, setValue }) {
    return (
        <input
            className={className}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}
```

This means that everytime the user types something in the input box, the onChange handler is called which will call `setValue` with whatever the user typed. We can use this `question` state variable elsewhere and it will always update when `setQuestion` is called.

Lets do some styling:
Create a `Home.css` file in /src/Pages/Home

and import it into `Home.js`

```js
import "./Home.css";
```

and in the css file we write:

```css
.homeContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: rgb(29, 29, 29);
}

.questionInput,
.optionInput,
.addButton,
.createButton {
    box-sizing: border-box;
    padding: 10px;
    margin: 5px 5px;
    border-radius: 8px;
    border: none;
}

.questionInput {
    width: 100%;
    font-size: 2rem;
}

.createButton {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
}

.heading,
.listItem {
    font-size: 2rem;
    color: white;
}
```

Our home page is now complete... and you would have gotten a basic understanding of components, props and state.

## Using other peoples components

We will now work on the Vote.js page.

Create a new folder in /Pages called Vote and then create a new file in /Vote called Vote.js.

Before we proceed we will install a package containing a component that another person has made: a TinderCard component which can be swiped left or right!

Using other peoples components is a common practice in react so you can save time and effort. There are whole libraries e.g. material ui, ant design, react-bootstrap dedicated to providing components for you to use.

We will use the `react-tinder-card` package seen here: https://www.npmjs.com/package/react-tinder-card

In the terminal:

-   make sure you are in the frontend directory
-   run `npm i react-tinder-card` or `npm install react-tinder-card`

Once done... we can use it like any other component e.g.

```js
import TinderCard from "react-tinder-card";

export default function Vote() {
    const question = "Dummy question";
    const options = ["Option 1", "Option 2"];

    const handleSwipe = (direction, card) => {
        if (direction === "right") {
            // its swiped right!
        }
    };

    return (
        <div className="voteContainer">
            <h2>Swipe Left for no or Right for yes</h2>
            <h1>{question}</h1>
            <div className="cardContainer">
                {options.map((o) => (
                    <TinderCard
                        key={o}
                        className="card"
                        onCardLeftScreen={(direction) =>
                            handleSwipe(direction, o)
                        }
                        preventSwipe={["up", "down"]}
                    >
                        {o}
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}
```

and also the styling... make a new Vote.css file in /Vote and import it into Vote.js

```css
.voteContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(29, 29, 29);
    height: 100vh;
    color: white;
}

.cardContainer {
    width: 100%;
    display: flex;
    justify-content: center;
}

.card {
    position: absolute;
    background-color: rgb(71, 132, 245);
    width: 200px;
    min-height: 300px;
    padding: 150px;
    font-size: 100px;
    border-radius: 10px;
    word-wrap: break-word;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}
```

and to import in `Vote.js`:

```js
import "./Vote.css";
```

Next we can work on the Summary Page:

-   Make a new folder for Summary in /Pages and create Summary.js and Summary.css

Summary.js

```js
import "./Summary.css";

export default function Summary() {
    const code = "sdfsdf";
    const question = "Question";
    const options = [
        { name: "Option 1", votes: 3 },
        { name: "Option 2", votes: 3 },
    ];

    return (
        <div className="summaryContainer">
            <h1>Code: {code}</h1>
            <h1>{question}</h1>
            <ul>
                {options.map((o) => (
                    <li className="listItem" key={o.name}>
                        {o.name}:{" "}
                        <span className="votes">{o.votes} votes </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

Summary.css

```css
.summaryContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(29, 29, 29);
    height: 100vh;
    color: white;
}

.listItem {
    font-size: 2rem;
}

.votes {
    color: rgb(71, 132, 245);
}
```
