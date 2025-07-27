let addModalOpen = false;

const defaultCities = [
  { name: 'Los Angeles, USA', tz: 'America/Los_Angeles' },
  { name: 'Houston, USA', tz: 'America/Chicago' },
  { name: 'Toronto, CAN', tz: 'America/Toronto' },
  { name: 'Sao Paulo, BRA', tz: 'America/Sao_Paulo' },
  { name: 'London, GBR', tz: 'Europe/London' },
  { name: 'Jaipur, IND', tz: 'Asia/Kolkata' },
  { name: 'Sydney, AUS', tz: 'Australia/Sydney' }
];

const pastelGradients = [
  'linear-gradient(180deg, #b8e1dc 0%, #e6f6e6 100%)',
  'linear-gradient(180deg, #f7f6c5 0%, #f9f6e7 100%)',
  'linear-gradient(180deg, #fff6b7 0%, #fffde4 100%)',
  'linear-gradient(180deg, #ffe29f 0%, #ffd6a7 100%)',
  'linear-gradient(180deg, #ffb98a 0%, #ffd6a7 100%)',
  'linear-gradient(180deg, #6e478c 0%, #b8a1d1 100%)',
  'linear-gradient(180deg, #0a2239 0%, #3a506b 100%)',
];

// --- Built-in city list for autocomplete ---
const CITY_DB = [
  { name: 'New York, USA', tz: 'America/New_York' },
  { name: 'Los Angeles, USA', tz: 'America/Los_Angeles' },
  { name: 'London, GBR', tz: 'Europe/London' },
  { name: 'Paris, FRA', tz: 'Europe/Paris' },
  { name: 'Tokyo, JPN', tz: 'Asia/Tokyo' },
  { name: 'Sydney, AUS', tz: 'Australia/Sydney' },
  { name: 'Toronto, CAN', tz: 'America/Toronto' },
  { name: 'Sao Paulo, BRA', tz: 'America/Sao_Paulo' },
  { name: 'San Francisco, USA', tz: 'America/Los_Angeles' },
  { name: 'Vancouver, CAN', tz: 'America/Vancouver' },
  { name: 'Houston, USA', tz: 'America/Chicago' },
  { name: 'Chicago, USA', tz: 'America/Chicago' },
  { name: 'Mexico City, MEX', tz: 'America/Mexico_City' },
  { name: 'Beijing, CHN', tz: 'Asia/Shanghai' },
  { name: 'Moscow, RUS', tz: 'Europe/Moscow' },
  { name: 'Berlin, GER', tz: 'Europe/Berlin' },
  { name: 'Madrid, ESP', tz: 'Europe/Madrid' },
  { name: 'Rome, ITA', tz: 'Europe/Rome' },
  { name: 'Cape Town, ZAF', tz: 'Africa/Johannesburg' },
  { name: 'Dubai, ARE', tz: 'Asia/Dubai' },
  { name: 'Mumbai, IND', tz: 'Asia/Kolkata' },
  { name: 'Jaipur, IND', tz: 'Asia/Kolkata' },
  { name: 'Rio de Janeiro, BRA', tz: 'America/Sao_Paulo' },
  { name: 'Hong Kong, HKG', tz: 'Asia/Hong_Kong' },
  { name: 'Singapore, SGP', tz: 'Asia/Singapore' },
  { name: 'Bangkok, THA', tz: 'Asia/Bangkok' },
  { name: 'Seoul, KOR', tz: 'Asia/Seoul' },
  { name: 'Istanbul, TUR', tz: 'Europe/Istanbul' },
  { name: 'Buenos Aires, ARG', tz: 'America/Argentina/Buenos_Aires' },
  { name: 'Auckland, NZL', tz: 'Pacific/Auckland' },
  { name: 'Johannesburg, ZAF', tz: 'Africa/Johannesburg' },
  { name: 'Cairo, EGY', tz: 'Africa/Cairo' },
  { name: 'Lagos, NGA', tz: 'Africa/Lagos' },
  { name: 'Lisbon, PRT', tz: 'Europe/Lisbon' },
  { name: 'Zurich, CHE', tz: 'Europe/Zurich' },
  { name: 'Dubai, ARE', tz: 'Asia/Dubai' },
  { name: 'Kolkata, IND', tz: 'Asia/Kolkata' },
  { name: 'Delhi, IND', tz: 'Asia/Kolkata' },
  { name: 'Bangalore, IND', tz: 'Asia/Kolkata' },
  { name: 'San Diego, USA', tz: 'America/Los_Angeles' },
  { name: 'Boston, USA', tz: 'America/New_York' },
  { name: 'Seattle, USA', tz: 'America/Los_Angeles' },
  { name: 'Miami, USA', tz: 'America/New_York' },
  { name: 'Montreal, CAN', tz: 'America/Toronto' },
  { name: 'Ottawa, CAN', tz: 'America/Toronto' },
  { name: 'Edmonton, CAN', tz: 'America/Edmonton' },
  { name: 'Calgary, CAN', tz: 'America/Edmonton' },
  { name: 'Brisbane, AUS', tz: 'Australia/Brisbane' },
  { name: 'Melbourne, AUS', tz: 'Australia/Melbourne' },
  { name: 'Perth, AUS', tz: 'Australia/Perth' },
  { name: 'Adelaide, AUS', tz: 'Australia/Adelaide' },
  { name: 'Wellington, NZL', tz: 'Pacific/Auckland' },
  { name: 'Christchurch, NZL', tz: 'Pacific/Auckland' },
  { name: 'Osaka, JPN', tz: 'Asia/Tokyo' },
  { name: 'Nagoya, JPN', tz: 'Asia/Tokyo' },
  { name: 'Kyoto, JPN', tz: 'Asia/Tokyo' },
  { name: 'Shanghai, CHN', tz: 'Asia/Shanghai' },
  { name: 'Guangzhou, CHN', tz: 'Asia/Shanghai' },
  { name: 'Shenzhen, CHN', tz: 'Asia/Shanghai' },
  { name: 'Chengdu, CHN', tz: 'Asia/Shanghai' },
  { name: 'Nairobi, KEN', tz: 'Africa/Nairobi' },
  { name: 'Casablanca, MAR', tz: 'Africa/Casablanca' },
  { name: 'Helsinki, FIN', tz: 'Europe/Helsinki' },
  { name: 'Stockholm, SWE', tz: 'Europe/Stockholm' },
  { name: 'Oslo, NOR', tz: 'Europe/Oslo' },
  { name: 'Copenhagen, DNK', tz: 'Europe/Copenhagen' },
  { name: 'Warsaw, POL', tz: 'Europe/Warsaw' },
  { name: 'Prague, CZE', tz: 'Europe/Prague' },
  { name: 'Budapest, HUN', tz: 'Europe/Budapest' },
  { name: 'Vienna, AUT', tz: 'Europe/Vienna' },
  { name: 'Brussels, BEL', tz: 'Europe/Brussels' },
  { name: 'Amsterdam, NLD', tz: 'Europe/Amsterdam' },
  { name: 'Dublin, IRL', tz: 'Europe/Dublin' },
  { name: 'Athens, GRC', tz: 'Europe/Athens' },
  { name: 'Bucharest, ROU', tz: 'Europe/Bucharest' },
  { name: 'Sofia, BGR', tz: 'Europe/Sofia' },
  { name: 'Belgrade, SRB', tz: 'Europe/Belgrade' },
  { name: 'Zagreb, HRV', tz: 'Europe/Zagreb' },
  { name: 'Ljubljana, SVN', tz: 'Europe/Ljubljana' },
  { name: 'Sarajevo, BIH', tz: 'Europe/Sarajevo' },
  { name: 'Skopje, MKD', tz: 'Europe/Skopje' },
  { name: 'Podgorica, MNE', tz: 'Europe/Podgorica' },
  { name: 'Tirana, ALB', tz: 'Europe/Tirane' },
  { name: 'Kiev, UKR', tz: 'Europe/Kiev' },
  { name: 'Minsk, BLR', tz: 'Europe/Minsk' },
  { name: 'Riga, LVA', tz: 'Europe/Riga' },
  { name: 'Tallinn, EST', tz: 'Europe/Tallinn' },
  { name: 'Vilnius, LTU', tz: 'Europe/Vilnius' },
  { name: 'Luxembourg, LUX', tz: 'Europe/Luxembourg' },
  { name: 'Monaco, MCO', tz: 'Europe/Monaco' },
  { name: 'Andorra la Vella, AND', tz: 'Europe/Andorra' },
  { name: 'San Marino, SMR', tz: 'Europe/Rome' },
  { name: 'Vaduz, LIE', tz: 'Europe/Vaduz' },
  { name: 'Reykjavik, ISL', tz: 'Atlantic/Reykjavik' },
  { name: 'Greenwich, GBR', tz: 'Europe/London' }
];

