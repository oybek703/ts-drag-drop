"use strict";
var Human = /** @class */ (function () {
    function Human(name) {
        this.name = name;
        if (name) {
            this.name = name;
        }
    }
    Human.prototype.greet = function (phrase) {
        if (this.name) {
            console.log("Hi, my name is " + this.name);
        }
        else {
            console.log('Hi.');
        }
    };
    return Human;
}());
var human = new Human('Oybek');
var human1 = new Human('Oybek');
var human2 = new Human('Husen');
human2.greet('hi');
//# sourceMappingURL=app.js.map