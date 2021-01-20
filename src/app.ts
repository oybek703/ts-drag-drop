function merge <T extends object, U extends object> (o1: T, o2: U) {
    return Object.assign(o1, o2)
}

const merged = merge({name: 'Oybek'}, {age: 21})
console.log(merged.name)