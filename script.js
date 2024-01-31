
const pastCities = JSON.parse (localStorage.getItem('pastCities')) || []
const app={

    init:function(){
       document.getElementById('pastSearch').addEventListener('click',this.pastSearch)
        document.getElementById('search-btn').addEventListener('click',function(){
            let city= document.getElementById('userInput').value;
            if(!city){
                return 
            }
            pastCities.push(city)
            const btn = document.createElement('button')
            btn.textContent=city
            document.getElementById('pastSearch').append(btn)
            localStorage.setItem('pastCities', JSON.stringify(pastCities))
            app.fetchCoords(city)
           
        });
    },
    pastSearch:function(event){
        let city=event.target.textContent
        app.fetchCoords(city)
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
           app.fetchCurrentWeather(data)
            console.log(data)
        })
        .catch(console.err);
        console.log(url)
        },
    fetchCoords:(city)=>{
        let key = '3f1f6cf4e4d47e3b57f26304e7165e73'
        let url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`
        fetch (url)
        .then((resp)=>{
            return resp.json();
        })
        .then((data)=>{
            let {lat,lon}=data[0]
            app.fetchWeather(lat,lon)
           
        })
    },
    renderWeather(data){
        document.getElementById('forecastBox').innerHTML=''
        for(i=0;i<data.list.length; i+=8){
        let card=document.createElement('div')
        let tempEl=document.createElement('p',)
            tempEl.textContent="Temp: "+data.list[i].main.temp +'  F'
        let humidityEl=document.createElement('p',)
            humidityEl.textContent='Humidity: '+data.list[i].main.humidity+'  %'
        let windEl=document.createElement('p',)
            windEl.textContent='Wind: '+data.list[i].wind.speed+'  mph'
            card.append(tempEl,humidityEl,windEl)
            card.classList.add('card')
        document.getElementById('forecastBox').append(card)
        document.getElementById('temp').textContent='Temp: '+data.list[0].main.temp+ '  F'
        document.getElementById('wind').textContent='Wind: '+data.list[0].wind.speed+'  mph'
        document.getElementById('humidity').textContent='Humidity: '+data.list[0].main.humidity+'  %'
        document.getElementById('city').textContent=data.city.name
        }
    },
    renderButtons(){
        for(i=0;i<pastCities.length;i++){
            let btn = document.createElement('button')
            btn.textContent=pastCities[i]
            document.getElementById('pastSearch').append(btn)
        }
    }
}
app.init()
app.renderButtons()