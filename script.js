const WA = "584120700903"; // número de WhatsApp con código de país
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Formulario (se clona en el modal y en la sección final)
const modal = $("#modal");
$$(".slot").forEach(s => s.append($("#tpl").content.cloneNode(true)));

$$("form.form").forEach(f => f.addEventListener("submit", e => {
  e.preventDefault();
  const d = new FormData(f);
  const detalle = d.get("d").trim();
  const msg = `Hola Connect., soy ${d.get("n").trim()}. Motivo: ${d.get("m")}.${detalle ? " " + detalle : ""}`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  if (modal.open) modal.close();
  f.reset();
}));

// Botones que abren el formulario (data-open="motivo" preselecciona el motivo)
$$("[data-open]").forEach(b => b.addEventListener("click", () => {
  nav.classList.remove("open"); burger.classList.remove("on");
  const m = b.dataset.open;
  if (m) $("select", modal).value = m;
  modal.showModal();
}));
$("#close").addEventListener("click", () => modal.close());
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

// Menú móvil
const nav = $("#nav"), burger = $("#burger");
burger.addEventListener("click", () => {
  const o = nav.classList.toggle("open");
  burger.classList.toggle("on", o);
  burger.setAttribute("aria-expanded", o);
});
$$("nav a").forEach(a => a.addEventListener("click", () => { nav.classList.remove("open"); burger.classList.remove("on"); }));

// Proyectos: mostrar más / menos
const clip = $("#clip"), more = $("#more");
more.addEventListener("click", () => {
  const o = clip.classList.toggle("open");
  clip.style.maxHeight = o ? clip.scrollHeight + "px" : "";
  more.textContent = o ? "Ver menos" : "Ver más proyectos";
  more.setAttribute("aria-expanded", o);
  if (!o) $("#proyectos").scrollIntoView({ behavior: "smooth" });
});

// Revelado al hacer scroll (escalonado en listas)
$$(".stag").forEach(p => [...p.children].forEach((c, i) => {
  c.classList.add("rv");
  c.style.setProperty("--d", i * 0.07 + "s");
}));
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.15 });
$$(".rv").forEach(el => io.observe(el));
