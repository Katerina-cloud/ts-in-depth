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

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    markDamaged?: (reason: string) => void;
};

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
console.log(bookTitleTransform(getAllBooks()[0].title));
// console.log(bookTitleTransform(10));

const myBook: Book = {
    id: 5,
    title: 'Colors, Backgrounds, and Gradients',
    author: 'Eric A. Meyer',
    available: true,
    category: Category.CSS,
    // year: 2015,
    // copies: 3
    markDamaged: (reason: string) => console.log(`Damaged ${reason}`),
};

printBook(myBook);
myBook.markDamaged('by water');
