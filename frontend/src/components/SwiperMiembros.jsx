import { useEffect, useRef, useState } from "react";

export const SwiperMiembros = () => {

  const listMember = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [members, setMembers] = useState([])

  useEffect(() => {
    fetch('http://localhost:8000/api/miembros')
      .then(response => response.json())
      .then(data => {
        setMembers(data);
        console.log(data);
      });
  }, []);

  useEffect(() => {
    const listNode = listMember.current;
    const imgNode = listNode.querySelectorAll("li > img")[currentIndex];

    if (imgNode) {
      imgNode.scrollIntoView({
        behavior: "smooth"
      })
    }
  }, [currentIndex])

  const scrollToImage = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex(curr => {
        const isFirstSlide = currentIndex === 0
        return isFirstSlide ? members.length - 1 : curr - 1
      })
    } else {
      const isLastSlide = currentIndex === members.length - 1
      if (!isLastSlide) {
        setCurrentIndex(curr => curr + 1)
      } else {
        setCurrentIndex(0)
      }
    }
  }

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex)
  }

  return (
    <div className="main-container">
      <div className="slider-container">
        <div className="leftArrow" onClick={() => scrollToImage('prev')}>&#10094;</div>
        <div className="rightArrow" onClick={() => scrollToImage('next')}>&#10095;</div>
        <div className="container-images">
          <ul ref={listMember}>
            {
              members.map((item) => {
                return <li key={item[0]} className="elemento-lista">
                    <img src={item[5] ? item[5] : "src/assets/logo.png"} className="foto-miembro"/>
                    <div className="detalles-miembro">
                      <div className="nombre-miembro"><h className="nombre-miembro">{item[1]}</h></div>
                      <div><b>{item[2].substring(8,10)}{item[2].substring(4,8)}{item[2].substring(0,4)} - {item[3]}</b></div>
                      <div>{item[4]}</div>
                    </div>
                </li>
              })
            }
          </ul>
        </div>
        <div className="dots-container">
            {
              members.map((_, idx) => (
                <div key={idx} className={`dot-container-item ${idx === currentIndex ? "active": ""}`}
                  onClick={() => goToSlide(idx)}>
                    &#9865;
                </div>))
            }
        </div>
      </div>
    </div>
  );
};