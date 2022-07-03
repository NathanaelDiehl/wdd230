const requestURL = 'json/data.json';

const cards = document.querySelector('.spotlight');

async function getBusinesses() {
    let response = await fetch(requestURL);
    if (response.ok) {
        let data = await response.json();
        output(data);
    } else {
        throw Error(response.statusText);
    }
}

getBusinesses();

let number = 1;

function output(data) {
    const filter = data.business.filter(value => value.membership == 'gold' ||
       value.membership == 'silver').sort(function(){return 0.3 - Math.random()}).slice(0, 3);
    filter.forEach(business => {
      let card = document.createElement("div");
          let h3 = document.createElement("h3");
          // let picture = document.createElement("picture");
          let img = document.createElement("img");
          let h4 = document.createElement("h4");
          let a = document.createElement("a");
          let p = document.createElement("p");
      
          card.setAttribute("class", `section spotlight-${number} main-item`);
          h3.innerHTML = `${business.name}`;
      
          h4.innerHTML = `${business.quote}`;
          a.innerHTML = `${business.website}`;
          p.innerHTML = `${business.phonenumber}`;
      
          a.setAttribute("href", `${business.website}`);
          img.setAttribute("src", `${business.imageurl}`);
          img.setAttribute("alt", `${business.name}`);
      
          card.appendChild(h3);
          card.appendChild(img);
          card.appendChild(h4);
          card.appendChild(a);
          card.appendChild(p);
      

        cards.append(card);
        number += 1;
    });
}



