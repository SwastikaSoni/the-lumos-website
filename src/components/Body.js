import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import img1 from '../images/carausel 2.png';
import img2 from '../images/carausel 3.png';
import img3 from '../images/carausel.png';
import img4 from '../images/about.jpg';
export default function Body() {
    return (
        <div>
            <div id="carouselExampleFade" className="carousel slide home-car" data-bs-ride="carousel" data-bs-interval="10000">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="carousel-img-wrapper">
                            <img src={img3} className="car-img d-block w-100" alt="..." />
                            <div className="layer-1">
                                <div className="wow fadeInUpBig animated" data-wow-duration="1s" data-wow-delay="0.5s" style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '0.5s', animationName: 'fadeInUpBig' }}>
                                    <h3 className="slider-title3 text-uppercase mb-0">welcome to our</h3>
                                </div>
                                <div className="wow fadeInUpBig animated" data-wow-duration="1.5s" data-wow-delay="0.5s" style={{ visibility: 'visible', animationDuration: '1.5s', animationDelay: '0.5s', animationName: 'fadeInUpBig' }}>
                                    <h1 className="slider-title1 text-uppercase"><span className=" d-sm-block">luminary </span> candle</h1>
                                </div>
                                <div className="wow fadeInUpBig animated" data-wow-duration="2s" data-wow-delay="0.5s" style={{ visibility: 'visible', animationDuration: '2s', animationDelay: '0.5s', animationName: 'fadeInUpBig' }}>
                                    <button className='button-one'>Shop now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="carousel-img-wrapper">
                            <img src={img1} className="car-img d-block w-100" alt="..." />
                            <div className="layer-1">
                                <div className="wow fadeInUpBig animated" data-wow-duration="1s" data-wow-delay="0.5s" style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '0.5s', animationName: 'fadeInUpBig' }}>
                                    <h3 className="slider-title3 text-uppercase mb-0">welcome to our</h3>
                                </div>
                                <div className="wow fadeInUpBig animated" data-wow-duration="1.5s" data-wow-delay="0.5s" style={{ visibility: 'visible', animationDuration: '1.5s', animationDelay: '0.5s', animationName: 'fadeInUpBig' }}>
                                    <h1 className="slider-title1 text-uppercase mb-0"><span className=" d-sm-block">luminory </span> candle</h1>
                                </div>
                                <div className="wow fadeInUpBig animated" data-wow-duration="2s" data-wow-delay="0.5s" style={{ visibility: 'visible', animationDuration: '2s', animationDelay: '0.5s', animationName: 'fadeInUpBig' }}>
                                    <p className="slider-pro-brief">Explore our page to discover a vast array of candles in an assortment of delightful scents. From soothing lavender to invigorating citrus, we offer a fragrance for every preference. Dive into our collection and find the perfect scent to elevate your ambiance.</p>
                                </div>
                                <div className="wow fadeInUpBig animated" data-wow-duration="2.5s" data-wow-delay="0.5s" style={{ visibility: 'visible', animationDuration: '2.5s', animationDelay: '0.5s', animationName: 'fadeInUpBig' }}>
                                    <button className='button-one'>Shop now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="carousel-img-wrapper">
                            <img src={img2} className="car-img d-block w-100" alt="..." />
                            <div className="layer-1">
                                <div className="wow fadeInUpBig animated" data-wow-duration="1s" data-wow-delay="0.5s" style={{ visibility: 'visible', animationDuration: '1s', animationDelay: '0.5s', animationName: 'fadeInUpBig' }}>
                                    <h3 className="slider-title3 text-uppercase mb-0">welcome to our</h3>
                                </div>
                                <div className="wow fadeInUpBig animated" data-wow-duration="1.5s" data-wow-delay="0.5s" style={{ visibility: 'visible', animationDuration: '1.5s', animationDelay: '0.5s', animationName: 'fadeInUpBig' }}>
                                    <h1 className="slider-title1 text-uppercase"><span className=" d-sm-block">luminory </span> candle</h1>
                                </div>
                                <div className="wow fadeInUpBig animated" data-wow-duration="2s" data-wow-delay="0.5s" style={{ visibility: 'visible', animationDuration: '2s', animationDelay: '0.5s', animationName: 'fadeInUpBig' }}>
                                    <p className="slider-pro-brief">Step into our world where candles glow, each scent a story waiting to unfold. From lavender's calm to citrus's zest, find your perfect fragrance and light up your nest.</p>
                                </div>
                                <div className="wow fadeInUpBig animated" data-wow-duration="2.5s" data-wow-delay="0.5s" style={{ visibility: 'visible', animationDuration: '2.5s', animationDelay: '0.5s', animationName: 'fadeInUpBig' }}>
                                    <button className='button-one'>Shop now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>







            <div class="about-us-area">
                <div class="about-container">
                    <div class="about-us bg-white">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="about-photo">
                                    <img src={img4} alt="" />
                                </div>
                            </div>
                            <div class="col-lg-8 about-des">
                                <div class="about-brief">
                                    <h4 class="title-2 text-uppercase">about Lumos</h4>
                                    <p>Welcome to The Lumos, where each candle is a beacon of warmth and light, crafted with passion and precision. Our journey began in Ranchi, where a personal love for candle-making blossomed into a small business dedicated to quality and creativity. At The Lumos, we meticulously handcraft each candle using the finest ingredients, ensuring a clean, long-lasting burn that enhances any environment. Our commitment to excellence and detail transforms simple wax and wick into sources of comfort and tranquility, perfect for every occasion.</p>
                                    <p>At The Lumos, we believe that light has the power to transform spaces and uplift spirits. Our candles are more than just sources of illumination; they are expressions of art and heart. We draw inspiration from the rich cultural heritage and natural beauty of Ranchi, infusing each candle with unique fragrances and designs that tell a story. Whether you're seeking a peaceful retreat, a romantic ambiance, or a festive touch, The Lumos is here to brighten your moments. Join us in our journey to illuminate lives, one candle at a time.  </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
