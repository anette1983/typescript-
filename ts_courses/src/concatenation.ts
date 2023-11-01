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
// Enum
// Це конструкція яка дає можливість створити набів іменованиз констант
// аналог type eventType = "lesson" | "dedline";

type size = "small" | "medium" | "large"; //це union type
enum Sizes {
  small = "small",
  medim = "medium",
  large = "large",
}

const button: size = "large";
const button2: Sizes = Sizes.large;

// різниця в записі

//*return type and void

// function add(num1: number, num2: number): string {
//   return `${num1}` + `${num2}`;
// }

// console.log(add(1, 1));

// Якщо фкція нічого не повертає
function add(num1: number, num2: number): void {
  console.log(num1, num2);
}

console.log(add(1, 1));

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

//  опціональні параметри
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
