import Input from "../../Components/Input";
import { useState } from "react";
import "./Home.css";

function Home() {
    const [question, setQuestion] = useState("");
    const [option, setOption] = useState("");

    const [options, setOptions] = useState([]);
    return (
        <div className="homeContainer">
            <h1 className="heading"> Swipe App </h1>
            <div>
                <Input
                    className="questionInput"
                    value={question}
                    setValue={setQuestion}
                    placeholder="Please enter a question..."
                />
                <Input
                    className="optionInput"
                    value={option}
                    setValue={setOption}
                    placeholder="Please enter a option..."
                />
                <button
                    className="addButton"
                    onClick={() => setOptions(options.concat(option))}
                >
                    Add
                </button>
                <h1>{question}</h1>
                {options.length === 0 ? (
                    <p> No options...</p>
                ) : (
                    options.map((o) => (
                        <li className="listItem" key={o}>
                            {o}
                        </li>
                    ))
                )}
                <button className="createButton">Create Poll</button>
            </div>
        </div>
    );
}

export default Home;
