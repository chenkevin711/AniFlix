import React from 'react'

function Sidebar2({ newAnime }) {
	return (
		<aside>
			<nav>
				<h3>Airing Anime</h3>
				{newAnime.map(anime => (
					<a 
						href={anime.url} 
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