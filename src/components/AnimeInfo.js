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
            <> 
                <div id='anime'>
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
                                <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                                    <p style={{flex: 1}}>
                                        Score: {anime.score}
                                    </p>

                                    <p style={{flex: 1}}>
                                        Scored By: {anime.scored_by}
                                    </p>
                                </div>

                                <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                                    <p style={{flex: 1}}>
                                        Rank: {anime.rank}
                                    </p>

                                    <p style={{flex: 1}}>
                                        Season: {anime.season !== null ? anime.season[0].toUpperCase() + anime.season.slice(1) : ''}
                                    </p>
                                </div>

                                <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                                    <p style={{flex: 1}}>
                                        Rating: {anime.rating}
                                    </p>

                                    <p style={{flex: 1}}>
                                        Type: {anime.type}
                                    </p>
                                </div>
                            </div>

                            <p>
                                Synopsis: {anime.synopsis}
                            </p>

                            <div style={{display: 'flex'}}>
                                <p style={{flex: 1}}>
                                    Airing: {anime.aired.string}
                                </p>

                                <p style={{flex: 1}}>
                                    Year: {anime.year}
                                </p>
                            </div>

                            <div style={{display: 'flex'}}>
                                <p style={{flex: 1}}>
                                    Studio: {anime.studios[0].name}
                                </p>

                                <p style={{flex: 1}}>
                                    Producers: {anime.producers.map((producer) => {
                                        return producer['name']
                                    }).toString()}
                                </p>
                            </div>
                        </AnimeInfoDiv>
                    </AnimeInfoContainer>
                </div>
                {anime.trailer.embed_url === null ?
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <p style={{fontFamily: 'fantasy', fontSize: '30px'}}>No Trailer Found</p> 
                    </div>
                    
                    :
                    <iframe style={{height: '100%', width: '100%', padding: '10px'}} src={anime.trailer.embed_url} />
                }
            </>
            :
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Spinner animation='border' style={{height: '400px', width: '400px'}}/>
            </div>
        }
        
    </>)
}

export default AnimeInfo

const AnimeInfoContainer = styled.div`
    display: flex;
    padding: 10px;
    width: 100%;
`;

const AnimeInfoDiv = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid white;
    margin-left: 5px;
    padding: 0px 5px 0px;
    width: 100%;

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