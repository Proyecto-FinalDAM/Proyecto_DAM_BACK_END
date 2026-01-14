import { login, register, getUser, logout } from './auth.js';

export default class Header {
  constructor(containerId, fragmentUrl) {
    this.containerId = containerId;
    this.fragmentUrl = fragmentUrl;
  }

  async load() {
    const res = await fetch(this.fragmentUrl);
    const html = await res.text();
    document.getElementById(this.containerId).innerHTML = html;
    this.init();
  }

  init() {
    const header = document.querySelector('.main-header');
    const wrapper = document.querySelector('.wrapper');
    const overlay = document.getElementById('modal-overlay');
    const loginBtn = header.querySelector('.btnLogin-popup');

    // ======================
    // OPEN / LOGOUT
    // ======================
    loginBtn.addEventListener('click', () => {
      const user = getUser();
      if (user) {
        if (confirm('¿Cerrar sesión?')) logout();
        return;
      }
      wrapper.classList.add('active-popup');
      wrapper.classList.remove('active');
      overlay.classList.add('active');
    });

    // ======================
    // SWITCH LOGIN / REGISTER
    // ======================
    wrapper.querySelector('.link-registro').onclick = e => {
      e.preventDefault();
      wrapper.classList.add('active');
    };

    wrapper.querySelector('.link-login').onclick = e => {
      e.preventDefault();
      wrapper.classList.remove('active');
    };

    wrapper.querySelector('.icono-cerrar').onclick = () => {
      wrapper.classList.remove('active-popup');
      overlay.classList.remove('active');
    };

    // ======================
    // LOGIN FORM
    // ======================
    document.getElementById('loginForm').addEventListener('submit', async e => {
      e.preventDefault();

      const email = loginEmail.value;
      const password = loginPassword.value;

      const user = await login(email, password);
      if (!user) {
        alert('Credenciales incorrectas');
        return;
      }

      wrapper.classList.remove('active-popup');
      overlay.classList.remove('active');
      this.actualizarHeader();
    });

    // ======================
    // REGISTER FORM
    // ======================
    document.getElementById('registerForm').addEventListener('submit', async e => {
      e.preventDefault();

      const ok = await register({
        nombre: regNombre.value,
        apellidos: regApellidos.value,
        email: regEmail.value,
        password: regPassword.value
      });

      if (!ok) {
        alert('Usuario ya existe');
        return;
      }

      alert('Registro correcto');
      wrapper.classList.remove('active');
    });

    this.actualizarHeader();
  }

  actualizarHeader() {
    const user = getUser();
    const loginBtn = document.querySelector('.btnLogin-popup');

    if (user) {
      loginBtn.textContent = `👤 ${user.userName}`;
      loginBtn.classList.add('logged');
    } else {
      loginBtn.textContent = 'Login';
      loginBtn.classList.remove('logged');
    }
  }
}
