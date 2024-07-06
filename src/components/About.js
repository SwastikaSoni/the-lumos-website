import React from 'react'
import img4 from '../images/about.jpg';
export default function About() {
    return (
        <div>
            <div className="about-us-area">
                <div className="about-container">
                    <div className="about-us bg-white">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="about-photo">
                                    <img src={img4} alt="" />
                                </div>
                            </div>
                            <div className="col-lg-8 about-des">
                                <div className="about-brief">
                                    <h4 className="title-2 text-uppercase">about Lumos</h4>
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
