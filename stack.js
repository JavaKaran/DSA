class Node {
    constructor(data){
        this.data = data;
        this.next = null;
    }
}

class Stack {
    constructor(){
        this.head = null;
    }

    isEmpty(){
        return this.head === null;
    }

    push(data){
        let node = new Node(data);

        if(!node){
            return console.log("Invalid data");
        }

        node.next = this.head;
        this.head = node;

    }

    pop(){
        if(this.head === null){
            console.log("Stack is empty");
            return null;
        }

        let data = this.head.data;
        this.head = this.head.next;
        return data;
    }

    peek(){
        if(this.head === null){
            console.log("Stack is empty");
            return null;
        }

        return this.head.data;
    }

    print(){
        let curr = this.head;
        let str = '';

        while(curr !== null){
            str += curr.data + (curr.next ? ' => ' : ' ');
            curr = curr.next;
        }

        console.log("Stack: ", str);
    }
}

function isAlphaNumeric(char) {
    return /^[a-zA-Z0-9]$/.test(char);
}

function isOperator(char){
    return /^[+\-*/^]$/.test(char);
}

function getPrecedence(operator){
    switch(operator){
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        case '^': 
            return 3;
        default:
            return 0;
    }
}

function infixToPostfix(string){
    let stack = new Stack();
    let output = "";

    for (let i = 0; i < string.length; i++) {
        let char = string[i];

        if (isAlphaNumeric(char)) {
            output += char;
        } else if (char === '(') {
            stack.push('(');
        } else if (char === ')') {
            while (!stack.isEmpty() && stack.peek() !== '(') {
                output += stack.pop();
            }
            stack.pop();
        } else {
            while (
                !stack.isEmpty() &&
                ((getPrecedence(char) < getPrecedence(stack.peek())) || (getPrecedence(char) === getPrecedence(stack.peek()) ))
            ) {
                output += stack.pop();
            }
            stack.push(char);
        }
    }

    while (!stack.isEmpty()) {
        output += stack.pop();
    }

    return output;
}

function infixToPrefix(string){
    let reversedInfix = string.split("").reverse().map(char => {
        if (char === '(') return ')';
        if (char === ')') return '(';
        return char;
    }).join("");

    let reversedPostfix = infixToPostfix(reversedInfix);
    
    return reversedPostfix.split('').reverse().join('');
}

function postfixToPrefix(string){
    let stack = new Stack();

    for(let i = 0; i < string.length; i++){
        if(isAlphaNumeric(string[i])){
            stack.push(string[i]);
        } else if(isOperator(string[i])){
            let op1 = stack.pop();
            let op2 = stack.pop();

            let temp = string[i] + op2 + op1;

            stack.push(temp);
        }
    }

    return stack.pop();
}

function prefixToPostfix(string){
    let stack = new Stack();

    for(let i = string.length - 1; i >= 0; i--){
        if(isAlphaNumeric(string[i])){
            stack.push(string[i]);
        } else if(isOperator(string[i])){
            let op1 = stack.pop();
            let op2 = stack.pop();

            let temp = op1 + op2 + string[i];

            stack.push(temp);
        }
    }

    return stack.pop();
}

let expression = "a+b*(c^d-e)^(f+g*h)-i";

let postfix = infixToPostfix(expression);

console.log(infixToPostfix(expression));
console.log("Postfix to prefix: ", postfixToPrefix(postfix));
console.log("Infix to prefix: ", infixToPrefix(expression));