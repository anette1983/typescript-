function concatenation(firstWord, secondWord) {
    console.log(`${firstWord} ${secondWord}`);
}
export { concatenation };
const user = {
    name: "Bob",
    age: "12",
};
// це або в тайпскрипт
const event = "dedline";
// всю типізацію виносимо нагору! або в окремий файл
//* Типи any та unknown
// Якщо не впевнені, який тип буде
// let age: any = 10;
// age = "20";
let age = 10;
age = "20";
var Sizes;
(function (Sizes) {
    Sizes["small"] = "small";
    Sizes["medim"] = "medium";
    Sizes["large"] = "large";
})(Sizes || (Sizes = {}));
const button = "large";
const button2 = Sizes.large;
// різниця в записі
//*return type and void
// function add(num1: number, num2: number): string {
//   return `${num1}` + `${num2}`;
// }
// console.log(add(1, 1));
// Якщо фкція нічого не повертає
function add(num1, num2) {
    console.log(num1, num2);
}
console.log(add(1, 1));
function greet(person) {
    console.log("Hello, " + person.firstName + " " + person.lastName);
}
greet({ firstName: "Alex", lastName: "Kolesnyk" });
function userConstructor(name, age, hobby) {
    return {
        name,
        age,
        hobby,
    };
}
const Car = {
    color: "red",
    price: 1000,
    currency: "UAH",
    start(color) {
        console.log("Start" + color);
    },
};
const user3 = {
    name: "Bob",
    age: 12,
};
const admin = {
    name: "Glen",
    age: 23,
    role: "Admin",
};
// В реакті необов’язкові дефолтні пропи так прописуємо
//# sourceMappingURL=concatenation.js.map