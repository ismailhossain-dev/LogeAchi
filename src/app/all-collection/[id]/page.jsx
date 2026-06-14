import DetailsCard from "@/components/cards/DetailsCard/DetailsCard";
import Navbar from "@/components/shared/Navbar/Navbar";


export default async function ProductDetails({ params }) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:3000/api/homeProducts/${id}`
  );

  const product = await res.json();
  console.log(product);


  return (
    <div>
      <Navbar/>
     
      
     <DetailsCard product={product}></DetailsCard>
    </div>
  );
}