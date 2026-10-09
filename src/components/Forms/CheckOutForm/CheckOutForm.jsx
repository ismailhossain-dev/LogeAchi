"use client";

import Container from "@/components/Dashboard/shared/container/Container";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

function CheckOutForm({ productData, checkoutType = "cart" }) {
  const axiosSecure = useAxiosSecure();

  const { data: session, status } = useSession();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // ==========================================
  // PRODUCTS
  // ==========================================

  const products = Array.isArray(productData)
    ? productData
    : productData
      ? [productData]
      : [];

  // ==========================================
  // CALCULATE SUBTOTAL
  // ==========================================

  const subtotal = products.reduce((total, product) => {
    const price = Number(product?.price || 0);

    const quantity = Number(product?.quantity || 1);

    return total + price * quantity;
  }, 0);

  // ==========================================
  // DELIVERY CHARGE
  // ==========================================

  const deliveryCharge = products.length > 0 ? 120 : 0;

  // ==========================================
  // TOTAL
  // ==========================================

  const totalAmount = subtotal + deliveryCharge;

  // ==========================================
  // LOADING
  // ==========================================

  if (status === "loading") {
    return (
      <div className="min-h-[500px] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  // ==========================================
  // EMPTY
  // ==========================================

  if (products.length === 0) {
    return (
      <div className="min-h-[500px] flex items-center justify-center text-white">
        <p>No products available for checkout.</p>
      </div>
    );
  }

  // ==========================================
  // SUBMIT
  // ==========================================

  const onSubmit = async (formData) => {
    try {
      if (!session?.user?.email) {
        toast.error("Please login first.");
        return;
      }

      // ========================================
      // CHECKOUT ITEMS
      // ========================================

      const checkoutItems = products.map((product) => {
        const quantity = Number(product?.quantity || 1);

        const price = Number(product?.price || 0);

        let size = "";

        if (product?.selectedSize) {
          size = product.selectedSize;
        } else if (Array.isArray(product?.size)) {
          size = product.size[0] || "";
        } else {
          size = product?.size || "";
        }

        return {
          productId: product?._id,

          title: product?.title || "",

          image: product?.image || "",

          price,

          quantity,

          size,

          color: product?.selectedColor || product?.color || "",
        };
      });

      // ========================================
      // FINAL CHECKOUT PAYLOAD
      // ========================================

      const checkoutPayload = {
        // single / cart
        checkoutType,

        // customer
        email: session.user.email,

        customer: {
          name: formData.fullName,

          email: session.user.email,

          phone: formData.phoneNumber,
        },

        // products
        items: checkoutItems,

        // shipping
        shippingAddress: {
          address: formData.fullAddress,

          city: formData.city,

          division: formData.state,

          zipcode: formData.zipCode || "",
        },

        // amount
        subtotal,

        deliveryCharge,

        totalAmount,

        // order status
        status: "pending",

        createdAt: new Date().toISOString(),
      };

      console.log("Checkout Payload:", checkoutPayload);

      // ========================================
      // API
      // ========================================

      const res = await axiosSecure.post("/api/checkout", checkoutPayload);

      // ========================================
      // SUCCESS
      // ========================================

      if (res.data?.result?.acknowledged) {
        toast.success("Order confirmed successfully!");

        router.push("/dashboard/user/my-orders");

        return;
      }

      if (res.data?.success) {
        toast.success("Order confirmed successfully!");

        router.push("/dashboard/user/my-orders");

        return;
      }

      toast.error(res.data?.message || "Failed to confirm order.");
    } catch (error) {
      console.error("Checkout error:", error);

      toast.error(
        error?.response?.data?.message ||
          "Something went wrong during checkout.",
      );
    }
  };


  return (
    <div className="w-full bg-[#0f172a] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans antialiased text-slate-200">
      <Container>
      <div className="w-full  bg-slate-900/60 backdrop-blur-xl rounded-3xl border border-slate-800 shadow-[0_25px_70px_-15px_rgba(0,0,0,0.7)] overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* =================================
              ORDER SUMMARY
          ================================= */}

          <div className="w-full lg:w-5/12 bg-slate-950/50 p-6 sm:p-10 border-b lg:border-b-0 lg:border-r border-slate-800">
            <div>
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-sm font-bold text-orange-500 uppercase tracking-wider">
                  1. Order Summary
                </h4>

                <span className="text-[10px] uppercase tracking-wider text-slate-500">
                  {checkoutType === "single"
                    ? "Single Product"
                    : `${products.length} Products`}
                </span>
              </div>

              <div className="space-y-4">
                {products.map((product, index) => {
                  const quantity = Number(product?.quantity || 1);

                  const price = Number(product?.price || 0);

                  const itemTotal = price * quantity;

                  let activeSize = "";

                  if (product?.selectedSize) {
                    activeSize = product.selectedSize;
                  } else if (Array.isArray(product?.size)) {
                    activeSize = product.size[0] || "";
                  } else {
                    activeSize = product?.size || "";
                  }

                  return (
                    <div
                      key={product?._id || index}
                      className="flex gap-4 p-4 bg-slate-900/70 border border-slate-800 rounded-2xl"
                    >
                      {/* IMAGE */}

                      <div className="w-20 h-24 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shrink-0">
                        <img
                          src={
                            product?.image ||
                            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=500"
                          }
                          alt={product?.title || "Product"}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* PRODUCT INFO */}

                      <div className="flex-1 min-w-0">
                        <h2 className="text-sm font-bold text-white leading-5">
                          {product?.title || "Product"}
                        </h2>

                        <div className="mt-2 space-y-1">
                          <p className="text-xs text-slate-400">
                            Price:
                            <span className="text-slate-200 ml-1">
                              ৳{price}
                            </span>
                          </p>

                          <p className="text-xs text-slate-400">
                            Quantity:
                            <span className="text-slate-200 ml-1">
                              {quantity}
                            </span>
                          </p>

                          {activeSize && (
                            <p className="text-xs text-slate-400">
                              Size:
                              <span className="text-slate-200 ml-1">
                                {activeSize}
                              </span>
                            </p>
                          )}

                          {product?.selectedColor && (
                            <p className="text-xs text-slate-400">
                              Color:
                              <span className="text-slate-200 ml-1">
                                {product.selectedColor}
                              </span>
                            </p>
                          )}
                        </div>

                        <div className="mt-3">
                          <p className="text-sm font-bold text-orange-500">
                            ৳{itemTotal}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* TOTAL */}

            <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Subtotal</span>

                <span>৳{subtotal}</span>
              </div>

              <div className="flex justify-between text-xs text-slate-400">
                <span>Delivery Fee</span>

                <span className="text-orange-400">৳{deliveryCharge}</span>
              </div>

              <div className="flex justify-between text-sm font-bold text-white pt-3 border-t border-slate-800/40">
                <span>Total Amount</span>

                <span className="text-orange-500 text-lg">৳{totalAmount}</span>
              </div>
            </div>
          </div>

          {/* =================================
              SHIPPING FORM
          ================================= */}

          <div className="w-full lg:w-7/12 p-6 sm:p-10">
            <h3 className="text-xl font-black text-white tracking-tight mb-6 border-b border-slate-800 pb-4">
              2. Shipping Details
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* FULL NAME */}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Full Name *
                </label>

                <input
                  {...register("fullName", {
                    required: "Full name is required",
                  })}
                  type="text"
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                />

                {errors.fullName && (
                  <span className="text-red-400 text-xs">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              {/* PHONE */}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Phone Number *
                </label>

                <input
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                  type="tel"
                  placeholder="+88017XXXXXXXX"
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                />

                {errors.phoneNumber && (
                  <span className="text-red-400 text-xs">
                    {errors.phoneNumber.message}
                  </span>
                )}
              </div>

              {/* DIVISION + CITY */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    Division / State *
                  </label>

                  <input
                    {...register("state", {
                      required: "Division or state is required",
                    })}
                    type="text"
                    placeholder="e.g. Dhaka"
                    className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                  />

                  {errors.state && (
                    <span className="text-red-400 text-xs">
                      {errors.state.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold text-slate-300">
                    City / District *
                  </label>

                  <input
                    {...register("city", {
                      required: "City or district is required",
                    })}
                    type="text"
                    placeholder="e.g. Mirpur"
                    className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                  />

                  {errors.city && (
                    <span className="text-red-400 text-xs">
                      {errors.city.message}
                    </span>
                  )}
                </div>
              </div>

              {/* ZIP */}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Postal / ZIP Code
                </label>

                <input
                  {...register("zipCode")}
                  type="text"
                  placeholder="e.g. 1216"
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all"
                />
              </div>

              {/* ADDRESS */}

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-300">
                  Full Delivery Address *
                </label>

                <textarea
                  {...register("fullAddress", {
                    required: "Full delivery address is required",
                  })}
                  rows={3}
                  placeholder="House No, Road No, Area, Landmark details..."
                  className="w-full px-4 py-3 bg-slate-950/40 border border-slate-800 focus:border-orange-500 rounded-xl text-sm text-slate-200 outline-none transition-all resize-none"
                />

                {errors.fullAddress && (
                  <span className="text-red-400 text-xs">
                    {errors.fullAddress.message}
                  </span>
                )}
              </div>

              {/* PAYABLE */}

              <div className="flex justify-between items-center bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-4">
                <span className="text-sm font-bold text-slate-300">
                  Payable Amount
                </span>

                <span className="text-xl font-black text-orange-500">
                  ৳{totalAmount}
                </span>
              </div>

              {/* SUBMIT */}

              <button
                type="submit"
                className="w-full py-3.5 mt-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-xs tracking-widest uppercase transition-all duration-300 shadow-lg shadow-orange-600/20 active:scale-[0.99] cursor-pointer"
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      </div>
      </Container>
    </div>
  );
}

export default CheckOutForm;
