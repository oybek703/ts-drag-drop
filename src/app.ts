
function autobind(_: any, _1: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value
    return <PropertyDescriptor> {
        configurable: true,
        get() {
            return originalMethod.bind(this)
        }
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

    getUserInputs(): [string, string, number] | void{
        const titleValue = this.titleInputElement.value
        const descriptionValue = this.descriptionInputElement.value
        const peopleValue = this.peopleInputElement.value
        if(!titleValue.trim() || !descriptionValue.trim() || !peopleValue.trim()) {
            alert('Invalid User Input!')
            return
        } else {
            return [titleValue, descriptionValue, +peopleValue]
        }
    }

    @autobind
    private submitHandler(event: Event) {
        event.preventDefault()
        const userInputs = this.getUserInputs()
        if(Array.isArray(userInputs)) {
            const [title, description, people] = userInputs
            console.log(title, description, people)
        }
    }

    private configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element)
    }
}

const p1 = new ProjectInput()