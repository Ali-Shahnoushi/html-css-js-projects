const products = [
	{
		id: 1,
		name: 'کتاب اثر مرکب',
		Author: 'دارن هاردی',
		price: 50_000
	},
	{
		id: 2,
		name: 'کتاب بی‌نوایان',
		Author: 'ویکتور هوگو',
		price: 95_000
	}
];

let cart = {
	items: [],
	total: 0
};

renderProducts();
renderCartItems();

function renderProducts() {
	const productDiv = document.querySelector('.products');
	productDiv.innerHTML = '';
	products.forEach((item, index) => {
		productDiv.innerHTML += `
        <div class="product">
        <h3>${item.name}</h3>
        <h5>نویسنده : <span class="author">${item.Author}</span></h5>
        <h5>قیمت :‌ <span class="price">${item.price}</span> تومان</h5>
        <button onclick="addToCart(${index})">افزودن به سبد خرید</button>
        </div>
        `;
	});
}

function renderCartItems() {
	const cartDiv = document.querySelector('.items');
	cartDiv.innerHTML = '';

	const totalPriceEl = document.querySelector('.total-price');

	let totalPriceValue = 0;

	if (cart.items.length === 0) {
		totalPriceEl.innerHTML = totalPriceValue;
		cartDiv.innerHTML =
			'<div style="align-self:center;justify-self:center;display:flex;">سبد خرید شما خالی است</div>';
		return;
	}
	cart.items.forEach((item) => {
		totalPriceValue += item.total;

		cartDiv.innerHTML += `
            <div class="item">
                <span class="name">${item.name}</span>
                <span class="count">${item.qty}</span>
                <button class="remove" onclick="removeFromCart('${item.name}')">حذف</button>
            </div>
        `;
	});

	totalPriceEl.innerHTML = totalPriceValue;
}

function addToCart(productIndex) {
	const product = products[productIndex];

	let productExist = false;

	let newCartItems = cart.items.reduce((state, item) => {
		if (item.name === product.name) {
			productExist = true;

			const newItem = {
				...item,
				qty: item.qty + 1,
				total: (item.qty + 1) * item.price
			};

			return [ ...state, newItem ];
		}
		return [ ...state, item ];
	}, []);

	if (!productExist) {
		newCartItems.push({
			...product,
			qty: 1,
			total: product.price
		});
	}

	cart = {
		...cart,
		items: newCartItems
	};
	renderCartItems();
}

function removeFromCart(productName) {
	let newCartItems = cart.items.reduce((state, item) => {
		if (item.name === productName) {
			const newItem = {
				...item,
				qty: item.qty - 1,
				total: (item.qty - 1) * item.price
			};
			if (newItem.qty > 0) {
				return [ ...state, newItem ];
			} else {
				return state;
			}
		}

		return [ ...state, item ];
	}, []);

	cart = {
		...cart,
		items: newCartItems
	};
	renderCartItems();
}
