import Container from "@/components/Dashboard/shared/container/Container";
import Title from "@/components/Title/Title";

import Link from "next/link";
import React from "react";

function Gallery() {
  return (
    <section className="text-white mx-auto font-sans my-1">
      <Container>
        <div className="flex flex-col-reverse lg:flex-col gap-12 md:gap-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
            <div className="max-w-lg">
              <span className="text-xs font-semibold tracking-widest text-purple-400 uppercase block mb-2">
                Visual Showcase
              </span>

              <div className="uppercase italic">
                <Title>
                  Our <span className="text-blue-500">Gallery</span>
                </Title>
              </div>
            </div>

            <div className="max-w-md">
              <p className="text-zinc-400 text-base md:text-lg font-light leading-relaxed">
                Explore our curated high-end visual collection. A professional
                showcase of outstanding photography, immersive concepts, and
                modern creative directions captured through our lens.
              </p>
            </div>
          </div>

          {/* Gallery */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-3 items-stretch">
            {/* Gallery 1 */}
            <Link
              href="/mens-collections"
              className="hidden md:block flex-2 group relative overflow-hidden rounded-[1rem] bg-zinc-900 shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-zinc-800/50"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                <div>
                  <span className="text-xs text-purple-400 font-medium tracking-widest uppercase mb-1 block">
                    Nature
                  </span>

                  <p className="text-xl font-bold tracking-wide">
                    Serene Landscapes
                  </p>
                </div>
              </div>

              <img
                src="./assets/gallery-1.avif"
                className="w-full h-[700px] object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                alt="Premium Gallery 1"
              />
            </Link>

            {/* Right Gallery */}
            <div className="flex-1 flex flex-col sm:flex-row md:flex-col gap-6 md:gap-3">
              {/* Gallery 2 */}
              <Link
                href="/mens-collections"
                className="flex-1 group relative overflow-hidden rounded-[1rem] bg-zinc-900 shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-zinc-800/50"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div>
                    <span className="text-xs text-blue-400 font-medium tracking-widest uppercase mb-1 block">
                      Architecture
                    </span>

                    <p className="text-xl font-bold tracking-wide">
                      Urban Exploration
                    </p>
                  </div>
                </div>

                <img
                  src="./assets/gallery-2.avif"
                  className="w-full h-[450px] sm:h-[400px] md:h-[336px] object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  alt="Premium Gallery 2"
                />
              </Link>

              {/* Gallery 3 */}
              <Link
                href="/womens-collections"
                className="hidden md:block flex-1 group relative overflow-hidden rounded-[1rem] bg-zinc-900 shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-zinc-800/50"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <div>
                    <span className="text-xs text-emerald-400 font-medium tracking-widest uppercase mb-1 block">
                      Concept
                    </span>

                    <p className="text-xl font-bold tracking-wide">
                      Minimalist Vision
                    </p>
                  </div>
                </div>

                <img
                  src="./assets/gallery-3.avif"
                  className="w-full h-[336px] object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  alt="Premium Gallery 3"
                />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Gallery;
