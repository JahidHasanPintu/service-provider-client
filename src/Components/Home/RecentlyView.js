import React, { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import { useNavigate } from 'react-router-dom';

const RecentlyView = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [limit, setLimit] = useState(10);
    const [products, total, totalPages, productOnCurrentPage, loading] = useProducts(page, limit, search, category, brand);
    const navigate = useNavigate();
    const handleCheckout = (product) => {
        navigate(`/checkout`, { state: { product } });
    }

    return (
        <div>

            <section className="bg-white text-gray-800">
                <div className="container p-6 mx-auto space-y-6">
                    <div className="space-y-2 text-start">
                        <h2 className="text-3xl font-bold">Recently View</h2>

                    </div>
                    <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                        {products?.map(product =>
                            <article onClick={() => handleCheckout(product)} key={product._id} className="flex flex-col bg-gray-100 cursor-pointer">

                                <img alt="" className="object-cover w-full h-52 bg-gray-500" src={product?.imageLinks} />

                                <div className="flex flex-col flex-1 p-6">
                                    <a rel="noopener noreferrer" href="#" aria-label="Te nulla oportere reprimique his dolorum"></a>
                                    <a rel="noopener noreferrer" href="#" className="text-xs tracki uppercase hover:underline text-violet-400">{product?.brand}</a>
                                    <h3 className="flex-1 py-2 text-lg font-semibold leadi">{product?.productName}</h3>

                                </div>
                            </article>
                        )

                        }

                    </div>
                </div>
            </section>
        </div>
    );
};

export default RecentlyView;