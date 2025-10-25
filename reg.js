
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ reg.js loaded successfully!");

  const form = document.getElementById("registerForm");
  const loginBtn = document.getElementById("loginBtn");
  const backBtn = document.getElementById("backBtn");

  console.log("Elements found:", {
    form: !!form,
    loginBtn: !!loginBtn,
    backBtn: !!backBtn,
  });


  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const phone = document.getElementById("phone").value.trim();

      if (!name || !email || !password || !phone) {
        alert("⚠️ Please fill all fields!");
        return;
      }

      if (!/^[0-9]{10}$/.test(phone)) {
        alert("❌ Please enter a valid 10-digit phone number!");
        return;
      }

      const user = { name, email, password, phone };
      localStorage.setItem("user", JSON.stringify(user));

      alert("✅ Registration Successful! Redirecting to Login Page...");
      setTimeout(() => {
        window.location.href = "login.htm"; 
      }, 700);
    });
  }

 
  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      alert("🔐 Redirecting to Login Page...");
      setTimeout(() => {
        window.location.href = "login.htm";
      }, 500);
    });
  }

  
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      alert("⬅️ Going back to Main Page...");
      setTimeout(() => {
        window.location.href = "main page.htm";
      }, 500);
    });
  }
});
