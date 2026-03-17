const ALL_MISSIONS = "All missions";
const ALL_REGIONS = "All regions";

const MISSION_TYPES = [
  ALL_MISSIONS,
  "Embassies",
  "High Commissions",
  "Consulates",
  "Honorary",
  "No mission in Nigeria",
];

const REGIONS = [ALL_REGIONS, "Africa", "Americas", "Asia", "Europe", "Oceania"];

const state = {
  viewMode: "foreign",
  query: "",
  missionType: ALL_MISSIONS,
  region: ALL_REGIONS,
  countries: [],
  nigerianMissions: [],
};

const searchInput = document.getElementById("searchInput");
const clearSearch = document.getElementById("clearSearch");
const missionFilters = document.getElementById("missionFilters");
const regionFilters = document.getElementById("regionFilters");
const cards = document.getElementById("cards");
const resultCount = document.getElementById("resultCount");
const lastUpdated = document.getElementById("lastUpdated");
const headerDescription = document.getElementById("headerDescription");
const footerTitle = document.getElementById("footerTitle");
const footerBody = document.getElementById("footerBody");
const viewForeign = document.getElementById("viewForeign");
const viewNigerian = document.getElementById("viewNigerian");
const scrollTopButton = document.getElementById("scrollTop");

const icon = {
  mapPin: `
    <svg class="w-4 h-4 mt-0.5 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10Z"></path>
      <circle cx="12" cy="11" r="2"></circle>
    </svg>
  `,
  phone: `
    <svg class="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M22 16.92V21a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 3 4.18 2 2 0 0 1 5 2h4.09a2 2 0 0 1 2 1.72c.12.81.32 1.6.57 2.35a2 2 0 0 1-.45 2L9.91 9.91a16 16 0 0 0 6 6l1.84-1.3a2 2 0 0 1 2-.45c.75.25 1.54.45 2.35.57a2 2 0 0 1 1.72 2z"></path>
    </svg>
  `,
  mail: `
    <svg class="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 6-10 7L2 6"></path>
    </svg>
  `,
  globe: `
    <svg class="w-4 h-4 text-gray-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M2 12h20"></path>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"></path>
    </svg>
  `,
  info: `
    <svg class="w-4 h-4" viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="#3b82f6"></circle>
      <line x1="12" y1="10" x2="12" y2="16" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"></line>
      <circle cx="12" cy="7" r="1.4" fill="#ffffff"></circle>
    </svg>
  `,
  external: `
    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M15 3h6v6"></path>
      <path d="M10 14 21 3"></path>
      <path d="M21 14v7H3V3h7"></path>
    </svg>
  `,
  check: `
    <svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 12l2 2 4-4"></path>
      <circle cx="12" cy="12" r="10"></circle>
    </svg>
  `,
};

function normalize(text) {
  return String(text || "").toLowerCase();
}

function formatApplyLink(item) {
  if (item && typeof item === "object") {
    const label = item.label || item.text || item.name || item.url || "";
    const url = item.url || "";
    if (url) {
      return `<a href="${url}" target="_blank" rel="noreferrer" class="text-blue-600 hover:text-blue-800 underline underline-offset-2">${label}</a>`;
    }
    return label;
  }

  const escaped = String(item || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  const urlRegex = /(https?:\/\/[^\s<]+)|(\b[a-z0-9.-]+\.[a-z]{2,}\b)/gi;
  return escaped.replace(urlRegex, (match) => {
    const clean = match.replace(/[),.]+$/g, "");
    const trailing = match.slice(clean.length);
    const href = clean.startsWith("http") ? clean : `https://${clean}`;
    return `<a href="${href}" target="_blank" rel="noreferrer" class="text-blue-600 hover:text-blue-800 underline underline-offset-2">${clean}</a>${trailing}`;
  });
}

function missionTypeMatches(entry, selected) {
  if (selected === ALL_MISSIONS) return true;
  if (selected === "No mission in Nigeria") return entry.missions.length === 0;
  if (selected === "Embassies") return entry.missions.some((m) => m.type === "Embassy");
  if (selected === "High Commissions") {
    return entry.missions.some(
      (m) => m.type === "High Commission" || m.type === "Deputy High Commission"
    );
  }
  if (selected === "Consulates") {
    return entry.missions.some(
      (m) => m.type === "Consulate" || m.type === "Consulate General"
    );
  }
  if (selected === "Honorary") {
    return entry.missions.some((m) => normalize(m.type).includes("honorary"));
  }
  return true;
}

function regionMatches(entry, selected) {
  if (selected === ALL_REGIONS) return true;
  return entry.region === selected;
}

function searchMatches(entry, query) {
  if (!query) return true;
  const missionText = entry.missions
    .map((m) => `${m.city} ${m.address} ${m.type} ${m.phone || ""} ${m.email || ""} ${m.website || ""}`)
    .join(" ");
  const whereToApply = entry.whereToApply ? entry.whereToApply.join(" ") : "";
  const haystack = `${entry.country} ${missionText} ${entry.visaProcessing || ""} ${whereToApply}`;
  return normalize(haystack).includes(query);
}

