const games = [
    {
        id: 1,
        title: 'Cyber Warriors',
        category: 'action',
        price: 59.99,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=200&fit=crop',
        description: 'Enter a dystopian future where elite soldiers battle for control of the last remaining megacities. Features stunning 4K graphics.',
        rating: 5,
        downloads: '1.2M',
        reviews: 1248,
        comments: ['Amazing combat system.', 'Best action game this year.']
    },
    {
        id: 2,
        title: 'Dragon Quest',
        category: 'rpg',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=200&fit=crop',
        description: 'Embark on an epic journey through magical lands. Level up your hero and defeat the ancient dragon lords.',
        rating: 4,
        downloads: '980K',
        reviews: 832,
        comments: ['The story is fantastic.', 'My favorite RPG on this list.']
    },
    {
        id: 3,
        title: 'Soccer Stars',
        category: 'sports',
        price: 39.99,
        image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=200&fit=crop',
        description: 'The ultimate football simulation with realistic physics and online multiplayer. Compete in global tournaments.',
        rating: 4,
        downloads: '720K',
        reviews: 540,
        comments: ['Great multiplayer mode.', 'Feels like a real match.']
    },
    {
        id: 4,
        title: 'Mind Maze',
        category: 'puzzle',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=400&h=200&fit=crop',
        description: 'Challenge your brain with 200+ beautifully designed puzzles. Relaxing music and progressive difficulty.',
        rating: 5,
        downloads: '420K',
        reviews: 643,
        comments: ['Perfect for a quiet evening.', 'Very clever puzzle designs.']
    },
    {
        id: 5,
        title: 'Speed Thunder',
        category: 'racing',
        price: 44.99,
        image: 'https://images.unsplash.com/photo-1511994298241-608e28f14fde?w=400&h=200&fit=crop',
        description: 'High-octane street racing with customizable cars and open-world exploration. Feel the adrenaline rush.',
        rating: 4,
        downloads: '860K',
        reviews: 718,
        comments: ['Fantastic visuals and speed.', 'Car customization is top notch.']
    },
    {
        id: 6,
        title: 'Shadow Strike',
        category: 'action',
        price: 54.99,
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b2cf7?w=400&h=200&fit=crop',
        description: 'Stealth action at its finest. Infiltrate enemy bases and complete covert missions without being detected.',
        rating: 4,
        downloads: '650K',
        reviews: 512,
        comments: ['Stealth mechanics feel smooth.', 'Great level design.']
    },
    {
        id: 7,
        title: 'Kingdom Builders',
        category: 'rpg',
        price: 34.99,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=200&fit=crop',
        description: 'Build and manage your medieval kingdom. Trade, battle, and expand your empire across vast territories.',
        rating: 4,
        downloads: '530K',
        reviews: 392,
        comments: ['Construction is addicting.', 'Great empire progression.']
    },
    {
        id: 8,
        title: 'Puzzle Islands',
        category: 'puzzle',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=400&h=200&fit=crop',
        description: 'A relaxing puzzle adventure on tropical islands. Match colors and unlock new paradise locations.',
        rating: 5,
        downloads: '310K',
        reviews: 278,
        comments: ['Very soothing and fun.', 'Love the island theme.']
    }
];

let cart = [];
let activeFilter = 'all';
let activeDescription = null;

function renderStars(rating) {
    return Array.from({ length: 5 }, (_, index) => {
        return index < rating
            ? '<i class="fa-solid fa-star"></i>'
            : '<i class="fa-regular fa-star"></i>';
    }).join('');
}

