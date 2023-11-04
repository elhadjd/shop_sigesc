import OurServices from "./components/Home/ourServices";
import PreviewProducts from "./components/Home/products/preview";
import CategorySection from "./components/Home/Hero/CategorySection";
import PromoSection from "./components/Home/Hero/PromoSection";
import Presentation from "./components/Home/tendencias/presentation";
export default function Home() {
  return (
    <div>
      <div className="mb-4">
        <PromoSection />
      </div>
      <div className="flex flex-col">
        <CategorySection />
        <Presentation/>
        <PreviewProducts />
        <OurServices />
      </div>
    </div>
  );
}