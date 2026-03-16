'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Props {
  collections?: any[];
  className?: string;
}

export const CollectionGrid = ({ collections = [], className }: Props) => {

  console.log('Makeswift Collections Data:', collections);

  return (
    <div className="w-full grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4 m-2">
      {collections.slice(0, 8).map((item, index) => {

        const imageUrl = typeof item.image === 'string'
          ? item.image
          : item.image?.url;

        return (
          <Link
            key={index}
            href={item.link?.href ?? '#'}
            target={item.link?.target}
            className="group flex flex-col gap-4 no-underline"
          >
            <div className="relative block w-full aspect-square overflow-hidden rounded-lg bg-gray-200">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={item.name || 'Collection'}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={index < 3}
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-300 text-gray-500 text-xs text-center p-2">
                  No Image Found <br /> Check Console for Data Structure
                </div>
              )}
            </div>
            <h3 className="text-xs md:text-xl  font-bold text-gray-900 uppercase tracking-tight -mt-[51px] md:-mt-[60px] z-[999] inline-block bg-black/35 p-[7px] text-white rounded-b-[8px]">
              {item.name || 'New Collection'}
            </h3>
          </Link>
        );
      })}
    </div>
  );
};