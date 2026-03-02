document.addEventListener('DOMContentLoaded', () => {
  const roleButtons = document.querySelectorAll('.role-select button');
  let role = 'buyer';

  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      role = btn.dataset.role;
    });
  });

  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const email = loginForm.email.value.trim();
      const password = loginForm.password.value.trim();

      // admin override if special credentials entered
      if (email === 'admin' && password === 'admin') {
        window.location.href = 'admin.html';
      } else if (role === 'buyer') {
        window.location.href = 'buyer.html';
      } else if (role === 'seller') {
        window.location.href = 'seller.html';
      }
    });
  }

  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', e => {
      e.preventDefault();
      // gather data, could send to backend
      const name = registerForm.name.value.trim();
      const email = registerForm.email.value.trim();
      const password = registerForm.password.value.trim();

      // simple feedback
      alert(`Hoşgeldiniz, ${name}! Kayıt başarılı. Lütfen giriş yapın.`);
      window.location.href = 'login.html';
    });
  }
});