function renderTrending() {
    const list = document.getElementById('trendingList');
    const trending = games
        .slice()
        .sort((a, b) => b.rating - a.rating || a.title.localeCompare(b.title))
        .slice(0, 4);

    list.innerHTML = trending.map(game => `
        <div class="trending-card" data-id="${game.id}">
            <img src="${game.image}" alt="${game.title}" loading="lazy">
            <div class="trending-card-body">
                <h3>${game.title}</h3>
                <span>${game.category} · ${game.downloads} downloads</span>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.trending-card').forEach(card => {
        card.addEventListener('click', () => {
            openGamePage(parseInt(card.dataset.id));
        });
    });
}

function renderGames(filter = 'all', search = '') {
    const grid = document.getElementById('gamesGrid');
    grid.innerHTML = '';

    const filtered = games.filter(game => {
        const matchCat = filter === 'all' || game.category === filter;
        const matchSearch = game.title.toLowerCase().includes(search.toLowerCase());
        return matchCat && matchSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align:center; color:#64748B; padding:3rem;">No games found.</p>';
        return;
    }

    filtered.forEach(game => {
        const card = document.createElement('div');
        card.className = 'game-card';
        card.dataset.id = game.id;
        card.innerHTML = `
            <img src="${game.image}" alt="${game.title}" class="game-image" loading="lazy">
            <div class="game-info">
                <div class="game-category">${game.category}</div>
                <div class="game-title">${game.title}</div>
                <div class="game-rating">${renderStars(game.rating)}<span>${game.rating}.0</span></div>
                <div class="game-price">$${game.price.toFixed(2)}</div>
                <div class="game-actions">
                    <button class="btn-download" data-id="${game.id}">Download</button>
                    <button class="btn-details" data-id="${game.id}">Details</button>
                </div>
            </div>
            <div class="game-description" id="desc-${game.id}">${game.description}</div>
        `;

        card.addEventListener('click', event => {
            if (!event.target.closest('button')) {
                openGamePage(game.id);
            }
        });

        grid.appendChild(card);
    });

    attachCardEvents();
}

function attachCardEvents() {
    document.querySelectorAll('.btn-download').forEach(btn => {
        btn.addEventListener('click', event => {
            event.stopPropagation();
            const id = parseInt(btn.dataset.id);
            addToCart(id);
        });
    });

    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', event => {
            event.stopPropagation();
            const id = parseInt(btn.dataset.id);
            openGamePage(id);
        });
    });
}

function openGamePage(id) {
    const game = games.find(g => g.id === id);
    document.getElementById('modalImage').src = game.image;
    document.getElementById('modalImage').alt = game.title;
    document.getElementById('modalTitle').textContent = game.title;
    document.getElementById('modalCategory').textContent = game.category;
    document.getElementById('modalPrice').textContent = `$${game.price.toFixed(2)}`;
    document.getElementById('modalRating').innerHTML = `${renderStars(game.rating)} <span>${game.rating}.0 / 5</span>`;
    document.getElementById('modalDescription').textContent = game.description;
    document.getElementById('modalDownloads').textContent = game.downloads;
    document.getElementById('modalReviews').textContent = game.reviews;
    const comments = game.comments && game.comments.length
        ? game.comments.map(comment => `
            <div class="comment-item">
                <p>${comment}</p>
                <span>User review</span>
            </div>
        `).join('')
        : '<div class="comment-empty">No comments yet.</div>';
    document.getElementById('modalComments').innerHTML = comments;

    const modalDownloadBtn = document.getElementById('modalDownloadBtn');
    modalDownloadBtn.onclick = event => {
        event.stopPropagation();
        addToCart(id);
    };

    document.getElementById('gameModal').classList.add('open');
}

function closeModal() {
    document.getElementById('gameModal').classList.remove('open');
}

function addToCart(gameId) {
    const game = games.find(g => g.id === gameId);
    const existing = cart.find(item => item.id === gameId);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...game, qty: 1 });
    }
    updateCart();
    animateCartIcon();
}

function removeFromCart(gameId) {
    cart = cart.filter(item => item.id !== gameId);
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    cartCount.textContent = totalItems;
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">No games in cart yet.</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.title}</h4>
                    <span>$${item.price.toFixed(2)} x ${item.qty}</span>
                </div>
                <button class="cart-item-remove" data-id="${item.id}">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `).join('');
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                removeFromCart(id);
            });
        });
    }
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

function animateCartIcon() {
    const icon = document.querySelector('.cart-icon');
    icon.style.transform = 'scale(1.3)';
    setTimeout(() => { icon.style.transform = 'scale(1)'; }, 200);
}

function initEvents() {
    document.getElementById('filterList').addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-btn')) {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            activeFilter = e.target.dataset.category;
            const search = document.getElementById('searchInput').value;
            renderGames(activeFilter, search);
        }
    });

    document.getElementById('searchInput').addEventListener('input', (e) => {
        renderGames(activeFilter, e.target.value);
    });

    document.getElementById('checkoutBtn').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert('Thank you for your purchase! (Demo only)');
        cart = [];
        updateCart();
    });

    document.getElementById('cartIcon').addEventListener('click', () => {
        document.getElementById('cartPanel').classList.toggle('open');
    });

    document.getElementById('cartClose').addEventListener('click', () => {
        document.getElementById('cartPanel').classList.remove('open');
    });

    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('gameModal').addEventListener('click', (event) => {
        if (event.target.id === 'gameModal') {
            closeModal();
        }
    });
}

function renderAll() {
    renderTrending();
    renderGames();
    updateCart();
}

initEvents();
renderAll();
