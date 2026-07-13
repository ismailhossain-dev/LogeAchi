import ProductCard from "@/components/cards/ProductCard/ProductCard";
import Banner from "@/components/home/Banner/Banner";
import Gallery from "@/components/home/Gallery/Gallery";
import OurServices from "@/components/home/OurServices/OurServices";
import Footer from "@/components/shared/Footer/Footer";
import Title from "@/components/Title/Title";
import Link from "next/link";

// 🟢 ১. Vercel বিল্ডের সময় স্ট্যাটিকাল ক্র্যাশ এড়াতে পেজটিকে ডাইনামিক করা হলো
export const dynamic = "force-dynamic";

const Page = async () => {
  let data = { result: [] };

  // 🟢 ২. ট্রাই-ক্যাচ (try-catch) ব্লক দিয়ে ফেচকে সেফ করা হলো যাতে JSON এরর না আসে
  try {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "";
    
    if (appUrl) {
      const res = await fetch(`${appUrl}/api/homeProducts`, {
        cache: "no-store" // ফ্রেশ ডাটার জন্য
      });

      // রেসপন্স হেডার চেক করা হচ্ছে এটি আসলেই JSON কিনা
      const contentType = res.headers.get("content-type");
      if (res.ok && contentType && contentType.includes("application/json")) {
        data = await res.json();
      }
    }
  } catch (error) {
    console.error("Failed to fetch products during build:", error);
  }

  return (
    <div className="bg-[#0f172a]">
      {/* header */}
      <Banner />

      <div className="max-w-7xl mx-auto overflow-hidden px-5">
        <section>
          <div className="flex justify-between items-center uppercase">
            {/* title dev */}
            <div className="mt-20 mb-12 italic uppercase space-y-7">
              <Title>
                Trending <br /> <span className="text-blue-500 font-bold">Collections</span>
              </Title>
            </div>
            {/* button div */}
            <div>
              <Link
                href="/all-collection"
                className="outline border border-[#e05b00] py-2 px-6 rounded-lg shadow-md text-[#e05b00] transition duration-200 cursor-pointer transform-stroke"
              >
                Show All Product
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 md:gap-6">
            {/* সেফটি চেক: ডাটা অ্যারে থাকলে তবেই ম্যাপ হবে */}
            {data?.result && data.result.length > 0 ? (
              data.result.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="text-zinc-400 col-span-full text-center py-10">
                No trending products available right now.
              </p>
            )}
          </div>
        </section>
      </div>

      {/* Our Services Section */}
      <OurServices />

      {/* gallery */}
      <Gallery />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Page;