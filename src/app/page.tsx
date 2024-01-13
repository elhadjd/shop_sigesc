import OurServices from "./components/Home/ourServices";
import PreviewProducts from "./components/Home/products/preview";
import CategorySection from "./components/Home/Hero/CategorySection";
import PromoSection from "./components/Home/Hero/PromoSection";
import Presentation from "./components/Home/tendencias/presentation";
import Companies from "./components/Home/companies/companies";
import ListProducts from "./components/Home/products/listProducts";
export default function Home() {
  return (
    <div>
      <div className="mb-4">
        <PromoSection />
      </div>
      <div className="flex flex-col">
        <CategorySection />
        <Presentation/>
        <div className="flex flex-wrap justify-center w-full max-[650px]:w-full">
          <ListProducts />
        </div>
        <Companies/>
        <OurServices />
      </div>
    </div>
  );
}