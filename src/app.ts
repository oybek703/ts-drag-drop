interface Greetable {
    name: string
    greet(phrase: string): void
}

class Human implements Greetable {
    constructor(public name:string) {
    }
    greet(phrase: string) {
        console.log(`Hi, my name is ${this.name}`)
    }
}

const human1: Greetable = new Human('Oybek')
console.log(human1)