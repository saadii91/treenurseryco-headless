// "use client"

// import { use, useEffect, useState } from "react"
// import { fetchdata } from "./_server/dataload"
// import { Button } from "@/vibes/soul/primitives/button";

// export function HelloWorld({ name }: { name: string }) {
//     const [blogs, setBlogs] = useState<Awaited<ReturnType<typeof fetchdata>> | undefined>(undefined);
//     const [loading, setloading] = useState(false)



//     const loadData = async () => {
//         setloading(true);
//         const data = await fetchdata();
//         setBlogs(data);
//         console.log(data);
//         setloading(false);
//     }

//     // useEffect(() => {
//     //     const loadData = async () => {
//     //         const data = await fetchdata();
//     //         setProducts(data);
//     //         console.log(data);
//     //     }

//     //     loadData();
//     // }, []) data.site.products.edges?.length

//     return (
//         <>
//             <div>Hello {name}</div>
//             <Button variant="primary" size="small" disabled={loading} onClick={loadData}>Load Product</Button>
//             Blogs Length: {!!blogs && blogs.data.site.content.blog?.posts.edges?.length}
//             {!!blogs && blogs.data.site.content.blog?.posts.edges?.map(({ node }) => {
//                 return (
//                     <>
//                         <div style={{ color: 'red' }}>Blog ID: {node.entityId}</div>
//                         <div>Blog Name: {node.name}</div>
//                     </>
//                 )
//             })}
//         </>
//     );
// }






// "use client"

// import { useState, useEffect } from "react"
// import { fetchdata } from "./_server/dataload";
// import { FeaturedBlogPostCarousel, type BlogPost } from '@/vibes/soul/sections/featured-blog-post-carousel';
// import { SectionLayout } from '@/vibes/soul/sections/section-layout';

// export function HelloWorld({ name }: { name: string }) {
//     const [posts, setPosts] = useState<BlogPost[]>([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const loadBlogPosts = async () => {
//             setLoading(true);
//             try {
//                 const result = await fetchdata();

//                 const formattedPosts: BlogPost[] = result.data.site.content.blog?.posts.edges?.map(({ node }) => ({
//                     id: node.entityId.toString(),
//                     title: node.name,
//                     summary: node.plainTextSummary || "",
//                     content: node.plainTextSummary || "",
//                     href: node.path,
//                     image: {
//                         src: node.thumbnailImage?.url || "/favicon.ico",
//                         alt: node.thumbnailImage?.altText || node.name
//                     },
//                     date: node.publishedDate?.utc
//                         ? new Date(node.publishedDate.utc).toLocaleDateString('en-US', {
//                             month: 'short',
//                             day: '2-digit',
//                             year: 'numeric'
//                         })
//                         : "",
//                     author: node.author || "Admin"
//                 })) || [];

//                 setPosts(formattedPosts);
//             } catch (e) {
//                 console.error("Error fetching blog posts:", e);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadBlogPosts();
//     }, []); // Empty dependency array means this runs exactly once on page load

//     // Optional: Show a skeleton or loading state while fetching
//     if (loading && posts.length === 0) {
//         return (
//             <div className="container py-20 text-center">
//                 <p className="animate-pulse text-lg font-medium">Loading Plant Life...</p>
//             </div>
//         )
//     }

//     return (
//         <div className="container">
//             {posts.length > 0 && (
//                 <SectionLayout>
//                     <FeaturedBlogPostCarousel
//                         blogPosts={posts}
//                         cta={{ label: 'View all', href: '#' }}
//                         title="Plant Life"
//                     />
//                 </SectionLayout>
//             )}
//         </div>
//     );
// }

// components/blog-section/index.tsx
"use client"

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { User, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { fetchdata } from "./_server/dataload";

interface BlogPost {
    id: string;
    title: string;
    summary: string;
    href: string;
    image: string;
    author: string;
    date: string;
}

interface Props {
    title?: string;
    subtitle?: string;
    desktopLimit?: number;
    mobileLimit?: number;
}

export function CustomBlogCarousel({
    title = "Our Blog",
    subtitle = "A few of our recent posts",
    desktopLimit = 3,
    mobileLimit = 1
}: Props) {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: true });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    useEffect(() => {
        async function load() {
            try {
                const result = await fetchdata();
                const formatted: BlogPost[] = result.data.site.content.blog?.posts.edges?.map(({ node }: any) => ({
                    id: node.entityId.toString(),
                    title: node.name,
                    summary: node.plainTextSummary || "",
                    href: node.path,
                    image: node.thumbnailImage?.url || "/favicon.ico",
                    author: node.author || "Admin",
                    date: node.publishedDate?.utc
                        ? new Date(node.publishedDate.utc).toLocaleDateString()
                        : ""
                })) || [];
                setPosts(formatted);
            } catch (e) {
                console.error("Makeswift Render Error:", e);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    // Avoid rendering the carousel if there's no data yet to prevent layout shifts in Makeswift
    if (loading) return <div className="py-20 text-center uppercase tracking-widest text-gray-400">Loading Blog...</div>;

    return (
        <section className="bg-white py-16 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="mb-12 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-[#2d5a27] uppercase">{title}</h2>
                    <p className="mt-2 text-gray-500 italic">{subtitle}</p>
                </div>

                <div className="relative group">
                    <div className="overflow-hidden" ref={emblaRef}>
                        <div className="flex -ml-4">
                            {posts.map((post) => (
                                <div
                                    key={post.id}
                                    className="min-w-0 pl-4 flex-none"
                                    style={{
                                        // We use CSS variables for clean responsiveness without JS window objects
                                        width: 'var(--card-width)'
                                    } as any}
                                >
                                    <style jsx>{`
                    div { --card-width: ${100 / mobileLimit}%; }
                    @media (min-width: 768px) { div { --card-width: ${100 / desktopLimit}%; } }
                  `}</style>

                                    <div className="relative flex flex-col items-center pb-8">
                                        <div className="relative h-64 w-full overflow-hidden rounded-xl shadow-lg">
                                            {post.image && (
                                                <Image
                                                    src={post.image}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 768px) 100vw, 33vw"
                                                />
                                            )}
                                        </div>
                                        <div className="relative -mt-20 w-[90%] rounded-xl bg-white p-6 shadow-xl text-center border border-gray-50">
                                            <h3 className="mb-3 text-xl font-bold text-gray-800 line-clamp-2">{post.title}</h3>
                                            <div className="mb-4 flex items-center justify-center gap-4 text-xs text-gray-500">
                                                <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                                                <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                                            </div>
                                            <p className="mb-6 text-sm text-gray-600 line-clamp-2">{post.summary}</p>
                                            <a href={post.href} className="inline-block rounded-full bg-[#2d5a27] px-8 py-2 text-sm font-semibold text-white hover:bg-[#1e3d1a] transition-colors">
                                                Read More
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Arrows */}
                    <button onClick={scrollPrev} className="absolute left-0 top-[40%] -translate-y-1/2 -translate-x-2 bg-white border border-[#2d5a27] rounded-full p-2 text-[#2d5a27] hover:bg-gray-50 z-10 hidden md:block">
                        <ChevronLeft size={24} />
                    </button>
                    <button onClick={scrollNext} className="absolute right-0 top-[40%] -translate-y-1/2 translate-x-2 bg-white border border-[#2d5a27] rounded-full p-2 text-[#2d5a27] hover:bg-gray-50 z-10 hidden md:block">
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
}