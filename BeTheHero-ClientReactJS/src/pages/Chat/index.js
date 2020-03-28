import React, { useState, useEffect } from 'react';
import { FiArrowLeft } from 'react-icons/fi';

import './style.scss';

import api from '../../services/api';

import LogoImg from '../../assets/logo.svg';

export default function Chat({ history }) {

    const ongName = localStorage.getItem('ongName');
    const heroId = localStorage.getItem('heroId');
    const incidentId = localStorage.getItem('incidentId');


    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        loadMessages();
    }, []);

    function handleBack() {
        history.push('/messages');
    }

    async function loadMessages() {
        const response = await api.get(`/messages/${incidentId}/${heroId}`);
        setMessages(response.data);
    }

    async function addMessage() {

        if (text !== '') {
            const message = { message: text, date: Date(), hero_id: heroId, incident_id: incidentId, from: "ong" };

            setMessages([...messages, message]);
            await api.post('/messages',
                message
            );
            loadMessages();
            setText('');
        }
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
            <h1>Chat com herói {heroId} </h1>



            <input
                value={text}
                onChange={e => setText(e.target.value)}
                required
                placeholder='Digite sua mensagem...'
                type="text"
            />
            <button onClick={addMessage}>Ok</button>


            <ul className='chat'>
                {
                    messages &&
                        messages.length > 0 ?
                        messages.map(message => (
                            <li key={message.id} className={message.from}>

                                <p>{message.message}</p>
                                <p>{message.date}</p>

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
