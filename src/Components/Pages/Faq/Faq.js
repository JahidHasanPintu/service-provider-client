import React, { useState } from 'react';
import Breadcumbs from '../../../Shared/Breadcumbs/Breadcumbs';
import emailjs from 'emailjs-com';
import { toast } from 'react-toastify';
const Faq = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Your EmailJS parameters
        const serviceID = 'service_m98pr0k';
        const templateID = 'template_78egcl4';
        const userID = 'oXsaH8pyvYoSw5rtL';

        // Send the email
        emailjs.send(serviceID, templateID, formData, userID)
            .then((response) => {
                console.log('Email sent successfully!', response);
                toast.success('Email sent successfully!');
                // Handle success (e.g., show a success message to the user)
            })
            .catch((error) => {
                console.error('Failed to send the email:', error);
                toast.error('Failed to send the email!');
                // Handle error (e.g., show an error message to the user)
            });

        // Clear the form after submission
        setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
        });
    };
    return (
        <div>
            <Breadcumbs name={"FAQ"} path={"/faq"} />
            <div className="contact-wrapper  w-11/12 mx-auto mb-10">
                <div className="container-x mx-auto">
                    <div className="main-wrapper w-full lg:flex lg:space-x-[30px]">
                        <div className="text-start lg:w-1/2 w-full mb-10 lg:mb-0">
                            <h1 className="text-qblack font-bold text-[22px] mb-4">Frequently asked questions</h1>
                            <div className="flex flex-col space-y-4 justify-between">
                                <div className="accordion-item w-full bg-white overflow-hidden bg-white">
                                    <details>
                                        <summary className="px-4 py-2 outline-none cursor-pointer">Optio maiores eligendi molestiae totam dolores similique?</summary>
                                        <div className="px-4 pb-4">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde neque in fugiat magni, quas animi enim veritatis deleniti ex. Impedit.</p>
                                        </div>
                                    </details>
                                </div>
                                <div className="accordion-item w-full bg-white overflow-hidden bg-white">
                                    <details>
                                        <summary className="px-4 py-2 outline-none cursor-pointer">Optio maiores eligendi molestiae totam dolores similique?</summary>
                                        <div className="px-4 pb-4">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde neque in fugiat magni, quas animi enim veritatis deleniti ex. Impedit.</p>
                                        </div>
                                    </details>
                                </div>
                                <div className="accordion-item w-full bg-white overflow-hidden bg-white">
                                    <details>
                                        <summary className="px-4 py-2 outline-none cursor-pointer">Optio maiores eligendi molestiae totam dolores similique?</summary>
                                        <div className="px-4 pb-4">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde neque in fugiat magni, quas animi enim veritatis deleniti ex. Impedit.</p>
                                        </div>
                                    </details>
                                </div>
                                <div className="accordion-item w-full bg-white overflow-hidden bg-white">
                                    <details>
                                        <summary className="px-4 py-2 outline-none cursor-pointer">Optio maiores eligendi molestiae totam dolores similique?</summary>
                                        <div className="px-4 pb-4">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde neque in fugiat magni, quas animi enim veritatis deleniti ex. Impedit.</p>
                                        </div>
                                    </details>
                                </div>
                                <div className="accordion-item w-full bg-white overflow-hidden bg-white">
                                    <details>
                                        <summary className="px-4 py-2 outline-none cursor-pointer">Optio maiores eligendi molestiae totam dolores similique?</summary>
                                        <div className="px-4 pb-4">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde neque in fugiat magni, quas animi enim veritatis deleniti ex. Impedit.</p>
                                        </div>
                                    </details>
                                </div>
                                <div className="accordion-item w-full bg-white overflow-hidden bg-white">
                                    <details>
                                        <summary className="px-4 py-2 outline-none cursor-pointer">Optio maiores eligendi molestiae totam dolores similique?</summary>
                                        <div className="px-4 pb-4">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde neque in fugiat magni, quas animi enim veritatis deleniti ex. Impedit.</p>
                                        </div>
                                    </details>
                                </div>
                                <div className="accordion-item w-full bg-white overflow-hidden bg-white">
                                    <details>
                                        <summary className="px-4 py-2 outline-none cursor-pointer">Optio maiores eligendi molestiae totam dolores similique?</summary>
                                        <div className="px-4 pb-4">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde neque in fugiat magni, quas animi enim veritatis deleniti ex. Impedit.</p>
                                        </div>
                                    </details>
                                </div>
                                <div className="accordion-item w-full bg-white overflow-hidden bg-white">
                                    <details>
                                        <summary className="px-4 py-2 outline-none cursor-pointer">Optio maiores eligendi molestiae totam dolores similique?</summary>
                                        <div className="px-4 pb-4">
                                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde neque in fugiat magni, quas animi enim veritatis deleniti ex. Impedit.</p>
                                        </div>
                                    </details>
                                </div>

                            </div>
                        </div>
                        <div className="flex-1 text-start">
                            <div className="bg-white sm:p-10 p-5">
                                <div className="title flex flex-col items-center">
                                    <h1 className="lg:text-[34px] text-xl font-bold text-qblack">Have Any Qustion</h1><span className="-mt-5 block"><svg width="354" height="30" viewBox="0 0 354 30" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 28.8027C17.6508 20.3626 63.9476 8.17089 113.509 17.8802C166.729 28.3062 341.329 42.704 353 1" stroke="#FFBB38" strokeWidth="2" strokeLinecap="round"></path></svg></span></div>
                                <form onSubmit={handleSubmit}>
                                    <div className="inputs mt-5">
                                        <div className="mb-4">
                                            <div className="input-com w-full h-full"><label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal" htmlFor="first_name">Frist Name*</label>
                                                <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="Your Name"
                                                        required
                                                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]" id="first_name" defaultValue="" /></div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <div className="input-com w-full h-full"><label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal" htmlFor="email">Email Address*</label>
                                                <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative ">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="Your Email"
                                                        required

                                                        className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]" id="email" defaultValue="" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                        <div className="input-com w-full h-full"><label className="input-label capitalize block  mb-2 text-qgray text-[13px] font-normal" htmlFor="subject">Subject*</label>
                                            <div className="input-wrapper border border-qgray-border w-full h-full overflow-hidden relative "><input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="Subject"
                                                required
                                                className="input-field placeholder:text-sm text-sm px-6 text-dark-gray w-full font-normal bg-white focus:ring-0 focus:outline-none h-[50px]" id="subject" defaultValue="" /></div>
                                        </div>
                                    </div>
                                        <div className="mb-5">
                                            <h6 className="input-label text-qgray capitalize text-[13px] font-normal block mb-2 ">Message*</h6>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                placeholder="Type your message here"
                                                className="w-full h-[105px] focus:ring-0 focus:outline-none p-3 border border-qgray-border placeholder:text-sm"></textarea></div>
                                        <div>
                                        <button type="submit" className="primary-button-color text-sm font-semibold w-full h-[50px] flex justify-center items-center"><span>Send Now</span></button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Faq;