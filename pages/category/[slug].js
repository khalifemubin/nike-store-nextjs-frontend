import React, { useEffect, useState } from 'react'
import Wrapper from '@/components/Wrapper'
import { ProductCard } from '@/components/ProductCard'
import { fetchDataFromApi } from '@/utils/api'
import { useRouter } from 'next/router';
import useSWR from "swr";

const maxResultPerPage = 3;

const Category = ({ category, products, slug }) => {
    //pagination of products of the selected category
    const [pageIndex, setPageIndex] = useState(1);
    const { data, error, isLoading } = useSWR(`/api/products?populate=*&filters[categories][slug][$eq]=${slug}&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResultPerPage}`, fetchDataFromApi, {
        fallbackData: products
    });

    const { query } = useRouter();

    useEffect(() => {
        //reset pageindex back to 1 whenever there is a change in query parameter
        setPageIndex(1)
    }, [query]);

    return (
        <div className="w-full md:py-20 relative">
            <Wrapper>
                <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
                    <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                        {category?.data?.[0]?.attributes?.name}
                        {/* Category Name */}
                    </div>
                </div>

                {/* products grid start */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0">
                    {data?.data?.map((product) => (
                        <ProductCard key={product?.id} data={product} />
                    ))}
                    {/* <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard /> */}
                </div>
                {/* products grid end */}

                {/* PAGINATION BUTTONS START */}
                {data?.meta?.pagination?.total > maxResultPerPage && (
                    <div className="flex gap-3 items-center justify-center my-16 md:my-0">
                        <button
                            className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                            disabled={pageIndex === 1}
                            onClick={() => setPageIndex(pageIndex - 1)}
                        >
                            Previous
                        </button>

                        <span className="font-bold">{`${pageIndex} of ${data && data.meta.pagination.pageCount
                            }`}</span>

                        <button
                            className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                            disabled={
                                pageIndex ===
                                (data && data.meta.pagination.pageCount)
                            }
                            onClick={() => setPageIndex(pageIndex + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}
                {/* PAGINATION BUTTONS END */}

                {/* Loader until data gets rendered */}
                {isLoading && (
                    <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
                        <img src="/logo.svg" width={150} />
                        <span className="text-2xl font-medium">Loading...</span>
                    </div>
                )}
                {/* Loader until data gets rendered */}

            </Wrapper>

            {/* {router.query.slug} */}
        </div>
    )
}

export default Category;

//since this page has dynamic route and also needs getStaticProps
export async function getStaticPaths() {
    //generate paths of all the categories
    const categories = await fetchDataFromApi("/api/categories?populate=*");
    //return object for each item
    const paths = categories?.data?.map((c) => ({
        params: {
            slug: c.attributes.slug
        }
    }));

    return {
        paths,
        fallback: false //stop when last item of the data is reached
    }
}

//getStaticPaths requires use of getStaticProps
export async function getStaticProps({ params: { slug } }) {
    //destructure each item of the object in the above array
    const category = await fetchDataFromApi(`/api/categories?filters[slug][$eq]=${slug}`);
    const products = await fetchDataFromApi(`/api/products?populate=*&filters[categories][slug][$eq]=${slug}&pagination[page]=1&pagination[pageSize]=${maxResultPerPage}`);

    return {
        props: {
            category,
            products,
            slug
        }
    }
}
