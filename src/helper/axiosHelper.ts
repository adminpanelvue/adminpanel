import axios from "axios";

class AxiosHelper{
  private baseURL = "https://jsonplaceholder.typicode.com";

  private headers = {
  "Accept-Language":"tr-TR",
  "Content-Type":"application/json"
  };
  private configuration = {
    "baseURL":this.baseURL,
    "headers":this.headers
  };
  private axiosInstance = axios.create({...this.configuration});

  
  ////**************AXİOS************/////////
  public get = async  (url:string, headers?:any, params?:any) => {
    const response = await this.axiosInstance.get(url,{
      headers,
      params
    });
    return response;
  }

  public post = async  (url:string ,data?:any ,headers?:any, params?:any) => {
    const response = await this.axiosInstance.post(url,data,{
      headers,
      params
    });
    return response;
  }

}

export default new AxiosHelper();




