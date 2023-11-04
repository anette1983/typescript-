// типізаця фкцій або класів не прив'язуючись доаргументів. які можуть залетіти
function identity<T>(arg: T): T {
  return arg;
}
// фкція приймає аргумент і повертає його
// Т - це змінна для того, що ми передамо

let output1 = identity<string>("myString");
let output2 = identity<number>(100); //передаємо різні аргументи фкції при виклику
//* в дженерик запишеться той тимп, який передамо в фкцію!
// тип стрінг запищеться у Т, і поверне той самий тип
// каваички - створення дженерику

// під час першого виклику фкцію відбувається таке:
// function identity<string>(arg: string): string {
//   return arg;
// }
// тому що створили дженерик стрінг при виклику
// як контекст визначається в момент виклику

//  Створіть загальну функцію reverse, яка приймає масив будь-якого типу і повертає масив у зворотньому порядку.

function reverse<T>(arr: T[]): T[] {
  return arr.reverse();
}

let numbers = reverse<number>([1, 2, 3, 4, 5]);
console.log(numbers); // [5, 4, 3, 2, 1]

let strings = reverse<string>(["a", "b", "c", "d"]);
console.log(strings); // ["d", "c", "b", "a"]
// при сортуванні можна використовувати, коли бек повертає сортований масив за алфавітом

// створення змінних звич і у дженерику
// let i const - звертаємся по назві змінної
// <> - звертаємося по назві дженерика

// * extends та key of

function lengthOfObject<T extends { duration: number }>(obj: T): number {
  return obj.duration;
}

lengthOfObject({ name: "Earth", duration: 10 }); // 10

// цей запис означає, що при запуску фкції прилетить якийсь тип
// T extends { duration: number }, але він має обов'язково мати поле дюрейшн, яку бути числом
// налаштовуємо поведінку цього дженерика

// далі бачимо, що у нас фкція приймає параметр обджект, типу об'єкт (obj: T)
// екстендом валідуємо поведінку дженерика, якщо прийде об'єкт без уього поля, то фкція зламається

// тут інша ситуаціяЖ
type Length = {
  length: number;
};

function getLength<T extends Length>(str: T) {
  return str.length;
}

getLength("text");
getLength([1, 2, 3]);
// getLength(100); // Errro: Argument of type 'number' is not assignable to parameter of type 'ILength'
// Ваша функція getLength використовує параметр типу T, який обмежений типом, що має властивість length типу number. Параметр T дозволяє TypeScript визначити тип переданого аргументу під час виклику функції.

// Коли ви викликаєте getLength('text'), TypeScript розуміє, що переданий рядок 'text' відповідає умові, оскільки рядок має властивість length з числовим значенням. Таким чином, T призначається тип рядка, тобто { length: number }, і функція повертає довжину рядка 'text', яка дорівнює 4.
// Так, саме так відбувається автоматичне перетворення типів в TypeScript. Коли ви викликаєте getLength([1, 2, 3]), TypeScript автоматично перетворює переданий масив [1, 2, 3] в об'єкт, який має властивість length зі значенням довжини масиву. Тобто, T у цьому випадку буде мати тип { length: number }, і TypeScript не скасовує виклик функції як помилковий.

// Створіть загальну функцію getProperty, яка приймає об'єкт та ключ як рядок.
// Функція повинна повертати значення цього ключа з об'єкта.

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

// const merged = merge({ name: "Alisa" }, "TEXT"); тут помилка у текст тепер

// merged.name;

const student = {
  name: "John",
  age: 25,
  groupNumber: 12,
};

type Value = number | string;
type Obj = {
  [key: string]: Value;
};

// const getKey = (obj: Obj, key: string): Value => {
//   return obj[key];
// };

// const getKey = (obj: object, key: string): Value => {
//   return obj[key];
// };
// можна параметр просто так типізувати obj: object, але об'єкти можуть бути різні, треба динаміка - дженерик
// Якщо у нас два аргументи – можна створити два дженерика
// треба валідувати, що ключ відноситься до того  об'єкту, який передаємо
// extends
// пишемо ПІСЛЯ того типу. який хочемо провалідувати

