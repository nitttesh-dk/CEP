class Queue {
    constructor(size) {
        this.size = size;
        this.front = -1;
        this.rear = -1;
        this.arr = new Array(size);
    }

    // Enqueue method to add an element to the queue
    enqueue(value) {
        if (this.rear === this.size - 1) {
            console.log("Queue is full!");
            return;
        }
        if (this.front === -1) {
            this.front = 0;
        }
        this.rear++;
        this.arr[this.rear] = value;
        console.log(`${value} enqueued to queue`);
    }

    // Dequeue method to remove an element from the queue
    dequeue() {
        if (this.front === -1 || this.front > this.rear) {
            console.log("Queue is empty!");
            return;
        }
        console.log(`${this.arr[this.front]} dequeued from queue`);
        this.front++;
    }

    // Print the queue
    print() {
        if (this.front === -1 || this.front > this.rear) {
            console.log("Queue is empty!");
            return;
        }
        let queueElements = this.arr.slice(this.front, this.rear + 1);
        console.log("Queue elements:", queueElements.join(" "));
    }
}

// Test the Queue
const q = new Queue(5);

q.enqueue(10);
q.enqueue(20);
q.enqueue(30);
q.enqueue(40);
q.enqueue(50);


q.dequeue();
q.dequeue();
q.dequeue();
q.dequeue();

q.print();
