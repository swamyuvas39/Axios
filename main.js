//AXIOS GLOBALS 

// by using globals you can send header values to the every request  
axios.defaults.headers.common['X-Auth-Token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c  ';

// GET REQUEST
function getTodos() {
  //console.log('GET Request');
/*   axios({
     method: 'get',
    url: 'https://jsonplaceholder.typicode.com/todos',
    params: {
      _limit:   5     // it gives 5 data objects
    }
  }) 
  .then((res)=>console.log(res)) // it logs into the console.
   .then((res)=>showOutput(res)) // it shows in the browser
  .catch (err=>console.error(err));  */

  // instead of writing all the above stuff we can write axios.get() method

 /*   axios.get('https://jsonplaceholder.typicode.com/todos',{params:{_limit:5 }})
  .then((res)=>showOutput(res)) 
  .catch (err=>console.error(err));  */

  //we can add _params limit at the end of the url by using ?_limit=5

 axios
  .get('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then((res)=>showOutput(res)) 
  .catch (err=>console.error(err));

// add timeout property

/* axios
  .get('https://jsonplaceholder.typicode.com/todos?_limit=5', {timeout: 5})
  .then((res)=>showOutput(res))    //Error: timeout of 5ms exceeded
  .catch (err=>console.error(err)); */

  //no need to use get to request the api .....since, axios call get bydefault 

/*   axios('https://jsonplaceholder.typicode.com/todos?_limit=5')
  .then((res)=>showOutput(res)) 
  .catch (err=>console.error(err));  */
}

// POST REQUEST
function addTodo() {

//method-1

/*   axios({
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title:'New Todo',
      completed: false  
    }
  }) 
  .then((res)=>showOutput(res)) 
  .catch(err=>console.error(err));  */

// method-2

  axios.post('https://jsonplaceholder.typicode.com/todos',{title:'New Todo',completed: false}) 
  .then((res)=>showOutput(res)) 
  .catch(err=>console.error(err));   
}

// PUT/PATCH REQUEST
function updateTodo() {

  // to update the data we use put or patch rquest
  // put is used to replace the entire resource/data whereas patch is used to update 

  //Method-1

/*   axios({
    method: 'put',
    url: 'https://jsonplaceholder.typicode.com/todos/1', //we need to put id in the url to update /id
    data: {
      title:'Updated Todo',
      completed: false  
    }
  }) 
  .then((res)=>showOutput(res)) 
  .catch(err=>console.error(err)); */

  //Method-2
/*    axios.put('https://jsonplaceholder.typicode.com/todos/1',{title:'Updated Todo',completed: false}) 
  .then((res)=>showOutput(res))       // in this case the entire data is replaced. So, userId: will not present in the data
  .catch(err=>console.error(err));  */   

  //patch request
  axios.patch('https://jsonplaceholder.typicode.com/todos/1',{title:'Updated Todo',completed: false}) 
  .then((res)=>showOutput(res))      // it just updated the title 
  .catch(err=>console.error(err));

}

// DELETE REQUEST
function removeTodo() {
  axios.delete('https://jsonplaceholder.typicode.com/todos/1') 
  .then((res)=>showOutput(res))        // data deleted
  .catch(err=>console.error(err));
}

// SIMULTANEOUS DATA
function getData() {
  
  //Method-1
  
  axios.all([
    axios.get('https://jsonplaceholder.typicode.com/todos'),
    axios.get('https://jsonplaceholder.typicode.com/posts')
])
.then(res=>{
  console.log(res[0]);
  console.log(res[1]);
  showOutput(res[1]);
})
.catch(err=>console.error(err));

//Method-2
  
axios.all([
  axios.get('https://jsonplaceholder.typicode.com/todos'),
  axios.get('https://jsonplaceholder.typicode.com/posts')
])
.then(axios.spread((todos,posts)=>showOutput(posts)))
.catch(err=>console.error(err));

//add limit 
axios.all([
  axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
  axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
])
.then(axios.spread((todos,posts)=>showOutput(posts)))
.catch(err=>console.error(err));
}

// CUSTOM HEADERS
function customHeaders() {
const config={
  headers:{
    'Content-Type': 'application/json',
    authorization: 'sometoken'
  }
}

  axios
  .post('https://jsonplaceholder.typicode.com/todos',
    {
      title:'New Todo',
      completed: false  
    }, config
  ) 
  .then((res)=>showOutput(res)) 
  .catch(err=>console.error(err));
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  const options = {
    method: 'post',
    url: 'https://jsonplaceholder.typicode.com/todos',
    data: {
      title: 'Hello World'
    },
    transformResponse : axios.defaults.transformResponse.concat(data=>{
      data.title = data.title.toUpperCase();  // title of the data has been tranformed into capital letters
      return data;
    })
  }

  axios(options).then(res=>showOutput(res));
}

// ERROR HANDLING
function errorHandling() {
/* axios
  .get('https://jsonplaceholder.typicode.com/todoss')
  .then((res)=>showOutput(res)) 
  .catch (err=>{
    if (err.response){
      // if server responded with a status other than 200 range
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);

      if (err.response.status === 404){
        alert('Error: Page Not Found');
      }
    } else if(err.request){
      // request has made but there is no response
      console.error(err.request);
    } else{
      console.error(err.message);
    }
  }); */

  // adding validateStatus

  axios
  .get('https://jsonplaceholder.typicode.com/todoss', {  // So, here the error status is 404, even though it gives data bcz we are given max status<500
    validateStatus: function(status){
      return status<500; // reject only if status is greater or equal to 500
    }
  })
  .then((res)=>showOutput(res)) 
  .catch (err=>{
    if (err.response){
      // if server responded with a status other than 200 range
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);

      if (err.response.status === 404){
        alert('Error: Page Not Found');
      }
    } else if(err.request){
      // request has made but there is no response
      console.error(err.request);
    } else{
      console.error(err.message);
    }
  });
}
// CANCEL TOKEN
function cancelToken() {

const source = axios.CancelToken.source();

axios
  .get('https://jsonplaceholder.typicode.com/todoss',{cancelToken: source.token})
  .then((res)=>showOutput(res)) 
  .catch(thrown => {
    if (axios.isCancel(thrown)){
      console.log('Request Canceled', thrown.message);
    }
  });
 
  if (true){
    source.cancel('Request Canceled!');
  } 
}

// INTERCEPTING REQUESTS & RESPONSES

axios.interceptors.request.use(config=>{
  console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);
  return config
}, error=>{
  return Promise.reject(error);
});

// AXIOS INSTANCES

const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

axiosInstance.get('/comments').then(res=>showOutput(res));// it calls get method automatically


// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
