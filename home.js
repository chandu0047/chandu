document.addEventListener("DOMContentLoaded", () => {
  
  document.body.style.opacity = "0";
  setTimeout(() => {
    document.body.style.transition = "opacity 1s ease";
    document.body.style.opacity = "1";
  }, 100);

  
  const regBtn = document.getElementById("reg");
  const logBtn = document.getElementById("log");

  console.log("[home.js] Elements found:", { regBtn: !!regBtn, logBtn: !!logBtn });

  if (regBtn) {
    regBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("📝 Redirecting to Register Page...");
      setTimeout(() => {
        window.location.href = "reg.html"; 
      }, 500);
    });
  }

  if (logBtn) {
    logBtn.addEventListener("click", (e) => {
      e.preventDefault();
      alert("🔐 Redirecting to Login Page...");
      setTimeout(() => {
        window.location.href = "login.htm";
      }, 500);
    });
  }
});
