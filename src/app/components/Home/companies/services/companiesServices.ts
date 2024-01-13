import { Requests } from "@/app/api"
import { Company } from "@/app/types/company"
import { useState } from "react"

export const CompaniesServices = (()=>{
    const [companies,setCompanies] = useState<Company[]>([])
    const {routeGet} = Requests()
    const breakpointsSlider = {
        1700: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        },
        1400: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        },
        1100: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        },
        769: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        },
        600: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        },
    }
    const getCompanies = (async()=>{
        routeGet('companies')
        .then((response) => {
            setCompanies(response.data)
        }).catch((err) => {
            console.log(err);
        });
    })
    return {getCompanies,breakpointsSlider,companies}
})