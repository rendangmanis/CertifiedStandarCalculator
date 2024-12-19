document.addEventListener('DOMContentLoaded', function() {
    const screen = document.getElementById('result');
    const history = document.getElementById('history');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '';
    let calculateCount = 0; // Counter for the number of calculations

    const memeResponses = [
        "Gak tau",
        "Ngitung sendiri",
        "Masaa gitu doang g tw",
        "Yaelahh gini mah anak TK juga bisa",
        "Pusing gw",
        "Jgn tanya gw",
        "Berapa yaa?",
        "Ngga tau?",
        "Coba tanya Google",
        "Ini bukan soal ujian!",
        "Kok bisa gitu sih?",
        "Gak ngerti, deh!",
        "Hasilnya berapa, ya?",
        "Bisa-bisa aja!",
        "Gak ada yang tau!",
        "Mending nonton TV!",
        "Aduh, bingung!",
        "Gak paham, serius!",
        "Coba tanya teman sebelah!",
        "Gak mau mikir!",
        "Hasilnya pasti aneh!"
    ];

    function getRandomMemeResponse() {
        return memeResponses[Math.floor(Math.random() * memeResponses.length)];
    }

    function isEasyEquation(equation) {
        const numbers = equation.match(/[\d.]+/g);
        const operators = equation.match(/[\+\-\*\/]/g);

        if (operators) {
            for (let i = 0; i < operators.length; i++) {
                if (operators[i] === '+' || operators[i] === '-') {
                    // For addition and subtraction, results less than 500
                    if (parseFloat(numbers[i]) < 500 && parseFloat(numbers[i + 1]) < 500) {
                        return true; // Easy
                    }
                } else if (operators[i] === '*' || operators[i] === '/') {
                    // For multiplication and division, numbers should be less than 10
                    if (parseFloat(numbers[i]) < 10 && parseFloat(numbers[i + 1]) < 10) {
                        return true; // Easy
                    }
                }
            }
        }
        return false; // Hard
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            const value = button.getAttribute('data-value');

            switch(action) {
                case 'clear':
                    currentInput = '';
                    screen.value = '';
                    history.textContent = '';
                    calculateCount = 0; // Reset counter
                    break;
                case 'delete':
                    currentInput = currentInput.slice(0, -1);
                    screen.value = currentInput;
                    break;
                case 'operation':
                case 'calculate':
                    if (action === 'calculate') {
                        if (currentInput === '') return;
                        let result;
                        try {
                            result = eval(currentInput);
                            calculateCount++; // Increment calculate count
                            let response;
                            if (isEasyEquation(currentInput)) {
                                // If easy, show meme
                                response = getRandomMemeResponse();
                                history.textContent = `${currentInput} = ${response}`;
                                screen.value = response;
                            } else {
                                // If hard, show actual result
                                history.textContent = `${currentInput} = ${result}`;
                                screen.value = result;
                            }

                            // Show meme response every 3-4 calculations
                            if (calculateCount % 3 === 0 && Math.random() < 0.5) { // 50% chance
                                screen.value = getRandomMemeResponse();
                            }

                        } catch (error) {
                            screen.value = 'Error';
                        }
                        currentInput = '';
                    } else {
                        currentInput += value;
                        screen.value = currentInput; // Display current input
                    }
                    break;
                default:
                    currentInput += value;
                    screen.value = currentInput;
            }
        });
    });

    // Handle Enter key for calculation
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            if (currentInput !== '') {
                let result;
                try {
                    result = eval(currentInput);
                    calculateCount++; // Increment calculate count
                    let response;
                    if (isEasyEquation(currentInput)) {
                        // If easy, show meme
                        response = getRandomMemeResponse();
                        history.textContent = `${currentInput} = ${response}`;
                        screen.value = response;
                    } else {
                        // If hard, show actual result
                        history.textContent = `${currentInput} = ${result}`;
                        screen.value = result;
                    }

                    // Show meme response every 3-4 calculations
                    if (calculateCount % 3 === 0 && Math.random() < 0.5) { // 50% chance
                        screen.value = getRandomMemeResponse();
                    }

                } catch (error) {
                    screen.value = 'Error';
                }
                currentInput = '';
            }
        }
    });
});