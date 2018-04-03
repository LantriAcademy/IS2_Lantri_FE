import React, { Component } from 'react';

export default class WebApiService extends Component{
    render(){
        return "";
    }
    
    static baseUrl = "https://fundacionesbackend-judgarciani.c9users.io/";

    static async Get(data) {
        var response =  await fetch(this.baseUrl + data.direction + data.param);
        response = response.json();
        return response; 
    }
    static async Post(data){
        var response = await fetch(this.baseUrl + data.direction, { 
            method: 'POST',
            body:    JSON.stringify(data.body),
            headers: { 'Content-Type': 'application/json' },
        })
        return response;
    }

}