import React, { useState, useEffect } from 'react';
import gojo from '../assets/images/satoru-gojo.webp'
import * as MdIcons from 'react-icons/md'
import styled from 'styled-components';
import CreateAccount from './CreateAccount';
import axios from "axios"
import { format } from 'date-fns';
import { useModalProvider } from '../Providers/ModalProvider';
import FireBase from '../FireBase';

const baseURL = "http://127.0.0.1:6796"

function AccountInfo() {
    const { createModal, close, account, Login } = useModalProvider()

    async function PostData(endpoint, body) {
        const res = await axios.post(`${baseURL}/${endpoint}`, body)
        const data = await res.data
        Login(data)
        return data
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [profilePicture, setProfilePicture] = useState()

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
            <div style={{border: '4px solid #DB202C', borderRadius: '50px'}}>
                {profilePicture ? 
                    <img src={profilePicture} alt='profile' />
                    :
                    <MdIcons.MdAccountCircle size={60}/>
                }
            </div>

            <p style={{color: '#6d6d6d'}}>
                Join Date
            </p>
            <div style={{border: '1px solid black', background: 'white', display: 'flex', alignItems: 'center', borderRadius: '5px', marginBottom: '10px', width: '100%'}}>
                <AccountInput disabled type='text' style={{border: 'none', background: 'transparent', width: '100%', height: '50px', fontSize: '25px'}}
                defaultValue={account.created_at}
                onChange={(e) => setEmail((v) => (e.target.validity.valid ? e.target.value : v))}
                />
            </div>

            <p style={{color: '#6d6d6d'}}>
                Email Address
            </p>
            <div style={{border: '1px solid black', background: 'white', display: 'flex', alignItems: 'center', borderRadius: '5px', marginBottom: '10px', width: '100%'}}>
                <AccountInput type='text' style={{border: 'none', background: 'transparent', width: '100%', height: '50px', fontSize: '25px'}}
                defaultValue={account.email}
                onChange={(e) => setEmail((v) => (e.target.validity.valid ? e.target.value : v))}
                />
            </div>

            <p style={{color: '#6d6d6d'}}>
                Username
            </p>
            <div style={{border: '1px solid black', background: 'white', display: 'flex', alignItems: 'center', borderRadius: '5px', marginBottom: '10px', width: '100%'}}>
                <AccountInput type='text' style={{border: 'none', background: 'transparent', width: '100%', height: '50px', fontSize: '25px'}}
                defaultValue={account.username}
                onChange={(e) => setEmail((v) => (e.target.validity.valid ? e.target.value : v))}
                />
            </div>
            
        </div>
    )
}

export default AccountInfo;

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