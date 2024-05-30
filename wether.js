const formL = document.querySelector(".formSubmit");
const cityInput = document.querySelector(".cityInput")
const card = document.querySelector(".card")
let apiKey = "5afd1de643020cd5c8e4ebb0ed541006"

formL.addEventListener("submit", async event =>{
   event.preventDefault()
   const city = cityInput.value;

   if(city){
      try{
         const getRespose = await  getWeatherData(city);
         showWeatherData(getRespose)
      }
      catch(error){
         console.error(error)
         displayError("Could not fetch data: check network connection/Invalid City Name")
      }
   }
   else{
      displayError("Please Enter a City Name")
   }
})
async function getWeatherData(city){
      try{
         const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
         const response = await fetch(apiUrl)
         console.log(response)
         if(!response.ok){
            throw new Error(displayError("could not fet data/Invalid City Name"))
         }
         return await response.json()
   
      }
      catch(error){
         console.error(error)
      }
}
function showWeatherData(data){
   
   const {name: city, 
         main:{humidity, temp}, 
         weather:[{description,id}]}= data
   card.textContent = ""
   card.style.display = "flex"
   const cityDisply = document.createElement("h1")
   const tempDisply = document.createElement("p")
   const humDisply = document.createElement("p")
   const descDisply = document.createElement("p")
   const contDisply = document.createElement("div")
   
   
   cityDisply.textContent = city
   cityDisply.classList.add("cityDisply")
   tempDisply.textContent = `${((temp -273.15 )*(9/5)).toFixed(1)}°C`
   tempDisply.classList.add("tempDisply")
   humDisply.textContent = `Humidity: ${humidity}%`
   humDisply.classList.add("humDisply")
   descDisply.textContent = description
   descDisply.classList.add("descDisply")
  
   
  
   

   card.appendChild(cityDisply)
   card.appendChild(tempDisply)
   card.appendChild(humDisply)
   card.appendChild(descDisply)
   card.appendChild(displayWeatherImg(id))
   displayBackGround(id)
   

   


   
}
function displayWeatherImg(id){
   const contDisply = document.createElement("div")
   const imgDisply = document.createElement("img")
   switch(true){
      case(id >= 200 && id < 300):
         imgDisply.src = "thunder.png";
         imgDisply.classList.add("img")
         return contDisply.appendChild(imgDisply)
      case(id >= 300 && id < 400):
         imgDisply.src = "drizzle.png";
         imgDisply.classList.add("img")
         return contDisply.appendChild(imgDisply)
      case(id >= 500 && id < 600):
         imgDisply.src = "rainy.png";
         imgDisply.classList.add("img")
         return contDisply.appendChild(imgDisply) 
      case(id >= 600 && id < 700):
         imgDisply.src = "snow.png";
         imgDisply.classList.add("img")
         return contDisply.appendChild(imgDisply) 
      case(id >= 700 && id < 800):
         imgDisply.src = "fogg.png";
         imgDisply.classList.add("img")
         return contDisply.appendChild(imgDisply)
      case(id === 800):
         imgDisply.src = "sunny.png";
         imgDisply.classList.add("img")
         return contDisply.appendChild(imgDisply)
      case(id >= 801 && id < 805):
         imgDisply.src = "cloudy.png";
         imgDisply.classList.add("img")
         return contDisply.appendChild(imgDisply)
   }
}
function displayBackGround(id){
   switch(true){
      case(id >= 200 && id < 300):
         card.classList.remove("cloudyBg")
         card.classList.remove("sunnyBg")
         card.classList.remove("foggyBg")
         card.classList.remove("snowBg")
         card.classList.remove("rainyBg")
         card.classList.remove("drizzleBg")
         card.classList.add("thunderBg")
         return card
      case(id >= 300 && id < 400):
         card.classList.remove("cloudyBg")
         card.classList.remove("sunnyBg")
         card.classList.remove("foggyBg")
         card.classList.remove("snowBg")
         card.classList.remove("rainyBg")
         card.classList.remove("thunderBg")
         card.classList.add("drizzleBg")
         return card
      case(id >= 500 && id < 600):
         card.classList.remove("cloudyBg")
         card.classList.remove("sunnyBg")
         card.classList.remove("foggyBg")
         card.classList.remove("snowBg")
         card.classList.remove("drizzleBg")
         card.classList.remove("thunderBg")
         card.classList.add("rainBg")
         return card 
      case(id >= 600 && id < 700):
         card.classList.remove("cloudyBg")
         card.classList.remove("sunnyBg")
         card.classList.remove("foggyBg")
         card.classList.remove("rainyBg")
         card.classList.remove("drizzleBg")
         card.classList.remove("thunderBg")
         card.classList.add("snowBg")
         return card 
      case(id >= 700 && id < 800):
         card.classList.remove("cloudyBg")
         card.classList.remove("sunnyBg")
         card.classList.remove("snowBg")
         card.classList.remove("rainyBg")
         card.classList.remove("drizzleBg")
         card.classList.remove("thunderBg")
         card.classList.add("foggyBg")
         return card
      case(id === 800):
         card.classList.remove("cloudyBg")
         card.classList.remove("foggyBg")
         card.classList.remove("snowBg")
         card.classList.remove("rainyBg")
         card.classList.remove("drizzleBg")
         card.classList.remove("thunderBg")
         card.classList.add("sunnyBg")
         return card
      case(id >= 801 && id < 805):
         card.classList.remove("sunnyBg")
         card.classList.remove("foggyBg")
         card.classList.remove("snowBg")
         card.classList.remove("rainyBg")
         card.classList.remove("drizzleBg")
         card.classList.remove("thunderBg")
         card.classList.add("cloudyBg")
         return card
   }
}
function displayError(message){
   const errorDisply = document.createElement("p")
   errorDisply.textContent = message
   errorDisply.style.color = "white"
   errorDisply.classList.add("errorDisply")
   card.textContent = ""
   card.style.display = "flex"
   card.classList.add("rainBg")
   card.appendChild(errorDisply)
}




/**
 * 
 *   <div class="wedCont">
 * )
      <form action="submit" method="get" class="formSubmit">
         <input class="cityInput" type="text" placeholder="Enter City">
         <button type="submit">select city</button>
      </form>
      <div class="card">
         <h1 class="cityDisply">City Name</h1>
         <p class="tempDisply">70c</p>
         <p class="humDisply">humidity: 20%</p>
         <p class="descDisply">hot sunny</p>
         <div class="imgDisply">
            <img src="fogg.png" alt="">
         </div>
         <p class="errorDisply">wrong city input</p>
      </div>
   </div>



   .rainBg{
   background-image:url("rainyimage.jpg");
}
.sunnyBg{
   background-image:url("sunnyimage.jpg");
}
.snowBg{
   background-image:url("snowimage.jpg");
}
.foggyBg{
   background-image:url("foggimage.webp");
}
.thunderBg{
   background-image:url("thunderimage.jpg");
}
.windyBg{
   background-image:url("windyimage.jpg");
}
.cloudyBg{
   background-image:url("cloudyimage.jpg");
}
 */