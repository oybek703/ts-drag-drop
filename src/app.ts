
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

enum ProjectStatus {ACTIVE= 'active', FINISHED = 'finished' }

class Project {
    constructor(public id: number, public title: string, public description: string, public numberOfPeople: number, public status: ProjectStatus) {}
}

type Listener = (projects: Project[]) => void

class ProjectState {
    private projects: Project[] = []
    private listeners: Listener[] = []
    static instance: ProjectState
    static exists: boolean
    constructor() {
        if(ProjectState.exists) {
            return ProjectState.instance
        }
        ProjectState.instance = this
        ProjectState.exists = true
    }

    addProject(title: string, description: string, numberOfPeople: number) {
        this.projects.push(new Project(new Date().getTime(), title, description, numberOfPeople, ProjectStatus.ACTIVE))
        for (const listener of this.listeners) {
            listener(this.projects.slice())
        }
    }

    addListener(listener: Listener) {
        this.listeners.push(listener)
    }
}

const projectState = new ProjectState()

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement
    hostElement: U
    element: T

    protected constructor(templateId: string, hostId: string, public afterBegin: boolean) {
        this.templateElement = document.getElementById(templateId) as HTMLTemplateElement
        this.hostElement = document.getElementById(hostId) as U
        const importedNode = document.importNode(this.templateElement.content, true)
        this.element = importedNode.firstElementChild as T
        this.attach()
    }
    protected attach() {this.hostElement.insertAdjacentElement(this.afterBegin ? 'afterbegin' : 'beforeend', this.element)}
    abstract configure(): void
}

class ProjectsList extends Component<HTMLElement, HTMLDivElement>{
    assignedProjects: Project[] = []

    constructor(private type: ProjectStatus.ACTIVE | ProjectStatus.FINISHED) {
        super(`${type}-projects-list`, 'app', false)
        this.configure()
    }

    configure() {
        projectState.addListener((newProjects: Project[]) => {
            this.assignedProjects = newProjects.filter(p => this.type === p.status)
            this.renderProjects()
        })
    }

    private renderProjects() {
        this.element.innerHTML = ''
        this.element.insertAdjacentHTML('afterbegin', `<li class="collection-header center ${this.type === ProjectStatus.ACTIVE ? 'green' : 'grey'} white-text">${this.type.toUpperCase()} PROJECTS</li>`)
        this.assignedProjects.forEach(project => this.element.insertAdjacentHTML('beforeend', `<li class="collection-item">${project.title}</li>`))
    }
}

class ProjectInput extends Component<HTMLFormElement, HTMLDivElement>{
    titleInputElement: HTMLInputElement
    descriptionInputElement: HTMLInputElement
    peopleInputElement: HTMLInputElement

    constructor() {
        super('project-form', 'app', true)
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement
        this.descriptionInputElement = this.element.querySelector('#description') as HTMLInputElement
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement
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
            alert('Please fill the form with valid information!')
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
            projectState.addProject(title, description, people)
            this.clearUserInputs()
            this.titleInputElement.focus()
        }
    }

    configure() {
        this.element.addEventListener('submit', this.submitHandler)
    }

}

const projectInput= new ProjectInput()
const activeProjectsList = new ProjectsList(ProjectStatus.ACTIVE)
const finishedProjectsList = new ProjectsList(ProjectStatus.FINISHED)