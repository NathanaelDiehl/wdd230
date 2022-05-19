
const input = document.querySelector('input');
const button = document.querySelector('button')
const list = document.querySelector('ul');


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
});