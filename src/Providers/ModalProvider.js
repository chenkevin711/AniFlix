import { createContext, useContext, useState, useEffect, useRef, useMemo, useCallback } from "react";
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';

const ModalContext = createContext({})

export const ModalProvider = (props) => {  
    const [openModals, setOpenModals] = useState([])
    const backgroundRef = useRef()
    const location = useLocation()

    function createModal(component) {
        setOpenModals(prev => [...prev, component])
    }

    function close() {
        if (openModals.length === 0) {
            return
        }
        
        console.log('close', openModals)
        document.getElementById(`Modal ${openModals.length - 1}`).style.opacity = '0%'
        document.getElementById(`Modal ${openModals.length - 1}`).style.marginBottom = '10%'
        setTimeout(() => {
            setOpenModals(prev => [...prev].slice(0, -1))
        }, 400)
    }

    

    useEffect(() => {
        setOpenModals([])
    }, [location]);

    function outsideClick() {
        if (!openModals[openModals.length - 1].props.clickOutsideClose) return 
        close()
    }

    const contentZIndex = (2*openModals.length) + 100

    useEffect(() => {
        console.log('open modals', openModals, openModals.length)
    }, [openModals])

    const backgroundStyles = useMemo(() => {
        return {
        background: "#000",
        opacity: 0.5,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        // zIndex: openModals.length - 1,
    }}, [openModals])

    const contentStyles = useMemo(() => {
        return {
            display: "flex",
            background: "#252625",
            overflowY: "auto",
            overscrollBehavior: "contain",
            borderRadius: "6px",
            transition: 'top 0.5s ease, opacity 0.3s linear, margin-bottom 0.5s ease',
            opacity: '0%',
            flexDirection: 'column',
            // top: `${15 * openModals.length}px`,
        }
    }, [contentZIndex, openModals])

    const onKeyDown = useCallback((event) => {
		if (event.keyCode === 27) {
            if (!openModals[openModals.length - 1].props.escClose) return 
			close()
		}
    }, [close])

    // Setup and teardown key listeners only on open and close
    useEffect(() => {
        if (openModals.length !== 0) {
            document.addEventListener("keydown", onKeyDown)

            return () => {
                document.removeEventListener("keydown", onKeyDown)
            }
        }
    }, [onKeyDown, openModals])

    useEffect(() => {
        if (openModals.length !== 0) {
            document.getElementById(`Modal ${openModals.length - 1}`).style.opacity = '100%'
            document.getElementById(`Modal ${openModals.length - 1}`).style.marginBottom = '0px'
        }
        
    }, [openModals])

    useEffect(() => {
        console.log('UseEffect', openModals)
    }, [openModals])

    const [account, setAccount] = useState({})

    function Login(data) {
        setAccount(data)
    }
    
    return (
        <ModalContext.Provider value={{ createModal, close, account, Login }}>
            {props.children}
            {openModals.length > 0 ? 
            <div style={{position: 'fixed', zIndex: '1000', inset: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {openModals.map((component, index) => {
                    console.log('openModal', openModals)
                    console.log(component)
                    if (index === openModals.length - 1) {
                        return ([
                            <Modal id={`Modal ${index}`} style={{...contentStyles, position: 'absolute', zIndex: index + 1, maxHeight: '90vh', marginBottom: '10%', width: 'fit-content', ...component.props.style}}>
                                {component}
                            </Modal>,
                            <div 
                                ref={backgroundRef} 
                                style={{...backgroundStyles, zIndex: index}} 
                                onClick={ () => outsideClick() } />
                            ]
                        )
                    }
                    return ([
                        <Modal id={`Modal ${index}`} style={{...contentStyles, position: 'absolute', zIndex: index + 1, maxHeight: '90vh', marginBottom: '10%', width: 'fit-content', ...component.props.style}}>
                            {component}
                        </Modal>,
                        <div 
                            ref={backgroundRef} 
                            style={{...backgroundStyles, zIndex: index}} 
                            onClick={ () => outsideClick() } />
                        ]
                    )
                })}
            </div> 
            :
            null
            }
            
        </ModalContext.Provider>
    )
};

const Modal = styled.div`
    width: 820px;
	height: auto;
    background: #FFFFFF;
    border-radius: 6px;
    h3 {
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 150%;
        color: #293241;
        text-align: center;
        margin-top: 8px;
        margin-bottom: -4px;
    }
    h2 {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 700;
        font-size: 21px;
        line-height: 150%;
        color: #293241;
        margin-top: 5px;
    }
    h1 {
        font-family: 'Source Sans Pro';
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 150%;
        color: #293241;
    }
`;

export const useModalProvider = () => useContext(ModalContext)