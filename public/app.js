/* Global Variables */
const key = 'e14d927928842d2a6a2fac2b473c9852';
const zipcode = document.querySelector('#zip');
const geneButton = document.querySelector('#generate');

// Get the data from the external API in celsius
const getData = async (url = '') => {
    const getReq = await fetch(url + key + '&units=metric')
    try{
        return await getReq.json()
    }catch(error){
        console.log(error)
    }
}

// Get the data from our endpoint placed in our server-side
const updateUI = async (url = '') => {
    const getReq = await fetch(url)
    try{
        const data = await getReq.json();
        document.querySelector('#city').innerHTML = data.city;
        document.querySelector('#date').innerHTML = data.date;
        document.querySelector('#temp').innerHTML = data.temp + '&#8451;';
        document.querySelector('#content').innerHTML = data.user;
        document.querySelector('div.entry').scrollIntoView({behavior: 'smooth'})
    }catch(error){
        console.log(error)
    }
}

// Post the received data from the external API to our endpoint placed in server-side 
const postData = async (url = '', data = {}) => {
    const postReq = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    })

    try{
        return JSON.stringify(data)
    }catch(error){
        console.log(error)
    }
}

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1)+'.'+ d.getDate()+'.'+ d.getFullYear()

// Register a listener to listen for a click on generate button
geneButton.addEventListener('click', function getPost(e){
    if(zipcode.value !== ''){
        const userRes = document.querySelector('#feelings').value;
    const baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode.value}&appid=`;
    getData(baseURL).then((data) => {
        postData('/temp', {
            cityName: data.name,
            currentDate: newDate,
            cityTemp: data.main.temp,
            userResponse: userRes
        })
        updateUI('/retrieve')
    })
    
    }else{
        alert('Please Enter a Zip Code!!!');
    }
})