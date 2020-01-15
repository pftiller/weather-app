/* Global Variables */
const APPID = "8dfdc3b3ea6ea099e2582bd58091f226";
const baseURI = "http://api.openweathermap.org/data/2.5/weather"
// Create a new date instance dynamically with JS
let d = new Date();
let date = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const handleClick = async ()=> {
    let content = document.getElementById('feelings').value;
    let temp = await getWeather();
    try {
        postWeather(temp, content, date);
    } catch (err) {
        console.log(err)
    }
}
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
        fetch('/weather', {
            method: 'GET',
        })
        return res.json();
    })
    try {
        console.log(finalResponse);
    } catch (err) {
        console.log(err)
    }
}
document.getElementById('generate').addEventListener('click', handleClick);
