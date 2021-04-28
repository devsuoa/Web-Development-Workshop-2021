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

# Project

## React Frontend

React is a JS library for creating user interfaces. It is based around creating components for different parts of your website.

We will use `create-react-app` to create the initial project. This package will allow us to quickly get started with react by setting up all the boring stuff e.g. setting up a dev environment, setting up initial dependencies (seen in package.json), setting up build tools, settng up scripts to use, setting up transpilers so that can use the latest features of javascript. You can learn more about it here: https://create-react-app.dev/

-   First create a new folder where we want to our project to be. In VSCode go to Open Folder > Right Click > New Folder > Type a folder name > Select Folder to open it up

-   Open that folder in the terminal. In VSCode click Terminal button on topbar and press new terminal. This will automatically open terminal to right directory.

-   Run `npx create-react-app frontend`

## Components

A component could be a class or a function. For this workshop we will only consider functional components.

They are of the format:

```jsx
function Component() {
    return <div> </div>;
}

export default Component;
```

This defines a React component called "Component" that shows a empty `<div>` on the page. We export the component so other files (e.g. other components) in our project can use it.

We can use the component we just made in another component like so:

```jsx
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

```jsx
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

```jsx
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

```jsx
function Input() {
    return <input />;
}

export default Input;
```

Lets use this component ins `Home.js` by:

-   importing Input

```jsx
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

```jsx
function Header(props) {
    ...
    console.log(props.data)
    ...
}
```

Lets make our custom Input element take in props for placeholder and className.

In `Home.js`:

-   change `<Input />` to include props...

```jsx
<Input placeholder="Please enter question" className="questionInput">

<Input placeholder="Please enter option" className="optionInput">
```

Then in `Input.js`

```jsx
function Input(props) {
    return (
        <input placeholder={props.placeholder} className={props.className} />
    );
}
```

## Rendering lists

You can render lists of items using the `map()` function. The map() function accepts a function as an argument and creates a new list based on whats returned from calling that function on each element of the original list.

e.g.

```jsx
[1, 2].map((n) => <p>{n}</p>);
```

will result in

```jsx
[<p>1</p>, <p>2</p>];
```

In Home.js, lets create a dummy list to hold options and render out the list of items.

```jsx
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

```jsx
const [question, setQuestion] = useState(“”);
```

As we want to create a state variable to track what the user has typed, lets create a state variable for that and pass them down to our custom Input component to update.

We also want to create a state variable for the options added. We attach a handler for the onClick property in the add button to update the options list.

In Home.js

```jsx
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

```jsx
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

```jsx
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

```jsx
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

```jsx
import "./Vote.css";
```

Next we can work on the Summary Page:

-   Make a new folder for Summary in /Pages and create Summary.js and Summary.css

Summary.js

```jsx
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

## React Router

Currently, for us to view the different pages we have to comment out the unwanted page components. Instead of manually changing the pages we want use routes to access different pages e.g. `localhost:3000/vote` or `localhost:3000/summary`.

Let's introduce routes to our web app!

In the terminal:

-   make sure you are in the frontend directory
-   run `npm i react-router-dom` or `npm install react-router-dom`

In `app.js`

Let's change our pages to use a Router to switch from different pages from react-router.

```jsx
<Router>
    <Switch>
        <Route path="/summary" component={Summary} />
        <Route path="/vote" component={Vote} />
        <Route path="/" component={Home} />
    </Switch>
</Router>
```

Your notice that the switch is very similar to if conditions else conditions and the first match is used.

We want to be able to switch from different routes in React to do this we want to use `useHistory()`

```jsx
const history = useHistory();
history.push("/summary");
```

In our demo, we showed that we want use routes to indicate different lobbies inside our web app. e.g. `localhost:3000/ABCDE` where my lobby code is ABCDE

This is called params inside react-router where `:code` is the param name
```jsx
<Router>
    <Switch>
        <Route path="/result/:code" component={Summary} />
        <Route path="/:code" component={Vote} />
        <Route path="/" component={Home} />
    </Switch>
</Router>
```

We can retrieve code from our component by using the hook `useParams()`
```jsx
const params = useParams();
const { code } = params // deconstruct object to get params.code
```

## Backend

We have a functional app with all it's state. How do we allow multiple people to vote? To do this we want to create a serverside backend where we can store all the votes made by different people.

Checkout the backend folder for this repo for the backend template!
- Download or git clone the repo (the demo shows the backend folder next to frontend)
- run `npm i` or `npm install` to install dependencies
- run `npm start` to start the REST API

### REST API

A REST API is an architectural style for an application program interface (API) that uses HTTP requests to access and use data.

