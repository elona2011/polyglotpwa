const hostName = 'https://'

export const userLogin = function(){
  fetch(`/login`).then(res=>{
    console.log(res)
  })
}