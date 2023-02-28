"use strict";

/**
 * Reading & initializing variables
 */
let paginationNumbers;
const paginationList = document.querySelector('.pagination');
const shoesTable = document.querySelector('#shoes-table-body');
const getTableRows = document.querySelector('#shoes-table-body');
const productsPerPage = document.querySelector('#products-per-page');

/**
 * 
 * Fetcing data from shoes.json & listen for changes on products per page value
 */
async function displayShoes() {
    const shoesJsonUrl = "shoes.json";
    const shoesJsonRequest = new Request(shoesJsonUrl);
    const shoesJsonResponse =  await fetch(shoesJsonRequest);
    const shoesTable =  await shoesJsonResponse.json();
    populateShoesTable(shoesTable);
    populatePaginationLinks(shoesTable, productsPerPage.value);
    populatePaginatedResults(productsPerPage.value);
    previousNextPage();
    paginationList.children[1].click();

    productsPerPage.addEventListener( 'change', () => {
        populatePaginationLinks(shoesTable, productsPerPage.value);
        populatePaginatedResults(productsPerPage.value);
        previousNextPage();
        paginationList.children[1].click();
    });
} 

/**
 * Populates the shoes table
 * @param {array} arr 
 */
function populateShoesTable(arr) {
     let content = "";
     for(let i = 0; i < arr.length; i++) {
       content += `<tr>
                     <td>${arr[i].id}</td>
                     <td><img src= "${arr[i].image}" width="150" /></td>
                     <td>${arr[i].description}</td>
                     <td>${arr[i].size}</td>
                     <td>${arr[i].color}</td>
                     <td>${arr[i].sex}</td>
                     <td>&euro;${arr[i].price}</td>
                   </tr>`;
     }
     shoesTable.innerHTML = content;   
}

/**
 * Populates pagination links, below the shoes table
 * @param {array} arr 
 * @param {number} m 
 */
function populatePaginationLinks(arr, m) {
    let paginationContent = "";
    paginationNumbers = (arr.length % m == 0) ? arr.length / m : Math.trunc((arr.length / m )) + 1;
    paginationContent = `<li class="page-item mx-1"><a class="page-link" href="#">προηγούμενο</a></li>`;
    for(let i = 0; i < paginationNumbers; i++) {
        paginationContent += `<li class="page-item mx-1"><a class="page-link" href="#">${i+1}</a></li>`;
    }
    paginationContent += `<li class="page-item mx-1"><a class="page-link" href="#">επόμενο</a></li>`;
    paginationList.innerHTML = paginationContent;
    if(paginationNumbers < 2) {
        paginationList.firstElementChild.classList.add('disabled');
        paginationList.lastElementChild.classList.add('disabled');
    }
}


/**
 * Populates the shoes table after pagination
 * @param {number} rowsPerPage 
 */
function populatePaginatedResults(rowsPerPage) {
    for(let i = 1; i < paginationNumbers + 1; i++) {
          paginationList.children[i].addEventListener( 'click', (e) => {
                  e.preventDefault();
                  for(let j = 1; j < paginationNumbers + 1; j++) {
                       if( j === i) {
                        paginationList.children[j].classList.add('active');
                       } else {
                        paginationList.children[j].classList.remove('active');
                       }
                  }
                  for(let k = 0; k < getTableRows.children.length; k++) {
                        if(k >= rowsPerPage * (i - 1) && k < rowsPerPage * i ) {
                              getTableRows.children[k].classList.add('d-table-row');
                              getTableRows.children[k].classList.remove('d-none');
                        } else {
                             getTableRows.children[k].classList.add('d-none');
                             getTableRows.children[k].classList.remove('d-table-row');  
                        }
                  } 
          });
    }  
}

/**
 *  Displaying results for the previous & next page
 */
function previousNextPage() {
     paginationList.firstElementChild.addEventListener( 'click', () => {
       for( let i = 1; i < paginationNumbers + 1; i++) {
            if(paginationList.children[i].classList.contains('active')) {
             paginationList.children[i - 1].click();
             return;
            }
       }
     });
     
     paginationList.lastElementChild.addEventListener( 'click', () => {
       for( let i = 1; i < paginationNumbers + 1; i++) {
            if(paginationList.children[i].classList.contains('active')) {
             paginationList.children[i + 1].click();
             return;
            }
       }
     });
}

displayShoes();