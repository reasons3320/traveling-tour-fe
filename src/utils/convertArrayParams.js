export const convertToStandardQueryParams = (params)=>{
    const newParams = new URLSearchParams();
    for(const key in params){
        const value = params[key];
        if(Array.isArray(value)){
            value.forEach(item=>newParams.append(key,item));
        }else{
            newParams.append(key,value);
        }
    }
    return newParams.toString();
} 