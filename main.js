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

function getTzAbbr(tz, date) {
  try {
    return date.toLocaleTimeString('en-US', { timeZone: tz, timeZoneName: 'short' }).split(' ').pop();
  } catch {
    return '';
  }
}

function render() {
  const root = document.getElementById('root');
  root.innerHTML = '';
  const cities = getSavedCities();

  // FAB add-location button
  let fab = document.querySelector('.fab-add-location');
  if (!fab) {
    fab = document.createElement('button');
    fab.className = 'fab-add-location';
    fab.innerHTML = '<span class="fab-plus">+</span>';
    fab.onclick = () => openAddModal();
    document.body.appendChild(fab);
  }

  cities.forEach((city, idx) => {
    const col = document.createElement('div');
    col.className = 'city-column';
    col.style.background = pastelGradients[idx % pastelGradients.length];

    // Remove button
    const remove = document.createElement('button');
    remove.className = 'remove-btn';
    remove.textContent = '✕';
    remove.title = 'Remove city';
    remove.onclick = () => {
      const cities = getSavedCities();
      cities.splice(idx, 1);
      saveCities(cities);
      render();
    };
    col.appendChild(remove);

    // Time
    const now = new Date();
    let cityTime, hour, min, ampm, day, dateStr, tzAbbr, offsetStr;
    try {
      cityTime = new Date(now.toLocaleString('en-US', { timeZone: city.tz }));
      hour = cityTime.getHours();
      min = cityTime.getMinutes();
      ampm = hour >= 12 ? 'pm' : 'am';
      let hour12 = hour % 12;
      if (hour12 === 0) hour12 = 12;
      day = cityTime.toLocaleDateString('en-US', { weekday: 'short' });
      dateStr = `${day}. ${cityTime.getDate().toString().padStart(2, '0')}${getOrdinal(cityTime.getDate())}`;
      tzAbbr = getTzAbbr(city.tz, cityTime);
      offsetStr = getOffsetString(city.tz);
    } catch {
      hour = '--';
      min = '--';
      ampm = '';
      dateStr = '';
      tzAbbr = '';
      offsetStr = '';
    }

    const timeMain = document.createElement('div');
    timeMain.className = 'city-time-main';
    timeMain.innerHTML = `<span>${String(hour % 12 === 0 ? 12 : hour % 12).padStart(2, '0')}</span><span class="city-time-minor">${String(min).padStart(2, '0')}</span>`;
    col.appendChild(timeMain);

    const ampmDiv = document.createElement('div');
    ampmDiv.className = 'city-time-ampm';
    ampmDiv.textContent = ampm;
    col.appendChild(ampmDiv);

    const dateDiv = document.createElement('div');
    dateDiv.className = 'city-date';
    dateDiv.textContent = dateStr;
    col.appendChild(dateDiv);

    const namesDiv = document.createElement('div');
    namesDiv.className = 'city-names';
    namesDiv.textContent = city.name;
    col.appendChild(namesDiv);

    const tzDiv = document.createElement('div');
    tzDiv.className = 'city-tz';
    tzDiv.textContent = `(${tzAbbr})`;
    col.appendChild(tzDiv);

    const offsetDiv = document.createElement('div');
    offsetDiv.className = 'city-offset';
    offsetDiv.textContent = offsetStr ? (offsetStr.startsWith('+') || offsetStr.startsWith('-') ? offsetStr : `+${offsetStr}`) : '';
    col.appendChild(offsetDiv);

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
    // For now, ask for IANA tz in prompt (or could use a lookup API)
    const tz = prompt('Enter IANA Time Zone for this city (e.g. America/Los_Angeles):');
    if (!tz) return;
    const cities = getSavedCities();
    if (cities.some(c => c.name.toLowerCase() === name.toLowerCase())) return;
    cities.push({ name, tz });
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
setInterval(updateTimes, 1000);
