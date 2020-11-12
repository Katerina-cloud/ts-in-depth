showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// ============================================
enum Category { JavaScript, CSS, HTML, TypeScript, Angular, React }
type Book = {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
};

function getAllBooks(): readonly object[] {
    const books: readonly object[] =[
        { id: 1, title: 'Refactoring JavaScript', category: Category.JavaScript, author: 'Evan Burchard', available: true},
        { id: 2, title: 'JavaScript Testing', category: Category.JavaScript, author: 'Liang Yuxian Eugene', available: false },
        { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
        { id: 4, title: 'Mastering JavaScript Object-Oriented Programming', category: Category.JavaScript, author: 'Andrea Chiarelli', available: true }
    ];

    return books;
}

function logFirstAvailable(books: ReadonlyArray<{[key: string]: any}>): void {
    const numberOfBooks: number = books.length;
    let title: string= '';

    for (const book of books) {
        if (book.available) {
            title = books.title;
            break;
        }
    }

    console.log(`Total Books: ${numberOfBooks}`);
    console.log(`Total available book: ${title}`);
}

function getBookTitleByCategory(category: Category): string[] {
    const books: readonly any[] = getAllBooks();
    let titles: string[] = [];

    titles = books.filter((book: {[key: string]: any}) => book.category === category)
        .map(book => book.title);

    return titles;
}

function logBookTitles(titles: string[]): void {
    titles.forEach(title => console.log(titles));
}

function getBookAuthorByIndex(index: number): [string, string] {
    const books: readonly Book[] = getAllBooks();
    const {title, author} = books[index];
    return [title, author];
}

// =================
console.log(getAllBooks());
logFirstAvailable(getAllBooks());

const titles = getBookTitleByCategory(Category.CSS);
logBookTitles(titles);