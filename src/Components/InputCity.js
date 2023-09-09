// Importing the useState hook from React which allows us to add state management to our functional component.
import { useState, useEffect } from 'react';

// Defining a functional component named InputCity.
// The component accepts a prop called onCitySubmit which is expected to be a function passed from a parent component.
const InputCity = ({onCitySubmit}) => {
    
    // Using useState to declare a state variable named inputCity with its corresponding setter function setInputCity.
    // The initial value for inputCity is an empty string.
    const [inputCity, setInputCity] = useState('')

    // This is an event handler function that will be called whenever the input value changes.
    // It updates the inputCity state with the current value of the input field.
    const onInputHandler = (e) => {
        setInputCity(e.target.value);
    }

    // This function is an event handler for the form submission.
    const onSubmitHandler = (e) => {
        e.preventDefault();  // Preventing the default behavior of form submissions, which would reload the page.
        onCitySubmit(e, inputCity); // Calls the onCitySubmit function (passed from the parent component) with the current value of inputCity.
    };

    // JSX returned by the InputCity component when it's rendered.
    return (
        <div className="inputForm">
            <form onSubmit={onSubmitHandler}>  {/* When the form is submitted, the onSubmitHandler function will be called. */}
                <label htmlFor="city">Enter City:</label>  {/* Label for the input field. */}
                <input
                    type="text"    // Specifies that it's a text input.
                    id="city"      // Provides an ID for the input, which associates it with the above label.
                    value={inputCity}  // Binds the input's value to the inputCity state.
                    placeholder="Type city name..." // Placeholder text to show when the input is empty.
                    onChange={onInputHandler}  // When the content of the input changes, the onInputHandler function is called.
                />
                <button className="input_btn" type='submit'>Search Weather</button>  {/* Button to submit the form. */}
            </form>
        </div>
    );
}

// Exports the InputCity component so it can be imported and used in other parts of the application.
export default InputCity;
