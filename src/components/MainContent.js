import React from 'react'
import styled from 'styled-components';
import AnimeCard from './AnimeCard';
import Sidebar from '../components/Sidebar';
import Sidebar2 from '../components/Sidebar2'
import { useEffect } from 'react';
import { useState } from 'react';

function MainContent({HandleSearch, search, SetSearch, animeList, themeToggler, topAnime, newAnime, randomTopAnime="https://www.youtube.com/embed/NSIzsFOfd8M?enablejsapi=1&wmode=opaque&autoplay=1"}) {
	console.log('props', randomTopAnime)

	const [randomAnime, setRandomAnime] = useState("https://www.youtube.com/embed/NSIzsFOfd8M?enablejsapi=1&wmode=opaque&autoplay=1")

	useEffect(() => {
		try {
			setRandomAnime(topAnime[Math.floor(Math.random() * topAnime.length)].trailer.embed_url)
		} catch (error) {
			console.log(error)
		}
	}, [topAnime])

	return (
		<main>
			<div className="main-head" style={{}}>
				<form 
					className="search-box"
					onSubmit={HandleSearch}>
					<input 
						type="search"
						placeholder="Find an Anime..."
						required
						value={search}
						onChange={e => SetSearch(e.target.value)}/>
				</form>
				{/* <button className="theme_changer" role="button" onClick={themeToggler} style={{height: '56px'}}>Change Theme</button> */}
			</div>

			<div style={{display: 'flex', marginTop: '30px'}}>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					<Sidebar 
						topAnime={topAnime} />
					<Sidebar2 
						newAnime={newAnime} />
				</div>
				
				{animeList.length === 0 ? 
					<iframe style={{height: '400px', width: '100%', padding: '10px'}} src={randomAnime} />
					// null
					:

					<Scrollbar className="anime-list">
						{animeList.map(anime => (
							<AnimeCard
								anime={anime}
								key={anime.mal_id} />
						))}
					</Scrollbar>
				}
				
				
			</div>
		</main>
	)
}

export default MainContent

const Scrollbar = styled.div`
	scrollbar-width: thin;
	::-webkit-scrollbar {
		display: block;
		width: 5px;
		color: #DB202C;
	}
	::-webkit-scrollbar-track {
		background: #BEC4CF;
		width: 5px;
		border-radius: 2px;
	}
	::-webkit-scrollbar-thumb {
		background: #DB202C;
		border-radius: 10px;
	}
	flex: 2;
`