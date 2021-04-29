function Input(props) {
    return (
        <input
            className={props.className}
            placeholder={props.placeholder}
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
        />
    );
}

export default Input;
