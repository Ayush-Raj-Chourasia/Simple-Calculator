let input = document.getElementById('input');
let buttons = document.querySelectorAll('button');
let history = [];
let s = "";

// Theme Toggle
document.getElementById('themeToggle').addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
});

// Calculator Logic with History and Error Handling
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        try {
            const action = e.target.innerHTML;
            
            if(action === '=') {
                const expression = s.replace(/%/g, '/100');
                const result = eval(expression);
                input.value = result;
                history.push(`${s} = ${result}`);
                s = result.toString();
                updateHistory();
            }
            else if(action === 'AC') {
                s = "";
                input.value = s;
            }
            else if(action === 'DEL') {
                s = s.substring(0, s.length-1);
                input.value = s || "0";
            }
            else {
                s += action;
                input.value = s;
            }
        } catch (error) {
            input.value = "Error";
            s = "";
        }
    });
});

// Keyboard Support
document.addEventListener('keydown', (e) => {
    const keyMap = {
        'Enter': '=',
        'Backspace': 'DEL',
        'Escape': 'AC',
        '*': '×',
        '/': '÷'
    };
    
    const buttonValue = keyMap[e.key] || e.key;
    const button = Array.from(buttons).find(b => b.textContent === buttonValue);
    
    if(button) {
        button.click();
        button.classList.add('active');
        setTimeout(() => button.classList.remove('active'), 100);
    }
});

// History Management
function updateHistory() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = history.slice(-7).map(entry => 
        `<div>${entry}</div>`
    ).join('');
}