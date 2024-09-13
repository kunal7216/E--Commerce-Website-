// Elements for modals and buttons
const loginModal = document.getElementById("loginModal");
const registerModal = document.getElementById("registerModal");
const profileModal = document.getElementById("profileModal");
const cartModal = document.getElementById("cartModal");
const paymentModal = document.getElementById("paymentModal");
const orderTrackingModal = document.getElementById("orderTrackingModal");
const loginBtn = document.getElementById("loginBtn");
const registerBtn = document.getElementById("registerBtn");
const profileLink = document.getElementById("profileLink");
const logoutBtn = document.getElementById("logoutBtn");
const closeBtns = document.querySelectorAll(".close");

// Open modals
loginBtn.onclick = function() {
    loginModal.style.display = "block";
};
registerBtn.onclick = function() {
    registerModal.style.display = "block";
};
profileLink.onclick = function() {
    profileModal.style.display = "block";
};
document.querySelector('.cart a').onclick = function(event) {
    event.preventDefault();
    cartModal.style.display = "block";
};

// Close modals
closeBtns.forEach(btn => {
    btn.onclick = function() {
        btn.parentElement.parentElement.style.display = "none";
    };
});

// Handle Login
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (username === "user" && password === "password") {
        alert("Login successful!");
        loginModal.style.display = "none";
        profileLink.style.display = "inline-block";
        logoutBtn.style.display = "inline-block";
        loginBtn.style.display = "none";
        registerBtn.style.display = "none";
    } else {
        alert("Invalid credentials. Please try again.");
    }
});

// Handle Registration
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Registration successful!");
    registerModal.style.display = "none";
});

// Handle Logout
logoutBtn.onclick = function() {
    alert("Logged out successfully!");
    profileLink.style.display = "none";
    logoutBtn.style.display = "none";
    loginBtn.style.display = "inline-block";
    registerBtn.style.display = "inline-block";
};

// Filter products by search term and category
const searchBar = document.getElementById("searchBar");
const categoryFilter = document.getElementById("categoryFilter");

function filterProducts() {
    const searchTerm = searchBar.value.toLowerCase();
    const selectedCategory = categoryFilter.value;

    document.querySelectorAll('.product').forEach(product => {
        const productName = product.querySelector('h3').innerText.toLowerCase();
        const productCategory = product.getAttribute('data-category');

        if (
            (productName.includes(searchTerm) || searchTerm === "") &&
            (selectedCategory === "all" || productCategory === selectedCategory)
        ) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
}

searchBar.addEventListener("input", filterProducts);
categoryFilter.addEventListener("change", filterProducts);

// Cart functionality
let cart = [];

document.querySelectorAll('.product button').forEach(button => {
    button.addEventListener('click', () => {
        const product = button.parentElement;
        const productName = product.querySelector('h3').innerText;
        const productPrice = parseFloat(product.querySelector('p').innerText.replace('$', ''));

        addToCart(productName, productPrice);
    });
});

function addToCart(name, price) {
    const existingProduct = cart.find(item => item.name === name);
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const taxAmount = document.getElementById('taxAmount');
    const finalTotal = document.getElementById('finalTotal');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        const li = document.createElement('li');
        li.innerHTML = ${item.name} - $${item.price} x <input type="number" value="${item.quantity}" min="1">;
        cartItems.appendChild(li);

        // Handle quantity change
        li.querySelector('input').addEventListener('input', (e) => {
            item.quantity = parseInt(e.target.value) || 1;
            updateCart();
        });
    });

    // Calculate shipping, discounts, and tax
    const shippingCost = calculateShipping();
    const discountAmount = calculateDiscount(total);
    const taxRate = 0.07; // Example tax rate of 7%
    const tax = total * taxRate;
    taxAmount.innerText = tax.toFixed(2);
    const finalTotalAmount = total + shippingCost - discountAmount + tax;

    cartTotal.innerText = total.toFixed(2);
    finalTotal.innerText = finalTotalAmount.toFixed(2);
}

function calculateShipping() {
    const shippingOption = document.getElementById('shippingOptions').value;
    switch (shippingOption) {
        case 'standard':
            return 5.00;
        case 'express':
            return 15.00;
        case 'free':
            return 0.00;
        default:
            return 0.00;
    }
}

function calculateDiscount(total) {
    const discountCode = document.getElementById('discountCode').value;
    if (discountCode === 'DISCOUNT10') {
        return total * 0.10; // 10% discount
    } else if (discountCode === 'DISCOUNT20') {
        return total * 0.20; // 20% discount
    }
    return 0;
}

// Apply discount
document.getElementById('applyDiscountBtn').onclick = function() {
    const discountCode = document.getElementById('discountCode').value;
    const validCoupons = ['DISCOUNT10', 'DISCOUNT20'];

    if (validCoupons.includes(discountCode)) {
        alert("Coupon applied successfully!");
    } else {
        alert("Invalid coupon code!");
    }
    updateCart();
};

// Show Payment Modal
document.getElementById("checkoutBtn").onclick = function() {
    cartModal.style.display = "none";
    paymentModal.style.display = "block";
};

// Handle Payment Method Change
document.getElementById("paymentMethod").addEventListener("change", function() {
    const method = this.value;
    document.getElementById("cardDetails").style.display = method === "creditCard" || method === "debitCard" ? "block" : "none";
    document.getElementById("paypalDetails").style.display = method === "paypal" ? "block" : "none";
});

// Handle Payment Form Submission
document.getElementById("paymentForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Payment Successful!");
    paymentModal.style.display = "none";
    cart = []; // Clear cart after successful payment
    updateCart();
});

// Order Tracking Functionality
document.getElementById("orderTrackingForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const orderNumber = document.getElementById("orderNumber").value;
    // Simulate an API call to get order status
    const orderStatus = "Your order is being processed."; // Example status

    document.getElementById("orderStatus").style.display = "block";
    document.getElementById("statusMessage").innerText = orderStatus;
    orderTrackingModal.style.display = "none";
});
