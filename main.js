let isOpen = false;
let selectedIndex = null;
let optionsData = [
    "First Item",
    "Second Item",
    "Third Item",
    "Fourth Item",
    "Fifth Item"
];

const input = document.getElementById('dropdown-input');
const placeholder = document.getElementById('placeholder');
const optionsContainer = document.getElementById('options-container');

optionsContainer.innerHTML = `
    ${optionsData.map((o, id) => `
        <div class="option" value="${id}">
            <p>${o}</p>
            <p class="hidden">Check</p>
        </div>
    `).join('')}
`;

input.addEventListener('click', () => {
    input.classList.toggle('open');
    optionsContainer.classList.toggle('hidden');
});

const options = document.getElementsByClassName('option');

const hideAllChecks = (options, index) => {
    for(let i = 0; i < options.length; i++) {
        const check = options.item(i).querySelector('p:nth-of-type(2)');

        if(!check.classList.contains('hidden') && i !== index) {
            check.classList.add('hidden');
        }
    }
}

for(let i = 0; i < options.length; i++) {
    const option = options.item(i);

    option.addEventListener('click', () => {
        const newIndex = Number(option.attributes["value"]["value"]);
        const check = option.querySelector('p:nth-of-type(2)');
    
        hideAllChecks(options, i);
        check.classList.toggle('hidden');
        selectedIndex === newIndex ? null : newIndex;
        placeholder.innerText = selectedIndex !== null ? optionsData[selectedIndex] : "Select an item";
    });
}