function getSavedCities() {
  const saved = localStorage.getItem('fio-cities');
  if (!saved) return defaultCities;
  try {
    return JSON.parse(saved);
  } catch {
    return defaultCities;
  }
}

function saveCities(cities) {
  localStorage.setItem('fio-cities', JSON.stringify(cities));
}

function getOffsetString(tz) {
  try {
    const now = new Date();
    const offsetMin = -now.getTimezoneOffset() + (now.getTimezoneOffset() - new Date(now.toLocaleString('en-US', { timeZone: tz })).getTimezoneOffset());
    const offsetHr = offsetMin / 60;
    return (offsetHr > 0 ? '+' : '') + offsetHr;
  } catch {
    return '';
  }
}

function getTzAbbr(tz, date = new Date()) {
  try {
    // Use toLocaleTimeString with timeZoneName: 'short' and extract the abbreviation
    const parts = new Intl.DateTimeFormat('en-US', { timeZone: tz, timeZoneName: 'short' }).formatToParts(date);
    const tzName = parts.find(p => p.type === 'timeZoneName');
    if (!tzName) return '';
    // Extract abbreviation (e.g., 'EDT', 'EST', 'PDT', etc)
    const abbr = tzName.value.match(/[A-Z]{2,5}/);
    return abbr ? abbr[0] : tzName.value;
  } catch {
    return '';
  }
}

