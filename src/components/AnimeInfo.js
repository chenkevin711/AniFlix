import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import Sidebar2 from '../components/Sidebar2'
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css'

function AnimeInfo(props) {
    console.log('params', useParams())
    const mal_id = useParams().mal_id
    
    const [anime, setAnime] = useState()
    console.log('id', mal_id)
    async function FetchAnime() {
        const temp = await fetch(`https://api.jikan.moe/v4/anime/${mal_id}/full`)
            .then(res => res.json());
        console.log('res', temp.data)
        setAnime(temp.data);
    }

    useEffect(() => {
        console.log('animehit', anime)
        FetchAnime()
    }, [])

    useEffect(() => {
        console.log('animeset', anime)
    }, [anime])

    return(<>
        {anime !== undefined ? 
            <div id='anime' style={{height: '100%'}}>
                <AnimeInfoContainer>
                    <div>
                        <img 
                            src={anime.images.jpg.image_url} 
                            alt={anime.title}
                        />
                    </div>
                    
                    
                    <AnimeInfoDiv>
                        <AnimeTitle>
                            {anime.title}
                        </AnimeTitle>

                        <hr style={{margin: 0}}/>

                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <p style={{flex: 1}}>
                                Score: {anime.score}
                            </p>

                            <p style={{flex: 1, textAlign: 'center'}}>
                                Scored By: {anime.scored_by}
                            </p>

                            <div  style={{flex: 1}}/>
                        </div>

                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                            <p style={{flex: 1}}>
                                Rank: {anime.rank}
                            </p>

                            <p style={{flex: 1, textAlign: 'center'}}>
                                Season: {anime.season}
                            </p>

                            <div style={{flex: 1}} />
                        </div>

                        

                        <p>
                            Synopsis: {anime.synopsis}
                        </p>

                        <p>
                            Airing: {anime.aired.string}
                        </p>

                        <p>
                            Studio: {anime.studios[0].name}
                        </p>
                    </AnimeInfoDiv>
                </AnimeInfoContainer>

                <iframe style={{height: '100%', width: '100%', padding: '10px'}} src={anime.trailer.embed_url} />
            </div>
            :
            <>
            <Spinner animation='border'/>
            </>
        }
        
    </>)
}

export default AnimeInfo

const AnimeInfoContainer = styled.div`
    display: flex;
    padding: 10px;
`;

const AnimeInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    margin-left: 5px;

    p:not(:first-child) {
        font-family: Roboto;
        font-size: 16px;
    }
    
`;

const AnimeTitle = styled.p`
    margin-bottom: 0px;
    font-size: 24px;
    font-family: fantasy;
    letter-spacing: 2px;
`