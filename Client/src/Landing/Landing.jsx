import React, { useEffect, useState } from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();
  const ads = [
    { img: "/image/Vote.png", link: "https://example.com/vote-ad" },
    { img: "/image/UntitledBanner.png", link: "https://swavlambancard.gov.in/" },
    { img: "/image/Hrithick web.jpg", link: "https://example.com/ad3" }
  ];

  const collaborators = [
    { img: "/image/mygov.png", link: "https://www.mygov.in/" },
    { img: "/image/institute.png", link: "https://niepid.nic.in/" },
    { img: "/image/limbs.png", link: "https://alimco.in/" },
    { img: "/image/Hrithick web.jpg", link: "https://example.com/collab3" },
    { img: "/image/Signl.png", link: "https://islrtc.nic.in/" }
  ];

  const news = [
    {
      img: "/image/News1.jpg",
      title: "Voting Rights Expanded for All",
      desc: "The Government has rolled out a new initiative to empower citizens with disabilities by making online voting accessible. Verified individuals who possess a Unique Disability ID (UDID) can now cast their votes digitally from the comfort of their homes. This step not only eliminates physical barriers but also ensures that every eligible citizen, regardless of mobility challenges, can exercise their democratic right with dignity and independence."
    },
    {
      img: "/image/News2.jpg",
      title: "Samagra Shiksha",
      desc: "Samagra Shiksha, launched in 2018–19 by the Department of School Education and Literacy (MHRD), is an integrated scheme covering classes 1 to 12. It aims to provide inclusive education for all children, especially those with special needs."
    },
    {
      img: "/image/News3.avif",
      title: "Samarth Scheme",
      desc: "The Samarth Scheme focuses on establishing Samarth Centres to provide respite and residential care for specified categories of persons with disabilities. These centres offer group homes and other rehabilitative services to ensure comprehensive care and support."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % ads.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page-wrapper">
      <nav className="topbar-section">
        <h1 className="brand-heading">VoteAura</h1>
        <div className="nav-group">
          <button className="nav-btn">Home</button>
          <button className="nav-btn" onClick={() => window.open("https://swavlambancard.gov.in/", "_blank")}>Apply for UDID</button>
          <button className="nav-btn" onClick={() => navigate('/info')}>Get Access to Vote</button>
          <button className="nav-btn" onClick={() => navigate('/votelogin')}>Vote Now</button>
          <button className="nav-btn" onClick={() => navigate('/query')}>Contact Us</button>
          <button className="nav-btn" onClick={() => navigate('/messagedis')}>Election Update's</button>
        </div>
      </nav>

      <div className="ad-slide">
        <a href={ads[currentIndex].link} target="_blank" rel="noopener noreferrer">
          <img src={ads[currentIndex].img} alt="Ad" className="slide-img" />
        </a>
      </div>

      <section className="news-board">
        <h2 className="section-label">Newsfeed</h2>
        <div className="news-grid">
          {news.map((item, index) => (
            <div key={index} className={`news-block ${index % 2 !== 0 ? "reverse-layout" : ""}`}>
              <img src={item.img} alt="News" className="news-photo" />
              <div className="news-texts">
                <h3 className="news-heading">{item.title}</h3>
                <p className="news-info">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="partners-section">
        <h2 className="section-label">Our Collaborators</h2>
        <div className="partner-logos">
          {collaborators.map((collab, index) => (
            <a key={index} href={collab.link} target="_blank" rel="noopener noreferrer">
              <img src={collab.img} alt="Logo" className="logo-icon" />
            </a>
          ))}
        </div>
      </section>

      <footer className="footer-bar">
        <div className="info-list">
          <h3>Know about</h3>
          <p>- how to vote through online</p>
          <p>- how to apply for UDID</p>
          <p>- Schemes for Persons with Disabilities</p>
          <p>- About Department of Empowerment of Persons with Disabilities</p>
          <p>- Disability schemes Medical Camps / Hospitals</p>
          <p>- Disclaimer welfare office</p>
        </div>
        <div className="copyright">
          <p>Terms & Conditions Privacy Policy Copyright Policy Hyperlinking Policy Accessibility Statement Accessibility Options Help Web Information Manager</p>
          <p>© 2024 Unique Disability ID, Department of Empowerment of Persons with Disabilities</p>
          <p>Ministry of Social Justice & Empowerment, Govt. of India. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
