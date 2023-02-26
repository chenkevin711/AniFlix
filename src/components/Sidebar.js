import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar({ topAnime }) {
	const navigate = useNavigate()
	const [anime, setAnime] = useState({})

	async function FetchAnime(anime) {
		const temp = await fetch(`https://api.jikan.moe/v4/anime/${anime.mal_id}/full`)
            .then(res => res.json());
		navigate(`/anime/${temp.data.mal_id}`)
        setAnime(temp.data);
	}

	async function navigateToAnimeInfo(anime) {
		await FetchAnime(anime)
	}

	return (
		<div>
			<nav>
				<h3>Top Anime</h3>
				{topAnime.map(anime => (
					<a 
						// href={anime.url} 
						onClick={() => navigateToAnimeInfo(anime)}
						target="_blank"
						key={anime.mal_id} 
						rel="noreferrer">
						{ anime.title }
					</a>
				))}
			</nav>
		</div>
		
	)
}

export default Sidebar