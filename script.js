document.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('background-music');
  const passwordInput = document.querySelector('.password-input');
  let musicStarted = false;

  passwordInput.addEventListener('focus', () => {
      if (!musicStarted) {
          music.play().catch(error => {
              console.error('Error starting audio:', error);
          });
          musicStarted = true;
      }
  });

  passwordInput.addEventListener('input', () => {
      if (!musicStarted) {
          music.play().catch(error => {
              console.error('Error starting audio:', error);
          });
          musicStarted = true;
      }
  });
});

const passwordInput = document.querySelector('.password-input');
    const rulesContainer = document.getElementById('rules');
    const levelCounter = document.getElementById('level');
    
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'black', 'white', 
                    'cyan', 'magenta', 'maroon', 'navy', 'olive', 'teal', 'violet', 'indigo', 'gold', 'silver'];
    const animals = ['cat', 'dog', 'lion', 'tiger', 'bear', 'wolf', 'fox', 'elephant', 'monkey', 'zebra',
                    'giraffe', 'panda', 'koala', 'kangaroo', 'rhino', 'hippo', 'deer', 'rabbit', 'hamster',
                    'snake', 'eagle', 'owl', 'penguin', 'dolphin', 'whale', 'shark', 'octopus', 'bee', 'ant',
                    'horse', 'cow', 'pig', 'sheep', 'goat', 'chicken', 'duck', 'goose', 'turtle', 'fish'];
    
    let currentLevel = 1;
    let activeRules = [];
    const allRules = [
      {
        id: 'length',
        text: 'Password must be at least 8 characters long',
        check: (password) => password.length >= 8
      },
      {
        id: 'uppercase',
        text: 'Must contain at least one uppercase letter',
        check: (password) => /[A-Z]/.test(password)
      },
      {
        id: 'lowercase',
        text: 'Must contain at least one lowercase letter',
        check: (password) => /[a-z]/.test(password)
      },
      {
        id: 'number',
        text: 'Must contain at least one number',
        check: (password) => /[0-9]/.test(password)
      },
      {
        id: 'special',
        text: 'Must contain a special character (!@#$%^&*()-_+=[]{}|;:,.<>?)',
        check: (password) => /[!@#$%^&*()\-_+=\[\]{}|;:,.<>?]/.test(password)
      },
      {
        id: 'emoji',
        text: 'Must contain at least one emoji 😀',
        check: (password) => /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u.test(password)
      },
      {
        id: 'color',
        text: 'Must contain a color word',
        check: (password) => colors.some(color => password.toLowerCase().includes(color.toLowerCase()))
      },
      {
        id: 'math',
        text: 'Must contain a mathematical equation that equals 10 (e.g., 5+5=10)',
        check: (password) => {
          const equationRegex = /(\d+\s*[\+\-\*\/]\s*\d+\s*=\s*10)/;
          const matches = password.match(equationRegex);
          if (!matches) return false;
          
          const equation = matches[1].split('=')[0].trim();
          try {
            const result = Function(`return ${equation}`)();
            return Math.abs(result - 10) < 0.0001;
          } catch {
            return false;
          }
        }
      },
      {
        id: 'animal',
        text: 'Must contain an animal name',
        check: (password) => animals.some(animal => password.toLowerCase().includes(animal.toLowerCase()))
      },
      {
        id: 'palindrome',
        text: 'Must contain a palindrome (at least 3 characters)',
        check: (password) => {
          const cleanStr = password.toLowerCase().replace(/[^a-z0-9]/g, '');
          for (let i = 0; i < cleanStr.length - 2; i++) {
            for (let j = i + 2; j < cleanStr.length; j++) {
              const substr = cleanStr.substring(i, j + 1);
              if (substr.length >= 3 && substr === substr.split('').reverse().join('')) {
                return true;
              }
            }
          }
          return false;
        }
      },
      {
        id: 'repeating',
        text: 'Must contain a character repeated exactly 3 times',
        check: (password) => /(.)\1{2}(?!\1)/.test(password)
      },
      {
        id: 'prime',
        text: 'Must contain a prime number',
        check: (password) => {
          const numbers = password.match(/\d+/g);
          if (!numbers) return false;
          return numbers.some(num => {
            const n = parseInt(num);
            if (n < 2) return false;
            if (n === 2) return true;
            if (n % 2 === 0) return false;
            for (let i = 3; i <= Math.sqrt(n); i += 2) {
              if (n % i === 0) return false;
            }
            return true;
          });
        }
      },
  {
        id: 'roman',
        text: 'Must contain a Roman numeral (I, V, X, L, C, D, M)',
        check: (password) => /[IVXLCDM]/.test(password)
      },
      {
        id: 'consecutive',
        text: 'Must contain 3 consecutive numbers (e.g., 123 or 456)',
        check: (password) => {
          for (let i = 0; i < password.length - 2; i++) {
            const num1 = parseInt(password[i]);
            const num2 = parseInt(password[i + 1]);
            const num3 = parseInt(password[i + 2]);
            if (!isNaN(num1) && !isNaN(num2) && !isNaN(num3) &&
                num2 === num1 + 1 && num3 === num2 + 1) {
              return true;
            }
          }
          return false;
        }
      },
      {
        id: 'monthOrDay',
        text: 'Must contain a month name or day of the week',
        check: (password) => {
          const timeWords = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday',
                            'january', 'february', 'march', 'april', 'may', 'june', 'july', 'august',
                            'september', 'october', 'november', 'december'];
          return timeWords.some(word => password.toLowerCase().includes(word));
        }
      }
    ];
    
    const shuffleRules = () => {
      const firstRule = allRules[0];
      const remainingRules = allRules.slice(1);
      
      for (let i = remainingRules.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [remainingRules[i], remainingRules[j]] = [remainingRules[j], remainingRules[i]];
      }
      
      return [firstRule, ...remainingRules];
    };
    
    const shuffledRules = shuffleRules();
    function addNewRule() {
      if (activeRules.length < shuffledRules.length) {
        const newRule = shuffledRules[activeRules.length];
        activeRules.push(newRule);
        
        const ruleElement = document.createElement('div');
        ruleElement.className = 'rule incomplete';
        ruleElement.id = `rule-${newRule.id}`;
        ruleElement.textContent = `Rule ${activeRules.length}: ${newRule.text}`;
        if (rulesContainer.firstChild) {
          rulesContainer.insertBefore(ruleElement, rulesContainer.firstChild);
        } else {
          rulesContainer.appendChild(ruleElement);
        }
        setTimeout(() => {
          ruleElement.classList.add('visible');
        }, 100);
        currentLevel = activeRules.length;
        levelCounter.textContent = currentLevel;
        checkPassword(passwordInput.value);
      }
    }

    function checkPassword(password) {
      const allCompleted = activeRules.every((rule, index) => {
        const ruleElement = document.getElementById(`rule-${rule.id}`);
        const isCompleted = rule.check(password);
        
        if (isCompleted) {
          ruleElement.classList.add('completed');
          ruleElement.classList.remove('incomplete');
        } else {
          ruleElement.classList.add('incomplete');
          ruleElement.classList.remove('completed');
        }
        
        return isCompleted;
      });
    
      if (allCompleted && activeRules.length < shuffledRules.length) {
        addNewRule();
      }
    }
    
    function resetGame() {
      activeRules = [];
      rulesContainer.innerHTML = '';
      passwordInput.value = '';
      currentLevel = 0;
      levelCounter.textContent = currentLevel;
      addNewRule();
    }
    addNewRule();
    
    passwordInput.addEventListener('input', (e) => {
      checkPassword(e.target.value);
    });
