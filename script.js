// Tab Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Show active tab content
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });
    
    // Initialize features
    initFiftyFifty();
    initCustomPicker();
    initWheel();
    initTapArea();
    initTryYourLuck();
    initMontyHall();
    initRandomTime();
    initTeamDecider();
    initPuzzles();
    initRiddles();
    initStats();
    initProbability();
    initDecisionHelper();
});

// 50/50 Chance Functions
function initFiftyFifty() {
    const coinFlipBtn = document.getElementById('coinFlip');
    const diceRollBtn = document.getElementById('diceRoll');
    const yesNoBtn = document.getElementById('yesNo');
    const resultDisplay = document.getElementById('fiftyFiftyResult');
    
    coinFlipBtn.addEventListener('click', () => {
        const result = Math.random() < 0.5 ? 'Heads' : 'Tails';
        resultDisplay.textContent = `Coin Flip: ${result}`;
        resultDisplay.style.background = '#e8f5e9';
    });
    
    diceRollBtn.addEventListener('click', () => {
        const result = Math.floor(Math.random() * 6) + 1;
        resultDisplay.textContent = `Dice Roll: ${result}`;
        resultDisplay.style.background = '#e3f2fd';
    });
    
    yesNoBtn.addEventListener('click', () => {
        const result = Math.random() < 0.5 ? 'Yes' : 'No';
        resultDisplay.textContent = `Answer: ${result}`;
        resultDisplay.style.background = '#fff3e0';
    });
}

// Custom Picker Functions
function initCustomPicker() {
    const pickBtn = document.getElementById('pickCustom');
    const resultDisplay = document.getElementById('customResult');
    
    pickBtn.addEventListener('click', () => {
        const optionsText = document.getElementById('customOptions').value;
        const options = optionsText.split('\n').filter(opt => opt.trim() !== '');
        
        if (options.length === 0) {
            resultDisplay.textContent = 'Please enter some options first.';
            resultDisplay.style.background = '#ffebee';
            return;
        }
        
        const randomIndex = Math.floor(Math.random() * options.length);
        const selected = options[randomIndex];
        
        resultDisplay.textContent = `Selected: ${selected}`;
        resultDisplay.style.background = '#e8f5e9';
    });
}

// Wheel of Fortune Functions
function initWheel() {
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const spinBtn = document.getElementById('spinWheel');
    
    // Default options for the wheel
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6'];
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'];
    
    function drawWheel() {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = canvas.width / 2 - 10;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const sliceAngle = (2 * Math.PI) / options.length;
        
        for (let i = 0; i < options.length; i++) {
            const startAngle = i * sliceAngle;
            const endAngle = (i + 1) * sliceAngle;
            
            // Draw slice
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            ctx.fillStyle = colors[i % colors.length];
            ctx.fill();
            ctx.stroke();
            
            // Draw text
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + sliceAngle / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#fff';
            ctx.font = '14px Arial';
            ctx.fillText(options[i], radius - 10, 5);
            ctx.restore();
        }
        
        // Draw center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 10, 0, 2 * Math.PI);
        ctx.fillStyle = '#333';
        ctx.fill();
    }
    
    spinBtn.addEventListener('click', () => {
        const spins = 5 + Math.random() * 5; // 5-10 spins
        const degrees = spins * 360;
        const randomOffset = Math.random() * 360;
        const totalRotation = degrees + randomOffset;
        
        // Animate the spin
        canvas.style.transition = 'transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)';
        canvas.style.transform = `rotate(${totalRotation}deg)`;
        
        // Calculate which option was selected
        setTimeout(() => {
            const normalizedRotation = totalRotation % 360;
            const sliceAngle = 360 / options.length;
            const selectedIndex = Math.floor((360 - normalizedRotation) / sliceAngle) % options.length;
            
            alert(`Wheel selected: ${options[selectedIndex]}`);
            
            // Reset for next spin
            setTimeout(() => {
                canvas.style.transition = 'none';
                canvas.style.transform = 'rotate(0deg)';
            }, 100);
        }, 4000);
    });
    
    // Initial draw
    drawWheel();
}

