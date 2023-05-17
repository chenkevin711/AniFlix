import React, { useState, useEffect } from 'react';
import gojo from '../assets/images/satoru-gojo.webp'
import * as MdIcons from 'react-icons/md'
import styled from 'styled-components';
import CreateAccount from './CreateAccount';
import axios from "axios"
import { format } from 'date-fns';
import { useModalProvider } from '../Providers/ModalProvider';

const baseURL = "http://127.0.0.1:6796"

function Account() {
    const { createModal, close, account, Login } = useModalProvider()

    function renderCreateAccountModal() {
        createModal(<CreateAccount 
            escClose={true}
			clickOutsideClose={true}
			style={{height: '500px', width: '800px'}}
        />)
    }

    // const PostData = async (endpoint, body) => {
        
    // }

    async function PostData(endpoint, body) {
        const res = await axios.post(`${baseURL}/${endpoint}`, body)
        console.log('res', res)
        const data = await res.data
        console.log(data)
        Login(data)
        return data
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function Sign_In() {
        let body = {
            'email': email,
            'password': password
        }
        const data = await PostData('sign_in', body)
        console.log('data', data)
        close()
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
                        onChange={(e) => setEmail((v) => (e.target.validity.valid ? e.target.value : v))}
                        />
                    </div>

                    <div style={{border: '1px solid black', background: 'white', display: 'flex', alignItems: 'center', borderRadius: '5px',marginBottom: '10px', width: '100%'}}>
                        <MdIcons.MdOutlineLock size={30} style={{color: 'black'}}/>
                        <AccountInput type='text' style={{border: 'none', background: 'transparent', width: '100%', height: '50px', fontSize: '25px'}}
                        placeholder='Password...'
                        onChange={(e) => setPassword((v) => (e.target.validity.valid ? e.target.value : v))}
                        />
                    </div>
                    
                    <SubmitButton onClick={() => Sign_In()}>
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