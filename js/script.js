// ======================= Categories items fetching ============================

const loadAllCategories =async() =>{
    try{
        const url = `https://www.themealdb.com/api/json/v1/1/categories.php`;
        const res = await fetch(url);
        const data = await res.json();
        displayCategories(data.categories);
    }
    catch(err){
        console.log(err);
    }
}

// ================= onclick btn =================================
const btnClick =async(id) =>{
     try{
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayAllCategoriesItems(data.meals);
        const displayItemsContainer = document.getElementById('itemsContainer');
        displayItemsContainer.classList.add('mb-20')
    }
    catch(err){
        console.log(err);
    }
  
    
}

// ======================== categories button ===========================
const displayCategories = (id) =>{
    const categoriesContainer = document.getElementById('allCategories');
    id.map((e)=>{
        const div = document.createElement('div');
        div.classList.add('border-[1px]', 'border-ebony','w-40','h-40','p-5' ,'border-opacity-[0.1]','rounded-lg','hover:border-amber','hover:bg-amber','hover:bg-opacity-[0.05]')
         div.innerHTML = `
          <div>
          <button id="btn-${e.strCategory}" onclick="btnClick('${e.strCategory}')">
          <img src="${e.strCategoryThumb}"/>
          <h4 class="mt-2 text-center text-darkGray text-base lg:text-lg font-medium">${e.strCategory}</h4>
          </button>
          </div>
        `
    categoriesContainer.appendChild(div);
   
        
    })
}

 

// ===================== after click categories button ,user can see filter categories food items ============================
const displayAllCategoriesItems = (id) =>{
    console.log(id)
   const displayItemsContainer = document.getElementById('itemsContainer');
   displayItemsContainer.innerHTML = '';
   id.map(e =>{
    const div = document.createElement('div');
    div.classList.add('bg-amber','bg-opacity-[0.05]','p-5','rounded-lg','border-[1px]','border-amber')
     div.innerHTML = `
    <div class="">
    <img src="${e.strMealThumb}" class="w-full h-full object-cover rounded-lg"/>
    <h3 class="text-center text-darkGray text-lg font-medium mt-5">${e.strMeal}</h3>
    </div>
   `
   displayItemsContainer.appendChild(div);
   })
   
}