// Tap Area Functions
function initTapArea() {
    const circles = document.querySelectorAll('.circle');
    const resultDisplay = document.getElementById('tapResult');
    
    circles.forEach(circle => {
        circle.addEventListener('click', () => {
            // Reset all circles
            circles.forEach(c => c.classList.remove('selected'));
            
            // Select this circle with animation
            circle.classList.add('selected');
            
            // Show result
            resultDisplay.textContent = `Selected area: ${circle.getAttribute('data-value')}`;
            resultDisplay.style.background = '#e3f2fd';
        });
    });
}

// Try Your Luck Functions
function initTryYourLuck() {
    const tryLuckBtn = document.getElementById('tryLuck');
    const resultDisplay = document.getElementById('luckResult');
    const streakCounter = document.getElementById('streakCounter');
    
    let streak = 0;
    let successCount = 0;
    let totalTries = 0;
    
    tryLuckBtn.addEventListener('click', () => {
        totalTries++;
        const success = Math.random() < 0.5; // 50% chance of success
        
        if (success) {
            streak++;
            successCount++;
            resultDisplay.textContent = "Success! 🎉";
            resultDisplay.style.background = '#e8f5e9';
        } else {
            streak = 0;
            resultDisplay.textContent = "Better luck next time! 😔";
            resultDisplay.style.background = '#ffebee';
        }
        
        streakCounter.textContent = `Current Streak: ${streak} | Success Rate: ${((successCount / totalTries) * 100).toFixed(1)}%`;
    });
}

// Monty Hall Problem Functions
function initMontyHall() {
    const doors = document.querySelectorAll('.door');
    const startBtn = document.getElementById('startMonty');
    const switchBtn = document.getElementById('switchDoor');
    const stayBtn = document.getElementById('stayDoor');
    const resultDisplay = document.getElementById('montyResult');
    
    let gameState = 'notStarted'; // notStarted, firstChoice, revealed, finalChoice
    let winningDoor, playerChoice, revealedDoor;
    
    startBtn.addEventListener('click', startGame);
    switchBtn.addEventListener('click', switchChoice);
    stayBtn.addEventListener('click', stayWithChoice);
    
    doors.forEach(door => {
        door.addEventListener('click', () => {
            if (gameState === 'firstChoice') {
                playerChoice = parseInt(door.getAttribute('data-door'));
                door.classList.add('selected');
                revealGoatDoor();
            }
        });
    });
    
    function startGame() {
        // Reset game
        gameState = 'firstChoice';
        winningDoor = Math.floor(Math.random() * 3) + 1;
        playerChoice = null;
        revealedDoor = null;
        
        doors.forEach(door => {
            door.classList.remove('selected', 'revealed');
            door.textContent = `🚪 ${door.getAttribute('data-door')}`;
        });
        
        resultDisplay.textContent = "Choose a door!";
        resultDisplay.style.background = '#fff3e0';
        
        startBtn.disabled = true;
        switchBtn.disabled = false;
        stayBtn.disabled = false;
    }
    
    function revealGoatDoor() {
        // Find a door to reveal (not the winning door and not the player's choice)
        const doorsToReveal = [1, 2, 3].filter(door => 
            door !== winningDoor && door !== playerChoice
        );
        
        revealedDoor = doorsToReveal[0];
        document.querySelector(`.door[data-door="${revealedDoor}"]`).classList.add('revealed');
        document.querySelector(`.door[data-door="${revealedDoor}"]`).textContent = "🐐 Goat";
        
        gameState = 'revealed';
        resultDisplay.textContent = `I've revealed a goat behind door ${revealedDoor}. Do you want to switch or stay?`;
    }
    
    function switchChoice() {
        if (gameState !== 'revealed') return;
        
        // Find the door that wasn't chosen and wasn't revealed
        const newChoice = [1, 2, 3].find(door => 
            door !== playerChoice && door !== revealedDoor
        );
        
        playerChoice = newChoice;
        finalizeGame();
    }
    
    function stayWithChoice() {
        if (gameState !== 'revealed') return;
        finalizeGame();
    }
    
    function finalizeGame() {
        gameState = 'finalChoice';
        
        // Reveal all doors
        doors.forEach(door => {
            const doorNum = parseInt(door.getAttribute('data-door'));
            if (doorNum === winningDoor) {
                door.textContent = "🏆 Car";
                door.style.background = '#4caf50';
            } else {
                door.textContent = "🐐 Goat";
                door.style.background = '#f44336';
            }
        });
        
        // Show result
        const won = playerChoice === winningDoor;
        if (won) {
            resultDisplay.textContent = "Congratulations! You won the car! 🎉";
            resultDisplay.style.background = '#e8f5e9';
        } else {
            resultDisplay.textContent = "Sorry, you got a goat. Better luck next time!";
            resultDisplay.style.background = '#ffebee';
        }
        
        // Reset buttons
        startBtn.disabled = false;
        switchBtn.disabled = true;
        stayBtn.disabled = true;
    }
}

