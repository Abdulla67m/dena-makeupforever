// ============================================================
// DENA MAKEUP FOREVER
// PRODUCTS + STORE + CART SYSTEM
// Currency: EGP
// ============================================================


// ============================================================
// PRODUCTS DATABASE
// ============================================================

const products = [

    {
        id: 1,

        name: "Velvet Matte Lipstick",

        brand: "Dena Collection",

        category: "Lips",

        price: 2500,

        image: "images/huda-concealer.jpeg",

        description:
            "Long-lasting velvet matte lipstick."
    },


    {
        id: 2,

        name: "Huda Beauty Foundation",

        brand: "Huda Beauty",

        category: "Face",

        price: 2200,

        image: "images/huda_budy1.jpeg",

        description:
            "Smooth and flawless coverage."
    },


    {
        id: 3,

        name: "Fix Setting Spray",

        brand: "ONE/SIZE",

        category: "Setting",

        price: 2250,

        image: "images/bnr.jpeg",

        description:
            "Long-lasting setting spray for a beautiful finish."
    },


    {
        id: 4,

        name: "Soft Blush",

        brand: "Dena Collection",

        category: "Face",

        price: 1650,

        image: "images/bodysplash.jpeg",

        description:
            "Soft and natural blush."
    },


    {
        id: 5,

        name: "Luxury Mascara",

        brand: "Dena Collection",

        category: "Eyes",

        price: 3950,

        image: "images/bwe.jpeg",

        description:
            "Volume and definition for your lashes."
    },


    {
        id: 6,

        name: "Anastasia Eyeshadow Palette",

        brand: "Anastasia Beverly Hills",

        category: "Eyes",

        price: 2200,

        image: "images/ANASTASIA.jpeg",

        description:
            "Premium colors for every makeup look."
    },


    {
        id: 7,

        name: "Master Mattes Eyeshadow Palette",

        brand: "Makeup By Mario",

        category: "Eyes",

        price: 1500,

        image: "images/huda-concealer.jpeg",

        description:
            "Universal neutral matte shades crafted for high blendability."
    },


    {
        id: 8,

        name: "Easy Blur Airbrush Foundation",

        brand: "Huda Beauty",

        category: "Face",

        price: 1500,

        image: "images/dudrin.jpeg",

        description:
            "Ultra-lightweight filter-like foundation for a smooth base."
    }

];


// ============================================================
// CART
// ============================================================

let cart =
    JSON.parse(localStorage.getItem("denaCart")) || [];


// ============================================================
// SHIPPING
// ============================================================

const SHIPPING_COST = 500;


// ============================================================
// FORMAT PRICE
// Everything will appear as EGP
// ============================================================

function formatPrice(price) {

    return `EGP ${Number(price).toLocaleString("en-EG")}`;

}


// ============================================================
// DOM READY
// ============================================================

document.addEventListener("DOMContentLoaded", function () {

    renderHomeBestsellers();

    renderStoreProducts(products);

    updateCartUI();

    updateResponsiveProducts();

});


// ============================================================
// NAVIGATION
// ============================================================

