class Node{
    constructor(data){
        this.value = data;
        this.prev = null;
        this.next= null;
    }
}

class DoublyLinkedList{
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    addItem(data){
        let node = new Node(data);

        if(this.head === null){
            this.head = node;
            this.tail = node;
        } else {
            node.prev = this.tail;
            this.tail.next = node;
            this.tail = this.tail.next;
        }

        this.size++;

        this.printList();
    }

    addAt(data, index){
        if(index < 0 || index > this.size){
            return console.log("Invalid index");
        }

        if(index === 0){
            this.addItem(data);
        }

        let node = new Node(data);
        let curr, prev;

        curr = this.head;

        while(index > 1){
            index--;

            if(curr === null){
                return console.log("Index does not exist.");
            }

            curr = curr.next;
        }

        node.next = curr.next;
        node.prev = curr;
        curr.next.prev = node;
        curr.next = node;

        this.printList();
    }

    removeAtStart(){
        if(this.head === null){
            return console.log("List is empty.");
        }

        this.head = this.head.next;
        this.head.prev = null;

        this.printList();
    }

    removeAt(index){
        if(this.head === null){
            return console.log("List is empty.");
        }

        if(index < 0 || index > this.size){
            return console.log("Invalid index");
        }

        if(index === 0){
            this.removeAtStart();
        }

        let curr = this.head;

        while(index > 0){
            index--;

            if(curr === null){
                return console.log("Index does not exist.");
            }

            curr = curr.next;
        }

        curr.prev.next = curr.next;
        curr.next.prev = curr.prev;

        this.printList();
    }

    isEmpty(){
        if(this.head === null) return true;
        return false;
    }

    printList(){
        if(!this.isEmpty()){
            let curr = this.head;
            let str = "";

            while(curr !== null){
                str += curr.value + " ";
                curr = curr.next;
            }

            console.log("List: ", str);
        }
    }
}

let list = new DoublyLinkedList();

list.addItem(35);
list.addItem(98);
list.addItem(109);

list.addAt(58, 1);