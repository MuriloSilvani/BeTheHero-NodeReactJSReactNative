import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.scss';

import LogoImg from '../../assets/logo.svg';

export default function NewIncident({ history }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        try {

            await api.post('/incidents', {
                title,
                description,
                value,
            }, {
                headers: {
                    Authorization: ongId
                }
            });

            alert('Caso cadastrado com sucesso');
            history.push('/profile');

        } catch (error) {

            alert('Erro no cadastro, tente novamente');
            console.log(error);
        }
    }

    return (
        <div className='new-incident-container'>
            <div className='content'>
                <section>
                    <img src={LogoImg} alt='Be The Hero' />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link className='back-link' to="/profile">
                        <FiArrowLeft size={16} color='#e02041' />
                        Voltar para home
                    </Link>

                </section>
                <form onSubmit={handleNewIncident}>
                    <input
                        required
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder='Titulo do caso' />
                    <textarea
                        required
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Descrição' />
                    <input
                        required
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder='Valor em reais' />


                    <button className='button' type='submit'>Cadastrar</button>
                </form>
            </div>
        </div>
    )
}
