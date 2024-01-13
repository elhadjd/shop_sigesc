import { Requests } from "@/app/api"
import { useClientContext } from "@/app/contexts/clientContext"
import { Delivery } from "@/app/types/checkout"
import { useRef, useState } from "react"
import { toast } from "react-toastify"

export const AddressServices = ((closeModal:VoidFunction)=>{
    const searchInput = useRef(null)
    const {routePost} = Requests()
    const {client,setClient} = useClientContext()
    const [progress,setProgress] = useState<boolean>(false)
    const [address,setAddresses] = useState<Delivery>({
        city: '',
        comment: '',
        county: '',
        housNumber: '',
        id: 0,
        localisation: '',
        neighborhood: '',
        phone: '',
        road: '',
        country: ''
    })
    const mapApiJs = 'https://maps.googleapis.com/maps/api/js' 


    function loadAsyncScript(src: any){
        return new Promise(resolve=>{
        const script = document.createElement("script")
        Object.assign(script,{
            type: "text/javascript",
            async: true,
            src
        })
        script.addEventListener("load",()=>resolve(script))
        document.head.appendChild(script)
        })
    }

    const initMapScript = ()=>{
        if(window.google){
          return Promise.resolve()
        }
        const src = `${mapApiJs}?key=ApiKeys&libraries=places&v=weekly`
        return loadAsyncScript(src)
      }
    
      const onChangeAddress = ((autocomplete: { getPlace: () => any; })=>{
        const location = autocomplete.getPlace()
        filterLocation(location)
      })
    
      const filterLocation = ((place: any)=>{        
        const locations = place.address_components
        const country = locations.find((location: any)=>location.types[0] == 'country' ? location.long_name : "")?.long_name
        const state = locations.find((location: any)=>location.types[0] == 'administrative_area_level_1' ? location.long_name : "")?.long_name
        const zip_code = locations.find((location: any)=>location.types[0] == "postal_code" ? location.long_name : "")?.long_name
        address.country = `${country} , ${state} , ${zip_code}`
        address.road = locations.find((location: any)=>location.types[0] == 'route' ? location.long_name : "")?.long_name
        address.city = locations.find((location: any)=>location.types[0] == "locality" ? location.long_name : "")?.long_name
        address.neighborhood = locations.find((location: any)=>location.types[0] == 'neighborhood' ? location.long_name : "")?.long_name
        address.county = locations.find((location: any)=>location.types[0] == 'administrative_area_level_2' ? location.long_name : "")?.long_name
        address.housNumber = locations.find((location: any)=>location.types[0] == 'street_number' ? location.long_name : "")?.long_name
        address.localisation = `${place.geometry.location.lat()},${place.geometry.location.lng()}`
        setAddresses({...address})
      })
    
      const initAutocomplete = ()=>{
        if(!searchInput.current) return;
        const autocomplete = new window.google.maps.places.Autocomplete(searchInput.current)     
        autocomplete.setFields(["address_component","geometry",])
        autocomplete.addListener("place_changed",()=>onChangeAddress(autocomplete))
      }
    
      const handlerChangeInputsDelivery = ((event: {
        target: { id: string; value: string };
      })=>{
        setAddresses({...address,[event.target.id]: event.target.value})
      })
    
      const saveAddress = (async(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        if (address.localisation != null || address.localisation != '') {
            setProgress(true)
            await routePost('/saveClientAddress',{...address,client_id:client.id})
            .then((response) => {
              toast.dark(response.data.message,{position: "top-right"})
              if(response.data.data && response.data.data != null) setClient({...response.data.data})
              closeModal()
            }).catch((err) => {
              if(err.message) return toast.dark(err.message,{position: "bottom-right"})
                toast.dark('Erro do servidor',{position: "bottom-right"})
                console.log(err);
            }).finally(()=>{
                setProgress(false)
            });
        }
      })
    return {
        initMapScript,
        handlerChangeInputsDelivery,
        saveAddress,searchInput,
        initAutocomplete,
        setAddresses,
        address
    }
})
