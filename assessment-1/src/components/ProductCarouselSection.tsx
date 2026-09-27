import React, { useState } from 'react';

interface ProductItem {
    id: string;
    name: string;
    imageSrc: string;
    gradientFrom: string;
    gradientVia: string;
    gradientTo: string;
    cardBg: string;
    accentRing: string;
}

const PRODUCTS: ProductItem[] = [
    {
        id: 'shampoo',
        name: 'Hydrating Shampoo',
        imageSrc: '/assets/shampoo.png',
        gradientFrom: 'from-[#8f68a5]',
        gradientVia: 'via-[#7b4f93]',
        gradientTo: 'to-[#6d3a82]',
        cardBg: 'bg-[#ebbdf2]',
        accentRing: 'ring-[#00c8f8]',
    },
    {
        id: 'conditioner',
        name: 'Hydrating Conditioner',
        imageSrc: '/assets/conditioner.png',
        gradientFrom: 'from-[#6a5ba0]',
        gradientVia: 'via-[#534587]',
        gradientTo: 'to-[#403370]',
        cardBg: 'bg-[#d8c3f8]',
        accentRing: 'ring-[#38ef7d]',
    },
    {
        id: 'mask',
        name: 'Nourishing Hair Mask',
        imageSrc: '/assets/mask.png',
        gradientFrom: 'from-[#507b9a]',
        gradientVia: 'via-[#3f6784]',
        gradientTo: 'to-[#2f516a]',
        cardBg: 'bg-[#bce6f8]',
        accentRing: 'ring-[#ffb347]',
    },
    {
        id: 'leave-in',
        name: 'Curl Leave-In Cream',
        imageSrc: '/assets/leave-in.png',
        gradientFrom: 'from-[#9a507a]',
        gradientVia: 'via-[#843f66]',
        gradientTo: 'to-[#6d2f52]',
        cardBg: 'bg-[#f8bce0]',
        accentRing: 'ring-[#00d2ff]',
    },
    {
        id: 'oil',
        name: 'Nourishing Curl Oil',
        imageSrc: '/assets/oil.png',
        gradientFrom: 'from-[#73509a]',
        gradientVia: 'via-[#5e3f84]',
        gradientTo: 'to-[#492f6d]',
        cardBg: 'bg-[#e0bcf8]',
        accentRing: 'ring-[#ff65a3]',
    },
];

