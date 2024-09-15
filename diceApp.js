window.onload = function () {
    console.log("The dice module has loaded.");
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}; // Easy random int between two numbers. 

function fadeInElements(elementIds) {
    requestAnimationFrame(function () {
        elementIds.forEach(function (elementId) {
        // Check the computed style to ensure the initial styles are applied
        window.getComputedStyle(document.getElementById(elementId)).opacity;
  
        // Set opacity to 1 after the initial styles are applied
        document.getElementById(elementId).style.opacity = 1;
      });
    });
};

/// WAY TOO MUCH CODE FOR A TRANSITION ///
function dialogFade(element, opacity) {
    element.style.opacity = opacity;
    element.style.transition = "none"; // Disable transition temporarily
    requestAnimationFrame(() => {
      element.style.transition = ""; // Re-enable transition
    });
};

export function rollDice() {
    //const dice = document.getElementById("dice");
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    //dice.innerHTML = diceRoll;
    console.log("Dice rolled: " + diceRoll);
}

export function renderDice() {
    return `
    <p class="green__text">Need to roll some dice?</p>
    <div id="dice-tab" >
                <section class="button-wrapper">
                  <div id="dice-btns">  
                    <div class="dice-box">
                      <p>
                          <input 
                          type="text" 
                          name="formula-input" 
                          id="formula-input"
                          class="dice-input" 
                          pattern="\d+d\d+(kl|kh|fr)?"
                          title="Enter a valid dice formula, such as 2d20kh"
                          placeholder="#d#"
                          autocomplete="off">
                      </p>
                      <button id="formula-btn">Roll</button> 
                    </div>
                    <button class="glide-main" id="dice-reset">Clear</button>
                  </div>
                </section>
              
                <section class="dice-results">
                  <dialog id="🎲🎲">Final Roll: <span id="final-roll"></span></dialog>
                  <dialog id="🎲">All Rolls: <span id="all-roll"></span></dialog>
                </section>
            </div>
    `;
};

export function clearDiceResults() {
    document.getElementById("formula-input").value = "";
    dialogFade(document.getElementById("🎲🎲"), 0)
    dialogFade(document.getElementById("🎲"), 0)
};

export function showDiceRoll(num, face, type) {
    const die = { amount: num, face: face, type: type };
    const rolls = [];

    for (let i = 0; i < die.amount; i++) {
        rolls.push(getRndInteger(1, die.face));
    }

    let finalRoll = 0;

    if (die.type == "fr") {
        finalRoll = rolls.reduce((sum, roll) => sum + roll, 0);
        console.log("The final roll is:", finalRoll);
    } else if (die.type == "kh") {
        finalRoll = Math.max(...rolls);
        console.log("With a boon, final roll is:", finalRoll);
    } else if (die.type == "kl") {
        finalRoll = Math.min(...rolls);
        console.log("With a bane, final roll is:", finalRoll);
    } else {
        console.error("Invalid die type");
    }

    const innerAllRolls = document.getElementById("all-roll");
    const innerFinalRoll = document.getElementById("final-roll");
    innerAllRolls.innerHTML = rolls.join(", ");
    innerFinalRoll.innerHTML = finalRoll;
    document.getElementById("🎲🎲").open = true;
    document.getElementById("🎲").open = true;

    // Below is needed to get the first transition to work
    // There must be an easier way, have not figured it out yet
    fadeInElements(["🎲", "🎲🎲"])
};

export function setDiceListeners() {
    // document.getElementById("d6-btn").onclick = () => {
    //     showDiceRoll(1, 6, "fr");
    // };
    
    // document.getElementById("boon-btn").onclick = () => {
    //     showDiceRoll(2, 6, "kh");
    // };
    
    // document.getElementById("bane-btn").onclick = () => {
    //     showDiceRoll(2, 6, "kl");
    // };
    
    document.getElementById('formula-input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault(); // Prevent default form submission
          document.getElementById('formula-btn').click(); // Programmatically click the button
        }
    });
    
    document.getElementById("formula-btn").onclick = () => {
        const form = document.getElementById('formula-input');
        
        if (!form.value) { 
            alert("Please enter a dice formula, such as 2d20");    
        } else if (form.value.length > 12) { 
            alert("Entry too long or incorrect formula.");
        } else {
            const die = { amount: 1, face: 6, type: "fr" };
    
            // Parse the input string to get amount, face, and type
            const matches = form.value.match(/^(\d+)d(\d+)(kl|kh|fr)?$/);
            
            if (matches) {
                die.amount = parseInt(matches[1], 10);
                die.face = parseInt(matches[2], 10);
                die.type = matches[3] || "fr";
    
                console.log("Dice formula was accepted:", die);
    
                showDiceRoll(die.amount, die.face, die.type)
    
                // const buttonAudio = new Audio("Assets/dice.mp3");
                // buttonAudio.volume = 0.2;
                // buttonAudio.play();
            } else {
                alert("Incorrect formula format. Please use a format like '2d20', '4d4kh', '3d6kl', etc.");
            }
        }
    };
    
    document.getElementById("dice-reset").onclick = () => {
        clearDiceResults();
    };
};
