// TODO: write code here

// comment this to pass build
const unusedVariable = "variable";

// for demonstration purpose only
export default function demo(value) {
  return `Demo: ${value}`;
}

console.log("app.js included");

let filmArray = [
  {
    id: 26,
    title: "Побег из Шоушенка",
    imdb: 9.3,
    year: 1994,
  },
  {
    id: 25,
    title: "Крёстный отец",
    imdb: 9.2,
    year: 1972,
  },
  {
    id: 27,
    title: "Крёстный отец 2",
    imdb: 9.0,
    year: 1974,
  },
  {
    id: 1047,
    title: "Тёмный рыцарь",
    imdb: 9.0,
    year: 2008,
  },
  {
    id: 223,
    title: "Криминальное чтиво",
    imdb: 8.9,
    year: 1994,
  },
];

export function outputTitle() {
  let rowElTitle = document.createElement("tr");
  rowElTitle.classList.add("title");
  for (let index = 0; index < 4; index++) {
    let cellElTitle = document.createElement("th");
    switch (index) {
      case 0:
        cellElTitle.textContent = "id";
        break;
      case 1:
        cellElTitle.textContent = "title";
        break;
      case 2:
        cellElTitle.textContent = "year";
        break;
      case 3:
        cellElTitle.textContent = "imdb";
        break;
    }
    rowElTitle.append(cellElTitle);
    let tableEl = document.querySelector(".table");
    tableEl.append(rowElTitle);
  }
}

export function outputFilms1(arrayFilms) {
  for (const film of arrayFilms) {
    let rowEl = document.createElement("tr");
    rowEl.classList.add("row");
    for (let index = 0; index < 4; index++) {
      let cellEl = document.createElement("td");
      switch (index) {
        case 0:
          cellEl.textContent = film.id;
          rowEl.setAttribute("data-id", film.id);
          break;
        case 1:
          cellEl.textContent = film.title;
          rowEl.setAttribute("data-title", film.title);
          break;
        case 2:
          cellEl.textContent = film.year;
          rowEl.setAttribute("data-year", film.year);
          break;
        case 3:
          cellEl.textContent = film.imdb;
          rowEl.setAttribute("data-imdb", film.imdb);
          break;
      }
      rowEl.append(cellEl);
      let tableEl = document.querySelector(".table");
      tableEl.append(rowEl);
    }
  }
}

export function outputFilms2(arrayFilms) {
  for (const film of arrayFilms) {
    let rowEl = document.createElement("tr");
    for (let index = 0; index < 4; index++) {
      let cellEl = document.createElement("td");
      switch (index) {
        case 0:
          cellEl.textContent = film.dataset.id;
          rowEl.setAttribute("data-id", film.dataset.id);
          break;
        case 1:
          cellEl.textContent = film.dataset.title;
          rowEl.setAttribute("data-title", film.dataset.title);
          break;
        case 2:
          cellEl.textContent = film.dataset.year;
          rowEl.setAttribute("data-year", film.dataset.year);
          break;
        case 3:
          cellEl.textContent = film.dataset.imdb;
          rowEl.setAttribute("data-imdb", film.dataset.imdb);
          break;
      }
      rowEl.append(cellEl);
      let tableEl = document.querySelector(".table");
      tableEl.append(rowEl);
    }
  }
}

export function removeFilms() {
  let arrFilmEl = document.querySelectorAll("tr");
  for (let index = 0; index < arrFilmEl.length; index++) {
    let filmEl = document.querySelector("tr");
    if (filmEl) {
      filmEl.remove();
    }
  }
}

export function sortFilm(titleTable, arrayFilms, f) {
  if (isNaN(arrayFilms[0].dataset[titleTable])) {
    if (f === 1) {
      arrayFilms.sort((a, b) =>
        a.dataset[titleTable].localeCompare(b.dataset[titleTable]),
      );
    } else {
      arrayFilms.sort((a, b) =>
        b.dataset[titleTable].localeCompare(a.dataset[titleTable]),
      );
    }
  } else {
    if (f === 1) {
      arrayFilms.sort(
        (a, b) => Number(a.dataset[titleTable]) - Number(b.dataset[titleTable]),
      );
    } else {
      arrayFilms.sort(
        (a, b) => Number(b.dataset[titleTable]) - Number(a.dataset[titleTable]),
      );
    }
  }
  return arrayFilms;
}

export function initApp() {
  outputTitle();
  outputFilms1(filmArray);
  let filmsFromDom = document.getElementsByClassName("row");
  let arrFromDom = Array.from(filmsFromDom);
  // filmsFromDom[0].remove();
  // arrFromDom.splice(0, 1);
  const keysArr = Object.keys(arrFromDom[1].dataset);
  let arrNew = [...keysArr];
  let n = 1;
  for (let ind = 0; ind < 4; ind++) {
    arrNew.splice(n, 0, keysArr[ind]);
    n = n + 2;
  }
  let flag = 1;
  let index = -1;
  setInterval(() => {
    if (++index === arrNew.length) {
      index = -1;
    } else {
      // removeFilms();
      let arrFilmNew = sortFilm(arrNew[index], arrFromDom, flag);
      // outputTitle();
      // outputFilms2(arrFilmNew);
      flag = flag * -1;
      let parentEl = document.querySelector(".table");
      arrFilmNew.forEach((filmRow, indexCurrent) => {
        let indexOld = Array.prototype.indexOf.call(filmsFromDom, filmRow);
        parentEl.insertBefore(
          filmsFromDom[indexOld],
          filmsFromDom[indexCurrent + 1],
        );
      });
    }
  }, 4000);
}
