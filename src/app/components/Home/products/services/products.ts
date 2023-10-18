import { Requests } from "@/app/Api"

import { Product } from "@/app/types";
import { useState } from "react";

export const ProductsService = () => {
    const [products,setProducts] = useState<Product[]>([])
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
            setProducts((prevProducts)=>[...prevProducts,...response.data.response])
        }).catch((err) => {
            console.log(err);
        });
    }
    return { products ,getProducts,breakpointsSlider};
};
