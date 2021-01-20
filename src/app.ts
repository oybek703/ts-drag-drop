
function Logger (cons: Function) {
    console.log('Logging...')
    console.log(cons)
}

@Logger
class Human {
    constructor(public name: string = 'Oybek') {
        console.log('Constructor method running...')
    }
}

const h1 = new Human()
console.log(h1)