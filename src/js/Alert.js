// src/js/Alert.js

export default class Alert {
  constructor() {
    this.path = "/json/alerts.json";
  }

  async init() {
    const alerts = await this.fetchAlerts();
    if (alerts && alerts.length > 0) {
      this.renderAlerts(alerts);
    }
  }

  async fetchAlerts() {
    try {
      const response = await fetch(this.path);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("Erreur lors du chargement des alertes:", error);
    }
  }

  renderAlerts(alerts) {
    const alertSection = document.createElement("section");
    alertSection.classList.add("alert-list");

    alerts.forEach((alert) => {
      // Création du conteneur de l'alerte
      const alertDiv = document.createElement("div");
      alertDiv.classList.add("alert-item");
      alertDiv.style.backgroundColor = alert.background;
      alertDiv.style.color = alert.color;

      // Texte de l'alerte
      const p = document.createElement("p");
      p.innerText = alert.message;

      // Bouton de fermeture (X)
      const closeBtn = document.createElement("span");
      closeBtn.innerText = "×";
      closeBtn.classList.add("alert-close");
      
      // Logique pour fermer l'alerte
      closeBtn.addEventListener("click", () => {
        alertDiv.style.opacity = "0";
        setTimeout(() => {
          alertDiv.remove();
          // Si c'était la dernière alerte, on supprime toute la section
          if (alertSection.children.length === 0) {
            alertSection.remove();
          }
        }, 300); // Délai pour l'animation de sortie
      });

      alertDiv.appendChild(p);
      alertDiv.appendChild(closeBtn);
      alertSection.appendChild(alertDiv);
    });

    const main = document.querySelector("main");
    if (main) {
      main.prepend(alertSection);
    }
  }
}