const btn =  document.querySelector('button')!
//my comment
btn.addEventListener('click', async event => {
    const result = await new Promise(resolve => {
        setTimeout(() => {
            resolve('Asynchronous task!')
        }, 2000)
    })
    console.log(result)
})