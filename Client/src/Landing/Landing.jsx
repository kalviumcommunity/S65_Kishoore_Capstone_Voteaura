import React, { useEffect, useState } from "react"
import "./Landing.css"
import { useNavigate } from "react-router-dom"


export default function LandingPage() {
  const navigate = useNavigate()
  const ads = [
    {
      img: "https://static.vecteezy.com/system/resources/previews/001/225/844/original/vote-lettering-with-hand-gestures-vector.jpg",
      link: "https://example.com/vote-ad"
    },
    {
      img: "/image/UntitledBanner.png",
      link: "https://example.com/ad2"
    },
    {
      img: "https://static.vecteezy.com/system/resources/previews/001/225/844/original/vote-lettering-with-hand-gestures-vector.jpg",
      link: "https://example.com/ad3"
    }
  ]

  const collaborators = [
    { img: "https://static.vecteezy.com/system/resources/previews/001/225/844/original/vote-lettering-with-hand-gestures-vector.jpg", link: "https://example.com/collab1" },
    { img: "https://static.vecteezy.com/system/resources/previews/001/225/844/original/vote-lettering-with-hand-gestures-vector.jpg", link: "https://example.com/collab2" },
    { img: "https://static.vecteezy.com/system/resources/previews/001/225/844/original/vote-lettering-with-hand-gestures-vector.jpg", link: "https://example.com/collab3" },
    { img: "https://static.vecteezy.com/system/resources/previews/001/225/844/original/vote-lettering-with-hand-gestures-vector.jpg", link: "https://example.com/collab4" }
  ]

  const news = [
    {
      img: "/image/News1.jpg",
      title: "Voting Rights Expanded for All",
      desc: "The Government has rolled out a new initiative to empower citizens with disabilities by making online voting accessible. Verified individuals who possess a Unique Disability ID (UDID) can now cast their votes digitally from the comfort of their homes. This step not only eliminates physical barriers but also ensures that every eligible citizen, regardless of mobility challenges, can exercise their democratic right with dignity and independence. Authorities emphasize that this measure marks a major step forward in building an accessible and equitable electoral process for all."
    },
    {
      img: "/image/News2.jpg",
      title: "Samagra Shiksha",
      desc: "Samagra Shiksha, launched in 2018–19 by the Department of School Education and Literacy (MHRD), is an integrated scheme covering classes 1 to 12. It aims to provide inclusive education for all children, especially those with special needs. The scheme ensures access to quality education through support like assistive devices, special educators, and inclusive infrastructure."
    },
    {
      img: "/image/News3.avif",
      title: "Samarth Scheme",
      desc: "The Samarth Scheme focuses on establishing Samarth Centres to provide respite and residential care for specified categories of persons with disabilities. These centres offer group homes and other rehabilitative services to ensure comprehensive care and support. "
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % ads.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="landing-page">
      <nav className="landing-navbar">
        <h1 className="landing-logo">VoteAura</h1>
        <div className="landing-nav-links">
          <button className="landing-nav-button">Home</button>
          <button className="landing-nav-button">Apply for UDID</button>
          <button className="landing-nav-button" onClick={()=>navigate('/info')}>Get Access to Vote</button>
          <button className="landing-nav-button">Vote Now</button>
          <button className="landing-nav-button">Contact Us</button>
          <button className="landing-nav-button">Help</button>
        </div>
      </nav>

      <div className="landing-ad-banner">
        <a href={ads[currentIndex].link} target="_blank" rel="noopener noreferrer">
          <img src={ads[currentIndex].img} alt={`Ad ${currentIndex + 1}`} className="landing-ad-image" />
        </a>
      </div>

      <section className="landing-news-section">
        <h2 className="landing-section-title">Newsfeed</h2>
        <div className="landing-news-list">
          {news.map((item, index) => (
            <div key={index} className={`landing-news-card ${index % 2 !== 0 ? "reverse" : ""}`}>
              <img src={item.img} alt="News" className="landing-news-image" />
              <div className="landing-news-content">
                <h3 className="landing-news-title">{item.title}</h3>
                <p className="landing-news-description">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>  
      </section>

      <section className="landing-collaborators-section">
        <h2 className="landing-section-title">Our Collaborators</h2>
        <div className="landing-logos">
          {collaborators.map((collab, index) => (
            <a key={index} href={collab.link} target="_blank" rel="noopener noreferrer">
              <img src={collab.img} alt={`Logo ${index + 1}`} className="landing-collaborator-logo" />
            </a>
          ))}
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-footer-section">
          <h3>About</h3>
          <p>- Know more about UDID</p>
          <p>- Schemes for Persons with Disabilities</p>
          <p>- About Department of Empowerment of Persons with Disabilities</p>
          <p>- Disibility schemesMedical Camps / Hospitals</p>
          <p>- Disclaimer welfare office</p>
        </div>

        <br />
        <div className="landing-footer-bottom">
          <p>Terms & Conditions Privacy Policy Copyright Policy Hyperlinking Policy Accessibility Statement Accessibility Options Help Web Information Manager</p>
          <p>© Copyright 2024 Unique Disability ID, Department of Empowerment of Persons with Disabilities,</p>
          <p>Ministry of Social Justice & Empowerment, Govt. of India. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  )
}
