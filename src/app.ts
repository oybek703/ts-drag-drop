
interface Validateable {
    value: string | number
    required?: boolean
    minLength?: number
    maxLength?: number
    min?: number
    max?: number
}

function validate(validateableInput: Validateable) {
    let isValid: boolean = true
    if(validateableInput.required) {
        isValid = isValid && !!validateableInput.value.toString().trim()
    }
    if(validateableInput.minLength) {
        isValid = isValid && validateableInput.value.toString().length >= validateableInput.minLength
    }
    if(validateableInput.maxLength) {
        isValid = isValid && validateableInput.value.toString().length <= validateableInput.maxLength
    }
    if(validateableInput.min && typeof validateableInput.value === 'number') {
        isValid = isValid && validateableInput.value >= validateableInput.min
    }
    if(validateableInput.max && typeof validateableInput.value === 'number') {
        isValid = isValid && validateableInput.value <= validateableInput.max
    }
    return isValid
}

function autobind(_: any, _1: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    return <PropertyDescriptor> {
        configurable: true,
        get() {
            return originalMethod.bind(this)
        }
    }
}

class ProjectsList {
    templateElement: HTMLTemplateElement
    hostElement: HTMLDivElement
    element: HTMLElement

    constructor(private type: 'active' | 'finished') {
        this.templateElement = document.getElementById(`${this.type}-projects-list`) as HTMLTemplateElement
        this.hostElement = document.getElementById('app') as HTMLDivElement
        const importedNode = document.importNode(this.templateElement.content, true)
        this.element = importedNode.firstElementChild as HTMLElement
        this.attach()
    }

    private attach() {
        this.hostElement.insertAdjacentElement('beforeend', this.element)
    }
}

class ProjectInput {
    templateElement: HTMLTemplateElement
    hostElement: HTMLDivElement
    element: HTMLFormElement
    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement

    constructor() {
        this.templateElement = document.getElementById('project-form') as HTMLTemplateElement
        this.hostElement = document.getElementById('app') as HTMLDivElement
        const importNode = document.importNode(this.templateElement.content, true)
        this.element = importNode.firstElementChild as HTMLFormElement
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement
        this.attach()
        this.configure()
    }

    getUserInputs(): [string, string, number] | void {
        const titleValue = this.titleInputElement.value
        const descriptionValue = this.descriptionInputElement.value
        const peopleValue = this.peopleInputElement.value
        const titleValidateable: Validateable = {value: titleValue, required: true}
        const descriptionValidateable: Validateable = {value: descriptionValue, minLength: 5}
        const peopleValidateable: Validateable = {value: +peopleValue, min: 1, max: 5}
        if(!validate(titleValidateable) || !validate(descriptionValidateable) || !validate(peopleValidateable)) {
            alert('Invalid User Input!')
            return
        } else {
            return [titleValue, descriptionValue, +peopleValue]
        }
    }

    private clearUserInputs() {
        this.titleInputElement.value = ''
        this.descriptionInputElement.value = ''
        this.peopleInputElement.value = ''
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault()
        const userInputs = this.getUserInputs()
        if(Array.isArray(userInputs)) {
            const [title, description, people] = userInputs
            console.log(title, description, people)
            this.clearUserInputs()
        }
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }
}

const projectInput= new ProjectInput()
const activeProjectsList = new ProjectsList('active')
const finishedProjectsList = new ProjectsList('finished')