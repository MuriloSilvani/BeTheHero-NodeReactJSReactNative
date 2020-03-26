import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.scss';

import LogoImg from '../../assets/logo.svg';

export default function Register({ history }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    async function handleRegister(e) {
        e.preventDefault();

        try {

            const response = await api.post('/ongs', {
                name,
                email,
                whatsapp,
                city,
                uf
            });

            alert(`Seu ID de acesso: ` + response.data.id);
            history.push('/');
        } catch (error) {

            alert('Erro no cadastro, tente novamente');
            console.log(error);
        }
    }

    return (
        <div className='register-container'>
            <div className='content'>
                <section>
                    <img src={LogoImg} alt='Be The Hero' />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrar os casos da sua ONG.</p>

                    <Link className='back-link' to="/">
                        <FiArrowLeft size={16} color='#e02041' />
                        Já tenho cadastro
                    </Link>

                </section>
                <form onSubmit={handleRegister}>
                    <input
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder='Nome da ONG' />
                    <input
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        type='email'
                        placeholder='E-mail' />
                    <input
                        required
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                        placeholder='WhatsApp' />

                    <div className='input-group'>
                        <input
                            required
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder='Cidade' />
                        <input
                            required
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                            placeholder='UF'
                            style={{ width: 80 }} />
                    </div>

                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
