"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function autobind(_, _1, descriptor) {
    var originalMethod = descriptor.value;
    return {
        configurable: true,
        get: function () {
            return originalMethod.bind(this);
        }
    };
}
var ProjectInput = /** @class */ (function () {
    function ProjectInput() {
        this.templateElement = document.getElementById('project-form');
        this.hostElement = document.getElementById('app');
        var importNode = document.importNode(this.templateElement.content, true);
        this.element = importNode.firstElementChild;
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionInputElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.attach();
        this.configure();
    }
    ProjectInput.prototype.getUserInputs = function () {
        var titleValue = this.titleInputElement.value;
        var descriptionValue = this.descriptionInputElement.value;
        var peopleValue = this.peopleInputElement.value;
        if (!titleValue.trim() || !descriptionValue.trim() || !peopleValue.trim()) {
            alert('Invalid User Input!');
            return;
        }
        else {
            return [titleValue, descriptionValue, +peopleValue];
        }
    };
    ProjectInput.prototype.submitHandler = function (event) {
        event.preventDefault();
        var userInputs = this.getUserInputs();
        if (Array.isArray(userInputs)) {
            var title = userInputs[0], description = userInputs[1], people = userInputs[2];
            console.log(title, description, people);
        }
    };
    ProjectInput.prototype.configure = function () {
        this.element.addEventListener('submit', this.submitHandler);
    };
    ProjectInput.prototype.attach = function () {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    };
    __decorate([
        autobind
    ], ProjectInput.prototype, "submitHandler", null);
    return ProjectInput;
}());
var p1 = new ProjectInput();
//# sourceMappingURL=app.js.map