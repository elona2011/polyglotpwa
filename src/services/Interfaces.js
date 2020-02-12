const hostName = 'https://'

export const getList = assertFetch((collectionName) => {
  return fetch(`/db/${collectionName}`)
})

export const create = assertFetch((collectionName, value) => fetch(`/db`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ collection: collectionName, ...value }),
}));

export const edit = assertFetch((collectionName, value) => {
  return fetch(`/db`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ collection: collectionName, ...value }),
  })
})

export const delByName = assertFetch((collectionName, name) => fetch(`/db`, {
  method: 'DELETE',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ collection: collectionName, name }),
}))

export const userLogin = function () {
  fetch(`/login`).then(res => {
    // console.log(res)
  })
}

function assertFetch(fn) {
  return async (collectionName, value) => {
    try {
      let res = await fn(collectionName, value)
      let r = await res.json()
      if (r.id !== 1) alert(JSON.stringify(r))
      return r.res
    } catch (error) {
      alert(error)
    }
  }
}