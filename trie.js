class Node {
    constructor(key){
        this.key = key;
        this.parent = null;
        this.children = {};
        this.end = false;
    }

    getWord(){
        let node = this;
        let output = [];

        while(node !== null){
            output.unshift(node.key);
            node = node.parent;
        }

        return output.join('');
    }
}

class Trie {
    constructor(){
        this.root = new Node();
    }

    insert(word){
        let node = this.root;
        for(let i = 0; i < word.length; i++){
            if(!node.children[word[i]]){
                node.children[word[i]] = new Node(word[i]);

                node.children[word[i]].parent = node;
            }

            node = node.children[word[i]];
        }

        node.end = true;
    }

    search(word){
        let node = this.root;

        for(let i = 0; i < word.length; i++){
            if(!node.children[word[i]]){
                return false;
            }

            node = node.children[word[i]];
        }

        return node.end;
    }

    startsWith(prefix){
        let node = this.root;
        let output = [];

        for(let i = 0; i < prefix.length; i++){
            if(!node.children[prefix[i]]){
                return false;
            }

            node = node.children[prefix[i]];
        }

        this.findAllWords(node, output);

        return true;
    }

    findAllWords(node, output){
        if(node.end){
            output.unshift(node.getWord());
        }

        for(let key in node.children){
            this.findAllWords(node.children[key], output)
        }
    }

    remove(word){
        let node = this.root;

        if(!word) return;

        const removeWord = (node, word) => {
            if(node.end && node.getWord() == word){
                let hasChildren = Object.keys(node.children).length > 0;

                if(hasChildren){
                    node.end = false;
                } else {
                    node.parent.children = {};
                }

                return true;
            }

            for(let key in node.children){
                removeWord(node.children[key], word);
            }

            return false;
        }

        removeWord(node, word);
    }

}

const trie = new Trie();

trie.insert("peter");
trie.insert("piper");
trie.insert("picked");
trie.insert("pickled");
trie.insert("pepper");

console.log(trie.search("piper"));
console.log(trie.startsWith("pick"));
console.log(trie.startsWith("peq"));