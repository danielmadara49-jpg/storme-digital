// STORME DIGITAL — personnalisation des contacts dans ce fichier.
const AGENCY_EMAIL = "contact.stormedigital.cg@gmail.com"; // Adresse professionnelle de l’agence.
const WHATSAPP_NUMBER = ""; // À compléter avec le numéro WhatsApp Business, chiffres avec indicatif pays.

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}));

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("contactForm").addEventListener("submit", event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const subject = `Demande de projet — ${data.get("service")}`;
  const body = [
    `Bonjour STORME DIGITAL,`,
    ``,
    `Nom : ${data.get("name")}`,
    `E-mail : ${data.get("email")}`,
    `Service : ${data.get("service")}`,
    ``,
    `Projet :`,
    `${data.get("message")}`,
    ``,
    `Merci.`
  ].join("\n");

  const feedback = document.getElementById("formFeedback");
  if (WHATSAPP_NUMBER.trim()) {
    const text = encodeURIComponent(`${subject}\n\n${body}`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${text}`, "_blank", "noopener");
    feedback.textContent = "Votre demande est prête dans WhatsApp. Vérifiez-la puis appuyez sur Envoyer.";
  } else if (AGENCY_EMAIL && !AGENCY_EMAIL.endsWith(".example")) {
    window.location.href = `mailto:${AGENCY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    feedback.textContent = "Votre application e-mail va s'ouvrir avec le message prérempli.";
  } else {
    feedback.textContent = "Le formulaire fonctionne, mais les coordonnées de l'agence ne sont pas encore configurées. Contactez-nous directement à contact.stormedigital.cg@gmail.com.";
  }
});
