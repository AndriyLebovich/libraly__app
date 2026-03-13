document.addEventListener('DOMContentLoaded', loadBooks);

document.getElementById('book-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const formData = new FormData(this);

  await fetch('add_book.php', {
    method: 'POST',
    body: formData
  });

  this.reset();
  loadBooks();
});

document.getElementById('search').addEventListener('input', function () {
  const query = this.value.toLowerCase();
  const books = document.querySelectorAll('#book-list li');
  books.forEach(book => {
    book.style.display = book.textContent.toLowerCase().includes(query) ? '' : 'none';
  });
});

async function loadBooks() {
  const res = await fetch('get_books.php');
  const books = await res.json();
  const list = document.getElementById('book-list');
  list.innerHTML = '';

  books.forEach(book => {
    const li = document.createElement('li');
    li.textContent = `${book.title} — ${book.author} (${book.year})`;
    list.appendChild(li);
  });
}
