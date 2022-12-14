const loadPhones = async(searchText,dataLimit)=>{
    const url =`https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data,dataLimit)
}
const displayPhones = (phones,dataLimit) =>{
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent='';
    //displayphone
    
    const showAll = document.getElementById('show-all')
    if( dataLimit && phones.length > 10){
      phones = phones.slice(0,10)
      showAll.classList.remove('d-none')
    }
    else{
      showAll.classList.add('d-none')
    }
    //nophonefoundmessage
    const noPhone = document.getElementById('no-phone-found')
    if(phones.length === 0){
      noPhone.classList.remove('d-none')
    }
    else{
      noPhone.classList.add('d-none')
    }
    //displayall
    phones.forEach(phone=>{
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML=`
        <div class="card">
          <img src="${phone.image}" class="card-img-top p-4" alt="...">
          <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <button onclick="loadPhoneDetail('${phone.slug}')" href="#" class="btn btn-primary">Details</button>
            </div>
        </div>
    
        `;
        phoneContainer.appendChild(phoneDiv)
    })
    // stoploader
     toggleSpinner(false)
}

const processSearch = (dataLimit)=>{
  toggleSpinner(true)
    const searchfield = document.getElementById('search-field')
    const searchText = searchfield.value ;
    loadPhones(searchText,dataLimit)
}

document.getElementById('btn-search').addEventListener('click',function(){
  // startloader
  processSearch(10);
    
})
//  searchenter
document.getElementById('search-field').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    processSearch(10);
  }
});


const toggleSpinner = isloading =>{
  const loaderSection = document.getElementById('loader')
  if(isloading){
    loaderSection.classList.remove('d-none')
  }
  else{
    loaderSection.classList.add('d-none')
  }
}

document.getElementById('btn-show-all').addEventListener('click',function(){
   processSearch()
})

const loadPhoneDetail = async id =>{
  const url =`https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(url)
  const data = await res.json();
  console.log(data.data)

}



loadPhones('apple')