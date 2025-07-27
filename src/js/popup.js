const defaultCities = [
  { name: 'New York', tz: 'America/New_York' },
  { name: 'London', tz: 'Europe/London' },
  { name: 'Tokyo', tz: 'Asia/Tokyo' }
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

function render() {
  const root = document.body;
  root.innerHTML = '';

  const title = document.createElement('h2');
  title.textContent = 'Time Zones';
  title.style.margin = '0 0 8px 0';
  title.style.fontSize = '18px';
  root.appendChild(title);

  const cityList = document.createElement('div');
  cityList.id = 'city-list';
  root.appendChild(cityList);

  const addForm = document.createElement('form');
  addForm.id = 'add-form';
  addForm.style.display = 'flex';
  addForm.style.marginTop = '10px';
  addForm.innerHTML = `
    <input type="text" id="city-name" placeholder="City name" style="flex:2; padding:2px;" required />
    <input type="text" id="city-tz" placeholder="Time zone (e.g. Europe/Paris)" style="flex:3; margin-left:4px; padding:2px;" required />
    <button type="submit" style="margin-left:4px;">Add</button>
  `;
  root.appendChild(addForm);

  const info = document.createElement('div');
  info.style.fontSize = '10px';
  info.style.color = '#888';
  info.style.marginTop = '8px';
  info.textContent = 'Tip: Time zone IDs like "America/Los_Angeles". Remove cities by clicking the X.';
  root.appendChild(info);

  updateCityList();

  addForm.onsubmit = (e) => {
    e.preventDefault();
    const name = addForm.querySelector('#city-name').value.trim();
    const tz = addForm.querySelector('#city-tz').value.trim();
    if (!name || !tz) return;
    const cities = getSavedCities();
    if (cities.some(c => c.name.toLowerCase() === name.toLowerCase())) return;
    cities.push({ name, tz });
    saveCities(cities);
    addForm.reset();
    updateCityList();
  };
}

function updateCityList() {
  const cityList = document.getElementById('city-list');
  if (!cityList) return;
  cityList.innerHTML = '';
  const cities = getSavedCities();
  cities.forEach((city, idx) => {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'center';
    row.style.marginBottom = '4px';

    const name = document.createElement('span');
    name.textContent = city.name;
    name.style.flex = '2';
    name.style.fontWeight = 'bold';
    row.appendChild(name);

    const time = document.createElement('span');
    time.id = `time-${idx}`;
    time.style.flex = '3';
    time.style.fontFamily = 'monospace';
    time.style.marginLeft = '8px';
    row.appendChild(time);

    const remove = document.createElement('button');
    remove.textContent = '✕';
    remove.title = 'Remove city';
    remove.style.marginLeft = '8px';
    remove.style.background = 'none';
    remove.style.border = 'none';
    remove.style.color = '#c00';
    remove.style.cursor = 'pointer';
    remove.onclick = () => {
      const cities = getSavedCities();
      cities.splice(idx, 1);
      saveCities(cities);
      updateCityList();
    };
    row.appendChild(remove);

    cityList.appendChild(row);
  });
  updateTimes();
}

function updateTimes() {
  const cities = getSavedCities();
  cities.forEach((city, idx) => {
    const timeEl = document.getElementById(`time-${idx}`);
    if (!timeEl) return;
    try {
      const now = new Date();
      const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: city.tz };
      const timeStr = new Intl.DateTimeFormat('en-US', options).format(now);
      timeEl.textContent = timeStr;
    } catch {
      timeEl.textContent = 'Invalid TZ';
    }
  });
}

render();
setInterval(updateTimes, 1000);
