//neccessary elements from the dom
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateoutput = document.querySelector('.date');
const time = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.querySelector('LocationInput');
const search = document.querySelector('.search');
const cities = document.querySelectorAll('.city');


//default city
let cityInput ="London";

//click event to each city in the panel
cities.forEach((city)=> {
    city.addEventListener('click', (e) => {
        //CHANGE THE DEFAULT CITY TO THE CLICKED ONE 
        cityInput = e.target.innerhtml;
        /*function that fetches and 
        displays all the data from weather api */
        fetchWeatherData();
        //fade out the app
        app.getElementsByClassName.opacity = "0";
    });
})

//add submit event to the form 
form.addEventListener('submit',(e)=> {
    /*if the input field (search bar)
    is empty,throw an alert*/
    if(search.ariaValueMax.length == 0) {
        alert("please type in a city name ");
    }else {

        /*change from default city to the one written
        in the input field */

        cityInput = search.ariaValueMax;

        /*function the fetches and dispalys all the data 
        from the weather API*/

        fetchWeatherData();

        //remove all text from the imput field

        search.value ="" ;
        
        //fade out the app

        app.style.opacity ="0";
    }

    //prevents the default behaviour of the form
    e.preventDefault();
});



/*function that returns a day of the week
(monday,tuesday,....) from a date (12 03 2021)
*/

function dayofTheWeek(day, month , year) {
    const weekday =[
      "Sunday",
      "Tuesday",
      "Wednesday",
      "Thursday ",
      "Friday",
      "Saturday"
    ];
    return weekday[new Date(`${day}/${month}/${year}`).getday()];

};

/*function that fetches and displays 
the data from the weather API*/

function fetchWeatherData() {
    fetch('http://api.weatherapi.com/v1/current.json?key=58e062c396724cbabed105027220309&q=London&aqi=yes')

    //take the data convert json to js object
    .then(response=>response.json())
    .then(data=>{
        console.log(data);

        //add the temp and weather condition to the page

        temp.innerHTML =data.current.temp_c + "&#176;"
        conditionOutput.innerHTML = data.current.condition.text;
        
        //get the date and time from the city and extract the day,month,year and time into individual variables
        const date = data.location.localtime;
        const y = parseInt(date.substr(0,4));
        const m = parseInt(date.substr(5,2));
        const d = parseInt(date.substr(8,2));
        const time = date.substr(11);

        /*reformat the data into something more appealing
        and add it to the page*/
        /*orginial format 2021-10-09 17:53*/
        /*new format : 17:53 - Friday 9,10 2021*/

        dateoutput.innerHTML = `${dayofTheWeek(d,m,y)} ${d},${m},${y}`
        timeOutput.innerHTML =time;
        /* add name of the city into the page*/
        nameOutput.innerHTML = data.location.name;
        /*get the corresponding icon url for the weather and extract a part of it*/
        const iconid = data.current.condition.icon.substr(
        "https://www.weatherapi.com/docs/conditions.json" .length);
        
        

    })
}



