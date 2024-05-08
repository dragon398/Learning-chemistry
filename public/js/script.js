// Ing-Angsara Thongchai, ant324 
var activateButton = document.querySelector('.activate-button');
activateButton.addEventListener('click', activate);  //start button
var submitButton = document.querySelector('.submit-button');
var textInput = document.getElementById('textInput');
var elementList;
var score = 0;
var randomSelectedElement;
var requestInput = document.getElementById('inputPlz');
var gameover = document.getElementById('gameover');
var scoreDisplay = document.getElementById('score');
var correctMsg = document.getElementById('correct');
var wrong = document.getElementById('wrong');
var checkboxPlz = document.getElementById('checkboxPlz');
var resetButton = document.querySelector('.reset-button');
scoreDisplay.textContent = 'Score: ' + score + ' pt';

textInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();  // Prevent the default Enter key action (form submission or anything else)
        submitButton.click();    // Trigger the submit button click programmatically
    }
});


function searchRandomSelectedElement(randomSelectedSymbol, elementList) {
    for (let i = 0; i < elementList.length; i++) {
        if (elementList[i].symbol === randomSelectedSymbol) {
            console.log('Found:', elementList[i].name);
            return elementList[i].name.toLowerCase(); // Exit the loop once the element is found
        }
    }
    console.log('Element not found in elementList');
}


submitButton.addEventListener('click', function() {
    // set the msg to empty first
    checkboxPlz.textContent = '';
    requestInput.textContent = '';
    gameover.textContent = '';
    correctMsg.textContent = '';
    wrong.textContent = '';

    // Get the value of the text input
    var randomSelectedElementDiv = document.getElementById('random-selected-element');
    var currentElementDisplayed = randomSelectedElementDiv.textContent.trim(); // Get the current displayed element
    var userInput = textInput.value.trim().toLowerCase(); // Convert input to lowercase for case-insensitive comparison
    var matchFound = false;

    // if the user didn't type in the input
    if (userInput === '') {
        randomSelectedElementDiv.textContent = currentElementDisplayed;
        requestInput.textContent = 'Hey! type in your answer';
        return; // Exit the function without further processing
    } 

    // Check if there exists an element in the list with the same name as the user input
    var selectedElement = elementList.find(function(element) {
        return element.name.toLowerCase() === userInput;
    });
    searchRandomSelectedElement
    console.log(randomSelectedElement.symbol);
    selectedElement = (userInput.toLowerCase() === searchRandomSelectedElement(randomSelectedElement.symbol,elementList));

    // If a match is found
    if (selectedElement) {
        console.log('Match found for:', userInput);
        textInput.value = ''; // set the input box to nothing
        displayRandomSelectedElement(elementList);
        score += 5; // Add 5 points for a match
        correctMsg.textContent = 'Correct!';
        wrong.textContent = '';
        matchFound = true;
    } else { // If no match is found
        console.log('No match found for:', userInput);
        textInput.value = '';
        score -= 5; // Deduct 5 points for no match
        correctMsg.textContent = '';
        wrong.textContent = '!Wrong!';
    }

    // Update the score display
    scoreDisplay.textContent = 'Score: ' + score + ' pt';
    displayRandomSelectedElement(elementList);

    if (score <= -15) { // game over if the total score is -15 or less
        gameover.textContent = 'GAME OVER :((';
        // Disable every button except restart
        activateButton.disabled = true;
        submitButton.disabled = true;
        resetButton.disabled = false; // enable restart button
    }
    textInput.focus();
});

function activate() {
    correctMsg.textContent ='';
    wrong.textContent = '';
    checkboxPlz.textContent = '';
    submitButton.disabled = false;
    selectedElements = []; //selected element array
    // Get all checkboxes with class "group-checkbox"
    var checkboxes = document.querySelectorAll('.group-checkbox');
    var atLeastOneChecked = false;

    fetchElementList()
        .then(elementList => {
            // Now you can use the elementList array here for further functionality
            console.log('Element list fetched:', elementList);
            // display the first 10 elements
            for (let i = 0; i < 10 && i < elementList.length; i++) {
                console.log(elementList[i]);
            }
    // Loop through each checkbox
    checkboxes.forEach(function(checkbox) {
        checkboxPlz.textContent = '';
      // Get the group name from the "data-group" attribute
      var groupName = checkbox.dataset.group;
      // Get the checked status of the checkbox
      var isChecked = checkbox.checked;
      // Toggle the visibility of elements for the corresponding group based on checkbox status
      toggleElements(groupName, !isChecked); // Invert isChecked so that elements are hidden when checkbox is checked
      if (isChecked) {
        checkboxPlz.textContent = '';
        // Get the data of selected elements and push them into the selectedElements array
        var elements = document.querySelectorAll('.' + groupName + ' .symbol');
        console.log(elements);
        elements.forEach(function(symbol) {
            var symbol = symbol.innerText.trim();
            selectedElements.push({symbol: symbol});
        });
        atLeastOneChecked = true;
    } 
    });

    //show the selected array to check if it works
    console.log(selectedElements);
    displayRandomSelectedElement(elementList);
    if (!atLeastOneChecked) {
        submitButton.disabled = true; //disable the submit button
        checkboxPlz.textContent = 'Check at least 1 box.';
    }
});
}

