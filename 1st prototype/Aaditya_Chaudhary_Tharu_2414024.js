// Student Name: Aaditya Chaudhary Tharu
// Student ID: 2414024
// linking to html
const inputBox = document.querySelector(".inputBox")
const searchBtn = document.querySelector("#searchBtn")
// api key and web link
async function getWeather(){
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Houston&appid=4a5ebdfe9e5e70d49dfbc41a72a2d4ec&units=metric')
    const data = await response.json();
    console.log(data);
    document.querySelector(".city_name").innerHTML=data.name;
    document.querySelector(".temperature").innerHTML=data.main.temp+"°C";
    document.querySelector(".condition").innerHTML=data.weather[0].main;
    document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
    document.querySelector(".pressure").innerHTML=data.main.pressure+"atm";
    document.querySelector(".wind_speed").innerHTML=data.wind.speed+"miles/hr";
    document.querySelector(".icon").innerHTML=`<img src=https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png>`;
    

    let timestampOffset = data.timezone;
    const timestamp = Math.floor(Date.now() / 1000) + timestampOffset;
    const date = new Date(timestamp * 1000);

    const localDateTime = date.toLocaleString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
    })
    document.querySelector(".date").innerHTML=localDateTime;
   
}
// function
getWeather();
async function searched(search){
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=4a5ebdfe9e5e70d49dfbc41a72a2d4ec&units=metric`)
    const data = await response.json();
    console.log(data);
    document.querySelector(".city_name").innerHTML=data.name;
    document.querySelector(".temperature").innerHTML=data.main.temp+"°C";
    document.querySelector(".condition").innerHTML=data.weather[0].main;
    document.querySelector(".humidity").innerHTML=data.main.humidity+"%";
    document.querySelector(".pressure").innerHTML=data.main.pressure+"atm";
    document.querySelector(".wind_speed").innerHTML=data.wind.speed+"miles/hr";
    document.querySelector(".icon").innerHTML=`<img src=https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png>`;
    

    let timestampOffset = data.timezone;
    const timestamp = Math.floor(Date.now() / 1000) + timestampOffset;
    const date = new Date(timestamp * 1000);
// all the elements
    const localDateTime = date.toLocaleString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: 'UTC'
    })
    document.querySelector(".date").innerHTML=localDateTime;


    
}
searchBtn.addEventListener("click",()=>{
    searched(inputBox.value)

})
