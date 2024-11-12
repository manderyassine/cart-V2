// Defines each product in the store
class Product {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

// Manages each item in the cart
class CartItem {
    constructor(product, quantity = 1) {
        this.product = product;
        this.quantity = quantity;
    }

    // Calculates the price of this item based on its quantity
    getTotal() {
        return this.product.price * this.quantity;
    }
}

// Manages the entire cart
class Cart {
    constructor() {
        this.items = [];
    }

    // Add a product to the cart or update its quantity
    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.product.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push(new CartItem(product, quantity));
        }
        this.displayCart();
    }

    // Remove a product from the cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.product.id !== productId);
        this.displayCart();
    }

    // Calculate the cart's total cost
    calculateTotal() {
        return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
    }

    // Update the cart display 
    displayCart() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item', 'flex', 'justify-between', 'items-center', 'bg-white', 'p-4', 'shadow', 'rounded-lg');

            itemElement.innerHTML = `
                <div class="flex items-center space-x-4">
                    <div>
                        <h2 class="text-lg font-semibold">${item.product.name}</h2>
                        <p class="text-gray-600">$${item.product.price.toFixed(2)}</p>
                    </div>
                </div>
                <div class="flex items-center space-x-4">
                    <button class="quantity-btn decrement text-gray-600 p-2 border rounded" data-id="${item.product.id}">-</button>
                    <span class="quantity text-lg font-semibold">${item.quantity}</span>
                    <button class="quantity-btn increment text-gray-600 p-2 border rounded" data-id="${item.product.id}">+</button>
                </div>
                <button class="delete-btn text-gray-400 hover:text-red-600" data-id="${item.product.id}">Remove</button>
            `;

            cartItemsContainer.appendChild(itemElement);
        });

        document.getElementById('total-price').innerText = `$${this.calculateTotal().toFixed(2)}`;
        this.attachEventListeners();
    }

    // Attach event listeners to increment, decrement, and delete buttons
    attachEventListeners() {
        document.querySelectorAll('.increment').forEach(button => {
            button.addEventListener('click', event => {
                const productId = parseInt(event.target.getAttribute('data-id'), 10);
                this.updateQuantity(productId, 1);
            });
        });

        document.querySelectorAll('.decrement').forEach(button => {
            button.addEventListener('click', event => {
                const productId = parseInt(event.target.getAttribute('data-id'), 10);
                this.updateQuantity(productId, -1);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', event => {
                const productId = parseInt(event.target.getAttribute('data-id'), 10);
                this.removeItem(productId);
            });
        });
    }

    // Modify the quantity of an item or remove it if quantity goes to zero
    updateQuantity(productId, change) {
        const item = this.items.find(item => item.product.id === productId);
        if (item) {
            item.quantity += change;
            if (item.quantity <= 0) {
                this.removeItem(productId);
            } else {
                this.displayCart();
            }
        }
    }
}

// Sample products
const product1 = new Product(1, "Prod 1", 10.00);
const product2 = new Product(2, "Prod 2", 10.50);
const product3 = new Product(3, "Prod 3", 10.00);

// Instantiate a cart and add products to it
const cart = new Cart();
cart.addItem(product1, 2);
cart.addItem(product2, 1);
cart.addItem(product3, 3);

// Display initial cart contents
cart.displayCart();