// Random Time Functions
function initRandomTime() {
    const singleTimeBtn = document.getElementById('singleRandomTime');
    const multiTimeBtn = document.getElementById('multiRandomTime');
    const resultDisplay = document.getElementById('timeResult');
    
    singleTimeBtn.addEventListener('click', () => {
        const randomSeconds = Math.floor(Math.random() * 3600); // Up to 1 hour
        const minutes = Math.floor(randomSeconds / 60);
        const seconds = randomSeconds % 60;
        
        resultDisplay.textContent = `Random time: ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        resultDisplay.style.background = '#e3f2fd';
    });
    
    multiTimeBtn.addEventListener('click', () => {
        const timeCount = 3 + Math.floor(Math.random() * 3); // 3-5 times
        let times = [];
        
        for (let i = 0; i < timeCount; i++) {
            const randomSeconds = Math.floor(Math.random() * 3600);
            const minutes = Math.floor(randomSeconds / 60);
            const seconds = randomSeconds % 60;
            times.push(`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
        }
        
        resultDisplay.innerHTML = `Random times:<br>${times.join('<br>')}`;
        resultDisplay.style.background = '#e3f2fd';
    });
}

// Team Decider Functions
function initTeamDecider() {
    const splitBtn = document.getElementById('splitTeams');
    const resultDisplay = document.getElementById('teamResult');
    
    splitBtn.addEventListener('click', () => {
        const playersText = document.getElementById('playerNames').value;
        const teamCount = parseInt(document.getElementById('teamCount').value) || 2;
        
        const players = playersText.split('\n').filter(player => player.trim() !== '');
        
        if (players.length === 0) {
            resultDisplay.textContent = 'Please enter some player names first.';
            resultDisplay.style.background = '#ffebee';
            return;
        }
        
        // Shuffle players
        const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
        
        // Create teams
        const teams = Array.from({length: teamCount}, () => []);
        
        for (let i = 0; i < shuffledPlayers.length; i++) {
            teams[i % teamCount].push(shuffledPlayers[i]);
        }
        
        // Display teams
        let resultHTML = '';
        teams.forEach((team, index) => {
            resultHTML += `<strong>Team ${String.fromCharCode(65 + index)}:</strong> ${team.join(', ')}<br>`;
        });
        
        resultDisplay.innerHTML = resultHTML;
        resultDisplay.style.background = '#fff3e0';
    });
}

