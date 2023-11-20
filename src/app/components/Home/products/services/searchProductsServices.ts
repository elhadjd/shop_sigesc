import { Requests } from "@/app/Api";
import { useProductsContext } from "@/app/contexts/productsContext";
import { useStateProgressContext } from "@/app/contexts/progress";
import { Product } from "@/app/types/products";
import { toast } from "react-toastify";

export const SearchProductsServices = (()=>{
    const {routeGet} = Requests()
    const {setState} = useStateProgressContext()
    const {setProductsView,products,setProducts} = useProductsContext()
    const search = (name: string) => {
        const filteredProducts = products.filter((product: Product) =>{
            return product.nome.toLowerCase().includes(name.toLowerCase())
          }
        );
        if (filteredProducts.length) {
            viewProducts(filteredProducts)
        }else{
            getSearchDb(name)
        }
    };

    const getSearchDb = (async(name:string)=>{
        setState('global')
        await routeGet(`searchProducts/${name}`)
        .then((response) => {
            if (!response.data.length) return toast.info('Nemhum produto encontrado com este nome !!!',{position:'top-right'})
            setProducts(response.data)
        }).catch((err) => {
            console.log(err);
            toast.error('Erro do servidor',{position:'top-right'})
        }).finally(()=>{
            setState('')
        });
    })


    const viewProducts = ((products:Product[])=>{
        setProductsView(products);
    })

    return {search}
})