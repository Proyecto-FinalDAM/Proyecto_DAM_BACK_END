
// footer.js
export default class Footer {
  constructor(containerId, fragmentUrl) {
    this.containerId = containerId;
    this.fragmentUrl = fragmentUrl;
  }

  async load() {
    try {
      const res = await fetch(this.fragmentUrl);
      if (!res.ok) throw new Error(`Error al cargar ${this.fragmentUrl}`);
      const html = await res.text();
      document.getElementById(this.containerId).innerHTML = html;
      this.init();
    } catch (err) {
      console.error(err);
    }
  }

  init() {
    const yearSpan = document.querySelector("#current-year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  }
}