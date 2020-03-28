import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './style.scss';

import HeroesImg from '../../assets/heroes.png';
import LogoImg from '../../assets/logo.svg';

import api from '../../services/api';

export default function Login({ history }) {

    const [id, setId] = useState('795f7337');

    async function handleLogin(e) {
        e.preventDefault();

        try {

            const response = await api.post('/session', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (error) {


            alert('Erro no login, tente novamente');
            console.log(error);
        }
    }

    return (
        <div className='login-container'>
            <section className='form'>
                <img src={LogoImg} alt='Be The Hero' />

                <form onSubmit={handleLogin}>
                    <h1>Faça seu login</h1>

                    <input
                        required
                        value={id}
                        onChange={e => setId(e.target.value)}
                        placeholder='Sua ID' />
                    <button className='button' type='submit'> Entrar </button>

                    <Link className='back-link' to="/register">
                        <FiLogIn size={16} color='#e02041' />
                        Não tenho cadastro
                    </Link>

                </form>


            </section>

            <img src={HeroesImg} alt='Heros' />
        </div>
    )
}
