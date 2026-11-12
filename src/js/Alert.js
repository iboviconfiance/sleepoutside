export default class Alert {
  async init() {
    const response = await fetch("/json/alerts.json");
    if (!response.ok) {
      throw new Error("Unable to load alerts.");
    }

    const alerts = await response.json();
    if (!Array.isArray(alerts) || alerts.length === 0) {
      return;
    }

    const alertList = document.createElement("section");
    alertList.classList.add("alert-list");

    alerts.forEach((alert) => {
      const message = document.createElement("p");
      message.textContent = alert.message;
      message.style.backgroundColor = alert.background;
      message.style.color = alert.color;
      alertList.append(message);
    });

    document.querySelector("main")?.prepend(alertList);
  }
}