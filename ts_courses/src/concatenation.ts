function concatenation(firstWord: string, secondWord: string) {
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

let numbers: Array<number> = [1, 2, 3, 4, 5];

// типізація об'єкту

// const user: { name: string; age: number } = {
//   name: "Bob",
//   age: 12,
// };

// user.age = "15" //буде показувати помилку

// type = зручніший синтаксис

type User = { name: string; age: number | string };

const user: User = {
  name: "Bob",
  age: "12",
};

// Можемо перерахоувати кілька типів одночасно

//  якщо ми задаємо значення за замовчуванням у функції, тип вказувати не потрібно.

function foo(num = 10, str = "Some string", bool = true, empty = null) {
  // Some logic
}

type eventType = "lesson" | "dedline";
// це або в тайпскрипт

const event: eventType = "dedline";

// всю типізацію виносимо нагору! або в окремий файл

//* Типи any та unknown
// Якщо не впевнені, який тип буде

// let age: any = 10;
// age = "20";

let age: unknown = 10;
age = "20";
// age.split(); //буде помикла, будуть проблеми зы специф методами, якы працюют тыльки з одним типом даних

// Any корисно, коли ми працюємо з бібліотекою на JavaScript, що може повертати різні типи даних, або в ситуаціях, коли конкретний тип даних не має значення в контексті нашого коду.

// let data: any = fetchData();

// коли функція приймає аргумент, тип якого нам не відомий, і який загалом не важливий у цьому контексті. Це може бути, наприклад, певна колбек-функція.
function fetchUserData(id: string, callback: (data: any) => void): void {
  // Тут може бути якийсь запит, але ми його заповнимо самі
  const responseData = { name: "Tom" };

  callback(responseData);
}

// Використання функції:
fetchUserData("123", (data) => {
  console.log(data.name); // TypeScript не викличе помилку, навіть якщо поле name не існує
});

// unknown забезпечує більше безпеки під час роботи зі змінними. Якщо ми спробуємо присвоїти значення змінної типу unknown іншій змінній з конкретним типом без явного приведення типів, TypeScript видасть помилку.
let notSure: unknown = 4;
notSure = "maybe a string instead";
notSure = false;

let num: number;

// num = notSure;

// нам не вдалося зберегти значення змінної notSure в змінну num.
// Візьмемо для прикладу таку ситуацію: Ви отримуєте дані з API та не знаєте їхнього точного формату. У цьому випадку вам потрібно буде провести уточнення типів.
function fetchUserData1() {
  return "Tom";
}

let userData: unknown = fetchUserData1(); // fetchUserData повертає невідомі дані
if (typeof userData === "string") {
  console.log(userData.toUpperCase()); // OK, тепер ми знаємо, що це рядок
}

// Компілятор TypeScript вимагає від нас виконати перевірку типів перед присвоєнням значення типу unknown змінній з більш суворим типом.
// Як можна перетворити unknown на інший тип без помилки?

// За допомогою оператора as.
// За допомогою функції typeof.
// За допомогою функції instanceof.

// *Enum
// Це конструкція яка дає можливість створити набів іменованиз констант
// аналог type eventType = "lesson" | "dedline";

type size = "small" | "medium" | "large"; //це union type

// function combine(param1: number | string, param2: number | string) {
//   return param1 + param2;
// }
// Union Type можна також використовувати для аргументів функцій.
// Ми отримуємо помилку, тому що TypeScript просто не знає, рядок там чи число.
// Потрібно додати перевірку типів

// function combine(param1: number | string, param2: number | string) {
//   if (typeof param1 === 'number' && typeof param2 === 'number') {
//     return param1 + param2;
//   } else {
//     return param1.toString() + param2.toString();
//   }
// }

// Union Type працює не лише з базовими типами, а й з об'єктами:

type Dog = {
  legs: 4;
  bark: () => void;
};

type Fish = {
  fins: 2;
  swim: () => void;
};

let pet: Dog | Fish;

pet = {
  legs: 4,
  bark: () => {
    console.log("Woof!");
  },
};

// У цьому прикладі змінна pet може бути або об'єктом типу Dog, або об'єктом типу Fish.

// оли ми працюємо зі змінною Union Type, ми можемо використовувати лише ті властивості та методи, які існують у всіх типів цього об'єднання. У прикладі вище ми не можемо викликати pet.bark(), якщо pet є типом Fish. Нам доведеться перевіряти, чи існує цей метод.
// type guard function
function isDog(pet: Dog | Fish): boolean {
  return "bark" in pet;
}

// Перевіряємо, чи є наш вихованець собакою перед тим, як використовувати метод bark
if (isDog(pet)) {
  pet.bark(); // OK, тепер TypeScript знає, що pet - це Dog
} else {
  //   pet.swim(); // TypeScript знає, що якщо pet не Dog, то це має бути Fish // тут помилка
}

// enum
enum Sizes {
  small = "small",
  medim = "medium",
  large = "large",
}
// Яке значення можна призначити елементу enum у TypeScript? тільки рядок і число
// type size = "small" | "medium" | "large";
const button: size = "large";
const button2: Sizes = Sizes.large;

// різниця в записі

enum Role {
  ADMIN,
  USER,
}

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

const enum HttpCodes {
  OK = 200,
  BadRequest = 400,
  Unauthorized = 401,
}

const status = HttpCodes.OK;

// Після компіляції у JavaScript отримаємо наступний код:

// const status = 200;

//*return type and void

// function add(num1: number, num2: number): string {
//   return `${num1}` + `${num2}`;
// }

// console.log(add(1, 1));

// Якщо фкція нічого не повертає
function add(num1: number, num2: number): void {
  console.log(num1, num2);
}

add(1, 1);

// Типізація фкції з аргументом об’єктом
type Person = {
  firstName: string;
  lastName: string;
};

function greet(person: Person): void {
  console.log("Hello, " + person.firstName + " " + person.lastName);
}

greet({ firstName: "Alex", lastName: "Kolesnyk" });

// function greet(person) {
//   return 'Hello, ' + person.firstName + ' ' + person.lastName;
// }

type User1 = {
  name: string;
  age: number;
  hobby: string;
};

// interface User1 {
//   name: string;
//   age: number;
// hobby: string;
// }

function userConstructor(name: string, age: number, hobby: string): User1 {
  return {
    name,
    age,
    hobby,
  };
}

// Що робити з об’єктом, де клюбчом є метод

// type Car = {
//   color: string;
//   price: number;
//   currency: string;
//   start: () => {};
// };
// const Car = {
//   color: "red",
//   price: 1000,
//   currency: "UAH",
//   start() {
//     console.log("Start");
//   },
// };

// Якщо щось приймає
type Car = {
  color: string;
  price: number;
  currency: string;
  start: (color: string) => void;
};
const Car: Car = {
  color: "red",
  price: 1000,
  currency: "UAH",
  start(color) {
    console.log("Start" + color);
  },
};

// * опціональні параметри
// в такому випадку або створити окремі типи для кож об'єкту, хоч різниця в одне поле
// або

type User4 = {
  name: string;
  age: number;
  role?: string;
};
const user3: User4 = {
  name: "Bob",
  age: 12,
};

const admin: User4 = {
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
let person: [string, number] = ["Max", 21];
// let person: (number | string)[] = ["Max", 21]; а так просто можуть бути в довільному порядку

// Кортежі зручні, коли нам потрібно зберегти в масив фіксовані значення, наприклад, день, місяць та рік.

let date: [number, number, number];
date = [7, 11, 2023]; // OK
// Але є нюанс: якщо ми додамо елемент у кортеж через метод push, то TypeScript не заперечуватиме, він не відстежує реальний вміст масиву.

// використання оператора розширення (...) для створення кортежів змінної довжини.

let tuple: [string, ...number[]];

tuple = ["hello", 42, 100, 200]; // OK

// У цьому випадку перший елемент кортежу має бути рядком, проте всі наступні — числами.

// * Intersection type є способом об'єднання декількох типів в один. Це дозволяє створювати складні типи, комбінуючи прості.
type Employee = {
  name: string;
  id: number;
};

type Manager = {
  employees: Employee[];
};

type CEO = Employee & Manager;

const ceo: CEO = {
  name: "Alice",
  id: 1,
  employees: [
    {
      name: "Bob",
      id: 2,
    },
  ],
};
// об'єкт типу CEO повинен містити всі властивості, визначені в Employee та Manager.

// Literal Type — це тип, що набуває конкретного значення. З ним ви можете визначити тип змінної так, щоб він набував лише певних значень.
type OneOrTwo = 1 | 2;
let value: OneOrTwo;
value = 1; // OK
value = 2; // OK
// value = 3; // Error: Type '3' is not assignable to type 'OneOrTwo'.

type YesOrNo = "yes" | "no";
let answer: YesOrNo;
answer = "yes"; // OK
answer = "no"; // OK
// answer = "maybe"; // Error: Type '"maybe"' is not assignable to type 'YesOrNo'.

// return type - тип даних, які функція повретає під час виклику
type User3 = {
  id: number;
  name: string;
};

const getUserNames = (users: User3[]): string[] => {
  return users.map((user) => user.name);
};

const users: User3[] = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
];

let result = getUserNames(users);
console.log(result); // ['Alice', 'Bob', 'Charlie']
//
// У цьому прикладі функція getUserNames приймає масив об'єктів типу User та повертає масив рядків.

// *Тип void у TypeScript використовується для позначення відсутності будь-якого типу взагалі, і зазвичай використовується як тип функцій, що повертається, в якому функції не повертають значення.

function logMessage(message: string): void {
  console.log(message);
}

logMessage("Hello, world!");

function doSomething(callback: () => void) {
  callback();
}

doSomething(() => {
  console.log("Callback function!");
});

// *Never

// Це коли функція ніколи не закінчується та нічого не повертає.
// Функція, яка завжди викидає помилку
function throwError(message: string): never {
  throw new Error(message);
}

// Функція з нескінченним циклом
function infiniteLoop(): never {
  while (true) {}
}
// Наприклад, listen в express, оскільки підключення до сервера є постійне і теж має тип never.

// *Function Type

// Ми можемо описати функцію як тип.
// Визначення типу функції, який приймає два числа та повертає число
type CallbackType = (num1: number, num2: number) => number;
// Ми можемо підвищити гнучкість. Замість того, щоб обмежувати тип CallbackType, який приймає рівно два числові аргументи, можна допустити функції, які можуть приймати будь-яку кількість аргументів.

// type CallbackType = (...nums: number[]) => number;

// Функція, яка приймає два числа та функцію зворотного виклику, застосовує цю функцію до чисел та виводить результат
function calc(param1: number, param2: number, callback: CallbackType): void {
  console.log("Result:", callback(param1, param2));
}

// Приклади використання calc з різними функціями зворотного виклику
calc(1, 1, (num1, num2) => num1 + num2);
calc(10, 5, (num1, num2) => num1 - num2);

// Custom Types - власні структури даних за доп ключового слова type
type User5 = {
  id: number;
  name: string;
};

const user2: User5 = {
  id: 1,
  name: "Alice",
};

type Coordinate = [number, number]; //кортеж з двох чисел

type UserWithCoords = {
  id: number;
  name: string;
  coords: Coordinate; //використали цей тип у визначенні іншого типу, UserWithCoords.
};

const userWithCoords: UserWithCoords = {
  id: 1,
  name: "Alice",
  coords: [10, 20],
};

// більш складний приклад
enum AnimalIds {
  cat = "cat",
  dog = "dog",
  fish = "fish",
}

type Animal = {
  [AnimalIds.cat]: {
    meow: () => string;
  };
  [AnimalIds.dog]: {
    bark: () => string;
  };
  [AnimalIds.fish]: {
    swim: () => undefined;
  };
};

// Створення об'єктів типу Animal
let cat: Animal[AnimalIds.cat] = {
  meow: () => "Meow! I am a cat",
};

let dog: Animal[AnimalIds.dog] = {
  bark: () => "Woof! I am a dog",
};

let fish: Animal[AnimalIds.fish] = {
  swim: () => undefined,
};

// не поширений приклад

// *Різниця між Type та Interface

// interface Animal {
//   name: string;
// }

// type Animal = {
//   name: string;
// };

// Interface підтримує об'єднання через оголошення з тим самим ім'ям. Якщо ви визначите два interface з одним і тим же ім'ям, вони будуть "змерджені" в одне.
// Якщо ми хочемо розширити один інтерфейс іншим, у яких різні імена, нам потрібно використовувати оператор extends:

// interface Dog extends Animal {
//  bark: string;
// }

// У випадку з типом нам довелося б використовувати intersection(&).
// type AnimalName = {
//   name: string;
// };

// type AnimalAge = {
//   age: number;
// };

// type Animal = AnimalName & AnimalAge;

// let dog: Animal = {
//   name: 'Fido',
//   age: 5,
// };

// Ми також можемо міксувати Interface та type, але результат нам доведеться зберегти як тип.
// type Cat = {
//   meow: () => string;
// };

// interface Dog {
//   bark: () => string;
// }

// type DogOrCat = Dog | Cat;
// type DogAndCat = Dog & Cat;

// Інтерфейси переважно призначені для опису класів. Через це вони не можуть зберігати в собі примітивні значення, як це може робити Type, а також масиви та інші структури даних, які не є об'єктами. Ми просто не зможемо їх туди зберегти, оскільки за синтаксисом відразу йдуть фігурні дужки {}.

// interface Animal {
//   name: string;
// }

// interface Dog extends Animal {
//   bark: string;
// }

// class MyDog implements Dog {
//   name = 'Fido';
//   bark = 'Woof!';
// }

// // Error: Property 'name' is missing in type 'OtherDog'
// class OtherDog implements Dog {
//   bark = 'Woof!';
// }

// *Type Guards

// Type Guards у TypeScript – це потужні інструменти, що допомагають нам обробляти конфлікти у змішаних типах, таких як Union Types.

// Для цього ми маємо набір інструментів:

// typeof // була вище перевірка
// in
// instanceof
// User-Defined Type Guards

// in
type Admin = {
  name: string;
  privileges: string[];
};

type Employee1 = {
  name: string;
  startDate: Date;
};

type AdminOrEmployee = Admin | Employee1;

function printDetails(obj: AdminOrEmployee) {
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

  loadCargo(amount: number) {
    console.log(`Loading cargo: ${amount}`);
  }
}

// Define your type

type Vehicle = Car1 | Truck;

// Create your instances

const carInstance = new Car1();
const truckInstance = new Truck();

// Function to use vehicle

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();

  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(carInstance);
useVehicle(truckInstance);
// ----

type Admin3 = {
  name: string;
  privileges: string[];
};

type Employee3 = {
  name: string;
  startDate: Date;
};

type Staff = Admin3 | Employee3;

function isEmployee(staff: Staff): staff is Employee3 {
  console.log(staff as Employee3); //name: 'Bob', startDate: Thu Nov 02 2023 21:58:31 GMT+0200 (за східноєвропейським стандартним часом)
  console.log((staff as Employee3).startDate !== undefined); //true
  return (staff as Employee3).startDate !== undefined;
}

const staffMember: Staff = { name: "Bob", startDate: new Date() };

if (isEmployee(staffMember)) {
  console.log(
    `Welcome on board, ${staffMember.name}! Your start date is ${staffMember.startDate}`
  );
}

// *У цьому прикладі ми використали as, щоб привести staff до типу Employee і тим самим перевірити чи є в ньому startDate.
// Який Type Guard ви використали б для перевірки наявності властивості в об'єкті?

// in

// Type Casting (або Type Conversion) використовується для перетворення об'єкта одного типу на об'єкт іншого типу.
// TypeScript використовує два синтаксичні підходи для типового приведення: кутові дужки <> та оператор as.

let someValue: unknown = "this is a string";

let strLength1: number = (<string>someValue).length;
// or
let strLength2: number = (someValue as string).length;

// let strLength3: number = someValue.length;
// У цьому прикладі ми маємо змінну someValue типу unknown, і ми хочемо обробити її як рядок. Ми знаємо, що це рядок, але TypeScript цього не знає. Тому ми використовуємо Type Casting для уточнення типу someValue. Якщо ми цього не зробимо, то отримаємо помилку, як у змінній strLength3.

// роботи з HTML-елементами
// const input = document.getElementById("inputEmail");

// input.value = "test@test.ts"; //помилка

// рішення:
// const input = <HTMLInputElement>document.getElementById("inputEmail");
// або краще
const input = document.getElementById("inputEmail") as HTMLInputElement;
// input.value = "test@test.ts";

// можемо призначити пізніше
// const input = document.getElementById('inputEmail');

// if (input) {
//   (input as HTMLInputElement).value = 'test@test.ts';
// }

// !Однак, коли використовується JSX (React), тільки оператор as можна використати для приведення типів

// * Index Properties коли деякі поля невідомі

type Person4 = {
  name: string;
  [x: string]: string;
};

const user4: Person4 = {
  name: "Alex",
  gender: "MAN",
  country: "Ukraine",
};
// У цьому визначенні типу, prop: string вказує, що ключі мають бути рядками, а string після двокрапки вказує, що значення мають бути рядками.

// Використання індексних властивостей дозволяє вам створювати словники або карти, де ключі та значення мають певний тип.
type User6 = {
  id: string;
  name: string;
  email: string;
};

type Users = {
  [id: string]: User6;
};

let users6: Users = {};

let user6: User6 = {
  id: "1",
  name: "Alex",
  email: "alex@example.com",
};

users6[user6.id] = user6;

// У цьому прикладі ми визначили тип Users, який містить об'єкти типу User. Потім ми створили об'єкт users, який може містити невідому кількість користувачів, кожен з яких може бути доступний за його id.

enum DayOfWeek {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

function isWeekend(day: DayOfWeek): boolean {
  return day === DayOfWeek.Saturday || day === DayOfWeek.Sunday;
}

// Приклад використання:
const today = DayOfWeek.Sunday;
if (isWeekend(today)) {
  console.log("Сьогодні вихідний.");
} else {
  console.log("Сьогодні робочий день.");
}
