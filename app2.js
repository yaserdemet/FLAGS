const input = document.querySelector('.inp');
const button = document.querySelector('.btn');
const error1 = document.querySelector('.error');
const select1 = document.querySelector('.select1');

async function fetchCountry1() {
    const url1 = "https://restcountries.com/v3.1/all"
    try {
        const res = await fetch(url1);
        if(!res.ok){
            throw new Error(`${res.status} has been returned`);
        }
        const data = await res.json();
        data.forEach(element => {
            const {name : {common}} = element
            select1.innerHTML += `<option value="${common}">${common}</option>`
            
            
        })
    }
    catch (error) {
        console.log(error);
    }

}

fetchCountry1();

select1.addEventListener("click" ,(e) => {
    fetchCountry(e.target.value);
}
  )
  
  input.addEventListener("keydown", (e)=> {
    if(e.keyCode === 13){
      fetchCountry(input.value);
      
    }
  })
  window.addEventListener("load", () => {
    input.focus()
  })
  
  const fetchCountry = async (name) => {
      const url = `https://restcountries.com/v3.1/name/${name}`;
      try {
        const res = await fetch(url);
        if (!res.ok) {
          renderError(`Something went wrong:${res.status}`)
          setTimeout(() => {
            error1.textContent = "";
          }, 3000);
          throw new Error();
        }
        const data = await res.json();
        renderCountry(data[0]);
        input.value = "";
      } catch (error) {
        console.log(error);
      }
    };
    
    const renderError = (err) => {
     
      error1.innerHTML = `
         <h1 class="text-danger">${err}</h1>
         <img src="./img/404.png" alt="" />
        `;
    };
    
    const renderCountry = (country) => {
      console.log(country);
      const countriesDiv = document.querySelector('.countries');
    
      //!destr
      const {
        capital,
        name: { common },
        region,
        flags: { svg },
        languages,
        currencies,
      } = country;
    
      // console.log(capital, common, region, svg);
      // console.log(Object.values(languages));
      // console.log(Object.values(currencies)[0].name);
      // console.log(Object.values(currencies)[0].symbol);
    
      countriesDiv.innerHTML += `
    
      <div class="card shadow-lg" style="width: 18rem;">
        <img src="${svg}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${common}</h5>
          <p class="card-text">${region}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item"> <i class="fas fa-lg fa-landmark"></i> ${capital}</li>
          <li class="list-group-item"> <i class="fas fa-lg fa-comments"></i> ${Object.values(
            languages
          )}</li>
    
          <li class="list-group-item"> <i class="fas fa-lg fa-money-bill-wave"></i> ${
            Object.values(currencies)[0].name
          }, ${Object.values(currencies)[0].symbol} </li>
    
        </ul>
      </div>
    
      `;
    };
    