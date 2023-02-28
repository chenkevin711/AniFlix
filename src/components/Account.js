import React, { useState, useEffect } from 'react';
import gojo from '../assets/images/satoru-gojo.webp'
import * as MdIcons from 'react-icons/md'
import styled from 'styled-components';
import CreateAccount from './CreateAccount';
import { useModalProvider } from '../Providers/ModalProvider';

function Account() {
    const { createModal, close } = useModalProvider()

    function renderCreateAccountModal() {
        createModal(<CreateAccount 
            escClose={true}
			clickOutsideClose={true}
			style={{height: '500px', width: '800px'}}
        />)
    }

    return (
        <>
            <div style={{display: 'flex', height: '100%'}}>
                <img src={gojo} style={{height: 'auto', width: 'auto', maxHeight: '500px', maxWidth: '300px', marginBottom: 'auto', marginTop: 'auto'}}/>
                <div id='LoginDiv' style={{display: 'flex', flexDirection: 'column', paddingRight: '10px', width: '100%'}}>
                    <p style={{fontSize: '40px', fontFamily: 'sans-serif', margin: 0}}>
                        Login
                    </p>
                    <p style={{color: '#6d6d6d'}}>
                        Welcome Back!
                    </p>
                    <div style={{border: '1px solid black', background: 'white', display: 'flex', alignItems: 'center', borderRadius: '5px', marginBottom: '10px', width: '100%'}}>
                        <MdIcons.MdAccountCircle size={30} style={{color: 'black'}}/>
                        <AccountInput type='text' style={{border: 'none', background: 'transparent', width: '100%', height: '50px', fontSize: '25px'}}
                        placeholder='Email...'
                        />
                    </div>

                    <div style={{border: '1px solid black', background: 'white', display: 'flex', alignItems: 'center', borderRadius: '5px',marginBottom: '10px', width: '100%'}}>
                        <MdIcons.MdOutlineLock size={30} style={{color: 'black'}}/>
                        <AccountInput type='text' style={{border: 'none', background: 'transparent', width: '100%', height: '50px', fontSize: '25px'}}
                        placeholder='Password...'
                        />
                    </div>
                    
                    <SubmitButton>
                        <p>
                            Submit
                        </p>
                    </SubmitButton>

                    <p>
                        Don't have an account? 
                        <strong style={{cursor: 'pointer', color: '#DB202C', marginLeft: '5px'}} onClick={() => renderCreateAccountModal()}>
                            Register
                        </strong>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Account;

const AccountInput = styled.input`
    :focus {
        outline: none;
    }
`

const SubmitButton = styled.button`
    background: #DB202C;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    p {
        margin: 0;
        color: white !important;
        font-size: 16px !important;
        font-weight: 600;
    }
`