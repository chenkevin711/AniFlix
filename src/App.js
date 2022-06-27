import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Sidebar2 from './components/Sidebar2';
import styled, { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./themes.js";


const StyledApp = styled.div`
  color: ${(props) => props.theme.fontColor};
`;

function App() {
	const [animeList, SetAnimeList] = useState([]);
	const [topAnime, SetTopAnime] = useState([]);
	const [search, SetSearch] = useState("");
	const [newAnime, SetNewAnime] = useState([]);

	const GetTopAnime = async () => {
		const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/bypopularity`)
			.then(res => res.json());

		SetTopAnime(temp.top.slice(0, 5));
	}

	const GetNewAnime = async () => {
		const temp = await fetch(`https://api.jikan.moe/v3/top/anime/1/airing`)
			.then(res => res.json());

		SetNewAnime(temp.top.slice(0, 5))
	}

	const HandleSearch = e => {
		e.preventDefault();

		FetchAnime(search);
	}

	const FetchAnime = async (query) => {
		const temp = await fetch(`https://api.jikan.moe/v3/search/anime?q=${query}&order_by=title&sort=asc&limit=30`)
			.then(res => res.json());

		SetAnimeList(temp.results);
	}

	const [theme, setTheme] = useState("light");

  	const themeToggler = () => {
    	theme === "light" ? setTheme("dark") : setTheme("light");
  	};

	useEffect(() => {
		GetTopAnime();
	}, []);

	console.log(topAnime)

	useEffect(() => {
		GetNewAnime();
	}, []);

	console.log(newAnime)
	
	return (
		<ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
			<GlobalStyles />
			<StyledApp>
				<div className="App">
					<Header />
					<div className="content-wrap">
					<button className="theme_changer" role="button" onClick={() => themeToggler()}>Change Theme</button>
						<MainContent
						HandleSearch={HandleSearch}
						search={search}
						SetSearch={SetSearch}
						animeList={animeList} />
						<Sidebar 
							topAnime={topAnime} />
						<Sidebar2 
							newAnime={newAnime} />
						
					</div>
				</div>
			</StyledApp>
		</ThemeProvider>
		
		
	);
}

export default App;