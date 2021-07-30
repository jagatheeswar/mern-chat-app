var users = [];

const adduser = ({id,name,room}) =>{
name = name.trim().toLowerCase();
room = room.trim().toLowerCase();

const existinguser = users.find((user)=>user.room===room && user.name === name);
if(existinguser){
    return {error: 'username is taken'}
}
const user = {id,name,room};
users.push(user);
return {user}
}
const removeuser = (id) =>{

    const index = users.findIndex((user)=>user.id === id)
    if(index !=-1){
        return users.splice(index,1)[0]
    }
}
const getuser = (id) => {
    
    const found = users.find((user)=>user.id===id)
    return found
}

const getusersinroom = (room) => 
{ 
    
  const curuser = users.filter((user) => user.room === room); 

   return curuser}

module.exports = {
    adduser,
    removeuser,
    getuser,
    getusersinroom
}