function getTzOffsetHours(tz, date = new Date()) {
  // Returns offset in hours from UTC for a given tz
  try {
    // Get the UTC time in ms
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    // Get the tz time in ms
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: tz }));
    // Offset in minutes
    const diff = (tzDate.getTime() - utcDate.getTime()) / (60 * 1000);
    return +(diff / 60).toFixed(1);
  } catch {
    return 0;
  }
}

function getHomeCity() {
  return localStorage.getItem('fio-home-city') || '';
}
function setHomeCity(name) {
  localStorage.setItem('fio-home-city', name);
}

function hutIcon(filled = false) {
  // Simple SVG hut/home icon, filled or outline
  return filled
    ? `<svg width="22" height="22" viewBox="0 0 22 22" fill="#b84cff" xmlns="http://www.w3.org/2000/svg"><path d="M11 3L3 10h2v7a1 1 0 001 1h3v-4h2v4h3a1 1 0 001-1v-7h2L11 3z"/></svg>`
    : `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="#b84cff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><path d="M11 3L3 10h2v7a1 1 0 001 1h3v-4h2v4h3a1 1 0 001-1v-7h2L11 3z"/></svg>`;
}

// Canonical IANA mapping for major cities
const CANONICAL_TZ = {
  'New York, USA': 'America/New_York',
  'Toronto, CAN': 'America/New_York',
  'Montreal, CAN': 'America/New_York',
  'Boston, USA': 'America/New_York',
  'Washington, USA': 'America/New_York',
  'San Diego, USA': 'America/Los_Angeles',
  'Los Angeles, USA': 'America/Los_Angeles',
  'San Francisco, USA': 'America/Los_Angeles',
  'Vancouver, CAN': 'America/Los_Angeles',
  'Seattle, USA': 'America/Los_Angeles',
  'Houston, USA': 'America/Chicago',
  'Chicago, USA': 'America/Chicago',
  'Mexico City, MEX': 'America/Mexico_City',
  'London': 'Europe/London',
  'London, GBR': 'Europe/London',
  'Paris, FRA': 'Europe/Paris',
  'Berlin, GER': 'Europe/Berlin',
  'Tokyo': 'Asia/Tokyo',
  'Tokyo, JPN': 'Asia/Tokyo',
  'Seoul, KOR': 'Asia/Seoul',
  'Sydney, AUS': 'Australia/Sydney',
  'Melbourne, AUS': 'Australia/Melbourne',
  'Brisbane, AUS': 'Australia/Brisbane',
  'Sao Paulo, BRA': 'America/Sao_Paulo',
  'Rio de Janeiro, BRA': 'America/Sao_Paulo',
  // ... add more as needed ...
};

