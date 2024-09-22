class ArrayVisualization {
    constructor(size) {
        this.size = size;
        this.array = new Array(size).fill(null);
        this.currentSize = 0;
    }

    push(value) {
        if (this.currentSize === this.size) {
            showPopup("Array is full!", "error");
            return false;
        }
        this.array[this.currentSize] = value;
        this.currentSize++;
        return true;
    }

    pop() {
        if (this.currentSize === 0) {
            showPopup("Array is empty!", "error");
            return null;
        }
        const value = this.array[this.currentSize - 1];
        this.array[this.currentSize - 1] = null;
        this.currentSize--;
        return value;
    }

    insert(value, position) {
        if (position < 0 || position >= this.size || this.currentSize === this.size) {
            showPopup("Invalid position or array is full!", "error");
            return false;
        }
        for (let i = this.currentSize; i > position; i--) {
            this.array[i] = this.array[i - 1];
        }
        this.array[position] = value;
        this.currentSize++;
        return true;
    }

    delete(position) {
        if (position < 0 || position >= this.currentSize) {
            showPopup("Invalid position!", "error");
            return null;
        }
        const value = this.array[position];
        for (let i = position; i < this.currentSize - 1; i++) {
            this.array[i] = this.array[i + 1];
        }
        this.array[this.currentSize - 1] = null;
        this.currentSize--;
        return value;
    }

    getArray() {
        return this.array.slice(0, this.currentSize);
    }
}

let arrayVisualization = null;
let arrayContainer = document.getElementById("arrayContainer");
let arraySizeDisplay = document.getElementById("arraySizeDisplay");

function showPopup(message, type = 'info') {
    const popup = document.getElementById("customPopup");
    const messageElement = document.getElementById("popupMessage");
    messageElement.textContent = message;

    // Remove any existing type classes
    popup.classList.remove('error', 'success');

    // Apply different styles based on the type
    if (type === 'error') {
        popup.classList.add('error');
    } else if (type === 'success') {
        popup.classList.add('success');
    } else {
        popup.classList.add('info'); // Fallback class
    }

    popup.style.display = "flex";
    setTimeout(() => {
        popup.style.display = "none";
    }, 2000); // Hide after 2 seconds
}

document.getElementById("createArray").addEventListener("click", () => {
    const size = parseInt(document.getElementById("arraySize").value);
    if (isNaN(size) || size <= 0) {
        showPopup("Invalid array size!", "error");
        return;
    }
    arrayVisualization = new ArrayVisualization(size);
    arrayContainer.innerHTML = "";
    updateArrayVisual();
});

document.getElementById("pushButton").addEventListener("click", () => {
    if (!arrayVisualization) return;
    const value = parseInt(document.getElementById("value").value);
    if (isNaN(value)) {
        showPopup("Invalid value!", "error");
        return;
    }
    if (arrayVisualization.push(value)) {
        updateArrayVisual();
        showPopup("Value pushed!", "success");
    }
});

document.getElementById("popButton").addEventListener("click", () => {
    if (!arrayVisualization) return;
    const value = arrayVisualization.pop();
    if (value !== null) {
        updateArrayVisual();
        showPopup("Value popped: " + value, "success");
    }
});

document.getElementById("insertButton").addEventListener("click", () => {
    if (!arrayVisualization) return;
    const value = parseInt(document.getElementById("value").value);
    const position = parseInt(document.getElementById("position").value);
    if (isNaN(value) || isNaN(position)) {
        showPopup("Invalid value or position!", "error");
        return;
    }
    if (arrayVisualization.insert(value, position)) {
        updateArrayVisual();
        showPopup("Value inserted at position: " + position, "success");
    }
});

document.getElementById("deleteButton").addEventListener("click", () => {
    if (!arrayVisualization) return;
    const position = parseInt(document.getElementById("position").value);
    if (isNaN(position)) {
        showPopup("Invalid position!", "error");
        return;
    }
    const value = arrayVisualization.delete(position);
    if (value !== null) {
        updateArrayVisual();
        showPopup("Value deleted at position: " + position, "success");
    }
});

function updateArrayVisual() {
    if (!arrayVisualization) return;
    arrayContainer.innerHTML = "";
    const arrayElements = arrayVisualization.getArray();
    arrayElements.forEach((value, index) => {
        const box = document.createElement("div");
        box.className = "array-box";
        box.textContent = value;
        box.style.animation = "pushAnimation 0.5s ease-in-out";
        arrayContainer.appendChild(box);
    });
    const emptyBoxes = arrayVisualization.size - arrayVisualization.currentSize;
    for (let i = 0; i < emptyBoxes; i++) {
        const box = document.createElement("div");
        box.className = "array-box empty";
        arrayContainer.appendChild(box);
    }
    arraySizeDisplay.textContent = arrayVisualization.currentSize;
}

document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("customPopup").style.display = "none";
});
