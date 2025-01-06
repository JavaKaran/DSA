
class HashTable {
    constructor(){
        this.table = new Array(127);
        this.size = 0;
    }

    _hash(key){
        let hash = 0;
        for(let i =0; i < key.length; i++){
            hash += key.charCodeAt(key[i]);
        }

        return hash % this.table.length;
    }

    /* Using djb2 hash algorithm */
    _hashV2(key){
        let hash = 5381;

        for (let i = 0; i < key.length; i++) {
            hash = (hash * 33) + key.charCodeAt(i);
        }

        return hash % this.table.length;
    }

    set(key, value){
        const index = this._hashV2(key);

        if(this.table[index]){
            for(let i = 0; i < this.table[index].length; i++){
                if(this.table[index][i][0] === key){
                    this.table[index][i][1] = value;
                    return;
                }
            }

            this.table[index].push([key, value]);
        } else {
            this.table[index] = [[key, value]];
        }

        this.size++;
    }

    get(key){
        const index = this._hashV2(key);

        if(this.table[index]){
            for(let i = 0; i < this.table[index].length; i++){
                if(this.table[index][i][0] === key){
                    return this.table[index][i][1];
                }
            }
        }

        return undefined;
    }

    remove(key){
        const index = this._hashV2(key);

        if(this.table[index] && this.table[index].length){
            for(let i = 0; i < this.table[index].length; i++){
                if(this.table[index][i][0] === key){
                    this.table[index].splice(i, 1);
                    this.size--;
                    return true;
                }
            }
        } else {
            return false;
        }
    }

    display(){
        this.table.forEach((values, index) => {
            const chainedValue = values.map(([key, value]) => `[${key}: ${value}]`);
            console.log(`${index}: ${chainedValue}`);
        });
    }

}

const ht = new HashTable();

ht.set("France", 111);
ht.set("Spain", 150);
ht.set("ǻ", 192);

ht.display();

console.log(ht.size);

ht.remove("Spain");
ht.display();

//TODO: Dynamic Resizing of hash table