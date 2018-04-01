import React, { Component } from 'react';

export default class WebApiService extends Component{
    render(){
        return "";
    }
    
    static baseUrl = "http://localhost:3000/";

    static async Get(data) {
        var response =  await fetch(this.baseUrl + data.direction + data.param);
        response = response.json();
        return response; 
    }
    static async Post(data){
        
    }

}