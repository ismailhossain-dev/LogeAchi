import ProductCard from "@/components/cards/ProductCard/ProductCard";

import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";
import Title from "@/components/Title/Title";

const Page = async () => {
  const res = await fetch("http://localhost:3000/api/homeProducts");

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data = await res.json();

  return (
    <div>
      <nav>
        <Navbar />
      </nav>

      <div className="max-w-7xl mx-auto overflow-hidden px-5">
        <div className="max-w-7xl mx-auto overflow-hidden px-5"></div>
        <section className="">
          <Title>Trending products</Title>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 items-center mb-10">
            {data.result?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      </div>
     
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;
