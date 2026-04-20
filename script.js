// Дані про послуги (15 послуг)
const services = [
  { id:1, cat:'Стрижка', name:'Класична стрижка', price:350 },
  { id:2, cat:'Стрижка', name:'Fade стрижка', price:450 },
  { id:3, cat:'Стрижка', name:'Стрижка машинкою', price:280 },
  { id:4, cat:'Стрижка', name:'Дитяча стрижка', price:220 },
  { id:5, cat:'Стрижка', name:'Чоловіча модельна', price:550 },
  { id:6, cat:'Борода', name:'Оформлення бороди', price:250 },
  { id:7, cat:'Борода', name:'Гоління бритвою', price:380 },
  { id:8, cat:'Борода', name:'Trimming бороди', price:180 },
  { id:9, cat:'Догляд', name:'Мийка + укладка', price:200 },
  { id:10, cat:'Догляд', name:'Маска для волосся', price:220 },
  { id:11, cat:'Догляд', name:'Тонування бороди', price:350 },
  { id:12, cat:'Догляд', name:'Скраб для голови', price:280 },
  { id:13, cat:'Комбо', name:'Стрижка + Борода', price:550 },
  { id:14, cat:'Комбо', name:'Стрижка + Укладка', price:480 },
  { id:15, cat:'Комбо', name:'VIP-пакет', price:950 },
];

const reviews = [
    { name:'Олексій', init:'ОП', rating:5, text:'Найкращий барбершоп!', date:'12.04.2025' },
    { name:'Михайло', init:'МК', rating:5, text:'Професіонали своєї справи.', date:'10.04.2025' },
    { name:'Сергій', init:'СБ', rating:5, text:'Дуже задоволений результатом.', date:'05.04.2025' }
];

let cart = {};

// Перемикання сторінок
function showPage(pageId, linkEl) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    if (linkEl) linkEl.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Лічильники
function animateCounter(id, target) {
    const el = document.getElementById(id);
    let start = 0;
    const step = () => {
        start += Math.ceil(target / 50);
        if (start >= target) { el.textContent = target; return; }
        el.textContent = start;
        requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

// Калькулятор та кошик
function toggleService(id) {
    const btn = document.getElementById('btn-' + id);
    if (cart[id]) {
        delete cart[id];
        btn.textContent = '+';
        btn.classList.remove('selected');
    } else {
        cart[id] = services.find(s => s.id === id);
        btn.textContent = '✓';
        btn.classList.add('selected');
    }
    updateCart();
}

function updateCart() {
    const ids = Object.keys(cart);
    let total = ids.reduce((sum, id) => sum + cart[id].price, 0);
    document.getElementById('cartCount').textContent = ids.length;
    document.getElementById('cartTotalDisplay').textContent = '₴' + total;
    document.getElementById('calcTotal').textContent = '₴' + total;
    document.getElementById('cartStrip').classList.toggle('visible', ids.length > 0);
}

function clearCart() {
    cart = {};
    document.querySelectorAll('.service-add').forEach(b => { b.textContent = '+'; b.classList.remove('selected'); });
    updateCart();
}

// Рендеринг списку послуг
function renderServices() {
    const list = document.getElementById('servicesList');
    if(!list) return;
    list.innerHTML = services.map(s => `
        <div class="service-row" data-cat="${s.cat}">
            <span>#${s.id}</span>
            <div class="service-name">${s.name}</div>
            <div style="color:var(--gray)">${s.cat}</div>
            <div style="font-weight:bold">₴${s.price}</div>
            <button class="service-add" id="btn-${s.id}" onclick="toggleService(${s.id})">+</button>
        </div>
    `).join('');
}

// Рендеринг відгуків
function renderReviews() {
    const container = document.getElementById('homeReviews');
    if(!container) return;
    container.innerHTML = reviews.map(r => `
        <div class="review-card">
            <div>${'★'.repeat(r.rating)}</div>
            <p>${r.text}</p>
            <small>${r.name}, ${r.date}</small>
        </div>
    `).join('');
}

// Форма
function submitForm() {
    const name = document.getElementById('nameInput').value;
    if(!name) { showToast('Введіть ім\'я'); return; }
    document.getElementById('bookingForm').style.display = 'none';
    document.getElementById('formSuccess').classList.add('visible');
    showToast('Заявку надіслано!');
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg; t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 3000);
}

// Ініціалізація при завантаженні
window.onload = () => {
    renderServices();
    renderReviews();
    animateCounter('cnt1', 2400);
    animateCounter('cnt2', 6);
    animateCounter('cnt3', 15);
    animateCounter('cnt4', 8);

    // Селект послуг у формі
    const sel = document.getElementById('serviceSelect');
    if(sel) {
        services.forEach(s => {
            const opt = document.createElement('option');
            opt.value = s.id; opt.textContent = s.name;
            sel.appendChild(opt);
        });
    }
};

window.onscroll = () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('scrollLine').style.width = pct + '%';
};