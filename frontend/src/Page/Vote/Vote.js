import TinderCard from "react-tinder-card";
import "./Vote.css";

function Vote() {
    const question = "Where to eat?";
    const options = ["Maccas", "BK", "Wendys"];
    return (
        <div className="voteContainer">
            <h1>Swipe left for no and right for yes</h1>
            <h1>{question}</h1>
            <div className="cardContainer">
                {options.map((o) => (
                    <TinderCard className="card" key={o}>
                        {o}
                    </TinderCard>
                ))}
            </div>
        </div>
    );
}

export default Vote;