export const ProductCarouselSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? PRODUCTS.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === PRODUCTS.length - 1 ? 0 : prev + 1));
    };

    const activeProduct = PRODUCTS[activeIndex];
    const nextProduct = PRODUCTS[(activeIndex + 1) % PRODUCTS.length];

    return (
        <section className="relative w-full bg-[#dcf5fc] min-h-screen overflow-hidden flex flex-col justify-between pt-0 pb-12 font-sans select-none">

            {/* 1. TOP CLOUD SECTION WITH WAVY CYAN LINE OVERLAPPING SEMI-CIRCLE TOP */}
            <div className="relative w-full h-[220px] sm:h-[280px] md:h-[340px] z-30">
                <img
                    src="/assets/cloud.jpg"
                    alt="Clouds"
                    className="w-full h-full object-cover object-bottom block"
                />

                {/* Cyan Wave Divider Overlay - Positioned high z-index to overlap top edge of semi-circle */}
                <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-40">
                    <svg
                        className="w-full h-16 sm:h-20 md:h-28 text-[#00c8f8] fill-current block"
                        viewBox="0 0 1440 120"
                        preserveAspectRatio="none"
                    >
                        <path d="M0,32 C280,80 420,-10 720,40 C1020,90 1200,10 1440,32 L1440,120 L0,120 Z" />
                    </svg>
                </div>
            </div>

            {/* 2. CENTER STAGE: EXTENDED EDGE-TO-EDGE FULL-WIDTH SEMI-CIRCLE */}
            <div className="relative w-full -mt-20 sm:-mt-28 md:-mt-32 z-10 flex flex-col items-center">

                {/* Continuous Solid Semi-Circle - Zero gap at edges */}
                <div
                    className={`relative w-full bg-gradient-to-b ${activeProduct.gradientFrom} ${activeProduct.gradientVia} ${activeProduct.gradientTo} rounded-b-[50vw] pt-24 sm:pt-32 pb-20 sm:pb-32 px-4 sm:px-12 flex flex-col items-center text-white shadow-2xl transition-all duration-700 ease-in-out`}
                >

                    {/* Carousel Showcase Stage */}
                    <div className="relative w-full max-w-5xl flex items-center justify-center min-h-[300px] sm:min-h-[380px] md:min-h-[440px]">

                        {/* Active Product: Tilted Fully-Circular End Capsule Card */}
                        <div className="flex flex-col items-center z-20">
                            <div
                                className={`relative w-48 h-64 sm:w-64 sm:h-84 md:w-72 md:h-96 ${activeProduct.cardBg} rounded-full p-6 flex items-center justify-center shadow-2xl transform -rotate-3 transition-all duration-500 hover:rotate-0 hover:scale-105 border-2 border-white/40`}
                            >
                                <img
                                    src={activeProduct.imageSrc}
                                    alt={activeProduct.name}
                                    className="max-h-full max-w-full object-contain filter drop-shadow-2xl transition-all duration-500"
                                />
                            </div>

                            {/* Active Product Name */}
                            <h3 className="mt-6 text-lg sm:text-xl md:text-2xl font-black text-white tracking-wide text-center drop-shadow-md">
                                {activeProduct.name}
                            </h3>
                        </div>

                        {/* Secondary Next Product Preview */}
                        <div className="hidden sm:flex flex-col items-center absolute right-4 sm:right-12 md:right-20 z-10 opacity-75 scale-85">
                            <div className="relative w-36 h-48 sm:w-44 sm:h-60 bg-white/20 rounded-full p-4 flex items-center justify-center shadow-md backdrop-blur-sm transform rotate-3 border-2 border-white/30">
                                <img
                                    src={nextProduct.imageSrc}
                                    alt={nextProduct.name}
                                    className="max-h-full max-w-full object-contain filter drop-shadow-md"
                                />
                            </div>
                        </div>

                        {/* Left Tilted Navigation Arrow Button */}
                        <button
                            onClick={handlePrev}
                            className="absolute left-2 sm:left-8 md:left-16 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white border-2 border-white/30 transition-all cursor-pointer z-30 shadow-md transform -rotate-6 active:scale-95 hover:rotate-0"
                            aria-label="Previous Product"
                        >
                            <span className="font-mono text-sm sm:text-base font-bold">~&lt;</span>
                        </button>

                        {/* Right Tilted Navigation Arrow Button */}
                        <button
                            onClick={handleNext}
                            className="absolute right-2 sm:right-8 md:right-16 top-1/2 -translate-y-1/2 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/25 hover:bg-white/40 backdrop-blur-md flex items-center justify-center text-white border-2 border-white/30 transition-all cursor-pointer z-30 shadow-md transform rotate-6 active:scale-95 hover:rotate-0"
                            aria-label="Next Product"
                        >
                            <span className="font-mono text-sm sm:text-base font-bold">~&gt;</span>
                        </button>

                    </div>

                    {/* Bottom Thumbnail Circles */}
                    <div className="flex items-center gap-2 sm:gap-3.5 mt-8 sm:mt-12 z-20">
                        {PRODUCTS.map((prod, idx) => {
                            const isActive = idx === activeIndex;
                            return (
                                <button
                                    key={prod.id}
                                    onClick={() => setActiveIndex(idx)}
                                    className={`relative p-0.5 rounded-full transition-all duration-300 cursor-pointer ${isActive
                                            ? `ring-2 ${prod.accentRing} scale-110 shadow-lg transform -rotate-6`
                                            : 'opacity-50 hover:opacity-100 hover:rotate-3'
                                        }`}
                                >
                                    <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full bg-black/20 border-2 border-white/30 p-1 flex items-center justify-center overflow-hidden backdrop-blur-xs">
                                        <img
                                            src={prod.imageSrc}
                                            alt={prod.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                </div>

            </div>

            {/* 3. REPLACED TAGLINE TEXT WITH Group_car.jpg IMAGE */}
            <div className="relative w-full max-w-4xl mx-auto flex justify-center items-center mt-8 sm:mt-12 px-6 z-20">
                <img
                    src="/assets/Group_car.jpg"
                    alt="Group Car Banner"
                    className="max-w-full h-auto object-contain drop-shadow-md rounded-xl"
                />
            </div>

        </section>
    );
};