function normalizeCityTz(city) {
  // If city name is in canonical map, use that IANA
  if (CANONICAL_TZ[city.name]) {
    return { ...city, tz: CANONICAL_TZ[city.name] };
  }
  return city;
}

function groupCitiesByTimeZone(cities) {
  // Returns array of { tz, cities: [city, ...], offset, abbr, time, ampm, dateStr }
  const now = new Date();
  const groups = {};
  for (const city of cities) {
    const normCity = normalizeCityTz(city);
    if (!groups[normCity.tz]) groups[normCity.tz] = [];
    groups[normCity.tz].push(normCity);
  }
  return Object.entries(groups).map(([tz, cities]) => {
    // Use the first city for display
    const city = cities[0];
    let cityTime, hour, min, ampm, day, dateStr, abbr, offset;
    try {
      cityTime = new Date(now.toLocaleString('en-US', { timeZone: tz }));
      hour = cityTime.getHours();
      min = cityTime.getMinutes();
      ampm = hour >= 12 ? 'pm' : 'am';
      let hour12 = hour % 12;
      if (hour12 === 0) hour12 = 12;
      day = cityTime.toLocaleDateString('en-US', { weekday: 'short' });
      dateStr = `${day}. ${cityTime.getDate().toString().padStart(2, '0')}${getOrdinal(cityTime.getDate())}`;
      abbr = getTzAbbr(tz, cityTime);
      offset = getTzOffsetHours(tz, now);
    } catch {
      hour = '--';
      min = '--';
      ampm = '';
      dateStr = '';
      abbr = '';
      offset = 0;
    }
    return {
      tz,
      cities,
      offset,
      abbr,
      hour,
      min,
      ampm,
      dateStr,
      cityTime
    };
  });
}

