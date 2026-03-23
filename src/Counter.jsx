import { useState } from "react"

// export default function Counter() {
//   return (
//     <div>Counter</div>
//   )
// }

const Counter = () => {
    const [result, setResult] = useState(0);

    const increment = () => {
        setResult(result + 1);
    };

    const decrement = () => {
        setResult(result - 1);
    };

    const reset = () => {
        setResult(0);
    };

    // const handleClick = () => {
    //     setResult(result);
    // }

    return (
        <div className="inputContainer">
            <h1>Counter</h1>
            <p>Count: {result}</p>
            <div>
                <input type="text" 
                    placeholder="0"
                    value={result}

                />
            </div>
            <div className="buttons">
                <button className="increment" onClick={increment}>
                    Increase
                </button>
                <button className="decrement"
                onClick={decrement}>
                    Decrease
                </button>
                <button className="reset"
                onClick={reset}>
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Counter