showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// ============================================
enum Category { JavaScript, CSS, HTML, TypeScript, Angular, React }
// type Book = {
//     id: number;
//     title: string;
//     author: string;
//     available: boolean;
//     category: Category;
// };

interface DamageLogger {
    (p: string): void;

}

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    // markDamaged?: (reason: string) => void;
    markDamaged?:  DamageLogger;
};

type BookProperties = keyof Book;

interface Person {
    name: string;
    email: string;
}

interface Author extends Person {
    numBooksPublished: number;
}

interface Librerian extends Person {
    department: string;
    assistCustomer: (custName: string) => void;
}

function getAllBooks(): readonly Book[] {
    const books: readonly Book[] = [
        { id: 1, title: 'Refactoring JavaScript', category: Category.JavaScript, author: 'Evan Burchard', available: true },
        { id: 2, title: 'JavaScript Testing', category: Category.JavaScript, author: 'Liang Yuxian Eugene', available: false },
        { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', category: Category.JavaScript, author: 'Andrea Chiarelli', available: true }
    ];

    return books;
}

function logFirstAvailable(books: ReadonlyArray<{ [key: string]: any }> = getAllBooks()): void {
    const numberOfBooks: number = books.length;
    let title: string = '';

    for (const book of books) {
        if (book.available) {
            title = book.title;
            break;
        }
    }

    console.log(`Total Books: ${numberOfBooks}`);
    console.log(`Total available book: ${title}`);
}

function getBookTitleByCategory(category?: Category): string[] {
    const books: readonly any[] = getAllBooks();
    let titles: string[] = [];

    titles = books.filter((book: { [key: string]: any }) => book.category === category)
        .map(book => book.title);

    return titles;
}

function logBookTitles(titles: string[]): void {
    titles.forEach(title => console.log(titles));
}

function getBookAuthorByIndex(index: number): [string, string] {
    const books: readonly Book[] = getAllBooks();
    const { title, author } = books[index];
    return [title, author];
}

// =================
// console.log(getAllBooks());
// logFirstAvailable(getAllBooks());

const titles = getBookTitleByCategory(Category.CSS);
logBookTitles(titles);

function createCustomerID(name: string, id: number): string {
    return `${id} -${name}`;
}

function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer name: ${name}`);

    if (age) {
        console.log(`Customer age: ${age}`)
    }

    if (city) {
        console.log(`Customer city: ${city}`)
    }
}

function getBookByID(id: number): Book | undefined {
    const books = getAllBooks();
    return books.find(book => book.id == id);
}

function checkoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Customer: ${customer}`);

    const titles: string[] = [];

    bookIDs.forEach(id => {
        const book = getBookByID(id);
        if (book?.available) {
            titles.push(book.title);
        }
    });

    return titles;
}

function getTitles(author: string): string[];
function getTitles(available: boolean): string[];
function getTitles(id: number, available: boolean): string[];
function getTitles(...args: [string | boolean | number, boolean?]): string[] {
    const books = getAllBooks();

    if (args.length === 1) {
        const [arg] = args;

        if (typeof arg === 'string') {
            return books.filter(book => book.author === arg).map(book => book.title);
        } else if (typeof arg === 'boolean') {
            return books.filter(book => book.available === arg).map(book => book.title);
        }
    } else if (args.length === 2) {
        const [id, available] = args;

        if (typeof id === 'number' && typeof available === 'boolean') {
            return books.filter(book => book.id === id && book.available === available).map(book => book.title);
        }
    }

    return [];
}

function assertStringValue(value: any): asserts value is string {
    if (typeof value !== 'string') {
        throw new Error('value should be a string');
    }
}

function bookTitleTransform(title: any): string {
    assertStringValue(title);

    return [...title].reverse().join('');
}

