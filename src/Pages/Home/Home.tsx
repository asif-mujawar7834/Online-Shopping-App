import { Categories } from "../../Components/Categories/Categories";
import { HeroSection } from "../../Components/HeroSection/HeroSection";
import Layout from "../../Components/Layout/Layout";
import { ProductCard } from "../../Components/ProductCard/ProductCard";
import { Testimonial } from "../../Components/Testimonials/Testimonials";
import { Track } from "../../Components/Track/Track";

export const Home = () => {
  return (
    <Layout>
      <HeroSection />
      <Categories />
      <ProductCard />
      <Track />
      <Testimonial />
    </Layout>
  );
};
