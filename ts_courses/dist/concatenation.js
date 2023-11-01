function concatenation(firstWord, secondWord) {
    console.log(`${firstWord} ${secondWord}`);
}
export { concatenation };
// const total: number = 5;
// явна типызацыя
// let number = 5;
// number = "5";
// неявна
// const numbers = [1, 2, 3, 4, 5, true, "67"];
// зараз тайпскрипт не розуміє, що очікуємо, тому помилок нема
// const numbers: number[] = [1, 2, 3, 4, 5, true, "67"];
// так робимо типізацію масиву
// Ми також можемо вказати тип масиву через узагальнення (generic):
let numbers = [1, 2, 3, 4, 5];
const user = {
    name: "Bob",
    age: "12",
};
// Можемо перерахоувати кілька типів одночасно
//  якщо ми задаємо значення за замовчуванням у функції, тип вказувати не потрібно.
function foo(num = 10, str = "Some string", bool = true, empty = null) {
    // Some logic
}
// це або в тайпскрипт
const event = "dedline";
// всю типізацію виносимо нагору! або в окремий файл
//* Типи any та unknown
// Якщо не впевнені, який тип буде
// let age: any = 10;
// age = "20";
let age = 10;
age = "20";
// age.split(); //буде помикла, будуть проблеми зы специф методами, якы працюют тыльки з одним типом даних
// Any корисно, коли ми працюємо з бібліотекою на JavaScript, що може повертати різні типи даних, або в ситуаціях, коли конкретний тип даних не має значення в контексті нашого коду.
// let data: any = fetchData();
// коли функція приймає аргумент, тип якого нам не відомий, і який загалом не важливий у цьому контексті. Це може бути, наприклад, певна колбек-функція.
function fetchUserData(id, callback) {
    // Тут може бути якийсь запит, але ми його заповнимо самі
    const responseData = { name: "Tom" };
    callback(responseData);
}
// Використання функції:
fetchUserData("123", (data) => {
    console.log(data.name); // TypeScript не викличе помилку, навіть якщо поле name не існує
});
// unknown забезпечує більше безпеки під час роботи зі змінними. Якщо ми спробуємо присвоїти значення змінної типу unknown іншій змінній з конкретним типом без явного приведення типів, TypeScript видасть помилку.
let notSure = 4;
notSure = "maybe a string instead";
notSure = false;
let num;
num = notSure;
// нам не вдалося зберегти значення змінної notSure в змінну num.
// Візьмемо для прикладу таку ситуацію: Ви отримуєте дані з API та не знаєте їхнього точного формату. У цьому випадку вам потрібно буде провести уточнення типів.
function fetchUserData1() {
    return "Tom";
}
let userData = fetchUserData1(); // fetchUserData повертає невідомі дані
if (typeof userData === "string") {
    console.log(userData.toUpperCase()); // OK, тепер ми знаємо, що це рядок
}
let pet;
// pet = {
//   legs: 4,
//   bark: () => {
//     console.log("Woof!");
//   },
// };
// У цьому прикладі змінна pet може бути або об'єктом типу Dog, або об'єктом типу Fish.
// оли ми працюємо зі змінною Union Type, ми можемо використовувати лише ті властивості та методи, які існують у всіх типів цього об'єднання. У прикладі вище ми не можемо викликати pet.bark(), якщо pet є типом Fish. Нам доведеться перевіряти, чи існує цей метод.
// type guard function
function isDog(pet) {
    return "bark" in pet;
}
// Перевіряємо, чи є наш вихованець собакою перед тим, як використовувати метод bark
if (isDog(pet)) {
    pet.bark(); // OK, тепер TypeScript знає, що pet - це Dog
}
else {
    pet.swim(); // TypeScript знає, що якщо pet не Dog, то це має бути Fish
}
// enum
var Sizes;
(function (Sizes) {
    Sizes["small"] = "small";
    Sizes["medim"] = "medium";
    Sizes["large"] = "large";
})(Sizes || (Sizes = {}));
// Яке значення можна призначити елементу enum у TypeScript? тільки рядок і число
const button = "large";
const button2 = Sizes.large;
// різниця в записі
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 0] = "ADMIN";
    Role[Role["USER"] = 1] = "USER";
})(Role || (Role = {}));
const person1 = {
    role: Role.ADMIN,
};
if (person1.role === Role.ADMIN) {
    console.log("Role: ", Role.ADMIN); // Role 0, Role.User = 1
}
// Ми також можемо отримати значення enum, хоча це рідко використовується.
console.log(Role.ADMIN); // 0
console.log(Role[Role.ADMIN]); // "ADMIN"
// Існує ще така конструкція, як const enum. На відміну від звичайного enum, const enum видаляється під час транспіляції та не створює додаткового об'єкта в JavaScript.
// Значення const enum вставляють у місце використання у вигляді літералів. Це може допомогти покращити продуктивність.
var HttpCodes;
(function (HttpCodes) {
    HttpCodes[HttpCodes["OK"] = 200] = "OK";
    HttpCodes[HttpCodes["BadRequest"] = 400] = "BadRequest";
    HttpCodes[HttpCodes["Unauthorized"] = 401] = "Unauthorized";
})(HttpCodes || (HttpCodes = {}));
const status = 200 /* HttpCodes.OK */;
// Після компіляції у JavaScript отримаємо наступний код:
// const status = 200;
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
// interface User1 {
//   name: string;
//   age: number;
// hobby: string;
// }
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
// визначення масиву об'єктів
// type User = {
//   name: string;
//   age: number;
// };
// let users: User[] = [
//   { name: "Tom", age: 30 },
//   { name: "Jack", age: 25 },
//   { name: "Alice", age: 32 },
// ];
/*
 концепцію кортежів,
  щоб гарантувати, що перший елемент завжди буде рядком, а другий числом?
*/
// Tuple - Кортеж; = нехмінний масив
let person = ["Max", 21];
// let person: (number | string)[] = ["Max", 21]; а так просто можуть бути в довільному порядку
// Кортежі зручні, коли нам потрібно зберегти в масив фіксовані значення, наприклад, день, місяць та рік.
let date;
date = [7, 11, 2023]; // OK
// Але є нюанс: якщо ми додамо елемент у кортеж через метод push, то TypeScript не заперечуватиме, він не відстежує реальний вміст масиву.
// використання оператора розширення (...) для створення кортежів змінної довжини.
let tuple;
tuple = ["hello", 42, 100, 200]; // OK
const ceo = {
    name: "Alice",
    id: 1,
    employees: [
        {
            name: "Bob",
            id: 2,
        },
    ],
};
let value;
value = 1; // OK
value = 2; // OK
value = 3; // Error: Type '3' is not assignable to type 'OneOrTwo'.
let answer;
answer = "yes"; // OK
answer = "no"; // OK
answer = "maybe"; // Error: Type '"maybe"' is not assignable to type 'YesOrNo'.
//# sourceMappingURL=concatenation.js.map