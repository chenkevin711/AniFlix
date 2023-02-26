import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AnimeCard({anime}) {
	const navigate = useNavigate()
	const [anime1, setAnime] = useState({})

	async function FetchAnime() {
		const temp = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/full`)
            .then(res => res.json());
		navigate(`/anime/${temp.data.mal_id}`)
        setAnime(temp.data);
	}

	async function navigateToAnimeInfo() {
		await FetchAnime()
		console.log(anime1)
		
	}

	return (
		<article className="anime-card">
			<a 
				// href={`/${anime.mal_id}`} 
				target="_blank" 
				rel="noreferrer"
				onClick={() => navigateToAnimeInfo()}
				>
				<figure>
					<img 
						src={anime.images.jpg.image_url} 
						alt="Anime Image" />
				</figure>
				<h3>{ anime.title }</h3>
			</a>
		</article>
	)
}

export default AnimeCard