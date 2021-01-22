"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(validateableInput) {
    var isValid = true;
    if (validateableInput.required) {
        isValid = isValid && !!validateableInput.value.toString().trim();
    }
    if (validateableInput.minLength) {
        isValid = isValid && validateableInput.value.toString().length >= validateableInput.minLength;
    }
    if (validateableInput.maxLength) {
        isValid = isValid && validateableInput.value.toString().length <= validateableInput.maxLength;
    }
    if (validateableInput.min && typeof validateableInput.value === 'number') {
        isValid = isValid && validateableInput.value >= validateableInput.min;
    }
    if (validateableInput.max && typeof validateableInput.value === 'number') {
        isValid = isValid && validateableInput.value <= validateableInput.max;
    }
    return isValid;
}
function autobind(_, _1, descriptor) {
    var originalMethod = descriptor.value;
    return {
        configurable: true,
        get: function () {
            return originalMethod.bind(this);
        }
    };
}
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus["ACTIVE"] = "active";
    ProjectStatus["FINISHED"] = "finished";
})(ProjectStatus || (ProjectStatus = {}));
var Project = /** @class */ (function () {
    function Project(id, title, description, numberOfPeople, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.numberOfPeople = numberOfPeople;
        this.status = status;
    }
    return Project;
}());
var ProjectState = /** @class */ (function () {
    function ProjectState() {
        this.projects = [];
        this.listeners = [];
        if (ProjectState.exists) {
            return ProjectState.instance;
        }
        ProjectState.instance = this;
        ProjectState.exists = true;
    }
    ProjectState.prototype.addProject = function (title, description, numberOfPeople) {
        this.projects.push(new Project(new Date().getTime(), title, description, numberOfPeople, ProjectStatus.ACTIVE));
        for (var _i = 0, _a = this.listeners; _i < _a.length; _i++) {
            var listener = _a[_i];
            listener(this.projects.slice());
        }
    };
    ProjectState.prototype.addListener = function (listener) {
        this.listeners.push(listener);
    };
    return ProjectState;
}());
var projectState = new ProjectState();
var Component = /** @class */ (function () {
    function Component(templateId, hostId, afterBegin) {
        this.afterBegin = afterBegin;
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostId);
        var importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.attach();
    }
    Component.prototype.attach = function () { this.hostElement.insertAdjacentElement(this.afterBegin ? 'afterbegin' : 'beforeend', this.element); };
    return Component;
}());
var ProjectsList = /** @class */ (function (_super) {
    __extends(ProjectsList, _super);
    function ProjectsList(type) {
        var _this = _super.call(this, type + "-projects-list", 'app', false) || this;
        _this.type = type;
        _this.assignedProjects = [];
        _this.configure();
        return _this;
    }
    ProjectsList.prototype.configure = function () {
        var _this = this;
        projectState.addListener(function (newProjects) {
            _this.assignedProjects = newProjects.filter(function (p) { return _this.type === p.status; });
            _this.renderProjects();
        });
    };
    ProjectsList.prototype.renderProjects = function () {
        var _this = this;
        this.element.innerHTML = '';
        this.element.insertAdjacentHTML('afterbegin', "<li class=\"collection-header center " + (this.type === ProjectStatus.ACTIVE ? 'green' : 'grey') + " white-text\">" + this.type.toUpperCase() + " PROJECTS</li>");
        this.assignedProjects.forEach(function (project) { return _this.element.insertAdjacentHTML('beforeend', "<li class=\"collection-item\">" + project.title + "</li>"); });
    };
    return ProjectsList;
}(Component));
var ProjectInput = /** @class */ (function (_super) {
    __extends(ProjectInput, _super);
    function ProjectInput() {
        var _this = _super.call(this, 'project-form', 'app', true) || this;
        _this.titleInputElement = _this.element.querySelector('#title');
        _this.descriptionInputElement = _this.element.querySelector('#description');
        _this.peopleInputElement = _this.element.querySelector('#people');
        _this.configure();
        return _this;
    }
    ProjectInput.prototype.getUserInputs = function () {
        var titleValue = this.titleInputElement.value;
        var descriptionValue = this.descriptionInputElement.value;
        var peopleValue = this.peopleInputElement.value;
        var titleValidateable = { value: titleValue, required: true };
        var descriptionValidateable = { value: descriptionValue, minLength: 5 };
        var peopleValidateable = { value: +peopleValue, min: 1, max: 5 };
        if (!validate(titleValidateable) || !validate(descriptionValidateable) || !validate(peopleValidateable)) {
            alert('Please fill the form with valid information!');
            return;
        }
        else {
            return [titleValue, descriptionValue, +peopleValue];
        }
    };
    ProjectInput.prototype.clearUserInputs = function () {
        this.titleInputElement.value = '';
        this.descriptionInputElement.value = '';
        this.peopleInputElement.value = '';
    };
    ProjectInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        var userInputs = this.getUserInputs();
        if (Array.isArray(userInputs)) {
            var title = userInputs[0], description = userInputs[1], people = userInputs[2];
            projectState.addProject(title, description, people);
            this.clearUserInputs();
            this.titleInputElement.focus();
        }
    };
    ProjectInput.prototype.configure = function () {
        this.element.addEventListener('submit', this.submitHandler);
    };
    __decorate([
        autobind
    ], ProjectInput.prototype, "submitHandler", null);
    return ProjectInput;
}(Component));
var projectInput = new ProjectInput();
var activeProjectsList = new ProjectsList(ProjectStatus.ACTIVE);
var finishedProjectsList = new ProjectsList(ProjectStatus.FINISHED);
//# sourceMappingURL=app.js.map