function showSection(sectionId) {

    const sections = [
        "home-section",
        "store-section",
        "about-section",
        "contact-section"
    ];


    // Hide all sections

    sections.forEach(function (section) {

        const element =
            document.getElementById(section);

        if (element) {

            element.classList.add("d-none");

        }

    });


    // Remove active links

    document
        .querySelectorAll(".nav-item")
        .forEach(function (link) {

            link.classList.remove("active");

        });


    // Show selected section

    const target =
        document.getElementById(`${sectionId}-section`);

    if (target) {

        target.classList.remove("d-none");

    }


    // Active navigation

    const navLink =
        document.getElementById(`nav-${sectionId}`);

    if (navLink) {

        navLink.classList.add("active");

    }


    // Scroll top

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ============================================================
// SCROLL
// ============================================================

function scrollToElement(elementId) {

    const element =
        document.getElementById(elementId);

    if (!element) return;


    element.scrollIntoView({
        behavior: "smooth"
    });

}


// ============================================================
// HOME BESTSELLERS
// ============================================================

function renderHomeBestsellers() {

    const grid =
        document.getElementById(
            "home-bestsellers-grid"
        );


    if (!grid) return;


    const bestsellers =
        products.slice(0, 4);


    grid.innerHTML =
        bestsellers
            .map(product => createProductCard(product))
            .join("");

}


// ============================================================
// STORE PRODUCTS
// ============================================================

function renderStoreProducts(items) {

    const grid =
        document.getElementById(
            "store-products-grid"
        );


    const count =
        document.getElementById(
            "product-count"
        );


    if (!grid) return;


    grid.innerHTML = "";


    if (count) {

        count.innerText =
            `Showing ${items.length} products`;

    }


    if (items.length === 0) {

        grid.innerHTML = `

            <div class="no-products">

                <h3>
                    No products found
                </h3>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }


    grid.innerHTML =
        items
            .map(product => createProductCard(product))
            .join("");

}


// ============================================================
// PRODUCT CARD
// ============================================================

function createProductCard(product) {

    return `

        <div class="product-card">

            <div class="product-img-wrapper">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                    onerror="this.src='https://via.placeholder.com/500x500?text=Dena+Makeup'"
                >

            </div>


            <div class="product-details">

                <span class="product-brand">

                    ${product.brand}

                </span>


                <h3 class="product-title">

                    ${product.name}

                </h3>


                <p class="product-description">

                    ${product.description}

                </p>


                <p class="product-price">

                    ${formatPrice(product.price)}

                </p>


                <button
                    class="btn btn-primary btn-block mt-3"
                    onclick="addToCart(${product.id})">

                    Add To Bag

                </button>

            </div>

        </div>

    `;

}


// ============================================================
// CATEGORY FILTER
// ============================================================

function filterCategory(category, button) {

    updateFilterActive(button);


    if (category === "all") {

        renderStoreProducts(products);

        return;

    }


    const filtered =
        products.filter(function (product) {

            return product.category.toLowerCase() ===
                category.toLowerCase();

        });


    renderStoreProducts(filtered);

}


// ============================================================
// BRAND FILTER
// ============================================================

function filterBrand(brand, button) {

    updateFilterActive(button);


    if (brand === "all") {

        renderStoreProducts(products);

        return;

    }


    const filtered =
        products.filter(function (product) {

            return product.brand.toLowerCase() ===
                brand.toLowerCase();

        });


    renderStoreProducts(filtered);

}


// ============================================================
// FILTER ACTIVE BUTTON
// ============================================================

function updateFilterActive(button) {

    if (!button) return;


    const parent =
        button.closest(".filter-list");


    if (!parent) return;


    parent
        .querySelectorAll(".filter-link")
        .forEach(function (link) {

            link.classList.remove("active");

        });


    button.classList.add("active");

}


// ============================================================
// PRICE FILTER
// ============================================================

function filterByPrice(value) {

    const maxPrice =
        Number(value);


    const priceLabel =
        document.getElementById("price-val");


    if (priceLabel) {

        priceLabel.innerText =
            formatPrice(maxPrice);

    }


    const filtered =
        products.filter(function (product) {

            return product.price <= maxPrice;

        });


    renderStoreProducts(filtered);

}


// ============================================================
// SORT PRODUCTS
// ============================================================

function sortProducts(type) {

    let sortedProducts =
        [...products];


    if (type === "low-high") {

        sortedProducts.sort(function (a, b) {

            return a.price - b.price;

        });

    }


    else if (type === "high-low") {

        sortedProducts.sort(function (a, b) {

            return b.price - a.price;

        });

    }


    renderStoreProducts(sortedProducts);

}


// ============================================================
// SEARCH
// ============================================================

function handleSearch(value) {

    const searchValue =
        value.toLowerCase().trim();


    // If search is empty

    if (searchValue === "") {

        renderStoreProducts(products);

        return;

    }


    // Open store automatically

    showSection("store");


    const results =
        products.filter(function (product) {

            return (

                product.name
                    .toLowerCase()
                    .includes(searchValue)

                ||

                product.brand
                    .toLowerCase()
                    .includes(searchValue)

                ||

                product.category
                    .toLowerCase()
                    .includes(searchValue)

            );

        });


    renderStoreProducts(results);

}


// ============================================================
// ADD TO CART
// ============================================================

function addToCart(productId) {

    const product =
        products.find(function (item) {

            return item.id === productId;

        });


    if (!product) return;


    const existingProduct =
        cart.find(function (item) {

            return item.id === productId;

        });


    if (existingProduct) {

        existingProduct.quantity++;

    }

    else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    // Save

    localStorage.setItem(
        "denaCart",
        JSON.stringify(cart)
    );


    updateCartUI();


    showCartNotification(
        product.name
    );

}


// ============================================================
// UPDATE CART UI
// ============================================================

function updateCartUI() {

    updateCartCount();


    const cartContainer =
        document.getElementById(
            "cart-items"
        );


    if (!cartContainer) return;


    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <p class="text-center py-4">

                Your bag is currently empty.

            </p>

        `;

        updateCartTotals();

        return;

    }


    cartContainer.innerHTML =
        cart.map(function (item, index) {

            return `

                <div class="cart-item d-flex gap-3 mb-3 pb-2 border-bottom">

                    <img
                        src="${item.image}"
                        width="60"
                        height="60"
                        style="
                            object-fit:cover;
                            border-radius:6px;
                        "
                    >


                    <div style="flex:1;">

                        <h5
                            class="mb-1"
                            style="font-size:0.9rem;">

                            ${item.name}

                        </h5>


                        <span class="gold-text">

                            ${formatPrice(item.price)}

                        </span>


                        <div style="margin-top:5px;">

                            Quantity:
                            ${item.quantity}

                        </div>

                    </div>


                    <button
                        onclick="removeFromCart(${index})"
                        style="
                            background:none;
                            border:none;
                            color:red;
                            cursor:pointer;
                            font-size:20px;
                        ">

                        &times;

                    </button>

                </div>

            `;

        })
        .join("");


    updateCartTotals();

}


// ============================================================
// UPDATE CART COUNT
// ============================================================

function updateCartCount() {

    const cartCount =
        document.getElementById(
            "cart-count"
        );


    if (!cartCount) return;


    const totalItems =
        cart.reduce(function (total, item) {

            return total + item.quantity;

        }, 0);


    cartCount.innerText =
        totalItems;


    cartCount.style.display =
        totalItems > 0
            ? "flex"
            : "none";

}


// ============================================================
// CART TOTALS
// ============================================================

function updateCartTotals() {

    const subtotal =
        cart.reduce(function (sum, item) {

            return sum +
                item.price *
                item.quantity;

        }, 0);


    const shipping =
        cart.length > 0
            ? SHIPPING_COST
            : 0;


    const total =
        subtotal + shipping;


    const subtotalElement =
        document.getElementById(
            "cart-subtotal"
        );


    const shippingElement =
        document.getElementById(
            "cart-shipping"
        );


    const totalElement =
        document.getElementById(
            "cart-total"
        );


    if (subtotalElement) {

        subtotalElement.innerText =
            formatPrice(subtotal);

    }


    if (shippingElement) {

        shippingElement.innerText =
            formatPrice(shipping);

    }


    if (totalElement) {

        totalElement.innerText =
            formatPrice(total);

    }

}


// ============================================================
// REMOVE FROM CART
// ============================================================

function removeFromCart(index) {

    cart.splice(index, 1);


    localStorage.setItem(
        "denaCart",
        JSON.stringify(cart)
    );


    updateCartUI();

}


// ============================================================
// TOGGLE CART
// ============================================================

function toggleCart() {

    const drawer =
        document.getElementById(
            "cart-drawer"
        );


    const overlay =
        document.getElementById(
            "cart-overlay"
        );


    drawer.classList.toggle("open");

    overlay.classList.toggle("open");

}


// ============================================================
// PAYMENT SELECTION
// ============================================================

function selectPayment(type) {

    const fields = [
        "card-fields",
        "instapay-fields",
        "cod-fields"
    ];


    fields.forEach(function (field) {

        const element =
            document.getElementById(field);


        if (element) {

            element.classList.add("d-none");

        }

    });


    const selected =
        document.getElementById(
            `${type}-fields`
        );


    if (selected) {

        selected.classList.remove("d-none");

    }

}


// ============================================================
// OPEN CHECKOUT
// ============================================================

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your shopping bag is empty!"
        );

        return;

    }


    // Close cart

    const drawer =
        document.getElementById(
            "cart-drawer"
        );


    const overlay =
        document.getElementById(
            "cart-overlay"
        );


    drawer.classList.remove("open");

    overlay.classList.remove("open");


    // Open modal

    document.getElementById(
        "checkout-modal"
    ).style.display = "flex";


    updateCheckoutSummary();

}