function renderFilters(container, values, activeValue, onClick) {
  container.innerHTML = values
    .map(
      (value) => `
        <button
          class="whitespace-nowrap px-4 py-2 sm:px-3 sm:py-1.5 rounded-lg text-sm font-medium transition-colors ${
            activeValue === value
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }"
          data-value="${value}"
        >
          ${value}
        </button>
      `
    )
    .join("");

  Array.from(container.querySelectorAll("button")).forEach((btn) => {
    btn.addEventListener("click", () => onClick(btn.dataset.value));
  });
}

function buildMissionTypes(entry) {
  const types = Array.from(new Set(entry.missions.map((m) => m.type)));
  return types
    .map(
      (type) =>
        `<span class="inline-flex items-center px-2.5 py-1 sm:py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">${type}</span>`
    )
    .join("");
}

function formatSource(source) {
  if (typeof source === "string") {
    return `<li class="text-xs text-gray-500 flex items-center gap-1">${icon.external}<span>${source}</span></li>`;
  }
  const label = source.label || source.url;
  const href = source.url || "#";
  return `
    <li class="text-xs text-gray-500 flex items-center gap-1">
      ${icon.external}
      <a href="${href}" target="_blank" rel="noreferrer" class="hover:text-blue-600">${label}</a>
    </li>
  `;
}

function buildMissionBlock(mission) {
  const phone = mission.phone
    ? `<div class="flex items-center gap-2">${icon.phone}<a href="tel:${mission.phone.replace(/[^0-9+]/g, "")}" class="hover:text-blue-600 transition-colors">${mission.phone}</a></div>`
    : "";
  const email = mission.email
    ? `<div class="flex items-center gap-2">${icon.mail}<a href="mailto:${mission.email}" class="hover:text-blue-600 transition-colors">${mission.email}</a></div>`
    : "";
  const website = mission.website
    ? `<div class="flex items-center gap-2">${icon.globe}<a href="${mission.website}" target="_blank" rel="noreferrer" class="hover:text-blue-600 transition-colors">${mission.websiteLabel || mission.website}</a></div>`
    : "";

  return `
    <div class="relative pl-4 border-l-2 border-gray-200">
      <h3 class="text-base font-semibold text-gray-900 mb-2 flex items-center">
        ${mission.type} <span class="mx-2 text-gray-300">·</span> ${mission.city}
      </h3>
      <div class="space-y-2.5 text-sm text-gray-600">
        <div class="flex items-start gap-2">
          ${icon.mapPin}
          <span>${mission.address}</span>
        </div>
        ${phone}
        ${email}
        ${website}
      </div>
    </div>
  `;
}

