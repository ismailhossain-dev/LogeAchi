import Title from '@/components/Title/Title';
import React from 'react'

function Gallery() {
  return (
    <section className='text-white max-w-7xl mx-auto px-6  md:py-28 font-sans'>
      {/* Mobile Reverse Layout Container */}
      <div className='flex flex-col-reverse lg:flex-col gap-12 md:gap-16'>
        {/* Title */}
      {/* Title and Description Layout */}
      <div className='flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8'>
        
        {/* Left Side: Title */}
        <div className='max-w-md'>
          <span className='text-xs font-semibold tracking-widest text-purple-400 uppercase block mb-2'>
            Visual Showcase
          </span>
          <h1 className='text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent'>
            Our Gallery
          </h1>
        </div>

        {/* Right Side: Paragraph */}
        <div className='max-w-lg'>
          <p className='text-zinc-400 text-base md:text-lg font-light leading-relaxed'>
            Explore our curated high-end visual collection. A professional showcase of outstanding photography, immersive concepts, and modern creative directions captured through our lens.
          </p>
        </div>

      </div>
      
        <div className='flex flex-col md:flex-row gap-6 md:gap-3 items-stretch'>
          
          {/* Main Large Image (Left) */}
          <div className='hidden md:block flex-1 group relative overflow-hidden rounded-[2rem] bg-zinc-900 shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-zinc-800/50'>
            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8'>
              <div>
                <span className='text-xs text-purple-400 font-medium tracking-widest uppercase mb-1 block'>Nature</span>
                <p className='text-xl font-bold tracking-wide'>Serene Landscapes</p>
              </div>
            </div>
            <img 
              src="./assets/gallery-1.avif" 
              className='w-full h-[700px] object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out' 
              alt="Premium Gallery 1" 
            />
          </div>

          {/* Right Images Group */}
          <div className='flex-1 flex flex-col sm:flex-row md:flex-col gap-6 md:gap-3'>
            
            {/* Image 2 (Always Visible) */}
            <div className='flex-1 group relative overflow-hidden rounded-[2rem] bg-zinc-900 shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-zinc-800/50'>
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8'>
                <div>
                  <span className='text-xs text-blue-400 font-medium tracking-widest uppercase mb-1 block'>Architecture</span>
                  <p className='text-xl font-bold tracking-wide'>Urban Exploration</p>
                </div>
              </div>
              <img 
                src="./assets/gallery-2.avif" 
                className='w-full h-[450px] sm:h-[400px] md:h-[336px] object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out' 
                alt="Premium Gallery 2" 
              />
            </div>

            {/* Image 3 (Hidden on Mobile) */}
            <div className='hidden md:block flex-1 group relative overflow-hidden rounded-[2rem] bg-zinc-900 shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-zinc-800/50'>
              <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8'>
                <div>
                  <span className='text-xs text-emerald-400 font-medium tracking-widest uppercase mb-1 block'>Concept</span>
                  <p className='text-xl font-bold tracking-wide'>Minimalist Vision</p>
                </div>
              </div>
              <img 
                src="./assets/gallery-3.avif" 
                className='w-full h-[336px]  object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700 ease-out' 
                alt="Premium Gallery 3" 
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}

export default Gallery;