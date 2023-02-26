import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Sidebar2({ newAnime }) {
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
		<aside>
			<nav>
				<h3>Airing Anime</h3>
				{newAnime.map(anime => (
					<a 
						onClick={() => navigateToAnimeInfo(anime)}
						target="_blank"
						key={anime.mal_id} 
						rel="noreferrer">
						{ anime.title }
					</a>
				))}
			</nav>
		</aside>
		
	)
}

export default Sidebar2