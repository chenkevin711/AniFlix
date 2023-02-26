import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import Sidebar2 from '../components/Sidebar2'

function Home(props) {
    return(
        <div className="App">
            <div className="content-wrap">
                <div style={{display: 'flex', width: '100%'}}>
                    <MainContent
                        HandleSearch={props.HandleSearch}
                        search={props.search}
                        SetSearch={props.SetSearch}
                        animeList={props.animeList}
                        themeToggler={props.themeToggler}
                        topAnime={props.topAnime} 
                        newAnime={props.newAnime}
                        randomTopAnime={props.randomAnime}
                        airingAnime={props.airingAnime}
                        />
                    
                </div>
            </div>
        </div>
    )
}

export default Home