function render() {
  const root = document.getElementById('root');
  root.innerHTML = '';
  let cities = getSavedCities();
  const homeCity = getHomeCity();
  let homeTz = null;
  if (homeCity) {
    const homeObj = cities.find(c => c.name === homeCity);
    if (homeObj) homeTz = homeObj.tz;
  }

  // Group and sort
  let groups = groupCitiesByTimeZone(cities);
  // Debug: log offsets for each group
  const now = new Date();
  groups.forEach(g => {
    console.log(`TZ: ${g.tz}, Offset: ${getTzOffsetHours(g.tz, now)}, Cities: ${g.cities.map(c => c.name).join(', ')}`);
  });
  groups = groups.sort((a, b) => {
    const offA = getTzOffsetHours(a.tz, now);
    const offB = getTzOffsetHours(b.tz, now);
    if (offA !== offB) return offA - offB; // west to east
    // If offsets are equal, sort by first city name
    return a.cities[0].name.localeCompare(b.cities[0].name);
  });

  // FAB add-location button
  let fab = document.querySelector('.fab-add-location');
  if (!fab) {
    fab = document.createElement('button');
    fab.className = 'fab-add-location';
    fab.innerHTML = '<span class="fab-plus">+</span>';
    fab.onclick = () => openAddModal();
    document.body.appendChild(fab);
  }

  groups.forEach((group, idx) => {
    const col = document.createElement('div');
    col.className = 'city-column';
    col.style.background = pastelGradients[idx % pastelGradients.length];
    // Home logic: if any city in group is home
    const isHome = group.cities.some(c => c.name === homeCity);
    if (isHome) {
      col.style.boxShadow = '0 0 0 3px #b84cff, 0 4px 32px rgba(0,0,0,0.3)';
    }

    // Home/Hut icon
    const homeBtn = document.createElement('button');
    homeBtn.className = 'home-btn';
    homeBtn.innerHTML = hutIcon(isHome);
    homeBtn.title = isHome ? 'Home' : 'Set as Home';
    homeBtn.style.position = 'absolute';
    homeBtn.style.top = '16px';
    homeBtn.style.left = '16px';
    homeBtn.style.background = 'none';
    homeBtn.style.border = 'none';
    homeBtn.style.cursor = 'pointer';
    homeBtn.style.padding = '0';
    homeBtn.style.opacity = isHome ? '1' : '0.7';
    homeBtn.onmouseenter = () => homeBtn.style.opacity = '1';
    homeBtn.onmouseleave = () => homeBtn.style.opacity = isHome ? '1' : '0.7';
    homeBtn.onclick = (e) => {
      e.stopPropagation();
      setHomeCity(group.cities[0].name); // set first city as home
      render();
    };
    col.appendChild(homeBtn);

    // Remove button (removes all cities in group)
    const remove = document.createElement('button');
    remove.className = 'remove-btn';
    remove.textContent = '✕';
    remove.title = 'Remove all cities in this time zone';
    remove.onclick = () => {
      let all = getSavedCities();
      const names = group.cities.map(c => c.name);
      const wasHome = group.cities.some(c => c.name === getHomeCity());
      all = all.filter(c => !names.includes(c.name));
      saveCities(all);
      if (wasHome) setHomeCity('');
      render();
    };
    col.appendChild(remove);

    // Time
    const timeMain = document.createElement('div');
    timeMain.className = 'city-time-main';
    timeMain.innerHTML = `<span>${String(group.hour % 12 === 0 ? 12 : group.hour % 12).padStart(2, '0')}</span><span class="city-time-minor">${String(group.min).padStart(2, '0')}</span>`;
    col.appendChild(timeMain);

    const ampmDiv = document.createElement('div');
    ampmDiv.className = 'city-time-ampm';
    ampmDiv.textContent = group.ampm;
    col.appendChild(ampmDiv);

    const dateDiv = document.createElement('div');
    dateDiv.className = 'city-date';
    dateDiv.textContent = group.dateStr;
    col.appendChild(dateDiv);

    // List all city names in group
    group.cities.forEach((city, i) => {
      const namesDiv = document.createElement('div');
      namesDiv.className = 'city-names';
      namesDiv.textContent = city.name;
      col.appendChild(namesDiv);
    });

    const tzDiv = document.createElement('div');
    tzDiv.className = 'city-tz';
    tzDiv.textContent = group.abbr ? `(${group.abbr})` : '';
    col.appendChild(tzDiv);

    // --- Home offset difference ---
    let diffDiv = document.createElement('div');
    diffDiv.className = 'city-diff';
    if (homeTz) {
      const homeOffset = getTzOffsetHours(homeTz);
      let diff = group.offset - homeOffset;
      if (isHome) {
        diffDiv.textContent = '';
      } else if (diff === 0) {
        diffDiv.textContent = '0';
      } else if (diff > 0) {
        diffDiv.textContent = `+${diff}`;
      } else {
        diffDiv.textContent = `${diff}`;
      }
    } else {
      diffDiv.textContent = '';
    }
    diffDiv.style.textAlign = 'center';
    diffDiv.style.marginTop = 'auto';
    diffDiv.style.marginBottom = '0.5em';
    diffDiv.style.fontSize = '1.2rem';
    diffDiv.style.color = '#b84cff';
    col.appendChild(diffDiv);

    root.appendChild(col);
  });

  // Remove add column at the end (now handled by FAB + modal)
  removeAddModal();
  if (addModalOpen) renderAddModal();
}

