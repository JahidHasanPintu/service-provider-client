import React, { useEffect, useState } from 'react';
import Product from './Product';
import { useProducts } from '../../hooks/useProducts';
import Loading from '../Loading/Loading';

const Products = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [limit, setLimit] = useState(10);
    const [products, total, totalPages,productOnCurrentPage, loading] = useProducts(page, limit, search, category, brand);
    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    return (
        <div className='flex'>
            <aside className="w-full p-6 sm:w-40 bg-gray-100 dark:text-gray-100">
                <nav className="space-y-8 text-sm">
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-400">Category</h2>
                        <div className="flex flex-col space-y-1">
                            <a rel="noopener noreferrer" href="#">Shoe</a>
                            <a rel="noopener noreferrer" href="#">Mobile</a>

                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-400">Price Range</h2>
                        <div className="flex flex-col space-y-1">
                            <a rel="noopener noreferrer" href="#">300Tk</a>
                            <a rel="noopener noreferrer" href="#">5000TK</a>

                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-400">Brands</h2>
                        <div className="flex flex-col space-y-1">
                            <a rel="noopener noreferrer" href="#">Bata</a>
                            <a rel="noopener noreferrer" href="#">Apex</a>
                            <a rel="noopener noreferrer" href="#">Samsung</a>
                            <a rel="noopener noreferrer" href="#">Apple</a>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-400">My Products</h2>
                        <div className="flex flex-col space-y-1">
                            <a rel="noopener noreferrer" href="#">No Saved Product</a>

                        </div>
                    </div>
                </nav>
            </aside>
            <aside >

            </aside>
            <div className='mx-5 w-full'>

                <div className="mt-2 px-2 flex flex-row items-center self-center justify-center flex-shrink-0 shadow-md lg:justify-between">
                    <div>
                        <h2 className='text-start font-bold px-5'> Products for you </h2>
                        <h4 className='text-start px-5 mb-5'>1 - {productOnCurrentPage} of {total} results</h4>
                    </div>
                    <div className="flex flex-row">
                        <input type="text" placeholder="Search product" className="w-3/5 p-3 rounded-l-lg sm:w-2/3" value={search} onChange={handleSearch} />
                        <button type="button" className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 bg-blue-400 text-gray-900">Search</button>
                    </div>
                </div>

                {loading ? (
                    <Loading />
                ) : (
                    <div className="grid grid-cols-3 gap-2 justify-items-center mt-2 mb-5">
                        {products?.map(product => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
                )}

            </div>

        </div>
    );
};

export default Products;