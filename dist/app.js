"use strict";
var Human = /** @class */ (function () {
    function Human(name) {
        this.name = name;
    }
    Human.prototype.greet = function (phrase) {
        console.log("Hi, my name is " + this.name);
    };
    return Human;
}());
var human1 = new Human('Oybek');
console.log(human1);
//# sourceMappingURL=app.js.map