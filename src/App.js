import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./themes.js";
import Home from './components/Home';
import AnimeInfo from './components/AnimeInfo';
import { useModalProvider, ModalProvider } from '../src/Providers/ModalProvider'
import { Route, Routes, BrowserRouter, HashRouter } from 'react-router-dom';


const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
  height: 100vh;
`;


function App() {
	const [animeList, SetAnimeList] = useState([]);
	const [topAnime, SetTopAnime] = useState([]);
	const [search, SetSearch] = useState("");
	const [newAnime, SetNewAnime] = useState([]);
	const [airingAnime, setAiringAnime] = useState([])
	const { createModal, close } = useModalProvider()

	const GetTopAnime = async () => {
		const temp = await fetch(`https://api.jikan.moe/v4/anime?limit=30&order_by=score&sort=desc`)
			.then(res => res.json());
		console.log('temp', temp)
		SetTopAnime(temp.data.slice(0, 5));
	}

	const GetNewAnime = async () => {
		const temp = await fetch(`https://api.jikan.moe/v4/anime?limit=30&order_by=score&sort=desc&status=airing`)
			.then(res => res.json());
		setAiringAnime(temp.data)
		SetNewAnime(temp.data.slice(0, 5))
	}

	const HandleSearch = e => {
		e.preventDefault();

		FetchAnime(search);
	}

	const FetchAnime = async (query) => {
		const temp = await fetch(`https://api.jikan.moe/v4/anime?limit=30&q=${query}&order_by=score&sort=desc`)
			.then(res => res.json());

		SetAnimeList(temp.data);
	}

	const [theme, setTheme] = useState("light");

  	const themeToggler = () => {
    	theme === "light" ? setTheme("dark") : setTheme("light");
  	};

	useEffect(() => {
		GetTopAnime();
		GetNewAnime();
		FetchRandomTopAnime();
	}, []);

	const [randomAnime, setRandomAnime] = useState()

	const FetchRandomTopAnime = async () => {
		const temp = await fetch(`https://api.jikan.moe/v4/anime?limit=30&order_by=score&sort=desc`)
		.then(res => res.json());
		setRandomAnime(temp.data[Math.floor(Math.random() * temp.data.length)].trailer.embed_url);
	}
	
	console.log('random', randomAnime)

	return (
		<ThemeProvider theme={theme === "light" ? darkTheme : darkTheme}>
			<GlobalStyles />
			<StyledApp id='styledapp'>
				<HashRouter>
					<ModalProvider>
						<Header />
						<Routes>
							<Route path='/' element={<Home themeToggler={themeToggler} topAnime={topAnime} newAnime={newAnime} HandleSearch={HandleSearch} search={search} SetSearch={SetSearch} animeList={animeList} randomTopAnime={randomAnime} airingAnime={airingAnime}/>} />
								
							<Route path='/anime/:mal_id' element={<AnimeInfo />}/>
							
						</Routes>
					</ModalProvider>
				</HashRouter>
			</StyledApp>
		</ThemeProvider>
	);
}

export default App;