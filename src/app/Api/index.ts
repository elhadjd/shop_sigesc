import axios from 'axios'
export const requestApi = axios.create({
    baseURL: 'http://localhost:3001/',
})



export const Requests = (()=>{
    const routeGet= (async(router: string)=>{
        return await requestApi.get(`${router}`,{
            headers: {
                "X-RapidAPI-Key": "your-api-key",
                "X-RapidAPI-Host": "jokes-by-api-ninjas.p.rapidapi.com",
            },
        })
    })
    const routePost = (async(route: string,data:any)=>{
        return await requestApi.post(route,{...data})
    })

    const routeDelete = (async(route: string)=>{
        return await requestApi.delete(route)
    })

    return {
        routeGet,
        routePost,
        routeDelete
    }
})