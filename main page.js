document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }

      if (window.scrollY + window.innerHeight > sectionTop + 100) {
        section.style.opacity = 1;
        section.style.transform = "translateY(0)";
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });


  const cart = [];
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartTotal = document.getElementById("cart-total");
  const cartEmptyMsg = document.querySelector(".cart-empty");
  const cartPopup = document.getElementById("cart-popup");
  const cartIcon = document.getElementById("cart-icon");
  const cartCount = document.getElementById("cart-count");

 
  cartIcon.addEventListener("click", () => cartPopup.classList.add("active"));
  document.getElementById("close-cart").addEventListener("click", () => cartPopup.classList.remove("active"));

 
  document.getElementById("checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
    } else {
      alert("Thank you for your purchase! 🎉");
      cart.length = 0;
      updateCartUI();
      cartPopup.classList.remove("active");
    }
  });

 
  document.querySelectorAll(".buy-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      const card = e.target.closest(".product-card");
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      const img = card.dataset.img;

      const existing = cart.find(item => item.name === name);
      if (existing) existing.quantity += 1;
      else cart.push({ name, price, quantity: 1, img });

      updateCartUI();
      cartPopup.classList.add("active");
    });
  });

  
  function updateCartUI() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    let count = 0;

    if (cart.length === 0) {
      cartEmptyMsg.style.display = "block";
    } else {
      cartEmptyMsg.style.display = "none";

      cart.forEach((item, index) => {
        total += item.price * item.quantity;
        count += item.quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
          <img src="${item.img}" alt="${item.name}">
          <div class="cart-item-info">
            <span>${item.name}</span>
            <span>$${item.price} x ${item.quantity}</span>
          </div>
          <div class="cart-item-controls">
            <button class="quantity-btn" data-index="${index}" data-action="minus">-</button>
            <button class="quantity-btn" data-index="${index}" data-action="plus">+</button>
            <button class="remove-btn" data-index="${index}">X</button>
          </div>
        `;
        cartItemsContainer.appendChild(cartItem);
      });
    }

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = count;


    document.querySelectorAll(".quantity-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const idx = e.target.dataset.index;
        const action = e.target.dataset.action;
        if (action === "plus") cart[idx].quantity += 1;
        if (action === "minus") {
          cart[idx].quantity -= 1;
          if (cart[idx].quantity <= 0) cart.splice(idx, 1);
        }
        updateCartUI();
      });
    });

   
    document.querySelectorAll(".remove-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        const idx = e.target.dataset.index;
        cart.splice(idx, 1);
        updateCartUI();
      });
    });
  }

 
  document.querySelector(".join-form").addEventListener("submit", e => {
    e.preventDefault();
    alert("🎉 Welcome to the Sneaker Hub Crew!!!");
    e.target.reset();
  });

 
  const contactBtn = document.querySelector(".contact-btn");
  const reviewInput = document.getElementById("contact-review");
  const reviewList = document.getElementById("review-list");

  contactBtn.addEventListener("click", () => {
    const reviewText = reviewInput.value.trim();

    if (reviewText === "") {
      alert("Please write something before submitting!");
      return;
    }

   
    alert("Thanks for your review BOSS!!! 😘💕");

  
    const newReview = document.createElement("li");
    newReview.textContent = reviewText;
    reviewList.appendChild(newReview);

   
    reviewInput.value = "";

    
    const allReviews = Array.from(reviewList.children).map(li => li.textContent);
    localStorage.setItem("sneakerHubReviews", JSON.stringify(allReviews));
  });

 
  const savedReviews = JSON.parse(localStorage.getItem("sneakerHubReviews")) || [];
  savedReviews.forEach(text => {
    const li = document.createElement("li");
    li.textContent = text;
    reviewList.appendChild(li);
  });
});
