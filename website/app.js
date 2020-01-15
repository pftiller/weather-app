/* Global Variables */
// Personal API Key for OpenWeatherMap API
const APPID = "8dfdc3b3ea6ea099e2582bd58091f226";
const baseURI = "http://api.openweathermap.org/data/2.5/weather"
// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
/* Function called by event listener */
const handleClick = async () => {
    let content = document.getElementById('feelings').value;
    let temp = await getWeather();
    try {
        postWeather(temp, content, date);
    } catch (err) {
        console.log(err)
    }
}
/* Function to GET Web API Data*/
const getWeather = async () => {
    let zip = document.getElementById('zip').value;
    const response = await fetch(`${baseURI}?zip=${zip},us&units=imperial&APPID=${APPID}`, {
        method: 'GET',
    })
    try {
        const newData = await response.json();
        return newData.main.temp;
    } catch (err) {
        console.log(err)
    }
}
/* Function to POST data */
const postWeather = async (temp, content, date) => {
    let dataToPost = {
        temp: temp,
        content: content,
        date: date
    }
    const finalResponse = await fetch('/add', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataToPost)
    }).then((res) => {
        /* GET Project Data */
        fetch('/all', {
            method: 'GET',
        })
        return res.json();
    })
    try {
        let entryHolder = document.getElementById('entryHolder');
        if (entryHolder.firstElementChild == null) {
            let text = "<table><tr><th>Date</th><th>Temperature</th><th>Mood</th></tr>"
            text = text + `<tr><td>${finalResponse.date}</td><td>${finalResponse.temp} </td><td>${finalResponse.content}</td></tr>`
            entryHolder.innerHTML = entryHolder.innerHTML + text;
        } else {
            let theTable = document.querySelector('table');
            let text = `<tr><td>${finalResponse.date}</td><td>${finalResponse.temp} </td><td>${finalResponse.content}</td></tr>`;
            theTable.innerHTML = theTable.innerHTML + text;
        }
    } catch (err) {
        console.log(err)
    }
}
// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', handleClick);
