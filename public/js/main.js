//setting up our variables to select all items that match the requirements. 

//delete button class
const deleteBtn = document.querySelectorAll('.del')
//selecting all spans.not and in todoItem
const todoItem = document.querySelectorAll('span.not')
//selector for all todoItems which are completed 
const todoComplete = document.querySelectorAll('span.completed')

//from the array, for each element that has .del class, create on click event. 
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

//adding event listener for each todoItem and running markComplete
Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

//adding event listener on click for each element with class that are todoComplete and runing markIncomplete
Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

//function for above deleteTodo. Go to the parent and find the ID that matches it 
async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', { 
            //if can find this, add todoId 
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        }) 
        //getting response 
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}