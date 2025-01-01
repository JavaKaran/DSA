class Node {
    constructor(data){
        this.value = data;
        this.next = null;
    }
}

class LinkedList {
    constructor(){
        this.head = null;
        this.size = 0;
    }
    addElement(data){
        if(data === undefined){
            return console.log("Invalid data");
        }

        let node = new Node(data);

        let current;

        if(this.head == null){
            this.head = node;
        }
        else {
            current = this.head;

            while(current.next){
                current = current.next;
            }

            current.next = node;
        }

        this.size++;

        this.printList();
    }

    insertAt(data, index){
        if(index < 0 || index > this.size){
            return console.log("Invalid index");
        } else {
            let node = new Node(data);
            let curr, prev;

            curr = this.head;

            if(index == 0){
                node.next = this.head;
                this.head = node;
            } else {
                let item = 0;

                while(item < index){
                    item++;
                    prev = curr;
                    curr = curr.next;
                }
            }

            prev.next = node;
            node.next = curr;
        }
        
        this.size++;

        this.printList();
    }

    removeFrom(index){
        if(index < 0 || index > this.size){
            return console.log("Invalid index");
        }

        let curr, prev, item = 0;

        curr = this.head;
        prev = curr;

        if(index == 0){
            this.head = curr.next;
        } else {
            
            while(item < index){
                item++;
                prev = curr;
                curr = curr.next;
            }

            prev.next = curr.next;
        }
        
        this.size--;

        this.printList();
    }

    removeElement(data){
        let prev = null, curr = this.head;

        while(curr !== null){
            if(curr.value === data){
                if(prev === null){
                    this.head = curr.next;
                } else {
                    prev.next = curr.next;
                }
                
                this.size--;

                this.printList();
            }

            prev = curr;
            curr = curr.next;
        }

        return -1;
    }

    indexOf(data){
        let index = 0;
        let curr = this.head;

        while(curr !== null){
            if(curr.value === data){
                return index;
            }

            index++;
            curr = curr.next;
        }

        return -1;
    }

    isEmpty(){
        return this.size === 0;
    }

    printList(){
        let curr = this.head;
        let str = "";
        let count = 0;

        while(curr){
            str += curr.value + " ";
            curr = curr.next;
            count++;
        }

        console.log("List:", str);
    }
}

let list = new LinkedList();

list.addElement(23);
list.addElement(3);
list.addElement(25);

list.insertAt(44, 3);