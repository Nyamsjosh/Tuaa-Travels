document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'https://tuaa-travels-backend.vercel.app/CoastalDestinations'
  const locationList = document.getElementById('coastalLocations')
  const locationImage = document.getElementById('locationImage')
  const locationName = document.getElementById('locationName')
  const locationDescription = document.getElementById('locationDescription')
  const locationPeriod = document.getElementById('locationPeriod')
  const locationPrice = document.getElementById('locationPrice')

  const containerMain = document.getElementById('locSection')
  containerMain.style.display = 'none'
  const proceedBtn = document.getElementById('coastalBtn')
  proceedBtn.addEventListener('click', function () {
    containerMain.style.display = 'flex'
  })

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      //Creating the li for each location
      data.forEach((location) => {
        createLocationLi(location)
      })

      //function to create location list
      function createLocationLi(location) {
        const li = document.createElement('li')
        li.textContent = `${location.location}`
        li.classList.add('location', 'item')
        li.className = 'locationList'

        //Function to add an Event Listener on the display location function
        li.addEventListener('click', () => displayLocationDetails(location))
        locationList.appendChild(li)
      }
      if (data.length > 0) {
        displayLocationDetails(data[0])
      }
    })
  //Function for display of the location details
  function displayLocationDetails(location) {
    currentLocation = location
    locationImage.src = location.location_image
    locationName.textContent = location.location
    locationPeriod.textContent = `Period: ${location.period}`
    locationPrice.textContent = `Price: ${location.price}`
    locationDescription.textContent = location.description
  }

  let form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    handleFeedBack(e.target.feed_back.value)
    form.reset()
  })
})
//Function to handle the feedback
function handleFeedBack(back) {
  let p = document.createElement('p')
  let btn = document.createElement('button')
  btn.addEventListener('click', handleDelete)
  btn.textContent = 'Delete'
  p.textContent = `${back} `
  p.appendChild(btn)
  document.querySelector('#backContainer').appendChild(p)
}
//Function for deleting the event
function handleDelete(e) {
  e.target.parentNode.remove()
}
