class QueueElement {
    constructor(data, priority){
        this.data = data;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor(){
        this.queue = [];
    }

    enqueue(data, priority){
        let queueElement = new QueueElement(data, priority);

        let added = false;
        for(let i = 0; i < this.queue.length; i++){
            if(queueElement.priority > this.queue[i].priority){
                this.queue.splice(i, 0, queueElement);
                added = true;
                break;
            }
        }

        if(!added){
            this.queue.push(queueElement);
        }
    }

    dequeue(){
        return this.queue.shift();
    }

    front(){
        return this.queue[0];
    }

    rear(){
        return this.queue[this.queue.length - 1];
    }

    isEmpty(){
        return this.queue.length == 0;
    }

    size(){
        return this.queue.length;
    }

    print(){
        for(let i = 0; i < this.queue.length; i++){
            console.log(`${this.queue[i].data} - ${this.queue[i].priority}`);
        }
    }
}

let pQ = new PriorityQueue();
pQ.enqueue(1, 3);
pQ.enqueue(5, 2);
pQ.enqueue(6, 1);
pQ.enqueue(11, 1);
pQ.enqueue(13, 1);
pQ.enqueue(10, 3);
pQ.dequeue();
pQ.enqueue(4,2);
pQ.print();