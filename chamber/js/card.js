
const gridbutton = document.querySelector("#grid");
const listbutton = document.querySelector("#list");
const display = document.querySelector("article");

gridbutton.addEventListener("click", () => {
	// example using arrow function
	display.classList.add("grid");
	display.classList.remove("list");
});

listbutton.addEventListener("click", () => {
	// example using arrow function
	display.classList.add("list");
	display.classList.remove("grid");
});


const requestURL = 'json/data.json';
const cards = document.querySelector('.company-directory');



fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    console.table(jsonObject); 
    const business = jsonObject['business'];
    business.forEach(displayBusiness);
  });
  

  function displayBusiness(business) {

   let card = document.createElement('section');
   let h2 = document.createElement('h2');
   let logo = document.createElement('img');
   let address = document.createElement('h4');
   let phone = document.createElement('h4');
   let website = document.createElement('a');
   
   h2.textContent = `${business.name}`;

   address.textContent = `Address: ${business.address}`;
   phone.textContent = `Phone Number: ${business.phonenumber}`;
   website.textContent = `${business.website}`;

   
   logo.setAttribute('src', business.imageurl);
   logo.setAttribute('alt', `logo for ${business.name}`);
   logo.setAttribute('loading', 'lazy');
 
   website.title = `${business.website}`;
   website.href = `${business.website}`;

   card.appendChild(logo);
   card.appendChild(h2);
   card.appendChild(address);
   card.appendChild(phone);
   card.appendChild(website);
 
  
   document.querySelector('div.company-directory').appendChild(card);
 }


 