function renderCard(entry) {
  const flag = entry.flag
    ? `<span class="text-4xl leading-none flag-emoji" aria-hidden="true">${entry.flag}</span>`
    : entry.countryCode
      ? `<img class="w-9 h-9 rounded-md border border-gray-200" src="https://flagcdn.com/w40/${entry.countryCode.toLowerCase()}.png" alt="${entry.country} flag" />`
      : `<span class="w-9 h-9 rounded-md bg-gray-200 inline-block"></span>`;

  const missionTypes = buildMissionTypes(entry);
  const missionsHtml = entry.missions.map(buildMissionBlock).join("");
  const visaBlock = `
    <div>
      <h4 class="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
        ${icon.info}
        Visa processing
      </h4>
      <p class="text-sm text-gray-600 leading-relaxed">${entry.visaProcessing || "Information not available yet."}</p>
    </div>
  `;

  const whereToApply = entry.whereToApply && entry.whereToApply.length
    ? `
      <div>
        <h4 class="text-sm font-semibold text-gray-900 mb-2">Where to apply</h4>
        <ul class="space-y-1.5">
          ${entry.whereToApply
            .map(
              (loc) => `
                <li class="text-sm text-gray-600 flex items-start gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0"></span>
                  <span>${formatApplyLink(loc)}</span>
                </li>
              `
            )
            .join("")}
        </ul>
      </div>
    `
    : "";

  const sources = entry.sources && entry.sources.length
    ? entry.sources.map(formatSource).join("")
    : `<li class="text-xs text-gray-500">Verification pending</li>`;

  return `
    <div class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
      <div class="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div class="flex items-center gap-3">
          ${flag}
          <div>
            <h2 class="text-xl font-bold text-gray-900">${entry.country}</h2>
            <p class="text-sm text-gray-500">${entry.region}</p>
          </div>
        </div>
        <div class="flex flex-wrap gap-2">${missionTypes}</div>
      </div>
      <div class="p-4 sm:p-6">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          <div class="lg:col-span-3 space-y-6">
            ${missionsHtml}
          </div>
          <div class="lg:col-span-2 space-y-6 pt-6 border-t border-gray-100 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-8">
            ${visaBlock}
            ${whereToApply}
            <div class="pt-4 border-t border-gray-100">
              <h4 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sources</h4>
              <ul class="space-y-1.5 mb-4">
                ${sources}
              </ul>
              <div class="text-xs text-gray-400 flex items-center gap-1">
                ${icon.check}
                Last verified: ${entry.lastVerified}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function render() {
  const activeData = state.viewMode === "foreign" ? state.countries : state.nigerianMissions;
  const filtered = activeData
    .filter(
      (entry) =>
        searchMatches(entry, state.query) &&
        regionMatches(entry, state.region) &&
        missionTypeMatches(entry, state.missionType)
    )
    .sort((a, b) => a.country.localeCompare(b.country));

  resultCount.textContent = `${filtered.length} countries`;

  if (!filtered.length) {
    cards.innerHTML = `
      <div class="bg-white rounded-2xl border border-gray-200 p-12 text-center">
        <p class="text-gray-500">No countries found matching your criteria.</p>
        <button id="clearAll" class="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm">Clear all filters</button>
      </div>
    `;

    const clearAll = document.getElementById("clearAll");
    clearAll?.addEventListener("click", () => {
      state.query = "";
      state.missionType = ALL_MISSIONS;
      state.region = ALL_REGIONS;
      searchInput.value = "";
      renderFilters(missionFilters, MISSION_TYPES, state.missionType, onMissionTypeChange);
      renderFilters(regionFilters, REGIONS, state.region, onRegionChange);
      render();
    });
    return;
  }

  cards.innerHTML = filtered.map(renderCard).join("");
}

function onMissionTypeChange(value) {
  state.missionType = value;
  renderFilters(missionFilters, MISSION_TYPES, state.missionType, onMissionTypeChange);
  render();
}

function onRegionChange(value) {
  state.region = value;
  renderFilters(regionFilters, REGIONS, state.region, onRegionChange);
  render();
}

function setViewMode(mode) {
  state.viewMode = mode;
  state.query = "";
  state.missionType = ALL_MISSIONS;
  state.region = ALL_REGIONS;
  searchInput.value = "";

  if (mode === "foreign") {
    headerDescription.textContent = "Find foreign embassies, consulates, and visa application centers located in Nigeria.";
    if (footerTitle) footerTitle.textContent = "Countries without a mission in Nigeria";
    if (footerBody) footerBody.textContent = "Use the \"No mission in Nigeria\" filter to see accredited embassies or visa centers for Nigerians.";
    viewForeign.classList.add("bg-white", "text-gray-900", "shadow-sm");
    viewForeign.classList.remove("text-gray-500", "hover:text-gray-700");
    viewNigerian.classList.remove("bg-white", "text-gray-900", "shadow-sm");
    viewNigerian.classList.add("text-gray-500", "hover:text-gray-700");
  } else {
    headerDescription.textContent = "Find Nigerian embassies, high commissions, and consulates located around the world.";
    if (footerTitle) footerTitle.textContent = "Countries without a Nigerian mission";
    if (footerBody) footerBody.textContent = "Some countries are covered by Nigerian missions in neighboring nations (concurrent accreditation).";
    viewNigerian.classList.add("bg-white", "text-gray-900", "shadow-sm");
    viewNigerian.classList.remove("text-gray-500", "hover:text-gray-700");
    viewForeign.classList.remove("bg-white", "text-gray-900", "shadow-sm");
    viewForeign.classList.add("text-gray-500", "hover:text-gray-700");
  }

  renderFilters(missionFilters, MISSION_TYPES, state.missionType, onMissionTypeChange);
  renderFilters(regionFilters, REGIONS, state.region, onRegionChange);
  render();
}

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  render();
});

clearSearch.addEventListener("click", () => {
  state.query = "";
  searchInput.value = "";
  render();
});

viewForeign.addEventListener("click", () => setViewMode("foreign"));
viewNigerian.addEventListener("click", () => setViewMode("nigerian"));

if (scrollTopButton) {
  const toggleScrollButton = () => {
    const show = window.scrollY > 700;
    scrollTopButton.classList.toggle("hidden", !show);
    scrollTopButton.classList.toggle("flex", show);
  };

  window.addEventListener("scroll", toggleScrollButton, { passive: true });
  toggleScrollButton();

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

const embeddedData = window.__DATA__;
if (embeddedData?.missions?.length) {
  state.countries = embeddedData.missions.filter((entry) => entry.verificationStatus === "verified");
  state.nigerianMissions = Array.isArray(embeddedData.nigerianMissions) ? embeddedData.nigerianMissions : [];
  lastUpdated.textContent = embeddedData.meta?.lastUpdated ?? "—";
  renderFilters(missionFilters, MISSION_TYPES, state.missionType, onMissionTypeChange);
  renderFilters(regionFilters, REGIONS, state.region, onRegionChange);
  render();
} else {
  lastUpdated.textContent = "—";
  renderFilters(missionFilters, MISSION_TYPES, state.missionType, onMissionTypeChange);
  renderFilters(regionFilters, REGIONS, state.region, onRegionChange);
  cards.innerHTML = `<div class="bg-white rounded-2xl border border-gray-200 p-6 text-center text-gray-500">Data unavailable.</div>`;
}
