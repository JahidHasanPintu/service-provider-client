import React, { useEffect, useState } from 'react';
// import useGeolocation from '../../hooks/useGeolocation ';
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
    // if (loading) {
    //     return <Loading />
    // }

    const handleSearch = (event) => {
        setSearch(event.target.value);
    };

    return (
        <div className='flex'>
            <aside className="w-full p-6 sm:w-40 bg-gray-100 dark:text-gray-100">
                <nav className="space-y-8 text-sm">
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-400">Format</h2>
                        <div className="flex flex-col space-y-1">
                            <a rel="noopener noreferrer" href="#">Online</a>
                            <a rel="noopener noreferrer" href="#">In Person</a>

                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-400">Starting Salary</h2>
                        <div className="flex flex-col space-y-1">
                            <a rel="noopener noreferrer" href="#">3000Tk</a>
                            <a rel="noopener noreferrer" href="#">5000TK</a>

                        </div>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest uppercase dark:text-gray-400">Qualification</h2>
                        <div className="flex flex-col space-y-1">
                            <a rel="noopener noreferrer" href="#">CSE</a>
                            <a rel="noopener noreferrer" href="#">EEE</a>
                            <a rel="noopener noreferrer" href="#">English</a>
                            <a rel="noopener noreferrer" href="#">Medical</a>
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
                        <input type="text" placeholder="product name" className="w-3/5 p-3 rounded-l-lg sm:w-2/3" value={search} onChange={handleSearch} />
                        <button type="button" className="w-2/5 p-3 font-semibold rounded-r-lg sm:w-1/3 bg-blue-400 text-gray-900">Search</button>
                    </div>
                </div>
                {/* <form>
                    <div className="grid gap-6 mb-6 md:grid-cols-4 bg-gray-50 p-5">
                        <div>
                            <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>

                            <input type="text"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Eg: Physics" required />
                        </div>
                        <div>
                            <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Level</label>
                            <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="HSC/SSC" required />
                        </div>
                        <div>
                            <label for="company" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Curriculum</label>
                            <input type="text" id="company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Eg: English" required />
                        </div>

                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 m-5">Submit</button>

                    </div>


                </form> */}

                {loading ? (
                    <Loading />
                ) : (
                    <div className="grid grid-cols-3 gap-2 justify-items-center mt-2 mb-5">
                        {products?.map(product => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div>
                )}
                {/* <div className="grid grid-cols-3 gap-2 justify-items-center mt-2 mb-5">

                    {
                        products?.map(product =>
                            <Product key={product._id} product={product} />
                        )
                    }

                </div> */}

            </div>

        </div>
    );
};

export default Products;