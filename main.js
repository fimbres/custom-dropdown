class DropDown {
    optionsData;
    placeholder;
    onSelect;
    inputElement;
    placeholderElement;
    optionsContainerElement;

    constructor(optionsData, placeholder, onSelect) {
        this.optionsData = optionsData;
        this.placeholder = placeholder;
        this.onSelect = onSelect;
        this.inputElement = document.getElementById('dropdown-input');
        this.placeholderElement = document.getElementById('placeholder');
        this.optionsContainerElement = document.getElementById('options-container');
    }

    renderDropdown() {
        this.placeholderElement.innerText = this.placeholder;

        this.optionsContainerElement.innerHTML = `
            ${this.optionsData.map((o, id) => `
                <div class="option" value="${id}">
                    <p>${o}</p>
                    <p class="check hidden">Check</p>
                </div>
            `).join('')}
        `;
    }

    hideAllChecks(options, index) {
        for(let i = 0; i < options.length; i++) {
            const check = options.item(i).querySelector('p:nth-of-type(2)');

            if(!check.classList.contains('hidden') && i !== index) {
                check.classList.add('hidden');
            }
        }
    }

    addEventListeners() {
        this.inputElement.addEventListener('click', () => {
            this.inputElement.classList.toggle('open');
            this.optionsContainerElement.classList.toggle('hidden');
        });

        const options = document.getElementsByClassName('option');

        for(let i = 0; i < options.length; i++) {
            const option = options.item(i);

            option.addEventListener('click', () => {
                const newIndex = Number(option.attributes["value"]["value"]);
                const check = option.querySelector('p:nth-of-type(2)');
            
                this.hideAllChecks(options, i);
                check.classList.toggle('hidden');
                this.placeholderElement.innerText = !check.classList.contains('hidden') ? this.optionsData[newIndex] : this.placeholder;
                this.onSelect(this.optionsData[newIndex]);
            });
        }
    }
}

const dropDown = new DropDown(
    [
        "First Item",
        "Second Item",
        "Third Item",
        "Fourth Item",
        "Fifth Item"
    ],
    "Select an item", 
    data => console.log("onSelect: ", data)
);
dropDown.renderDropdown();
dropDown.addEventListeners();
