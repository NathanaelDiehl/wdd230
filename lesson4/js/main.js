
const input = document.querySelector('input');
const button = document.querySelector('button')
const list = document.querySelector('ul');

function success() {
   if(document.getElementById("textsend").value==="") { 
           document.getElementById('button').disabled = true; 
       } else { 
           document.getElementById('button').disabled = false;
       }
   }


button.addEventListener('click', () => {
   const newItem = input.value;
   input.value = '';

   const listLi = document.createElement('li');
   const listSpan = document.createElement('span');
   const listButton = document.createElement('button');

   listLi.appendChild(listSpan);
   listSpan.textContent = newItem;
   listLi.appendChild(listButton);
   listButton.textContent = '❌';
   list.appendChild(listLi);

   listButton.addEventListener('click', () => {
      list.removeChild(listLi);
   });

   input.focus();
   document.getElementById('button').disabled = true;
});