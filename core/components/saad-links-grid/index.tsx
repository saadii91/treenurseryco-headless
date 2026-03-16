'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Props {
    boxes?: any[];
    className?: string;
}

export const CtaGrid = ({ boxes = [], className }: Props) => {
    return (
        <div className={`w-full grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 p-4 ${className}`}>
            {boxes.map((item, index) => {
                // Defensive check for the image URL from Makeswift Group data
                const imageUrl = typeof item.image === 'string'
                    ? item.image
                    : item.image?.url;

                return (
                    <Link
                        key={index}
                        href={item.link?.href ?? '#'}
                        target={item.link?.target}
                        className="group flex flex-col no-underline"
                    >
                        {/* Box Container */}
                        <div className="relative block w-full aspect-[16/10] overflow-hidden rounded-lg bg-gray-200">
                            {imageUrl ? (
                                <Image
                                    src={imageUrl}
                                    alt={item.name || 'CTA Item'}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full bg-gray-300 text-gray-500 text-xs text-center p-2">
                                    No Image Selected
                                </div>
                            )}
                            {/* Subtle overlay for legibility */}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        </div>

                        {/* Your exact requested Typography/Layout styles */}
                        <h3 className="text-xs md:text-xl font-bold text-white uppercase tracking-tight -mt-[51px] md:-mt-[60px] z-[10] inline-block bg-black/35 p-[7px] rounded-b-[8px] w-fit ml-2">
                            {item.name || 'New CTA'}
                        </h3>
                    </Link>
                );
            })}
        </div>
    );
};