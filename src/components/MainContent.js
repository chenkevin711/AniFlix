import React from 'react'
import styled from 'styled-components';
import AnimeCard from './AnimeCard';
import Sidebar from '../components/Sidebar';
import Sidebar2 from '../components/Sidebar2'
import { useEffect } from 'react';
import { useState } from 'react';
import * as MdIcons from 'react-icons/md'
import Account from './Login';
import { useModalProvider } from '../Providers/ModalProvider';
import AccountInfo from './Account';

function MainContent({HandleSearch, search, SetSearch, animeList, themeToggler, topAnime, newAnime, randomTopAnime="https://www.youtube.com/embed/NSIzsFOfd8M?enablejsapi=1&wmode=opaque&autoplay=1", airingAnime}) {
	console.log('props', randomTopAnime)

	const { createModal, close, account } = useModalProvider()

	const [randomAnime, setRandomAnime] = useState("https://www.youtube.com/embed/NSIzsFOfd8M?enablejsapi=1&wmode=opaque&autoplay=1")

	useEffect(() => {
		try {
			setRandomAnime(airingAnime[Math.floor(Math.random() * airingAnime.length)].trailer.embed_url)
		} catch (error) {
			console.log(error)
		}
	}, [airingAnime])

	function renderAccountModal() {
		console.log('logged in', account)
		if (account === {}) {
			createModal(<AccountInfo 
				escClose={true}
				clickOutsideClose={true}
				style={{height: '500px', width: '800px'}}
			/>)
		} else {
			createModal(<Account 
				escClose={true}
				clickOutsideClose={true}
				style={{height: '500px', width: '800px'}}
			/>)
		}
	}

	function renderAccountInfo() {
		
	}

	console.log('account', account)

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

				<div>
					<MdIcons.MdAccountCircle size={60} style={{cursor: 'pointer'}}
					onClick={() => renderAccountModal()}
					/>
				</div>
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
					<div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
						<p style={{fontFamily: 'fantasy', fontSize: '30px', textAlign: 'center'}}>
							Spotlight
						</p>
						<iframe style={{height: '650px', width: '100%', padding: '10px'}} src={randomAnime} />
					</div>
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