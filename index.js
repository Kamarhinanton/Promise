console.log('Request data...')

//емулюємо роботу з сервером
// setTimeout(() => {
//   console.log('Preparing data...')
//
//
//   const backendData = {
//     server: 'aws',
//     port: 2000,
//     status: 'working'
//   }
//
//   setTimeout(() => {
//     backendData.modified = true
//     console.log('Data received', backendData)
//   }, 2000)
// }, 2000)

const p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log('Preparing data...')
    const backendData = {
      server: 'aws',
      port: 2000,
      status: 'working'
    }
    //виклик resolve() означає що він завершився
    //щоб мати доступ до backendData у then, потрібно передати її в resolve
    resolve(backendData)
  }, 2000)
})

//then спрацьовує коли відпрацьовує resolve
//data це backendData яку ми передали
//v1
// p.then((data) => {
//   console.log('Promise resolved', data)
//
//   const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//       data.modified = true
//       resolve(data)
//     }, 2000)
//   })
//
//   p2.then(clientData => {
//     console.log('Data received', clientData)
//   })
// })
//v2 аналогічно v1
p.then(data => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      data.modified = true
      resolve(data)
    }, 2000)
  })
//  .then-чейн
})
  .then(clientData => {
  clientData.fromPromise = true
  return clientData
}).then(data => {
  console.log('Modified', data)
})
  //метод відлову помилок, викликається коли проміс не успішний
  .catch(err => console.error('Error: ', err))
  .finally(()=> console.log('Finally'))
//finally викликається в любому випадку


const sleep = ms => {
  return new Promise (resolve => {
    setTimeout(() => resolve(), ms)
  })
}

//відпрацює пілсля усіх промісів
Promise.all([sleep(2000), sleep(5000)]).then(() => {
  console.log('All promises')
})

//відпрацює після найшвидшого
Promise.race([sleep(2000), sleep(5000)]).then(() => {
  console.log('Race promises')
})

