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
// num = notSure;
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
pet = {
    legs: 4,
    bark: () => {
        console.log("Woof!");
    },
};
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
    //   pet.swim(); // TypeScript знає, що якщо pet не Dog, то це має бути Fish // тут помилка
}
// enum
var Sizes;
(function (Sizes) {
    Sizes["small"] = "small";
    Sizes["medim"] = "medium";
    Sizes["large"] = "large";
})(Sizes || (Sizes = {}));
// Яке значення можна призначити елементу enum у TypeScript? тільки рядок і число
// type size = "small" | "medium" | "large";
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
add(1, 1);
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
let answer;
answer = "yes"; // OK
answer = "no"; // OK
const getUserNames = (users) => {
    return users.map((user) => user.name);
};
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
];
let result = getUserNames(users);
console.log(result); // ['Alice', 'Bob', 'Charlie']
//
// У цьому прикладі функція getUserNames приймає масив об'єктів типу User та повертає масив рядків.
// *Тип void у TypeScript використовується для позначення відсутності будь-якого типу взагалі, і зазвичай використовується як тип функцій, що повертається, в якому функції не повертають значення.
function logMessage(message) {
    console.log(message);
}
logMessage("Hello, world!");
function doSomething(callback) {
    callback();
}
doSomething(() => {
    console.log("Callback function!");
});
// *Never
// Це коли функція ніколи не закінчується та нічого не повертає.
// Функція, яка завжди викидає помилку
function throwError(message) {
    throw new Error(message);
}
// Функція з нескінченним циклом
function infiniteLoop() {
    while (true) { }
}
// Ми можемо підвищити гнучкість. Замість того, щоб обмежувати тип CallbackType, який приймає рівно два числові аргументи, можна допустити функції, які можуть приймати будь-яку кількість аргументів.
// type CallbackType = (...nums: number[]) => number;
// Функція, яка приймає два числа та функцію зворотного виклику, застосовує цю функцію до чисел та виводить результат
function calc(param1, param2, callback) {
    console.log("Result:", callback(param1, param2));
}
// Приклади використання calc з різними функціями зворотного виклику
calc(1, 1, (num1, num2) => num1 + num2);
calc(10, 5, (num1, num2) => num1 - num2);
const user2 = {
    id: 1,
    name: "Alice",
};
const userWithCoords = {
    id: 1,
    name: "Alice",
    coords: [10, 20],
};
// більш складний приклад
var AnimalIds;
(function (AnimalIds) {
    AnimalIds["cat"] = "cat";
    AnimalIds["dog"] = "dog";
    AnimalIds["fish"] = "fish";
})(AnimalIds || (AnimalIds = {}));
// Створення об'єктів типу Animal
let cat = {
    meow: () => "Meow! I am a cat",
};
let dog = {
    bark: () => "Woof! I am a dog",
};
let fish = {
    swim: () => undefined,
};
function printDetails(obj) {
    console.log(`Name: ${obj.name}`);
    if ("privileges" in obj) {
        console.log(`Privileges: ${obj.privileges.join(", ")}`);
    }
    if ("startDate" in obj) {
        console.log(`Start Date: ${obj.startDate}`);
    }
}
// оператор instanceof для роботи з класами, перевіряючи, чи є об'єкт екземпляром конкретного класу.
class Car1 {
    drive() {
        console.log("Driving a car...");
    }
}
class Truck {
    drive() {
        console.log("Driving a truck...");
    }
    loadCargo(amount) {
        console.log(`Loading cargo: ${amount}`);
    }
}
// Create your instances
const carInstance = new Car1();
const truckInstance = new Truck();
// Function to use vehicle
function useVehicle(vehicle) {
    vehicle.drive();
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}
useVehicle(carInstance);
useVehicle(truckInstance);
function isEmployee(staff) {
    console.log(staff); //name: 'Bob', startDate: Thu Nov 02 2023 21:58:31 GMT+0200 (за східноєвропейським стандартним часом)
    console.log(staff.startDate !== undefined); //true
    return staff.startDate !== undefined;
}
const staffMember = { name: "Bob", startDate: new Date() };
if (isEmployee(staffMember)) {
    console.log(`Welcome on board, ${staffMember.name}! Your start date is ${staffMember.startDate}`);
}
// *У цьому прикладі ми використали as, щоб привести staff до типу Employee і тим самим перевірити чи є в ньому startDate.
// Який Type Guard ви використали б для перевірки наявності властивості в об'єкті?
// in
// Type Casting (або Type Conversion) використовується для перетворення об'єкта одного типу на об'єкт іншого типу.
// TypeScript використовує два синтаксичні підходи для типового приведення: кутові дужки <> та оператор as.
let someValue = "this is a string";
let strLength1 = someValue.length;
// or
let strLength2 = someValue.length;
// let strLength3: number = someValue.length;
// У цьому прикладі ми маємо змінну someValue типу unknown, і ми хочемо обробити її як рядок. Ми знаємо, що це рядок, але TypeScript цього не знає. Тому ми використовуємо Type Casting для уточнення типу someValue. Якщо ми цього не зробимо, то отримаємо помилку, як у змінній strLength3.
// роботи з HTML-елементами
// const input = document.getElementById("inputEmail");
// input.value = "test@test.ts"; //помилка
// рішення:
// const input = <HTMLInputElement>document.getElementById("inputEmail");
// або краще
const input = document.getElementById("inputEmail");
const user4 = {
    name: "Alex",
    gender: "MAN",
    country: "Ukraine",
};
let users6 = {};
let user6 = {
    id: "1",
    name: "Alex",
    email: "alex@example.com",
};
users6[user6.id] = user6;
// У цьому прикладі ми визначили тип Users, який містить об'єкти типу User. Потім ми створили об'єкт users, який може містити невідому кількість користувачів, кожен з яких може бути доступний за його id.
var DayOfWeek;
(function (DayOfWeek) {
    DayOfWeek[DayOfWeek["Monday"] = 0] = "Monday";
    DayOfWeek[DayOfWeek["Tuesday"] = 1] = "Tuesday";
    DayOfWeek[DayOfWeek["Wednesday"] = 2] = "Wednesday";
    DayOfWeek[DayOfWeek["Thursday"] = 3] = "Thursday";
    DayOfWeek[DayOfWeek["Friday"] = 4] = "Friday";
    DayOfWeek[DayOfWeek["Saturday"] = 5] = "Saturday";
    DayOfWeek[DayOfWeek["Sunday"] = 6] = "Sunday";
})(DayOfWeek || (DayOfWeek = {}));
function isWeekend(day) {
    return day === DayOfWeek.Saturday || day === DayOfWeek.Sunday;
}
// Приклад використання:
const today = DayOfWeek.Sunday;
if (isWeekend(today)) {
    console.log("Сьогодні вихідний.");
}
else {
    console.log("Сьогодні робочий день.");
}
// один тип для різних категорій товарів, якщо буде різна кількість ключів - теж буде працювати
// *використовуємо, якщо всі об'єкті, хоч і різні, будуть одного типу
const fruits = {
    apples: 15,
    banana: 30,
    orange: 30,
};
const frozenGoods = {
    iceCream: 25,
    fish: 30,
    berry: 10,
};
// типізували линамічний ключ - він завжди рядок, і значення на вибір
const userInfo = {
    name: "Bob",
    age: 23,
    country: "Ukraine",
};
const bookDetails = {
    title: "Bible",
    pageCount: 350,
};
// це можна використ з інпутом, де випадає список - об'єкт з назвою країни
//# sourceMappingURL=concatenation.js.map