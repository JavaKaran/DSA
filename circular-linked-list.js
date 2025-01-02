class Node{
    constructor(data){
        this.value = data;
        this.next= null;
    }
}

class CircularLinkedList{
    constructor(){
        this.head = null;
        this.size = 0;
    }

    getElementAt(index){
        if(index < 0 || index >= this.size){
            return console.log("Invalid index");
        }

        let curr = this.head;
        let item = 0;

        while(item < index){
            item++;
            curr = curr.next;
        }

        return curr;
    }

    add(data){
        let node = new Node(data);

        if(this.head === null){
            this.head = node;
        } else {
            let curr = this.getElementAt(this.size - 1);

            curr.next = node;
        }

        node.next = this.head;
        this.size++;

        this.printList();
    }

    addAt(data, index){
        if(index < 0 || index > this.size){
            return console.log("Invalid index");
        }

        let node = new Node(data);

        let curr = this.head;

        if(index === 0){
            if(this.head === null){
                this.head = node;
                node.next = this.head;
            } else {
                node.next = curr;
                curr = this.getElementAt(this.size - 1);
                this.head = node;
                curr.next = this.head;
            }
        } else {
            const prev = this.getElementAt(index - 1);
            node.next = prev.next;
            prev.next = node;
        }

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

        this.size--;

        this.printList();
    }

    getIndexOf(data){
        let curr = this.head;
        let index = 0;

        do {
            if(curr.value === data){
                return index;
            }

            curr = curr.next;
            index++;
        } while(curr !== this.head && index < this.size);

        return -1;        
    }

    printList(){
        if(this.head === null){
            return console.log("List is empty.");
        }

        let curr = this.head;
        let str = "";
        let count = 0;

        do {
            str += curr.value + " ";
            curr = curr.next;
            count++;
        } while(curr !== this.head);

        console.log("List:", str);
    }

}

let list = new CircularLinkedList();

list.add(67);
list.add(45);
list.add(102);
list.add(150);
