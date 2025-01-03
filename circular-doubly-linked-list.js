class Node{
    constructor(data){
        this.value = data;
        this.prev = null;
        this.next= null;
    }
}

class CircularDoublyLinkedList{    
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    getElementAt(index){
        if(index < 0 || index > this.size){
            return console.log("Invalid index");
        }

        let curr = this.head;

        for(let i = 0; i < index && curr != null; i++){
            curr = curr.next;
        }

        return curr;
    }

    add(data){
        let node = new Node(data);

        if(!this.head){
            this.head = node;
            this.tail = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = node;
        }

        this.head.prev = this.tail;
        this.tail.next = this.head;
        this.size++;

        this.printList();
    }

    addAt(data, index){
        if(index < 0 || index > this.size){
            return console.log("Invalid index");
        }

        let node = new Node(data), curr = this.head, prev, item = 0;

        if(index === 0){
            if(!this.head){
                this.head = node;
                this.tail = node;
            } else {
                node.next = this.head;
                this.head.prev = node;
                this.head = node;
            } 
        } else if(index === this.size){
            curr = this.tail;
            curr.next = node;
            node.prev = curr;
            this.tail = node;
        } else {
            while(item++ < index){
                prev = curr;
                curr = curr.next;
            }

            node.next = curr;
            node.prev = prev;

            prev.next = node;
            curr.prev = node;
        }

        this.head.prev = this.tail;
        this.tail.next = this.head;
        this.size++;

        this.printList();
    }

    removeAt(index){
        if(index < 0 || index > this.size){
            return console.log("Invalid index");
        }

        let curr = this.head;

        if(index === 0){
            if(this.size === 1){
                this.head = null;
                this.tail = null;
            } else {
                curr = this.getElementAt(this.size - 1);
                this.head = this.head.next;
                curr.next = this.head;
            }
        } else {
            const prev = this.getElementAt(index - 1);
            curr = prev.next;
            prev.next = curr.next;
        }

        if(this.head){
            this.head.prev = this.tail;
            this.tail.next = this.head;
        }

        this.size--;

        this.printList();
    }

    printList(){
        let curr = this.head;
        let str = "";

        do {
            str += curr.value + (curr.next && curr !== this.tail ? " => " : " ");
            curr = curr.next;
        } while(curr != this.head);

        console.log("List: ", str);
    }
}

let list = new CircularDoublyLinkedList();

list.add(69);
list.add(128);
list.add(340);
list.add(389);

list.addAt(218, 2);
list.removeAt(1);