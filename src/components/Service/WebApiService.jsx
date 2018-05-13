export default class WebApiService {
    
    static baseUrl = "http://127.0.0.1:3000/";


    static async Get(data) {
        var response =  await fetch(this.baseUrl + data.direction + data.param);
        response = response.json();
        return response; 
    }
    static async GetURL(data) {
        var url =  this.baseUrl + data.direction + data.param;
        return url; 
    }

static async GetAuthenticated(data){
   if(data.type === 1){
       var response = await fetch(this.baseUrl + data.direction+ data.param,{ 
        method: 'GET',
        headers: data.headers
    })
    response=response.json();
    return response;
   }}

    static async Post(data){
        
       if(data.type === 1){
           var response1 = await fetch(this.baseUrl + data.direction, { 
            method: 'POST',
            body:    JSON.stringify(data.body),
            headers: data.headers
        })
        return response1;
       }else{
            var response = await fetch(this.baseUrl + data.direction, { 
            method: 'POST',
            body:    JSON.stringify(data.body),
            headers: { 'Content-Type': 'application/json' },
        })
        return response;
       }
    }
    static async PostParamURL(data){
        var response = await fetch(this.baseUrl + data.direction + data.param, { 
            method: 'POST',
            body:    JSON.stringify(data.body),
            headers: { 'Content-Type': 'application/json' }
        })
        return response;
     }
    static async Patch(data){
        var response = await fetch(this.baseUrl + data.direction + data.param, { 
        method: 'PATCH',
        body:    JSON.stringify(data.body),
        headers: data.headers
    })
    return response;
    }
}