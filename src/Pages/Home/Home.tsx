import Filter from "../../Components/Filter/Filter";
import { HeroSection } from "../../Components/HeroSection/HeroSection";
import Layout from "../../Components/Layout/Layout";
import ProductCard from "../../Components/ProductCard/ProductCard";
import { Testimonial } from "../../Components/Testimonials/Testimonials";
import { Track } from "../../Components/Track/Track";
import { useStoreContext } from "../../Context/StoreContext";

export const Home = () => {
  const { mode } = useStoreContext();
  console.log(mode);
  return (
    <Layout>
      <HeroSection />
      <Filter />
      <ProductCard />
      <Track />
      <Testimonial />
    </Layout>
  );
};