const getKey = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};

let studentName = getKey(student, "name");
console.log(studentName); // "John"
// тут у нас не визначений чітко ти ретерну, бо можуть бути різні типи. Якщо визначений чітко - то треба прописати

// * patrial <T>
// Дозволяє працювати лише з частиною ключів об’єкту
type Todo = {
  title: string;
  description: string;
  completed: boolean;
};

// треба оновити шматок тудушки
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
  return { ...todo, ...fieldsToUpdate };
}

const todo1: Todo = {
  title: "Learn TypeScript",
  description: "Study the basics of TypeScript",
  completed: false,
};

const todo2 = updateTodo(todo1, {
  description: "Study generics in TypeScript",
});

console.log(todo2);

// фкції на бекенді використ, метод патч

// Властивість
// ReadOnly

type User = {
  name: string;
  age: number;
};

// просто типізація
// const john: User = {
//   name: "John",
//   age: 30,
// };

const john: Readonly<User> = {
  name: "John",
  age: 30,
};

// john.age = 31; // Помилка: Неможливо змінити 'age', тому що воно є лише для читання.
// яерез метод об'єкту спрацює хміна поля

// const numbers: ReadonlyArray<number> = [1, 2, 3, 4, 5];

// numbers.push(6); // Помилка: Property 'push' does not exist on type 'readonly number[]'.
// numbers[0] = 0; // Помилка: Index signature in type 'readonly number[]' only permits reading.

// Pick<T, K>
// Працює з типами. Обирає з існуючих типів поля і створ новий

type Person = {
  name: string;
  age: number;
  address: string;
};

type PersonSummary = Pick<Person, "name" | "age">;

// під капотом:
// type PersonSummary = {
//   name: string;
//   age: number;
// };

const johnSummary: PersonSummary = {
  name: "John",
  age: 30,
};

// Це не спрацює, тому що 'address' не є частиною типу 'PersonSummary'
const invalidPerson: PersonSummary = {
  name: "Anna",
  age: 25,
  //address: "123 Main St"  // Помилка тут
};

//  Omit<T, K>
// прибирає непотрібне
// type Person = {
//   name: string;
//   age: number;
//   address: string;
// };

type PersonWithoutAddress = Omit<Person, "address">;

const john1: PersonWithoutAddress = {
  name: "John",
  age: 30,
  // address: "123 Main St" // Ця властивість тут не допустима
};

// Record<K, T>

type CityDatabase = Record<string, number>;

const database: CityDatabase = {
  Kyiv: 2884000,
  Kharkiv: 1441000,
  Odesa: 1015000,
};

// Додаємо новий запис в базу даних, де ключ (ім'я міста) має тип string, а значення (населення) має тип number
database.Lviv = 721301;

// Для колекції даних, де значення і ключі ніколи не зміняться - їх типи
// локалізація, бібліотеки (дні тижня)
//* АНАЛОГ ЕНАМА, але на відміну від енаму можемо додавати динамічні значення!

function getPromise(): Promise<(string | number)[]> {
  return new Promise<(string | number)[]>((resolve) => {
    resolve(["Text", 50]);
  });
}

getPromise().then((data) => {
  console.log(data);
});

// типізація промісу
// Promise - зарезервоване слово
// ця функція буде повертати проміс
// бачимо типізацію і параметрах, і в ретерні
// створюємо екземпляр промісу, далі типізуємо резтат ретерну, тя це стрілочна фкція, тому тутЖ
// new Promise<(string | number)[]> - поверне масив рядків бо чисел
// далі фкція резолв промісу робить ретерн і поверне текст і 50
// і є ще ретерн, якйи повертає сам проміс
// тобто маємо подвійну типізацію - класу, коли запускається екземпляр і ретерну

// !порішати задачі (є відповіді) в репо до уроку 2!!!
