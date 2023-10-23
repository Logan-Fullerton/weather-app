// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

const app={
    init:()=>{
        document.getElementById('search-btn').addEventListener('click',()=>{
            let city= document.getElementById('userInput').value;
            if(!city){
                return 
            }
            app.fetchCoords(city)
        });
    },
    
fetchWeather:(lat,lon)=>{
    let key = '3f1f6cf4e4d47e3b57f26304e7165e73'
    let units = 'imperial'
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`;
    fetch(url)
    .then(resp=>{
        if(!resp.ok) throw new Error(response.statusText)
        return resp.json();
    })
    .then(data=>{
        //app.showWeather(data);
        console.log(data)
        app.renderWeather(data)
    })
    .catch(console.err);
    
    },
    fetchCurrentWeather:(lat,lon)=>{
        let key = '3f1f6cf4e4d47e3b57f26304e7165e73'
        let units = 'imperial'
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`;
        fetch(url)
        .then(resp=>{
            if(!resp.ok) throw new Error(response.statusText)
            return resp.json();
        })
        .then(data=>{
           
            console.log(data)
        })
        .catch(console.err);
        
        },
    fetchCoords:(city)=>{
        let key = '3f1f6cf4e4d47e3b57f26304e7165e73'
        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`
        fetch (url)
        .then((resp)=>{
            return resp.json();
        })
        .then((data)=>{
            let {lat,lon}=data[0]
            app.fetchWeather(lat,lon)
            app.fetchCurrentWeather(lat,lon)
        })
    },
    renderWeather(data){
        for(i=0;i<data.list.length;){
        let card=document.createElement('div')
        let tempEl=document.createElement('p')
        tempEl.textContent=data.list[i++].main.temp
        card.append(tempEl)
        document.getElementById('forecastBox').append(card)
        document.getElementById('temp').textContent='Temp: '+data.list[0].main.temp
        document.getElementById('wind').textContent='Wind: '+data.list[0].wind.speed
        document.getElementById('humidity').textContent='Humidity: '+data.list[0].main.humidity
        }
       
    

    }
}
app.init()