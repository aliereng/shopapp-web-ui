export default class QueryHelper{
    
    static setQueryParams(query: string,value:string, data:any):string{
        if (query.includes(value)) {
            let queryParams = query.split("&");
            queryParams.map((param, index)=> {
              if(param.includes(value)){
                queryParams[index] = `${value}=${data}`;
              }
            })
            return queryParams.join("&")
          } else {
            query += `&${value}=${data}`;
            return query
          }

    }

}