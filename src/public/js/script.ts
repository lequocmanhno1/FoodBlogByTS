let addIngredientsBtn: HTMLElement = document.getElementById('addIngredientsBtn')!;
let ingredientList: HTMLElement = document.querySelector('.ingredientList')!;
let ingredeintDiv = document.querySelectorAll('.ingredeintDiv')[0];

addIngredientsBtn.addEventListener('click', function(){
    let newIngredients = ingredeintDiv.cloneNode(true);
    if (!(newIngredients instanceof Element)) {
      throw new Error('new.parentNode is not an Element');
    }
    let input = newIngredients.getElementsByTagName('input')[0];
    input.value = '';
    ingredientList.appendChild(newIngredients);
  });

