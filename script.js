
async function SendResponse() {
  let response = await fetch('http://api.weatherapi.com/v1/forecast.json?key=a9ae892c55bd45c7a17184125232104&q=Mariupol&days=7&aqi=yes&alerts=yes', {
    method: 'GET',
    headers: {
      'X-Yandex-API-Key': '0deb4760-2bd7-408a-8c32-b0981901afe7'
    }
  });
  let text = await response.json();
  return text;
}
console.log(SendResponse());

SendResponse().then((result) => {
  console.log(result.forecast);
})

