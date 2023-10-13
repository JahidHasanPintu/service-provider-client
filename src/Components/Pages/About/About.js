import React from 'react';
import Breadcumbs from '../../../Shared/Breadcumbs/Breadcumbs';
import aboutImage from '../../../assets/images/about-banner.png';
import commentImage from '../../../assets/images/comment-user-1.png';

const About = () => {
    return (
        <div>
            <Breadcumbs name={"About Us"} path={"/about"} />
            <div className="aboutus-wrapper w-11/12 mx-auto text-start">
                <div className="container-x mx-auto">
                    <div className="w-full min-h-[665px] lg:flex lg:space-x-12 items-center pb-10 lg:pb-0">
                        <div className="md:w-[570px] w-full md:h-[560px] h-auto rounded overflow-hidden my-5 lg:my-0"><img src={aboutImage} alt="about" className="w-full h" /></div>
                        <div className="content flex-1">
                            <h1 className="text-[18px] font-medium text-qblack mb-2.5">What is service provider?</h1>
                            <p className="text-[15px] text-qgraytwo leading-7 mb-2.5">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries but also the on leap into electronic typesetting.</p>
                            <ul className="text-[15px] text-qgraytwo leading-7 list-disc ml-5 mb-5">
                                <li>slim body with metal cover</li>
                                <li>latest Intel Core i5-1135G7 processor (4 cores / 8 threads)</li>
                                <li>8GB DDR4 RAM and fast 512GB PCIe SSD</li>
                                <li>NVIDIA GeForce MX350 2GB GDDR5 graphics card backlit keyboard</li>
                            </ul>
                            <a href="/contact">
                                <div className="w-[121px] h-10"><span className="product-button">Contact Us</span></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default About;