// ============================================================
// CHECKOUT SUMMARY
// ============================================================

function updateCheckoutSummary() {

    const summary =
        document.getElementById(
            "checkout-summary-list"
        );


    if (!summary) return;


    const subtotal =
        cart.reduce(function (sum, item) {

            return sum +
                item.price *
                item.quantity;

        }, 0);


    const shipping =
        SHIPPING_COST;


    const total =
        subtotal + shipping;


    summary.innerHTML =
        cart.map(function (item) {

            return `

                <div class="summary-line">

                    <span>

                        ${item.name}
                        × ${item.quantity}

                    </span>

                    <span>

                        ${formatPrice(
                            item.price *
                            item.quantity
                        )}

                    </span>

                </div>

            `;

        }).join("");


    summary.innerHTML += `

        <div class="summary-line">

            <span>
                Shipping
            </span>

            <span>
                ${formatPrice(shipping)}
            </span>

        </div>

    `;


    const grandTotal =
        document.getElementById(
            "modal-grand-total"
        );


    if (grandTotal) {

        grandTotal.innerText =
            formatPrice(total);

    }

}


// ============================================================
// CLOSE CHECKOUT
// ============================================================

function closeCheckout() {

    document.getElementById(
        "checkout-modal"
    ).style.display = "none";

}


