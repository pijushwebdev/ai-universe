const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    try{
        const res = await fetch(url);
    const data = await res.json();
    showCards(data.data);
    }
    catch(error){
        document.body.innerText = error;
    }
    

}

const showCards = (data) => {
    const toolsData = data.tools;
    const cardContainer = document.getElementById('card-container');
    toolsData.forEach(element => {
        const featuresList = element.features.map(feature => `<li>${feature}</li>`).join('');
        cardContainer.innerHTML  += `
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
}

const showAiModal = async (elementId) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${elementId}`;
    
    try{
        const res = await fetch(url);
        const data = await res.json();
        showAiDetails(data.data)
    }
    catch(err){
        document.body.innerText = err;
    }
}
const showAiDetails = (data) => {
    console.log(data); // all data

    const modalBody = document.getElementById('modal-body');

    modalBody.innerHTML = `
    <div class="row row-cols-1 p-5 row-cols-md-2 g-4">
    <div class="col  bg-danger-subtle p-3">
      <h3>${data.description}</h3>
      <div class="row row-cols-3">
        <div class="col p-4 me-2 rounded-3 bg-white">
            <p class="text-success p-0 fw-bold">${data.pricing ? data.pricing[0].price : "Free Of Cost"}</p>
            <p class="text-success p-0 fw-bold">${data.pricing ? data.pricing[0].plan : "Basic"}</p>
        </div>
        <div class="col p-4 me-2 rounded-3 bg-white">
            <p class="text-success p-0 fw-bold">${data.pricing ? data.pricing[1].price : "Free Of Cost"}</p>
            <p class="text-success p-0 fw-bold">${data.pricing ? data.pricing[1].plan : "Basic"}</p>
        </div>
        <div class="col p-4 me-2 rounded-3 bg-white">
            <p class="text-success p-0 fw-bold">${data.pricing ? data.pricing[2].price : "Free Of Cost"}</p>
            <p class="text-success p-0 fw-bold">${data.pricing ? data.pricing[2].plan : "Basic"}</p>
        </div>

      </div>
        
      
    </div>
    <div class="col">
      <div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
      </div>
    </div>
    
    
  </div>
    `

}
loadData();
