interface Named {
    name?: string
}

interface Greetable extends Named{
    name?: string
    greet(phrase: string): void
}

class Human implements Greetable {
    constructor(public name?: string) {
        if(name) {
            this.name = name
        }
    }
    greet(phrase: string) {
        if(this.name) {
            console.log(`Hi, my name is ${this.name}`)
        } else {
            console.log('Hi.')
        }
    }
}

const human = new Human('Oybek')

const human1: Greetable = new Human('Oybek')
const human2: Greetable = new Human('Husen')

human2.greet('hi')