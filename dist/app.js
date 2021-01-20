"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function Logger(cons) {
    console.log('Logging...');
    console.log(cons);
}
var Human = /** @class */ (function () {
    function Human(name) {
        if (name === void 0) { name = 'Oybek'; }
        this.name = name;
        console.log('Constructor method running...');
    }
    Human = __decorate([
        Logger
    ], Human);
    return Human;
}());
var h1 = new Human();
console.log(h1);
//# sourceMappingURL=app.js.map