function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`)
}

function getBookProp(book: Book, prop: BookProperties): any {
    if (typeof book[prop] === 'function') {
        return book[prop][name];
    }
    return book[prop];
}

abstract class ReferenceItem {
    #id: number;

    private __publisher: string;

    get publisher(): string {
        return this.__publisher.toUpperCase();
    }

    set publisher(newPublisher: string) {
        this.__publisher = newPublisher;
    }
    getID(): number {
        return this.#id;
    }

    // title: string;
    // year: number;
    // constructor(newTitle: string, newYear: number) {
    //     console.log('Creating a new ReferenceItem');
    //     this.title = newTitle;
    //     this.year = newYear;
    // }
    constructor(id: number, public title: string, protected year: number){
        console.log('Creating a new ReferenceItem');
        this.#id = id;
    }

    printItem(): void {
        console.log(`${this.title} was published in ${this.year}`);
    }

    abstract printCitation(): void;
}

class Encyclopedia extends ReferenceItem {
    constructor(id: number, title: string, year: number, public edition: number) {
        super(id, title, year);
    }

    printItem(): void {
        super.printItem();
        console.log(`Edition: ${this.edition} (${this.year})`);
    }

    printCitation(): void {
        console.log(`${this.title} - ${this.year}`);
    }
}
//==========================================
// task 03.01
// const myID: string = createCustomerID('Ann', 10);
// console.log(myID);

// let idGenerator: (name: string, id: number) => string =
//     (name: string, id: number) => `${id}-${name}`;
// idGenerator = createCustomerID;
// console.log(idGenerator('Boris', 20));

// task 03.02
// createCustomer('Anna');
// createCustomer('Fedea', 30);
// createCustomer('Boris', 30, 'Unknown');

// console.log(getBookTitleByCategory());
// logFirstAvailable();

// console.log(getBookByID(1));

// const myBooks: string[] = checkoutBooks('Ann', 1, 2, 4);
// console.log(myBooks);

// task 03.03
// console.log(getTitles(1, false));

// task 03/04
// console.log(bookTitleTransform(getAllBooks()[0].title));
// console.log(bookTitleTransform(10));

// const myBook: Book = {
//     id: 5,
//     title: 'Colors, Backgrounds, and Gradients',
//     author: 'Eric A. Meyer',
//     available: true,
//     category: Category.CSS,
//     // year: 2015,
//     // copies: 3
//     markDamaged: (reason: string) => console.log(`Damaged ${reason}`),
// };

// printBook(myBook);
// myBook.markDamaged('by water');

// task 04/02
// const logDamage: DamageLogger =
//     (p: string) => console.log(`Damaged: ${reason}`);
//     logDamage('missed back cover');

//task 04/03

// const favouriteAuthor: Author ={
//     email: 'anna@jjj',
//     name: 'Anna',
//     numBooksPublished: 10,
// }

// const favouriteLibrarian: Librerian = {
//     name: 'Boris',
//     email: 'boris@fff',
//     department: 'Classical literature',
//     assistCustomer(name: string) {
//         console.log(`Assist ${name}`);
//     }
// }

//task 04/04
// const offer: any = {
//     magazine: [1, 2],
// };
// console.log(offer.magazine);
// console.log(offer.magazine?.getTitle?.());
// console.log(offer.magazine[0].getTitle?.());

// const offer: any = {
//     magazine: [],
// };
// console.log(offer.magazine?.[0]?.());

// task 04/05

// console.log(getBookProp(getAllBooks()[0], 'title'));
// console.log(getBookProp(getAllBooks()[0], 'markDamaged'));
// console.log(getBookProp(getAllBooks()[0], 'isbn'));

// task 05/01
// const ref: ReferenceItem = new ReferenceItem(1, 'JS', 2020);
// console.log(ref);
// ref.printItem();
// ref.publisher = 'Random Publisher';
// console.log(ref.publisher);
// console.log(ref.getID());

// task 05/02
const refBook: Encyclopedia = new Encyclopedia(1, 'TS', 2020, 3);
// console.log(refBook);
// refBook.printItem();

// task 05/03
refBook.printCitation();
