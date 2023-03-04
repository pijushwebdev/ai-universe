const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        const aiInfo = data.data.tools;

        const slicedData = aiInfo.slice(0,6);
        showCards(slicedData);

        const seeMoreBtn = document.getElementById('see-more-btn');

        let seeAllCards = false;
        seeMoreBtn.addEventListener('click', () => {
            if(!seeAllCards){
                showCards(aiInfo);
                // seeAllCards = true;
                seeMoreBtn.style.display = 'none';
            }
        })

    }
    catch (error) {
        document.body.innerText = error;
    }

}
const toggleSpinner = (isSpin) => {
    const spinDiv = document.getElementById('spin-div');
    if(isSpin){
        spinDiv.classList.remove('d-none');
    }else{
        spinDiv.classList.add('d-none');
    }
}
window.onload = toggleSpinner(true);

// const compareDate = (a , b) => {
//     const dateA = new Date(a.published_in);
//     const dateB = new Date(b.published_in);
//     if(dateA > dateB){
//         return 1;
//     }else if(dateA < dateB){
//         return -1;
//     }else{
//         return 0;
//     }

// }
// const sortCards = document.getElementById('sort-cards');
// sortCards.addEventListener('click', () => {

// })
const showCards = (data) => {
    const toolsData = data;
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    //sorting by date
    const compareDate = (a , b) => {
        const dateA = new Date(a.published_in);
        const dateB = new Date(b.published_in);
        if(dateA > dateB){
            return 1;
        }else if(dateA < dateB){
            return -1;
        }else{
            return 0;
        }
    }
    const sortCards = document.getElementById('sort-cards');
    sortCards.addEventListener('click', () => {
        showCards(toolsData.sort(compareDate));
    })
    
    toolsData.forEach(element => {
        const featuresList = element.features.map(feature => `<li>${feature}</li>`).join('');
        cardContainer.innerHTML += `
            <div class="col">
                <div class="card p-3">
                    <div>
                        <img src="${element.image}" style="height: 300px" class="card-img-top rounded-4 img-fluid" alt="...">
                    </div>
                    <div id="card-body" class="card-body pb-0 ps-0 border-bottom" style="height: 170px">
                        <h5 class="card-title ps-0 pe-0">Features</h5>
                        <ol id="features-container" class="ps-3">
                            ${featuresList}
                        </ol>
                    </div>
                    <div class="my-3">
                        <h5>${element.name}</h5>
                        <div class="d-flex justify-content-between"> 
                            <div class="d-flex align-items-center">
                                <img class="me-2" style="height: 20px" src="./images/calendar.png" alt="">
                                <p class="text-secondary-emphasis fw-bold p-0 m-0">${element.published_in}</p> 
                            </div>
                            <div>
                                <button onclick="showAiModal('${element.id}')" data-bs-toggle="modal" data-bs-target="#aiUniverse" class="btn modal-btn"><img class="img-fluid" style="height: 20px" src="./images/right-arrow.png" alt=""></button>
                            </div>               
                        </div>
                        
                    </div>
                </div>
            </div>
        `;
    });
    toggleSpinner(false);
}

const showAiModal = async (elementId) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${elementId}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        showAiDetails(data.data)
    }
    catch (err) {
        document.body.innerText = err;
    }
}
const showAiDetails = (data) => {

    const featuresObj = data.features;
    const featuresArr = [];

    for( let key in featuresObj){
        featuresArr.push(featuresObj[key]);
    }
    
    const featuresList = featuresArr.map(feature => `<li class="text-secondary fw-bold">${feature.feature_name}</li>`).join('');
    const integrationList = data.integrations ? data.integrations.map(integration => `<li class="text-secondary fw-bold">${integration}</li>`).join('') : 'No Data Found';

    


    const modalBody = document.getElementById('modal-body');
    const accuracySpan = document.getElementById('accuracy');
    console.log(accuracySpan);


    modalBody.innerHTML = `
    <div class="row row-cols-1 p-5 row-cols-md-2 g-4">
    <div class="col rounded-3  bg-danger-subtle p-3">
      <h3>${data.description}</h3>
      <div class="d-flex justify-content-center text-center">
        <div class="col py-2 me-2 rounded-3 bg-white d-flex flex-column justify-content-center">
            <p class="text-success p-0 m-0 fw-bold">${data.pricing ? data.pricing[0].price : "Free Of Cost"}</p>
            <p class="text-success p-0 m-0 fw-bold">${data.pricing ? data.pricing[0].plan : "Basic"}</p>
        </div>
        <div class="col py-2 me-2 rounded-3 bg-white d-flex flex-column justify-content-center">
            <p class="text-warning p-0 m-0 fw-bold">${data.pricing ? data.pricing[1].price : "Free Of Cost"}</p>
            <p class="text-warning p-0 m-0 fw-bold">${data.pricing ? data.pricing[1].plan : "Pro"}</p>
        </div>
        <div class="col py-2 me-2 rounded-3 bg-white d-flex flex-column justify-content-center">
            <p class="text-danger p-0 m-0 fw-bold">${data.pricing ? data.pricing[2].price : "Free Of Cost"}</p>
            <p class="text-danger p-0 m-0 fw-bold">${data.pricing ? data.pricing[2].plan : "Enterprise"}</p>
        </div>
      </div>


    <div class="row row-cols-1 row-cols-md-2">
        <div class="col">
            <h3>Features</h3>
            <div>
                <ul id="features">
                    ${featuresList}
                </ul>
            </div>
        </div>

        <div class="col">
            <h3>Integration</h3>
            <div>
                <ul id="features">
                    ${integrationList}
                </ul>
            </div>
        </div>
        
    </div>
      
    </div>
    <div class="col rounded-3">
      <div class="card p-3">
        <img src="${data.image_link[0]}" class="card-img-top rounded-4" alt="...">
        ${data.accuracy.score ? `<span id="accuracy" class="bg-danger py-1 px-2 rounded-3 text-white fw-bold">${data.accuracy.score * 100}% accuracy</span>` : ''}
        <div class="card-body">
          <h5 class="card-title text-center">${data.input_output_examples ? data.input_output_examples[0].input : "Can you give any example?"}</h5>
          <p class="card-text text-center">${data.input_output_examples ? data.input_output_examples[0].output : "No! Not Yet! Take a break!!!"}</p>
        </div>
      </div>
    </div>
    
    
  </div>
    `;

}
loadData();
