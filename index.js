const loadData = async (showAll)=>{
    const res  = await fetch('https://openapi.programming-hero.com/api/ai/tools')
    const data = await res.json();
    const ai  = data.data.tools;

    display(ai , showAll)
}

const display = (data , showAll)=>{

    const getDivAppend = document.getElementById('getDivAppend');
    getDivAppend.innerHTML = '' ;

    if (data.length > 9 && !showAll) {
        
        document.getElementById('btn-seeMore').classList.remove('hidden')
    }else{
        document.getElementById('btn-seeMore').classList.add('hidden')
    }

    if (!showAll) {
        data = data.slice(0,9)
    }

    let count = 0;
    
    data.forEach(element => {
        
        
        // console.log(element);

        const div1 = document.createElement('div');
        div1.classList = 'card bg-base-100 shadow-xl p-5'
        div1.innerHTML = `
        <figure class="flex justify-center"><img src="${element.image}" alt="${element.name}" /></figure>
        <p class="font-bold text-xl my-5 ">Features</p>
        <p class=" text-xl  ">${count}. ${element.features[0]}</p>
        <p class=" text-xl  ">${count}. ${element.features[1]}</p>
        <p class=" text-xl  ">${count}. ${element.features[2]}</p>
        <hr class="my-5 border border-gray-300">
        <p class="font-bold text-2xl md:text-3xl">${element.name}</p>
        <div class="">
        <div class="flex gap-3 items-center">
        <i class="fa-regular fa-calendar-days"></i>
        <p class="font-semibold text-xl my-3">${element.published_in
        }</p>
        </div>
        <div class="text-right">
        <button onclick="aiDetails.showModal();details('${element.id}')"><i class="fa-solid fa-arrow-right hover:bg-red-700 bg-red-500 rounded-full p-5"></i></button>
        </div>
        </div>
        
        `
        
        getDivAppend.appendChild(div1)
    });


}

// seeMore 
const seeMore = () =>{
    loadData('showAll')
}






// fetch 2 

const details = async (id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const detailData = data.data
    showingModalData(detailData)
}

const showingModalData = (getModalData)=>{
    
    const getModalDiv = document.getElementById('showModalDetails')
    getModalDiv.innerHTML = "";


    const createDiv = document.createElement('div');
    createDiv.innerHTML =`
    <div class="flex md:flex-row lg:flex-row text-black font-normal p-3 gap-10">
    
    <div>
    <div>${getModalData.description}</div>
    <div class="flex-warp md:flex  gap-5 justify-center">
    <div class="text-red-700 my-4 font-bold text-center bg-gray-200 p-3 rounded-md">${getModalData.pricing[0]?.price} <br> ${getModalData.pricing[0]?.plan} </div>
    <div class="text-green-700 my-4 font-bold  text-center bg-gray-200 p-3 rounded-md">${getModalData.pricing[0]?.price} <br> ${getModalData.pricing[1]?.plan} </div>
    <div class="text-yellow-700 my-4 font-bold  text-center bg-gray-200 p-3 rounded-md">${getModalData.pricing[0]?.price} <br> ${getModalData.pricing[2]?.plan} </div>
    </div>
    <div class="flex">
    <div class=" flex-1 text-left">
    <p class=" font-bold my-3">Features</p>
    <li>${getModalData?.features['1']?.feature_name}</li>
    <li>${getModalData?.features['2']?.feature_name}</li>
    <li>${getModalData?.features['3']?.feature_name}</li>
    </div>
    <div  class="flex-1">
    <p class=" font-bold my-3">Integrations</p>
    <li>${getModalData?.integrations[0]}</li>
    <li>${getModalData?.integrations[1]}</li>
    <li>${getModalData?.integrations[2]}</li>
    <li>${getModalData?.integrations[3]}</li>
    <li>${getModalData?.integrations[4]}</li>
    </div>
    </div>
    </div>


    <div class="mx-w-full" >
    <img  src="${getModalData?.image_link[0]}" alt="">
    <p class="text-2xl font-normal text-center my-5">${getModalData.input_output_examples?.[0]?.input}</p>
    <p class="normal text-center">${getModalData.input_output_examples?.[0]?.output}</p>
    
    </div>
    </div>
    
    
    `
    getModalDiv.appendChild(createDiv)

}


loadData()