// Puzzles Functions
function initPuzzles() {
    const puzzleDisplay = document.getElementById('puzzleDisplay');
    const checkBtn = document.getElementById('checkPuzzle');
    const resultDisplay = document.getElementById('puzzleResult');
    
    let currentPuzzle = null;
    let currentAnswer = null;
    
    const puzzles = [
        {
            question: "I am an odd number. Take away one letter and I become even. What number am I?",
            answer: 7
        },
        {
            question: "If you multiply me by any other number, the answer will always be the same. What am I?",
            answer: 0
        },
        {
            question: "What three positive numbers give the same result when multiplied and added together?",
            answer: "1,2,3"
        }
    ];
    
    // Show first puzzle
    showRandomPuzzle();
    
    checkBtn.addEventListener('click', () => {
        const userAnswer = document.getElementById('puzzleAnswer').value.trim();
        
        if (!userAnswer) {
            resultDisplay.textContent = "Please enter an answer.";
            resultDisplay.style.background = '#ffebee';
            return;
        }
        
        if (userAnswer.toLowerCase() === currentAnswer.toString().toLowerCase()) {
            resultDisplay.textContent = "Correct! 🎉";
            resultDisplay.style.background = '#e8f5e9';
        } else {
            resultDisplay.textContent = "Incorrect. Try again!";
            resultDisplay.style.background = '#ffebee';
        }
    });
    
    function showRandomPuzzle() {
        const randomIndex = Math.floor(Math.random() * puzzles.length);
        currentPuzzle = puzzles[randomIndex];
        currentAnswer = currentPuzzle.answer;
        
        puzzleDisplay.textContent = currentPuzzle.question;
        document.getElementById('puzzleAnswer').value = '';
        resultDisplay.textContent = '';
    }
}

// Riddles Functions
function initRiddles() {
    const riddleDisplay = document.getElementById('riddleDisplay');
    const newRiddleBtn = document.getElementById('newRiddle');
    const showAnswerBtn = document.getElementById('showRiddleAnswer');
    const answerDisplay = document.getElementById('riddleAnswer');
    
    const riddles = [
        {
            question: "What has keys but can't open locks?",
            answer: "A piano"
        },
        {
            question: "What has a heart that doesn't beat?",
            answer: "A deck of cards"
        },
        {
            question: "The more you take, the more you leave behind. What am I?",
            answer: "Footsteps"
        },
        {
            question: "What can travel around the world while staying in a corner?",
            answer: "A stamp"
        }
    ];
    
    let currentRiddle = null;
    
    // Show first riddle
    showRandomRiddle();
    
    newRiddleBtn.addEventListener('click', showRandomRiddle);
    
    showAnswerBtn.addEventListener('click', () => {
        if (currentRiddle) {
            answerDisplay.textContent = `Answer: ${currentRiddle.answer}`;
            answerDisplay.style.background = '#e3f2fd';
        }
    });
    
    function showRandomRiddle() {
        const randomIndex = Math.floor(Math.random() * riddles.length);
        currentRiddle = riddles[randomIndex];
        
        riddleDisplay.textContent = currentRiddle.question;
        answerDisplay.textContent = '';
    }
}

// Statistics Functions
function initStats() {
    const analyzeBtn = document.getElementById('analyzeStats');
    const resultDisplay = document.getElementById('statsResult');
    
    analyzeBtn.addEventListener('click', () => {
        const numbersText = document.getElementById('numberInput').value;
        const numbers = numbersText.split(',')
            .map(num => parseFloat(num.trim()))
            .filter(num => !isNaN(num));
        
        if (numbers.length === 0) {
            resultDisplay.textContent = 'Please enter valid numbers.';
            resultDisplay.style.background = '#ffebee';
            return;
        }
        
        // Calculate statistics
        const sum = numbers.reduce((a, b) => a + b, 0);
        const mean = sum / numbers.length;
        const sorted = [...numbers].sort((a, b) => a - b);
        const median = sorted.length % 2 === 0 
            ? (sorted[sorted.length/2 - 1] + sorted[sorted.length/2]) / 2
            : sorted[Math.floor(sorted.length/2)];
        
        // Standard deviation
        const squaredDiffs = numbers.map(num => Math.pow(num - mean, 2));
        const avgSquaredDiff = squaredDiffs.reduce((a, b) => a + b, 0) / numbers.length;
        const stdDev = Math.sqrt(avgSquaredDiff);
        
        const min = Math.min(...numbers);
        const max = Math.max(...numbers);
        const range = max - min;
        
        resultDisplay.innerHTML = `
            <strong>Statistical Analysis:</strong><br>
            Count: ${numbers.length}<br>
            Sum: ${sum.toFixed(2)}<br>
            Mean: ${mean.toFixed(2)}<br>
            Median: ${median.toFixed(2)}<br>
            Standard Deviation: ${stdDev.toFixed(2)}<br>
            Min: ${min.toFixed(2)}<br>
            Max: ${max.toFixed(2)}<br>
            Range: ${range.toFixed(2)}
        `;
        resultDisplay.style.background = '#e8f5e9';
    });
}

