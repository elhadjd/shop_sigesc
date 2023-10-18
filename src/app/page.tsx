import OurServices from "./components/Home/ourServices";
import PreviewProducts from "./components/Home/products/preview";
import CategorySection from "./components/Home/Hero/CategorySection";
import PromoSection from "./components/Home/Hero/PromoSection";
export default function Home() {
  return (
    <div>
      <div className="mb-4">
        <PromoSection />
      </div>
      <div className="flex flex-col gap-7">
        <CategorySection />
        <PreviewProducts />
        <OurServices />
      </div>
    </div>
  );
}