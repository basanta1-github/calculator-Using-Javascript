// getting the input element where we want to display the text
let numberInput = document.getElementById("numberInput");

// getting all buttons
let button = document.getElementsByTagName("button");
let arrayButtons = Array.from(button);

// keeping track of last input type for the next cycle as a flag
let lastInputWasResult = false;

// adding event listeners to each buttons
arrayButtons.forEach((arraybutton) => {
  arraybutton.addEventListener("click", function (e) {
    // getting the text content of the clicked button
    content = this.textContent;
    // or
    // content = e.currentTarget.textContent;

    // clear the input when AC button is clicked and excluding the AC button
    if (content === "AC") {
      numberInput.value = ""; // clear the input
      lastInputWasResult = false; // reset the flag

      return;
    }
    // toggle sign when +/- is pressed and excluding in the input
    if (content === "+/-") {
      // convert current input value to number and toggle the sign
      if (numberInput.value) {
        numberInput.value = -Number(numberInput.value);
      }
      return; // exit after toggling the sign
    }

    // give result on the sopt when % is pressed and evaluate only % one

    if (content === "=") {
      try {
        // evaluating the expression in the input
        let result = eval(numberInput.value);
        // displaying the result
        numberInput.value = result; // update the input with result
        lastInputWasResult = true; // set the flag indicating last input was result
      } catch (error) {
        numberInput.value = "Error"; // handling the errors
        lastInputWasResult = false; // reset the flag on error
      }
      return; // exit after evaluation
    }

    // handle percentage calculation

    if (content === "%") {
      let currentValue = numberInput.value;
      // split input strings into parts based on operators
      let parts = currentValue.split(/(\+|\-|\*|\/)/);
      // Convert the last number part into a percentage (only apply to last part)
      let lastPart = parts[parts.length - 1]; // the last number before %

      // Convert the last part to a percentage if it's a valid number
      if (!isNaN(lastPart) && lastPart !== "") {
        parts[parts.length - 1] = (parseFloat(lastPart) / 100).toString(); // Convert to percentage
      }
      // join parts back to the string
      numberInput.value = parts.join("");
      lastInputWasResult = false; // reset the value after the processing
      return;
    }

    // operator rules

    let lastchar = numberInput.value.slice(-1); // get the last character
    // prevent more than 2 consecutive * + and -
    if (content === "*" || content === "+" || content === "-") {
      if (
        lastchar === content &&
        numberInput.value.slice(-2) === content + content
      ) {
        return; // prevent more than 2 times of * - +
      }
    }

    // prevent more than 1 time of % and /
    if ((content === "/" || content === "%") && lastchar === content) {
      return; // prevent consecutive % or /
    }

    // if the last input was result and a number is pressed start new calculation
    if (lastInputWasResult) {
      // if the content is the number
      if (!isNaN(content)) {
        numberInput.value = content; // start new cycle with number
      } else {
        // if the content is operator append it
        numberInput.value += content; // append the operator
      }
      lastInputWasResult = false; // reset the flag after processing the input
    } else {
      // if the last input was not result, just append the new value
      numberInput.value += content; // append the new value
    }
  });
});
