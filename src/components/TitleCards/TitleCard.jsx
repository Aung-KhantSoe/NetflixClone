import React, { useEffect, useRef, useState } from 'react'
import './TitleCard.css'
import cards_data from "../../assets/cards/Cards_data"
import { Link } from 'react-router-dom';



const TitleCard = ({ title, category }) => {
    const [apiData, setApiData] = useState([]); 
    const cardsRef = useRef();
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzliMGExZjJkNjg4MWI0M2RiYzUxYjdlZjc0MzYwNSIsIm5iZiI6MTczMTgyMDk0OC44MjI5MjQ5LCJzdWIiOiI2NzM5N2M5YjYyNGE4NWI4ODk5ZWM0OTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.vu1p7XnUdFV_p_la0qr80bZxSPqldjv_IPRQ2IPqjJ0'
        }
    };

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
        .then(res => res.json())
        .then(res => setApiData(res.results))
        .catch(err => console.error(err));
    })

    return (
        <div className='title-cards'>
            <h2>{title ?? "Popular on Netflix"}</h2>
            <div className="card-list" ref={cardsRef}>
                {apiData.map((card, index) => {
                    return <Link to={`/player/${card.id}`} className="card" key={index}>
                        <img src={`https://image.tmdb.org/t/p/w500/`+card.backdrop_path} alt="" />
                        <p>{card.original_title}</p>
                    </Link>
                })}
            </div>
        </div>
    )
}

export default TitleCard