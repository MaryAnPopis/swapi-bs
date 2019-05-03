const SWAPI = 'https://swapi.co/api/';
let currentPage = 1;
const pages = 9;

const next = document.getElementById("next"),
prev = document.getElementById("prev");

const get = url => {
    return fetch(`${url}`)
      .then(response => response.json())
      .then(data =>{ return data})
      .catch(err => console.error(err));
  };
  

const printTable = () => {
    let people = get(`${SWAPI}people?page=${currentPage}`);
    const tbody = document.getElementsByTagName("tbody");

    people.then(data => {
      let arrPeople = data.results;
      arrPeople.forEach(element => {
        tbody[0].appendChild(row(element));
      });
    });

}

const clearTable = () =>{
    const tbody = document.getElementsByTagName("tbody");
    tbody[0].innerHTML = '';
}

const printSpecies = specieEndpoint => {
    let row = document.createElement("tr");
    let getSpecie = get(`${specieEndpoint}`)
    getSpecie.then(data => { 
        row.appendChild(cell(data.name));
     });
        
    return row;
  };

const row = people => {
    let row = document.createElement("tr");
  
    row.appendChild(cell(people.name));
    row.appendChild(cell((people.mass)));
    row.appendChild(cell(people.height));
    row.appendChild(printSpecies(people.species));
    row.appendChild(cell(people.birth_year));
   ;
    return row;
  };

const cell = data => {
    let td = document.createElement("td");
    td.innerHTML = `<td>${data}</td>`;
    return td;
  };

const totalPages = () => {
    let people = get(`${SWAPI}people?page=1`);
    let totalPeople,pages;
    people.then(data => {
        totalPeople = data.count
        pages = totalPeople / 10;

    });
    return Math.ceil(pages);
}

function nextPage() {
    if (currentPage >= pages) return;

    currentPage += 1;

    makePageButtons(currentPage); 
  

    clearTable();
    printTable(currentPage);
  }
  
  function prevPage() {

    if (currentPage <= 1) return;
    currentPage -= 1;
    
    makePageButtons(currentPage); 


    clearTable();
    printTable(currentPage);
  }

const makePageButtons = () => {
    let currenPageStyle = 'currentPage';
    const pages = [];
    for (let x = 1; x <= 9; x++) {
      pages.push(x);
    }
    document.getElementById('pagination-ul').innerHTML = '';
    pages.map( (page) => {
      return (
          document.getElementById('pagination-ul').innerHTML += 
        `<li class="page-item"><a class="page-link ${currentPage == page && currenPageStyle} disabled" id=${page} href="">${page}</a></li>`)
    })
 
  }



next.addEventListener("click", nextPage);
prev.addEventListener("click", prevPage);


makePageButtons();
printTable();