// Probability Calculator Functions
function initProbability() {
    const calculateBtn = document.getElementById('calculateProbability');
    const resultDisplay = document.getElementById('probabilityResult');
    
    calculateBtn.addEventListener('click', () => {
        const input = document.getElementById('probabilityInput').value.trim();
        
        if (!input) {
            resultDisplay.textContent = 'Please enter a probability expression.';
            resultDisplay.style.background = '#ffebee';
            return;
        }
        
        try {
            // Simple probability expression evaluator
            // Note: This is a simplified version - a real app would need more robust parsing
            let expression = input;
            
            // Replace fractions
            expression = expression.replace(/(\d+)\/(\d+)/g, '($1/$2)');
            
            // Evaluate the expression
            const result = eval(expression);
            
            if (isNaN(result)) {
                throw new Error('Invalid expression');
            }
            
            const percentage = (result * 100).toFixed(2);
            
            resultDisplay.innerHTML = `
                <strong>Probability Calculation:</strong><br>
                Expression: ${input}<br>
                Result: ${result.toFixed(4)}<br>
                Percentage: ${percentage}%
            `;
            resultDisplay.style.background = '#e3f2fd';
        } catch (error) {
            resultDisplay.textContent = 'Error: Please enter a valid probability expression (e.g., "1/6 * 1/6").';
            resultDisplay.style.background = '#ffebee';
        }
    });
}

// Decision Helper Functions
function initDecisionHelper() {
    const analyzeBtn = document.getElementById('analyzeDecision');
    const resultDisplay = document.getElementById('decisionResult');
    
    analyzeBtn.addEventListener('click', () => {
        const prosText = document.getElementById('prosList').value;
        const consText = document.getElementById('consList').value;
        
        const pros = prosText.split('\n').filter(pro => pro.trim() !== '');
        const cons = consText.split('\n').filter(con => con.trim() !== '');
        
        if (pros.length === 0 && cons.length === 0) {
            resultDisplay.textContent = 'Please enter some pros and/or cons.';
            resultDisplay.style.background = '#ffebee';
            return;
        }
        
        const proCount = pros.length;
        const conCount = cons.length;
        
        let recommendation = '';
        if (proCount > conCount) {
            recommendation = 'Based on your pros and cons, it seems like a GOOD decision.';
        } else if (conCount > proCount) {
            recommendation = 'Based on your pros and cons, it seems like a BAD decision.';
        } else {
            recommendation = 'It\'s a balanced decision. Consider the weight of each pro and con.';
        }
        
        resultDisplay.innerHTML = `
            <strong>Decision Analysis:</strong><br>
            Pros: ${proCount}<br>
            Cons: ${conCount}<br>
            <strong>${recommendation}</strong>
        `;
        
        if (proCount > conCount) {
            resultDisplay.style.background = '#e8f5e9';
        } else if (conCount > proCount) {
            resultDisplay.style.background = '#ffebee';
        } else {
            resultDisplay.style.background = '#fff3e0';
        }
    });
}