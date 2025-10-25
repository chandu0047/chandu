
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ login.js loaded successfully!");

  const form = document.getElementById("loginForm");
  const backBtn = document.getElementById("backBtn");

  
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      if (!email || !password) {
        alert("⚠️ Please enter both Email and Password!");
        return;
      }

     
      const user = JSON.parse(localStorage.getItem("user"));

      if (user && user.email === email && user.password === password) {
        alert(`✅ Welcome back, ${user.name}! Redirecting to Home Page...`);
        setTimeout(() => {
          window.location.assign("main page.htm");
        }, 700);
      } else {
        alert("❌ Invalid email or password!");
      }
    });
  }

 
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      alert("⬅️ Going back to Home Page...");
      setTimeout(() => {
        window.location.assign("main page.htm"); 
      }, 500);
    });
  }
});
