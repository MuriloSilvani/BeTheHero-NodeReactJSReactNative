import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import './style.scss';

import api from '../../services/api';

import LogoImg from '../../assets/logo.svg';

export default function Messages({ history }) {
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [conversations, setConversations] = useState([]);
    useEffect(() => {
        handleConversations();
    }, [ongId]);
    async function handleConversations() {
        const response = await api.get(`/conversations/${ongId}`);
        setConversations(response.data);
    }
    function handleBack() {
        history.push('/profile');
    }
    function handleChat(heroId, incidentId) {
        localStorage.setItem('heroId', heroId);
        localStorage.setItem('incidentId', incidentId);
        history.push('/chat');
    }
    return (
        <div className='messages-container'>
            <header>
                <img src={LogoImg} alt='Be The Hero' />
                <span>Bem vinda, {ongName}</span>
                <button onClick={() => { handleBack() }} type='button'>
                    <FiArrowLeft size={18} color='#e02041' />
                </button>
            </header>
            <h1>Lista de chats abertos</h1>
            <ul>
                {
                    conversations &&
                        conversations.length > 0 ?
                        conversations.map(conversation => (
                            <li key={conversation.hero_id}>
                                <strong>Herói: </strong>
                                <p>{conversation.hero_id}</p>

                                <strong>Caso: </strong>
                                <p>{conversation.title}</p>

                                <button onClick={() => { handleChat(conversation.hero_id, conversation.incident_id) }}>
                                    <FiArrowRight size={20} />
                                </button>
                            </li>
                        ))
                        : (<li>
                            <strong>Sem casos cadastrados</strong>
                        </li>)
                }
            </ul>
        </div>
    )
}
