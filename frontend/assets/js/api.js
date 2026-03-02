// mock API utilities

export function getMockBooks() {
  // generate an array of fake book objects with categories
  const categories = ['Edebiyat', 'Kırtasiye', 'Okula Yardımcı', 'Sınav', 'Çocuk', 'Tavsiye'];
  const books = [];
  for (let i = 1; i <= 24; i++) {
    books.push({
      id: i,
      title: `Kitap Başlığı ${i}`,
      author: `Yazar ${i}`,
      category: categories[i % categories.length],
      price: (Math.random() * 100).toFixed(2) + ' TL',
      image: 'assets/images/book-placeholder.png'
    });
  }
  return Promise.resolve(books);
}

export function filterBooks(books, {query = '', category = ''} = {}) {
  return books.filter(b => {
    const matchQuery = query === '' || b.title.toLowerCase().includes(query.toLowerCase());
    const matchCat = category === '' || b.category === category;
    return matchQuery && matchCat;
  });
}
