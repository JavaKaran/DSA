class QueueUsingArray {
    constructor(){
        this.queue = [];
        this.head = -1;
        this.tail = -1;
        this.maxSize = 100;
    }

    getLength(){
        return this.tail - this.head;
    }

    isEmpty(){
        return this.queue.length == 0;
    }

    isFull(){
        return this.queue.length == this.maxSize;
    }

    enqueue(data){
        if(this.isFull()){
            console.log("Queue is full");
        }

        if(this.tail == -1){
            this.head = 0;
            this.tail = 0;
        } else {
            this.tail = (this.tail + 1) % this.maxSize;
        }

        this.queue[this.tail] = data;
    }

    dequeue(){
        if(this.isEmpty()){
            console.log("Queue is empty");
        }

        const item = this.queue[this.head];

        if(this.queue.length == 1){
            this.head = -1;
            this.tail = -1;
        } else {
            this.head = (this.head + 1) % this.maxSize;
        }

        return item;
    }

    peek(){
        return console.log("Head: ", this.queue[this.head]);
    }

    print(){
        console.log("Queue: ", this.queue);
    }
}

class Node {
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

class QueueUsingLinkedList {
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    enqueue(data){
        let node  = new Node(data);

        if(this.head === null){
            this.head = node;
        } else {
            this.tail.next = node;
        }

        this.tail = node;
        this.size++;
    }

    dequeue(){
        if(this.head === null){
            return console.log("Queue is empty");
        } else {
            let data = this.head.data;
            this.head = this.head.next;
            this.size--;

            return data;
        }
    }

    peek(){
        return this.head ? console.log("Head: ", this.head.data) : null;
    }

    print(){
        let curr = this.head;
        let str = '';

        while(curr){
            str += curr.data + (curr.next ? ' => ' : ' ');
            curr = curr.next;
        }

        console.log("Queue: ", str);
    }
}

const queue = new QueueUsingArray;

queue.enqueue(5);
queue.enqueue(64);
queue.enqueue(532);
queue.enqueue(54);
queue.dequeue();
queue.enqueue(145);
queue.dequeue();
queue.peek();
queue.enqueue(635);

queue.print();

const queue2 = new QueueUsingLinkedList;

queue2.enqueue(57);
queue2.enqueue(97);
queue2.enqueue(42);
queue2.enqueue(10);
queue2.dequeue();
queue2.peek();
queue2.enqueue(32);

queue2.print();