import { Requests } from "@/app/Api"
import { useProductsContext } from "@/app/contexts/productsContext";
import { Product } from "@/app/types/products";
import { useState } from "react";
export const ProductsService = () => {
    const {setProducts,setProductsView,products} = useProductsContext()
    const [storeProducts,setStoreProducts] = useState<any>()
    const breakpointsSlider = {
        1700: {
        slidesPerView: 6,
        slidesPerGroup: 6,
        },
        1400: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        },
        1100: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        },
        769: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        },
        600: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        },
    } 

    const {routeGet} = Requests()
    const getProducts = async(limit:number)=>{
        await routeGet(`/products/${limit}`)
        .then((response) => {
            setProducts(response.data.response)
            setProductsView(response.data.response)
        }).catch((err) => {
            console.log(err);
        });
    }

    
    return {getProducts,breakpointsSlider,setProducts,storeProducts,setStoreProducts};
};
