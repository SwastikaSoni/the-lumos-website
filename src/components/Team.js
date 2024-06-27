import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faInstagram, faPinterest, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import saumilya from '../images/WhatsApp Image 2024-06-16 at 23.27.49_a0e9c7fc.jpg';
import swastika from '../images/IMG-20240307-WA0069.jpg';
import archana from '../images/20220123_125138.jpg';

export default function Team() {
    return (
        <div>
            <div className="team-member-area">
                <div className="team-container">
                    <div className="team-row">
                        <div className="text-center">
                            <h2 className="footer-title team-title">Founders</h2>
                        </div>
                    </div>
                </div>
                <div className="team-grid">
                    <div className="member">
                        <div className="single-member text-center bg-white">
                            <img src={swastika} alt="Swastika Soni" />
                            <h3 className="text-uppercase">Swastika Soni</h3>
                            <p className="text-gray">Your dreams are the blueprint to your future—build it with determination and hard work.</p>
                            <div className="team-social">
                                <ul>
                                    <li><Link to="https://www.linkedin.com/in/swastika-soni/"><FontAwesomeIcon icon={faLinkedin} /></Link></li>
                                    <li><Link to="https://www.instagram.com/_swasss_09?igsh=c3plcWJ3Zzdjd3Zr"><FontAwesomeIcon icon={faInstagram} /></Link></li>
                                    <li><Link to="https://in.pinterest.com/swastikasony/"><FontAwesomeIcon icon={faPinterest} /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="member">
                        <div className="single-member text-center bg-white">
                            <img src={archana} alt="Archana Kumari" />
                            <h3 className="text-uppercase">Archana Kumari</h3>
                            <h4 className="text-uppercase text-gray">Founder</h4>
                            <p className="text-gray">Your ambition is the key to breaking barriers and creating new opportunities—keep pushing the limits.</p>
                            <div className="team-social">
                                <ul>
                                    <li><Link to="#"><FontAwesomeIcon icon={faTwitter} /></Link></li>
                                    <li><Link to="https://www.instagram.com/aunspokentruth?igsh=MWJ1Ynl4ajd1bGo3NA=="><FontAwesomeIcon icon={faInstagram} /></Link></li>
                                    <li><Link to="https://in.pinterest.com/aunspokentruth/"><FontAwesomeIcon icon={faPinterest} /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="member">
                        <div className="single-member text-center bg-white">
                            <img src={saumilya} alt="Saumilya Sumeet" />
                            <h3 className="text-uppercase">Saumilya Sumeet</h3>
                            <p className="text-gray">Every challenge is a stepping stone towards your success—embrace them and keep moving forward.</p>
                            <div className="team-social">
                                <ul>
                                    <li><Link to="https://www.instagram.com/bumfuzzle.saumi?igsh=YWhwbmJibXNkOWJk"><FontAwesomeIcon icon={faInstagram} /></Link></li>
                                    <li><Link to="https://in.pinterest.com/SaumilyaSumeet/"><FontAwesomeIcon icon={faPinterest} /></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
