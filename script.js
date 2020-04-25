const
  main = document.getElementById('main'),
  addUserBtn = document.getElementById('add-user'),
  doubleBtn = document.getElementById('double'),
  showMillionairesBtn = document.getElementById('show-millionaires'),
  sortBtn = document.getElementById('sort'),
  calculateWealthBtn = document.getElementById('calculate-wealth');


let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random User and Add money
function getRandomUser() {
  fetch('https://randomuser.me/api')
    .then(res => res.json())
    .then(data => {
      const user = data.results[0];
      const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
      };
      addData(newUser);
    });

}

// Add new obj to data arr
function addData(obj) {
  data.push(obj);
  updateDOM();
}

//Udate DOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = '<h2>Person<strong>Wealth</strong></h2>';

  providedData.forEach(item => {
    const element = document.createElement('div');
    element.classList.add('person');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    main.append(element);
  });
}

// Double Money
function doubleMoney() {
  data.forEach((el) => el.previousMoney = el.money);
  data = data.map((item) => {
    return { ...item, money: item.money * 2 };
  });
  updateDOM();
}

//Sort list
function sortList() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

//Show only guys with +1 Mio
function showMillionaires() {
  data = data.filter((item) => (item.money > 1000000));
  console.log(data);
  updateDOM();
}

// Calc total value
function totalValue() {
  const total = data.reduce((acc, num) => acc += num.money, 0);

  const totalEl = document.createElement('div');
  totalEl.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(total)}</strong></h3>`;
  main.append(totalEl);

}

// Format number as money 
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event Listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortList);
showMillionairesBtn.addEventListener('click', showMillionaires);
calculateWealthBtn.addEventListener('click', totalValue);