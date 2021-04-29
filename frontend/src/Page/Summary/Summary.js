import "./Summary.css";

function Summary() {
    const options = [
        { name: "Maccas", votes: 3 },
        { name: "Bk", votes: 3 },
        { name: "Wendys", votes: 3 },
    ];
    return (
        <div className="summaryContainer">
            <h1>Code: sdflksdjfkl</h1>
            <h1> Question ?</h1>
            <ul>
                {options.map((o) => (
                    <li className="listItem" key={o.name}>
                        {o.name}: {o.votes} Votes
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Summary;
