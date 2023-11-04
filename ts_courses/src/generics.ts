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

// const merged = merge({ name: "Alisa" }, "TEXT"); //тут помилка у текст тепер

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

// Utility Types

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

// *Pick<T, K>
// Працює з типами. Обирає з існуючих типів поля і створ новий
// часто використовується для складання типів, наприклад, під час роботи з API, звідки може прийти безліч полів. Зазвичай для всіх цих полів вже існує якийсь базовий тип, чи то користувач, сторінка, чи документ, і з допомогою 'Pick' ми вибираємо потрібні для конкретного випадку поля.

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

// --
// Що робить наступний тип?
type ErrorType = Partial<Record<keyof InitialFormType, string[]>>;

// Створює тип, у якому всі властивості InitialFormType стають необов'язковими та їхніми значеннями є масиви рядків.

// --
type BaseEmployee = {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  startDate: Date;
  // ...і багато інших полів
};

type BaseProject = {
  id: number;
  name: string;
  budget: number;
  deadline: Date;
  // ...і багато інших полів
};

type Assignment = {
  employee: Pick<BaseEmployee, "id" | "firstName" | "lastName">;
  projects: Pick<BaseProject, "id" | "name" | "deadline">[];
  shouldNotifyEmployee?: boolean;
};

//*  Omit<T, K>
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

// *Record<K, T>

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

type Weekdays = "Mon" | "Tue" | "Wed" | "Thu" | "Fri";
type Weekend = "Sat" | "Sun";

type Day = Weekdays | Weekend;

type DayTranslations = Record<Day, string>;

const translations: DayTranslations = {
  Mon: "Понеділок",
  Tue: "Вівторок",
  Wed: "Середа",
  Thu: "Четверг",
  Fri: "П'ятниця",
  Sat: "Субота",
  Sun: "Неділя",
};
// DayTranslations — це тип об'єкта, ключами якого є значення типу Day, а значеннями – рядки. Отже, ви отримуєте суворо типізований об'єкт перекладу, який гарантує, що кожен день тижня буде перекладено.

// enum можна замість рекорд
enum UserRoles {
  admin = "admin",
  manager = "manager",
  employee = "manager",
}

type UserRolesStatuses = Record<UserRoles, boolean>;

const userRoleStatuses: UserRolesStatuses = {
  [UserRoles.admin]: true,
  [UserRoles.manager]: false,
  // [UserRoles.employee]: true,
};

// Тут UserRoles — це перерахування, що визначає можливі ролі користувача. UserRolesStatuses — це тип, що представляє запис, де кожна роль користувача зіставлена з булевим значенням, що вказує на активацію цієї ролі.

// Припустимо, ми маємо форму з типом 'InitialFormType', і ми хочемо розширити цей тип помилками, які можуть виникнути.
type InitialFormType = {
  name: string;
  email: string;
  password: string;
};

export type Form = InitialFormType & {
  errors: Partial<Record<keyof InitialFormType, [string]>>;
};
// Ми визначаємо тип Form, який є об'єднанням InitialFormType та об'єкта, що містить поле errors.

// Keyof InitialFormType отримує всі ключі з InitialFormType (в цьому випадку, це name, email та password), і Record створює новий тип, в якому кожен із цих ключів відображається на масив рядків. Потім Partial робить кожну властивість цього нового типу необов'язковою.

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

// generic classes
// У цьому прикладі клас "DataStorage" має узагальнений тип "T", який визначається під час створення екземпляра класу. В результаті ми отримуємо універсальний клас для зберігання даних, що може працювати з рядками, числами або будь-якими іншими типами, які ми визначимо.

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem("Hello");
textStorage.addItem("World");
console.log(textStorage.getItems()); // ['Hello', 'World']
// textStorage.addItem(1); // Error: Argument of type 'number' is not assignable to parameter of type 'string'

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
console.log(numberStorage.getItems()); // [1, 2]
// numberStorage.addItem("TEXT"); // Error: Argument of type 'number' is not assignable to parameter of type 'number'

// Це також корисно для створення класів, що працюють зі спеціалізованими типами. Наприклад, ми можемо визначити клас "KeyValuePair", який приймає два узагальнені типи: один для ключа та один для значення.
class KeyValuePair<TKey, TValue> {
  constructor(private key: TKey, private value: TValue) {}

  getKey(): TKey {
    return this.key;
  }

  getValue(): TValue {
    return this.value;
  }
}

const pair1 = new KeyValuePair("name", "Alice");
console.log(pair1.getKey()); // 'name'
console.log(pair1.getValue()); // 'Alice'

const pair2 = new KeyValuePair(1, true);
console.log(pair2.getKey()); // 1
console.log(pair2.getValue()); // true

// Таким чином, ми можемо використовувати один і той же клас, який буде працювати з різними типами.

// * Parameters<T>

// Витягує типи параметрів типу функції T. Вона повертає кортеж, що містить типи всіх параметрів функції T у тому порядку, в якому вони оголошені.

type MyFunctionType = (a: string, b: number, c: boolean) => void;

type MyParametersType = Parameters<MyFunctionType>;
// Результат: [string, number, boolean]
// дозволяє нам отримати доступ до типів параметрів функції у TypeScript, як ми це зробили в прикладі з ReturnType.

/*
  У вас є тип AllType. Існує функція compare, яка приймає два об'єкти. Ці об'єкти містять поля AllType. 
  Ваше завдання – використовувати Pick та generics для вказівки, що поля цих об'єктів належать AllType.
  Функція compare повинна повертати AllType.
*/

type AllType = {
  name: string;
  position: number;
  color: string;
  weight: number;
};

function compare<T extends AllType, U extends AllType>(
  top: Pick<T, keyof AllType>,
  bottom: Pick<U, keyof AllType>
): AllType {
  return {
    name: top.name,
    position: bottom.position,
    color: top.color,
    weight: bottom.weight,
  };
}

// function compare (top, bottom): AllType {
//   return {
//     name: top.name,
//     color: top.color,
//     position: bottom.position,
//     weight: bottom.weight,
//   }
// }
const topObj = {
  name: "Top Name",
  position: 1,
  color: "Red",
  weight: 100,
};

const bottomObj = {
  name: "Bottom Name",
  position: 2,
  color: "Blue",
  weight: 200,
};

const result = compare(topObj, bottomObj);
console.log(result);

interface ComponentProps {
  title: string;
}

class Component<T> {
  constructor(public props: T) {}
}

class Page extends Component<ComponentProps> {
  pageInfo() {
    console.log(this.props.title);
  }
}
const pageProps: ComponentProps = { title: "Sample Page" };
const page = new Page(pageProps);
page.pageInfo();






