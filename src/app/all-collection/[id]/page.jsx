import DetailsCard from "@/components/cards/DetailsCard/DetailsCard";
import Footer from "@/components/shared/Footer/Footer";
import Navbar from "@/components/shared/Navbar/Navbar";


export default async function ProductDetails({ params }) {
  const { id } = await params;//url teke id ta access korche

  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/homeProducts/${id}`)

  const detailsUser = await res.json();
  const product = detailsUser.result;


  return (
    <div>
      <Navbar/>
     
      
     <DetailsCard product={product}></DetailsCard>
     <Footer/>
    </div>
  );
}