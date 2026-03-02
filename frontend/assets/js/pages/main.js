document.addEventListener('DOMContentLoaded', () => {
  // ensure menu button toggles category nav on small screens
  const menuBtn = document.querySelector('.menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const cat = document.querySelector('.category-nav');
      if (cat) {
        cat.classList.toggle('d-none');
      }
    });
  }

  // header shrink on scroll
  const header = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('shrink');
    else header.classList.remove('shrink');
  });

  // basic click logger for all buttons
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', () => {
      console.log('Buton tıklandı:', btn.textContent.trim());
    });
  });

  // load mock books and enable filtering
  import('../api.js').then(api => {
    let allBooks = [];
    const container = document.querySelector('.books');
    const render = (list) => {
      if (!container) return;
      container.innerHTML = '';
      list.forEach(b => {
        const col = document.createElement('div');
        col.className = 'col-sm-6 col-md-4 col-lg-3';
        col.innerHTML = `
            <div class="card h-100">
              <img src="${b.image}" class="card-img-top" alt="${b.title}">
              <div class="price-tag">${b.price}</div>
              <div class="card-overlay">
                <button class="btn btn-sm">Sepete Ekle</button>
              </div>
              <div class="card-body d-flex flex-column">
                <h5 class="card-title">${b.title}</h5>
                <p class="card-text text-muted">${b.author}</p>
                <a href="book-detail.html" class="btn btn-primary mt-2">Detay</a>
              </div>
            </div>
          `;
        container.appendChild(col);
      });
    };

    api.getMockBooks().then(books => {
      allBooks = books;
      render(allBooks);
    });

    // search handler
    const searchForm = document.querySelector('form input[type="search"]');
    if (searchForm) {
      searchForm.addEventListener('input', e => {
        const q = e.target.value;
        const filtered = api.filterBooks(allBooks, {query: q, category: currentCategory});
        render(filtered);
      });
    }

    // category filter
    let currentCategory = '';
    const catLinks = document.querySelectorAll('.category-nav a');
    catLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        catLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        currentCategory = link.textContent.trim();
        const filtered = api.filterBooks(allBooks, {query: searchForm ? searchForm.value : '', category: currentCategory});
        render(filtered);
      });
    });
  });

  // enhanced button behaviors
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const txt = btn.textContent.trim();
      if (txt === 'Sepete Ekle') {
        alert('Kitap sepete eklendi!');
        const countEl = document.querySelector('.cart-count');
        if (countEl) {
          let n = parseInt(countEl.textContent) || 0;
          countEl.textContent = n + 1;
        }
      }
    });
  });

  // icon link handlers
  const favLink = document.querySelector('.bi-heart-fill')?.closest('a');
  if (favLink) {
    favLink.addEventListener('click', e => {
      e.preventDefault();
      alert('Favorilere eklendi!');
      const icon = favLink.querySelector('.bi-heart-fill');
      if (icon) icon.classList.toggle('text-danger');
    });
  }

  const profLink = document.querySelector('.bi-person-fill')?.closest('a');
  if (profLink) {
    profLink.addEventListener('click', e => {
      e.preventDefault();
      alert('Lütfen giriş yapın.');
      window.location.href = 'login.html';
    });
  }

  const cartLink = document.querySelector('.bi-cart-fill')?.closest('a');
  if (cartLink) {
    cartLink.addEventListener('click', e => {
      e.preventDefault();
      alert('Sepetiniz açılıyor');
      window.location.href = 'cart.html';
    });
  }
});