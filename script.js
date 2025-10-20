// Google Sheet keys from your URLs
const SCHOLARSHIPS_SHEET_KEY = "1ZT0ZYqoTlE-NOYZVRPMtHxoubZm-1GrMUzj2w02CI0I";
const RESOURCES_SHEET_KEY = "1sfVjLdfJOFRxypFi1rHpDDulk0525u0SQK89_-_b5OM";

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".tab-btn");
  const content = document.getElementById("content");

  function setActiveTab(tab) {
    buttons.forEach(btn => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`[data-tab="${tab}"]`);
    if (activeBtn) activeBtn.classList.add("active");
  }

  function loadSection(type) {
    setActiveTab(type);
    content.innerHTML = '<p>Loading...</p>';

    if (type === "college") {
      // Just show the school newspaper and any static links you want
      content.innerHTML = `
        <div class="resource-card">
          <div class="card-info">
            <h3>Franklin High School Newspaper</h3>
            <p>Visit our school newspaper for the latest news, college help, and guides!</p>
            <a href="https://fhsbuzz.com/" target="_blank">Visit FHS Buzz</a>
          </div>
        </div>
      `;
      // You can add more static college help links here if you want
    } else if (type === "opportunities") {
      Tabletop.init({
        key: RESOURCES_SHEET_KEY,
        callback: function(data) {
          if (!data || data.length === 0) {
            content.innerHTML = "<p>No opportunities found.</p>";
          } else {
            renderCards(data);
          }
        },
        simpleSheet: true
      });
    } else if (type === "scholarships") {
      Tabletop.init({
        key: SCHOLARSHIPS_SHEET_KEY,
        callback: function(data) {
          if (!data || data.length === 0) {
            content.innerHTML = "<p>No scholarships found.</p>";
          } else {
            renderCards(data);
          }
        },
        simpleSheet: true
      });
    }
  }

  function renderCards(items) {
    content.innerHTML = items.map(item => `
      <div class="resource-card">
        ${item.Image ? `<img class="resource-image" src="${item.Image}" alt="${item.Title}"/>` : ""}
        <div class="card-emoji">${item.Emoji || ""}</div>
        <div class="card-info">
          <h3>${item.Title || item.title}</h3>
          <p>${item.Desc || item.description || ""}</p>
          <ul>
            ${item.Area ? `<li><strong>Area:</strong> ${item.Area}</li>` : ""}
            ${item.Grade ? `<li><strong>Grade Level:</strong> ${item.Grade}</li>` : ""}
            ${item.Deadline ? `<li><strong>Deadline:</strong> ${item.Deadline}</li>` : ""}
          </ul>
          ${item.Link || item.link ? `<a href="${item.Link || item.link}" target="_blank">Apply / Visit</a>` : ""}
        </div>
      </div>
    `).join("");
  }

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      loadSection(btn.dataset.tab);
    });
  });

  // Default tab
  loadSection("college");

  // AI Assistant Placeholder
  const aiBtn = document.getElementById("ai-btn");
  const aiInput = document.getElementById("ai-input");
  const aiResponse = document.getElementById("ai-response");

  aiBtn.addEventListener("click", async () => {
    const question = aiInput.value.trim();
    if (!question) return;
    aiResponse.innerHTML = `<p><em>AI thinking...</em></p>`;
    setTimeout(() => {
      aiResponse.innerHTML = `<p>🤖 The assistant will soon help you find scholarships and opportunities based on your interests!</p>`;
    }, 1000);
  });
});