// ======================== area foods fetching=================================
const areaLoaded = async() =>{
    try{
        const url = `https://www.themealdb.com/api/json/v1/1/list.php?a=list`;
        const res = await fetch(url);
        const data =await res.json();
        displayAreaItems(data.meals);
    }
    catch(err){
        console.log(err);
    }
}
// ==================== food item on the base of area ==================================
const areaBtn = async(id) =>{
    try{
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${id}`;
        const res = await fetch(url);
        const data = await res.json();
        const allBtns = document.getElementsByClassName('all-btn');
        for(let allBtn  of allBtns){
            allBtn.classList.add('bg-opacity-[0.05]','text-darkGray')
            allBtn.classList.remove('bg-amber','text-white');
        }
        const btn = document.getElementById(`btn-${id}`);
        btn.classList.remove('bg-opacity-[0.05]','text-darkGray')
        btn.classList.add('bg-amber','text-white');
        displayAreaItemsFood(data.meals);
        

    }
    catch(err){
        console.log(err);
    }
}
// ==================== area button display ==============================
const displayAreaItems = (id) =>{
    const areaItemsContainer = document.getElementById('areaItems');
    id.map(e =>{
        const div = document.createElement('div');
        div.innerHTML = `
        <button id="btn-${e.strArea}" onclick="areaBtn('${e.strArea}')" class="text-darkGray text-lg lg:text-2xl font-bold border-[2px] border-amber rounded-xl px-5 py-2 bg-amber bg-opacity-[0.05] hover:bg-amber hover:text-white all-btn">${e.strArea}</button>
        `
        areaItemsContainer.appendChild(div);
    })

}

// ======================= display area food ===========================
const displayAreaItemsFood = (id) =>{
   const displayAreaItemsFood = document.getElementById('areaFoodItems');
   displayAreaItemsFood.innerHTML = '';
   id.map(e =>{
    const div = document.createElement('div');
    div.classList.add('bg-amber','bg-opacity-[0.05]','p-5','rounded-lg','border-[1px]','border-amber')
     div.innerHTML = `
    <div class="">
    <img src="${e.strMealThumb}" class="w-full h-full object-cover rounded-lg"/>
    <h3 class="text-center text-darkGray text-lg font-medium mt-5">${e.strMeal}</h3>
    </div>
   `
   displayAreaItemsFood.appendChild(div);
   })
}
// ================== display food items on the base of first letter===============================
let all = [];

const allItemsLoad = async (id) => {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${id}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.meals) {
            all = [...all, ...data.meals];
        }
    } catch (err) {
        console.log(err);
    }
};

const findAllData = async () => {
    const promises = [];
    for (let i = 97; i <= 122; i++) {
        const char = String.fromCharCode(i);
      promises.push(allItemsLoad(char));
        
    }
    await Promise.all(promises);
    displayAllItems();
};

const displayAllItems = () => {
    const limitItems = all.slice(0, 12); 
    const allItemsContainer = document.getElementById('allItems');
    limitItems.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('border-[1px]','border-ebony','border-opacity-[0.1]','rounded-lg','p-3','sm:p-0')
        div.innerHTML = `
         <div class="flex items-center gap-5">
         <div class="basis-1/3 h-full"> <img src="${item.strMealThumb}" class="rounded-lg w-full h-full"/></div>
         <div class="basis-2/3">
         <h3 class="text-darkGray text-xl lg:text-2xl font-bold">${item.strMeal}</h3>
         <p class="line-clamp-3 text-dimGray text-base lg:text-lg font-normal my-2 lg:my-5">${item.strInstructions}</p>
        <button onclick="itemDetails(${item.idMeal})" class="text-amber text-lg font-semibold underline decoration-amber underline-offset-2" >View Details</button>
         </div>
         </div>
        `
        allItemsContainer.appendChild(div);
    });

    if(all.length > 6){
        const viewAllBtn = document.getElementById('viewAll');
        viewAllBtn.addEventListener('click',displayAllFoodItems);
        
    }
};

const displayAllFoodItems = () =>{
 const allItemsContainer = document.getElementById('allItems');
     allItemsContainer.innerHTML = '';
     all.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('border-[1px]','border-ebony','border-opacity-[0.1]','rounded-lg','p-3','sm:p-0')
        div.innerHTML = `
         <div class="flex items-center gap-5">
         <div class="basis-1/3"> <img src="${item.strMealThumb}" class="rounded-lg"/></div>
         <div class="basis-2/3">
         <h3 class="text-darkGray text-xl lg:text-2xl font-bold">${item.strMeal}</h3>
         <p class="line-clamp-3 text-dimGray text-base lg:text-lg font-normal my-2 lg:my-5">${item.strInstructions}</p>
         <button onclick="itemDetails(${item.idMeal})" class="text-amber text-lg font-semibold underline decoration-amber underline-offset-2" >View Details</button>
         </div>
         </div>
        `
        allItemsContainer.appendChild(div);
    });
}

const itemDetails = async (id) =>{
    try{
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        const res = await fetch(url);
        const data = await res.json();
        displayItemDetails(data.meals[0])
         my_modal_1.showModal()

    }catch(err){
        console.log(err)
    }
   
}
const displayItemDetails = (id) =>{
    console.log(id)
const itemDetailsContainer = document.getElementById('modalBox');
itemDetailsContainer.innerHTML = '';
 const div = document.createElement('div');
 div.innerHTML = `
 <h2 class="text-darkGray text-xl md:text-3xl font-bold">${id.strMeal}</h2>
 <div class="w-full h-[1px] bg-darkGray bg-opacity-[0.2] my-5"></div>
  <img src="${id.strMealThumb}" class="w-full h-full object-cover rounded-lg"/>
  <p class="text-base md:text-xl text-dimGray font-normal mt-5"><span class=" text-darkGray font-semibold">Category : </span>${id.strCategory}</p>
  <p class="text-base md:text-xl text-dimGray font-normal my-5"><span class=" text-darkGray font-semibold">Area : </span>${id.strArea}</p>
  <p class="text-base md:text-xl text-dimGray font-normal mb-5"><span class=" text-darkGray font-semibold">Instructions :</span> ${id.strInstructions}</p>
  <a href="${id.strYoutube}" class="text-base md:text-xl text-dimGray font-normal"><span class=" text-darkGray font-semibold">Youtube : </span>${id.strYoutube}</a>

   
 `
 itemDetailsContainer.appendChild(div);
 
}

const searchFood = async(id) =>{
    try{

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`;
        const res = await fetch(url);
        const data = await res.json();
        displaySearchFood(data.meals[0]);
    }
    catch(err){
        console.log(err)
    }
}
const searchFoodByName = ()=>{
    const inputValue = document.getElementById('searchInput').value;
     searchFood(inputValue);
     document.getElementById('searchInput').value = '';

}

const displaySearchFood = (id)=>{
    console.log(id)
   const displayContainer = document.getElementById('allItems');
   displayContainer.innerHTML = '';
   const div = document.createElement('div');
   div.classList.add('border-[1px]','border-ebony','border-opacity-[0.1]','rounded-lg');
   div.innerHTML = `
    <div class="flex items-center gap-5">
         <div class="basis-1/3"> <img src="${id.strMealThumb}" class="rounded-lg"/></div>
         <div class="basis-2/3">
         <h3 class="text-center text-darkGray text-2xl font-bold">${id.strMeal}</h3>
         <p class="line-clamp-3 text-dimGray text-lg font-normal my-5">${id.strInstructions}</p>
         <button onclick="itemDetails(${id.idMeal})" class="text-amber text-lg font-semibold underline decoration-amber underline-offset-2" >View Details</button>
         </div>
         </div>
   `
displayContainer.appendChild(div);

}
loadAllCategories();
areaLoaded();
findAllData();



