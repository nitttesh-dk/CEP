class Queue {
    constructor(size) {
        this.size = size;
        this.front = 0;
        this.rear = -1;
        this.count = 0;
        this.arr = new Array(size);
    }

    enqueue(value) {
        if (this.count === this.size) {
            showPopup("Queue is full!", "error");
            return false;
        }
        this.rear = (this.rear + 1) % this.size;
        this.arr[this.rear] = value;
        this.count++;
        return true;
    }

    dequeue() {
        if (this.count === 0) {
            showPopup("Queue is empty!", "error");
            return null;
        }
        const dequeuedValue = this.arr[this.front];
        this.front = (this.front + 1) % this.size;
        this.count--;
        return dequeuedValue;
    }

    getQueue() {
        let result = [];
        for (let i = 0; i < this.count; i++) {
            result.push(this.arr[(this.front + i) % this.size]);
        }
        return result;
    }

    getFrontRear() {
        return { front: this.front, rear: this.rear };
    }
}

let queue = null;
let queueContainer = document.getElementById("queueContainer");
let frontPointer = document.getElementById("frontPointer");
let rearPointer = document.getElementById("rearPointer");


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

    // Hide the popup after 2 seconds
    setTimeout(() => {
        popup.style.display = "none";
    }, 2000); // 2000 milliseconds = 2 seconds
}


document.getElementById("closePopup").addEventListener("click", () => {
    document.getElementById("customPopup").style.display = "none";
});

// Queue creation
document.getElementById("createQueue").addEventListener("click", () => {
    const size = parseInt(document.getElementById("queueSize").value, 10);
    if (isNaN(size) || size < 1 || size >= 25) {
        showPopup("Please enter a valid queue size between 1 and 20.", "error");
        return;
    }
    queue = new Queue(size);
    queueContainer.innerHTML = '';
    for (let i = 0; i < size; i++) {
        const box = document.createElement('div');
        box.classList.add('queue-box');
        box.classList.add('empty');
        queueContainer.appendChild(box);
    }
    updatePointers();
    showPopup(`Queue of size ${size} created.`, "success");
});


// Enqueue operation
document.getElementById("enqueueButton").addEventListener("click", () => {
    if (!queue) {
        showPopup("Please create a queue first.", "error");
        return;
    }

    const value = document.getElementById("enqueueValue").value;
    if (value) {
        if (queue.enqueue(value)) {
            updateQueueVisual('enqueue');
            document.getElementById("enqueueValue").value = '';
            updatePointers();
        }
    } else {
        showPopup("Please enter a value to enqueue.", "error");
    }
});

// Dequeue operation
document.getElementById("dequeueButton").addEventListener("click", () => {
    if (!queue) {
        showPopup("Please create a queue first.", "error");
        return;
    }

    const dequeuedValue = queue.dequeue();
    if (dequeuedValue !== null) {
        updateQueueVisual('dequeue');
        showPopup(`${dequeuedValue} dequeued from the queue.`, "success");
        updatePointers();
    }
});

// Update the visual representation of the queue
function updateQueueVisual(action) {
    const queueBoxes = document.querySelectorAll('.queue-box');
    const currentQueue = queue.getQueue(); // Get the actual queue elements

    if (action === 'enqueue') {
        // Enqueue operation
        const newBox = queueBoxes[queue.count - 1];
        newBox.textContent = currentQueue[queue.count - 1];
        newBox.classList.remove('empty');
        newBox.style.animation = 'enqueueAnimation 0.5s forwards';

    } else if (action === 'dequeue') {
        // Dequeue operation: Remove the first non-empty element and shift the rest
        let firstFilledBoxIndex = -1;
        
        // Find the first non-empty box
        for (let i = 0; i < queueBoxes.length; i++) {
            if (!queueBoxes[i].classList.contains('empty')) {
                firstFilledBoxIndex = i;
                break;
            }
        }

        if (firstFilledBoxIndex !== -1) {
            const firstBox = queueBoxes[firstFilledBoxIndex];
            firstBox.style.animation = 'dequeueAnimation 0.7s forwards';
            
            firstBox.addEventListener('animationend', () => {
                firstBox.textContent = '';
                firstBox.classList.add('empty');
                firstBox.style.animation = 'none'; // Reset animation after it ends

                // Shift remaining elements to the left
                for (let i = firstFilledBoxIndex + 1; i < queueBoxes.length; i++) {
                    if (!queueBoxes[i].classList.contains('empty')) {
                        // Move content from box[i] to box[i - 1]
                        queueBoxes[i - 1].textContent = queueBoxes[i].textContent;
                        queueBoxes[i - 1].classList.remove('empty');
                        queueBoxes[i].textContent = '';
                        queueBoxes[i].classList.add('empty');
                    }
                }
            }, { once: true });
        }
    }
}

// Update the front and rear pointers
function updatePointers() {
    if (queue) {
        const { front, rear } = queue.getFrontRear();

        // If queue is empty, set front and rear pointers to -1
        if (queue.count === 0) {
            frontPointer.textContent = -1;
            rearPointer.textContent = -1;
        } else {
            frontPointer.textContent = front;
            rearPointer.textContent = rear;
        }
    }
}