var lastRandomIndex;
function displayRandomSelectedElement(elementList) {
    // Get the div where the random selected element will be displayed
    var randomSelectedElementDiv = document.getElementById('random-selected-element');
    // Clear any previous content
    randomSelectedElementDiv.innerHTML = '';

    // Check if there are selected elements
    if (selectedElements.length > 0) {
        // Generate a random index to select a random element from selectedElements array
        // var randomIndex = Math.floor(Math.random() * selectedElements.length);
        // Get the random selected element
        do {
            var randomIndex = Math.floor(Math.random() * selectedElements.length);
        } while (selectedElements.length > 1 && randomIndex === lastRandomIndex);
    
        lastRandomIndex = randomIndex;
        randomSelectedElement = selectedElements[randomIndex];
        // Create a new paragraph element to display the random selected element
        var p = document.createElement('p');
        p.textContent = randomSelectedElement.symbol;
        // Append the paragraph element to the randomSelectedElementDiv
        randomSelectedElementDiv.appendChild(p);
        searchRandomSelectedElement(randomSelectedElement.symbol, elementList);

    } else {
        // If no selected elements, display a message
        randomSelectedElementDiv.textContent = '';
    }
}





function toggleElements(className, isVisible) {
// Get all elements with the specified class name
var elements = document.getElementsByClassName(className);

// Loop through each element and toggle its visibility
for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    var children = element.childNodes;
    for (var j = 0; j < children.length; j++) {
    if (children[j].classList.contains('element')) {
        if (isVisible) {
        children[j].classList.remove('hidden-text');
        } else {
        children[j].classList.add('hidden-text');
        }
    }
    }
}
}

document.getElementById('select-all').addEventListener('change', function() {
    var isChecked = this.checked;
    var checkboxes = document.querySelectorAll('.group-checkbox');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = isChecked;
    });
});


function fetchElementList() {
    return fetch('/elements')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch element list');
        }
        return response.json();
      })
      .then(data => {
        // Assign the fetched element list to the global variable
        elementList = data;
        console.log('Element list fetched:', elementList);
        // Return the element list for further processing if needed
        return elementList;
      })
      .catch(error => {
        console.error('Error fetching element list:', error);
      });
}
  
//   Example usage of fetchElementList() function
  fetchElementList()
    .then(elementList => {
      // Now you can use the elementList array here for further functionality
      console.log('Element list fetched:', elementList);
      // display the first 10 elements
      for (let i = 0; i < 10 && i < elementList.length; i++) {
        console.log(elementList[i]);
      }
    });

    // Add event listener to the reset button
// Add event listener to the reset button
resetButton.addEventListener('click', function() {
    // Clear the selected random element box
    submitButton.disabled = true;
    textInput.value = ''; // set the input box to nothing
    checkboxPlz.textContent = '';
    requestInput.textContent = '';
    activateButton.disabled = false;
    // submitButton.disabled = false;
    var randomSelectedElementDiv = document.getElementById('random-selected-element');
    randomSelectedElementDiv.innerHTML = '';
    correctMsg.textContent = '';
    wrong.textContent = '';
    gameover.textContent = '';
    // Clear the selectedElements array
    selectedElements = [];

    // Reset the score to 0
    score = 0;

    // Update the score display
    var scoreDisplay = document.getElementById('score');
    scoreDisplay.textContent = 'Score: ' + score + ' pt';

    // Unselect all checkboxes
    var checkboxes = document.querySelectorAll('.group-checkbox');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
    var selectAllCheckbox = document.getElementById('select-all');
    selectAllCheckbox.checked = false;

    // Show all elements in the periodic table
    var elements = document.querySelectorAll('.element');
    elements.forEach(function(element) {
        element.classList.remove('hidden-text');
    });
});

