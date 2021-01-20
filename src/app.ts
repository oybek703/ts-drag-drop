const button = <HTMLButtonElement>document.getElementById('myBtn')

button.addEventListener('click', function (event) {
    console.log(event.target)
})