// ============================================================
// PROCESS PAYMENT
// ============================================================

function processPayment(event) {

    event.preventDefault();


    alert(
        "Order placed successfully! Thank you for purchasing from Dena Makeup Forever."
    );


    cart = [];


    localStorage.removeItem(
        "denaCart"
    );


    updateCartUI();


    closeCheckout();


    document.getElementById(
        "payment-form"
    ).reset();


    selectPayment("card");

}


// ============================================================
// CART NOTIFICATION
// ============================================================

function showCartNotification(productName) {

    const oldNotification =
        document.querySelector(
            ".cart-notification"
        );


    if (oldNotification) {

        oldNotification.remove();

    }


    const notification =
        document.createElement("div");


    notification.className =
        "cart-notification";


    notification.innerHTML = `

        <div class="notification-icon">
            ✓
        </div>

        <div>

            <strong>
                Added to cart
            </strong>

            <small>
                ${productName}
            </small>

        </div>

    `;


    document.body.appendChild(
        notification
    );


    setTimeout(function () {

        notification.classList.add(
            "hide"
        );


        setTimeout(function () {

            notification.remove();

        }, 300);

    }, 2500);

}


// ============================================================
// TOAST
// ============================================================

function showToast(message) {

    const toast =
        document.getElementById(
            "toast"
        );


    if (!toast) return;


    toast.innerText =
        message;


    toast.style.display =
        "block";


    setTimeout(function () {

        toast.style.display =
            "none";

    }, 3000);

}


// ============================================================
// CONTACT FORM
// ============================================================

function submitContact(event) {

    event.preventDefault();


    showToast(
        "Message sent successfully!"
    );


    const form =
        document.getElementById(
            "contact-form"
        );


    if (form) {

        form.reset();

    }

}


// ============================================================
// BUNDLE
// ============================================================

function addBundleToCart() {

    // Example bundle

    const bundleProducts =
        products.filter(function (product) {

            return (
                product.name
                    .toLowerCase()
                    .includes("foundation")
                ||
                product.name
                    .toLowerCase()
                    .includes("spray")
            );

        });


    if (bundleProducts.length === 0) {

        alert(
            "Bundle products are currently unavailable."
        );

        return;

    }


    bundleProducts.forEach(function (product) {

        const existing =
            cart.find(function (item) {

                return item.id === product.id;

            });


        if (existing) {

            existing.quantity++;

        }

        else {

            cart.push({

                ...product,

                quantity: 1

            });

        }

    });


    localStorage.setItem(
        "denaCart",
        JSON.stringify(cart)
    );


    updateCartUI();


    showToast(
        "Glow Bundle added to your bag!"
    );

}


// ============================================================
// RESPONSIVE PRODUCTS
// ============================================================

function updateResponsiveProducts() {

    const productGrid =
        document.getElementById(
            "store-products-grid"
        );


    if (!productGrid) return;


    const width =
        window.innerWidth;


    if (width <= 550) {

        productGrid.style.gap =
            "12px";

    }

    else if (width <= 800) {

        productGrid.style.gap =
            "18px";

    }

    else {

        productGrid.style.gap =
            "25px";

    }

}


// ============================================================
// WINDOW RESIZE
// ============================================================

window.addEventListener(
    "resize",
    updateResponsiveProducts
);


// ============================================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ============================================================

window.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "checkout-modal"
            );


        if (
            event.target === modal
        ) {

            closeCheckout();

        }

    }
);