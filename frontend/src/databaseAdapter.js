const axios = require('axios').default;

const instance = axios.create({
  baseURL: 'https://jsonbox.io/1hackatonZuerich2019/',
  timeout: 1000,
  headers: {'Content-Type': 'application/json'}
});


async function createIdea(data){
    try {
        const response = await instance.post('/idea', data);
        if(response.status === 200){
            return response.data;
        }
        return null;
    } catch (error){
        consol.error(error);
    }
}

async function getIdea(idea_id){
    try {
        const response = await instance.get('/idea/' + idea_id);
        if(response.status === 200){
            return response.data;
        }
        return null;
    } catch (error){
        consol.error(error);
    }
}

async function getIdeas(){
    try {
        const response = await instance.get('/idea');
        if(response.status === 200){
            return response.data;
        }
        return null;
    } catch (error){
        consol.error(error);
    }
}

async function getIdeas(location_id){
    try {
        const response = await instance.get('/idea?q=location-id:=' + location_id);
        if(response.status === 200){
            return response.data;
        }
        return null;
    } catch (error){
        consol.error(error);
    }
}

async function deleteIdea(idea_id){
    try {
        const response = await instance.delete('/idea/' + idea_id);
        return response.status === 200
    } catch (error){
        consol.error(error);
    }
}

async function addComment(idea_id, data){
    try {
        const response = await instance.post('/comment', data);
        return response.status === 200;;
    } catch(error){
        console.error(error);
    }
}

async function getComments(idea_id){
    try {
        const response = await instance.get('/comment?q=idea-id:=' + idea_id);
        if(response.status === 200){
            return response.data;
        }
        return null;
    } catch(error){
        console.error(error);
    }
}

async function createLocation(data){
    try {
        const response = await instance.post('/location', data);
        if(response.status === 200){
            return response.data;
        }
        return null;
    } catch (error){
        console.error(error);
    }
}

async function getLocations(){
    try {
        const response = await instance.get('/location');
        if(response.status === 200){ 
            return response.data;
        }
        return null;
    } catch (error){
        console.error(error);
    }
}