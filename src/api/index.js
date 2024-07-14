import axios from "axios";

class ApiHelper{
    constructor(baseurl){
        this.baseurl=baseurl;
        this.headers={contentType : "application/json"};
    }
    getData=async(url,token,params)=>{
        console.log(`${this.baseurl}/${url}`)
        if(token){
            this.headers={...this.headers,'authorization': `Bearer ${token}`}
        }
        return axios.get(`${this.baseurl}/${url}`,{ headers: this.headers,params:params})
            .then(function (response) {
                return {data:response.data,error:false};
            })
            .catch(function (error) {
                console.log(error,"ERROR")
                return {data:error,error:true}
            })
    }
    deleteData=async(url,body,token)=>{
        if(token){
            this.headers={...this.headers,'authorization': `Bearer ${token}`}
        }
        console.log(this.headers)
        return axios.delete(`${this.baseurl}/${url}`,body,{headers: this.headers})
            .then(function (response) {
                return {data:'Data Deleted',error:false};
            })
            .catch(function (error) {
                console.log(error.response.data,"redss");
                return {data:error,error:true}
            })
    }
    postData=async(url,body,token,contentType)=>{
        if(token){
            if(contentType){
                this.headers={contentType};
            }
            this.headers={...this.headers,'authorization': `Bearer ${token}`}
        }
        return axios.post(`${this.baseurl}/${url}`,body,{headers:this.headers})
            .then(function (response) {
                return {data:response.data,error:false};
            })
            .catch(function (error) {
                console.log(error,"ss")
                return {data:error.message,error:true}
            })
    }
    putData=async(url,body,token)=>{
        if(token){
            this.headers={...this.headers,'authorization': `Bearer ${token}`}
        }
        return axios.put(`${this.baseurl}/${url}`,body,{ headers: this.headers})
            .then(function (response) {
                console.log(response.data,"Dats updates")
                return {data:response.data,error:false};
            })
            .catch(function (error) {
                console.log(error.response.data,"error");
                return {data:error.response.data,error:true}
            })
    }
}

// export const API_REQUEST=new ApiHelper("http://localhost:9999")
export const API_REQUEST=new ApiHelper("http://139.144.1.59:8080")