We will only be focusing on the two main methods:

- GET - used to request data from a specified resource
- POST - used to send data to a server to create/update a resource

You'll notice that in the template we have setup a very basic REST API with all the endpoints that we need.

- POST `/create` - Create a New Lobby
- POST `/:code` - Update a Lobby Vote Count
- GET `/:code` - Get Vote Counts from lobby

Let's start implementing our endpoints

First things is we want to store all the lobbies. Since we currently don't have a database we'll just store this as a local variable.

```jsx
const lobbies = {} // define an empty object to store lobbies
```

Since we want to store lobbies as a certain object lets store them as the following

```js
const lobbies = {
    'ABCDE': {
        question: "My Question",
        options: ["1", "2"],
        results: [
            {
                name: "1",
                votes: 0,
            },
            {
                name: "2",
                votes: 0,
            }
        ]
    }
} 
```

Now we have a basic structure we can implement `/create` what this endpoint does is it would create a new value into lobbies with a new Lobby code

Our `req.body` for this request would be

```js
req.body = {
    question: "My Question",
    options: ["1","2"]
}
```

Implementation:

```js
app.post('/create', (req, res) => {
    const { question, options } = req.body

    // generate random code
    const code = generateRandomCode()

    // add a new value to our object using code
    lobbies[code] = {
        question,
        options,
        results: options.map((item) => {
            // use map to create our new structure
            return {
                name: item,
                votes: 0,
            }
        }),
    }

    // send back our lobby code
    res.send(code)
})
```

Next is GET `/:code`, we want to return all the information about the lobby to the client. The only major difference is we want to use `req.params`

```js
app.get('/:code', (req, res) => {
    const { code } = req.params // get code

    // return 404 Not Found
    if (lobbies[code] === undefined) {
        res.sendStatus(404)
        return
    }

    // else send the data about lobby
    res.send(lobbies[code])
})
```

The hardest one is to increment vote when someone votes

```js
app.post('/:code', (req, res) => {
    const { code } = req.params
    const { option } = req.body

    // return 404 Not Found
    if (lobbies[code] === undefined) {
        res.sendStatus(404)
        return
    }

    // increment the vote for the right option
    lobbies[code].results.map((item) => {
        if (item.name === option) {
            item.votes++
        }
    })
}
```

## Connecting Frontend and Backend

Let install a library called axios that help us call the backend
- run `npm i axios` in the React app, frontend folder

Let handle when the user clicks submit on the homepage
```js
const handleSubmit = () => {
    axios.post(
        'http://localhost:3001/create',
        {
            question,
            options,
        },
    ).then(res => {
        history.push('/stats/' + res.data)
    }).catch(err => {
        alert(err)
    })
}
```

Before we can call GET `/:code` in the `/stats` page we need to introduce `useEffect()`. useEffect is a hook that allows the user to pass in a function that will be called very render.

```js
useEffect(() => {
	// do stuff here
})
```

In useEffect it is usually undesireable to call a function everytime when the screen rerenders. So useEffect has a dependency list where it will only call the function when the dependency has been changed. If there is no dependency the function would only be called once when the component loads
```js
useEffect(() => {
	// on component mount
},[])
```

Using this we can call axios to call GET `/:code` once when the page loads
```js
useEffect(() => {
    axios.get(
        'http://localhost:3001/' + code
    ).then((res) => {
        setData(res.data)
    }).catch((err) => {
        alert(err)
        history.push('/')
    })
}, [])
```

On the Vote page we want to POST when the user swipes a card
```js
const handleSwipe = (direction, card) => {
    if (direction === 'right') {
        axios.post('http://localhost:3001/' + code, {
            option: card,
        })
    }
}
```

## Socket.IO (If we have time!)

### Backend

Create an event listener for connection and make the user join the lobby code.

```js
io.on('connection', (socket) => {
    const { code } = socket.handshake.query
    socket.join(code)
})
```

Create 

```js
app.post('/:code', (req, res) => {
    const { code } = req.params
    const { option } = req.body

    // return 404 Not Found
    if (lobbies[code] === undefined) {
        res.sendStatus(404)
        return
    }

    // increment the vote for the right option
    lobbies[code].results.map((item) => {
        if (item.name === option) {
            item.votes++
        }
    })

    // use socket.io to emit event to lobby
    io.to(code).emit('data', lobbies[code])
})
```

So now on the stats page we can add this
```js
// Connect to socket.io backend
const socket = io('http://localhost:3001/', {
    query: {
        code: code,
    },
})

// When event data is sent
socket.on('data', (data) => {
    setData(data)
})
```