function getOrdinal(n) {
  if (n > 3 && n < 21) return 'th';
  switch (n % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
}

function updateTimes() {
  render();
}

function openAddModal() {
  addModalOpen = true;
  render();
}

function closeAddModal() {
  addModalOpen = false;
  removeAddModal();
}

function removeAddModal() {
  const existing = document.querySelector('.add-modal-overlay');
  if (existing) existing.remove();
}

function renderAddModal() {
  removeAddModal();
  const overlay = document.createElement('div');
  overlay.className = 'add-modal-overlay';

  const card = document.createElement('div');
  card.className = 'add-modal-card';

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.className = 'add-modal-close';
  closeBtn.innerHTML = '&times;';
  closeBtn.onclick = closeAddModal;
  card.appendChild(closeBtn);

  // Title
  const title = document.createElement('div');
  title.className = 'add-modal-title';
  title.textContent = 'Add Location';
  card.appendChild(title);

  // Label
  const label = document.createElement('div');
  label.className = 'add-modal-label';
  label.textContent = 'City name';
  card.appendChild(label);

  // Input
  const input = document.createElement('input');
  input.className = 'add-modal-input';
  input.type = 'text';
  input.placeholder = 'Type your location here';
  card.appendChild(input);

  // Autocomplete dropdown
  const dropdown = document.createElement('div');
  dropdown.style.position = 'relative';
  dropdown.style.width = '100%';
  dropdown.style.zIndex = '10';
  card.appendChild(dropdown);

  let selectedCity = null;
  let filtered = [];

  function updateDropdown() {
    dropdown.innerHTML = '';
    const val = input.value.trim().toLowerCase();
    if (!val) return;
    filtered = CITY_DB.filter(c => c.name.toLowerCase().includes(val));
    if (filtered.length === 0) {
      const nores = document.createElement('div');
      nores.textContent = 'No results';
      nores.style.padding = '8px 12px';
      nores.style.color = '#888';
      dropdown.appendChild(nores);
      selectedCity = null;
      return;
    }
    filtered.slice(0, 8).forEach((city, idx) => {
      const opt = document.createElement('div');
      opt.textContent = city.name;
      opt.style.padding = '8px 12px';
      opt.style.cursor = 'pointer';
      opt.style.background = idx === 0 ? '#f3eaff' : '#fff';
      opt.onmouseenter = () => {
        Array.from(dropdown.children).forEach(c => c.style.background = '#fff');
        opt.style.background = '#f3eaff';
        selectedCity = city;
      };
      opt.onclick = () => {
        input.value = city.name;
        selectedCity = city;
        updateDropdown();
      };
      dropdown.appendChild(opt);
      if (idx === 0) selectedCity = city;
    });
  }

  input.addEventListener('input', updateDropdown);
  input.addEventListener('focus', updateDropdown);
  input.addEventListener('blur', () => setTimeout(() => dropdown.innerHTML = '', 200));

  // Actions
  const actions = document.createElement('div');
  actions.className = 'add-modal-actions';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'add-modal-btn cancel';
  cancelBtn.textContent = 'Cancel';
  cancelBtn.onclick = closeAddModal;
  actions.appendChild(cancelBtn);

  const addBtn = document.createElement('button');
  addBtn.className = 'add-modal-btn';
  addBtn.textContent = 'Add';
  addBtn.onclick = (e) => {
    e.preventDefault();
    const name = input.value.trim();
    if (!name) return;
    const city = CITY_DB.find(c => c.name.toLowerCase() === name.toLowerCase());
    if (!city) return;
    const cities = getSavedCities();
    if (cities.some(c => c.name.toLowerCase() === city.name.toLowerCase())) return;
    cities.push(normalizeCityTz({ name: city.name, tz: city.tz }));
    saveCities(cities);
    closeAddModal();
    render();
  };
  actions.appendChild(addBtn);

  card.appendChild(actions);
  overlay.appendChild(card);
  document.body.appendChild(overlay);

  input.focus();
  overlay.onclick = (e) => {
    if (e.target === overlay) closeAddModal();
  };
}

render();
setInterval(() => {
  if (!addModalOpen) render();
}, 1000);
