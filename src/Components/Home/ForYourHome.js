import React, { useEffect, useState } from 'react';
import ForYourProduct from './ForYourProduct';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const ForYourHome = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
    };
    const [products, setProducts] = useState([])
    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(data => setProducts(data.products))
    }, [])
    return (
        <div>
            <section className="bg-white text-gray-800">
                <div className="container p-6 mx-auto space-y-6">
                    <div className="space-y-2 text-start">
                        <h2 className="text-3xl font-bold">For Your Home</h2>

                    </div>


                    <Slider {...settings}>
                        {products?.map(product => <ForYourProduct key={product._id} product={product} />
                        )

                        }

                    </Slider>

                </div>
            </section>
        </div>
    );
};

export default ForYourHome;