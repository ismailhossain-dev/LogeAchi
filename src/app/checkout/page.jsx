"use client";

import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/shared/Navbar/Navbar";
import CheckOutForm from "@/components/Forms/CheckOutForm/CheckOutForm";
import Footer from "@/components/shared/Footer/Footer";
import { Suspense } from "react";

// ১. মূল লজিক ও ডেটা ফেচিংয়ের জন্য সাব-কম্পোনেন্ট
const CheckoutContent = () => {
  const axiosSecure = useAxiosSecure();
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();

  const type = searchParams.get("type");
  const productId = searchParams.get("id");
  const quantity = Number(searchParams.get("quantity") || 1);
  const selectedSize = searchParams.get("size") || "";
  const selectedColor = searchParams.get("color") || "";

  // SINGLE PRODUCT CHECKOUT
  const {
    data: singleProductData,
    isLoading: isSingleProductLoading,
  } = useQuery({
    queryKey: ["single-checkout-product", productId],
    enabled: status === "authenticated" && type === "single" && !!productId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/homeProducts/${productId}`);
      return res.data?.result;
    },
  });

  // CART CHECKOUT
  const {
    data: cartData,
    isLoading: isCartLoading,
  } = useQuery({
    queryKey: ["checkout-cart", session?.user?.email],
    enabled: status === "authenticated" && type !== "single" && !!session?.user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/api/cart?email=${session?.user?.email}`);
      return res.data;
    },
  });

  let checkoutData = [];

  if (type === "single") {
    if (singleProductData) {
      checkoutData = [
        {
          ...singleProductData,
          quantity,
          selectedSize,
          selectedColor,
        },
      ];
    }
  } else {
    checkoutData = cartData?.result || [];
  }

  const isLoading =
    status === "loading" ||
    (type === "single" ? isSingleProductLoading : isCartLoading);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-sm text-slate-400">Loading checkout...</p>
        </div>
      </div>
    );
  }

  if (status !== "authenticated") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-white">
        <p>Please login first to continue checkout.</p>
      </div>
    );
  }

  if (checkoutData.length === 0) {
    return (
      <div className="flex-grow flex items-center justify-center py-20">
        <div className="text-center text-white">
          <h2 className="text-xl font-bold mb-2">No products found</h2>
          <p className="text-sm text-slate-400">Please go back and try again.</p>
        </div>
      </div>
    );
  }

  return (
    <CheckOutForm
      productData={checkoutData}
      checkoutType={type === "single" ? "single" : "cart"}
    />
  );
};

// ২. মূল পেজ কম্পোনেন্ট যা Suspense দিয়ে র‍্যাপ করা থাকবে
const CheckoutPage = () => {
  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <Suspense
          fallback={
            <div className="min-h-[70vh] bg-[#0f172a] flex items-center justify-center text-white">
              <div className="text-center">
                <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm text-slate-400">Loading checkout...</p>
              </div>
            </div>
          }
        >
          <CheckoutContent />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;