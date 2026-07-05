import ProductCard from "@/components/cards/ProductCard/ProductCard";
import Banner from "@/components/home/Banner/Banner";
import OurServices from "@/components/home/OurServices/OurServices";

import Footer from "@/components/shared/Footer/Footer";

import Title from "@/components/Title/Title";


const Page = async () => {
  const res = await fetch("http://localhost:3000/api/homeProducts");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  

  return (
    <div className="bg-[#0f172a]">
    

      {/* header */}
       <Banner/>

       {/* shadcn table */}

      <div className="max-w-7xl mx-auto overflow-hidden px-5">
        <div className="max-w-7xl mx-auto overflow-hidden px-5"></div>
        <section >
         <div className="my-8">
           <Title >Trending Products</Title>
         </div>

          <div className="grid grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-4 md:gap-6">
            {data.result?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </div>
     
     {/* Our Services Section */}
     <OurServices/>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
