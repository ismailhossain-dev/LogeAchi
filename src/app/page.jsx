import ProductCard from "@/components/cards/ProductCard/ProductCard";
import Banner from "@/components/home/Banner/Banner";
import Gallery from "@/components/home/Gallery/Gallery";
import OurServices from "@/components/home/OurServices/OurServices";

import Footer from "@/components/shared/Footer/Footer";

import Title from "@/components/Title/Title";
import Link from "next/link";


const Page = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/homeProducts`);

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();
  

  return (
    <div className="bg-[#0f172a] ">
    

      {/* header */}
       <Banner/>
    

       {/* shadcn table */}

      <div className="max-w-7xl mx-auto overflow-hidden px-5">
        <div className="max-w-7xl mx-auto overflow-hidden px-5"></div>
        <section >
         <div className="flex justify-between items-center uppercase">
          {/* title dev */}
          <div className="mt-20 mb-12 italic uppercase space-y-7 ">
           <Title >Trending <br/> <span className="text-blue-500 font-bold">Collections</span>
           </Title>
           </div>
           {/* button div */}
           <div>
            <Link href="/all-collection" className="outline border border-[#e05b00]  py-2 px-6 rounded-lg shadow-md text-[#e05b00] transition duration-200 cursor-pointer transform-stroke">Show All Product</Link>
           </div>

           
         </div>

          <div className="grid grid-cols-2 gap-4  md:grid-cols-3 lg:grid-cols-5 md:gap-6">
            {data.result?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </div>
     
     {/* Our Services Section */}
     <OurServices/>

     {/* gallery */}

     <Gallery/>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
