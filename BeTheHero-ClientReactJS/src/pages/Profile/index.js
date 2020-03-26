import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './style.scss';

import LogoImg from '../../assets/logo.svg';

export default function Profile({ history }) {

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        try {
            api.get('/profile', {
                headers: {
                    Authorization: ongId
                }
            }).then(response => {
                setIncidents(response.data);
            })
        } catch (error) {
            alert('Erro ao buscar casos, tente novamente');
            console.log(error);
        }
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            api.delete('/incidents/' + id, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Erro ao deletar caso, tente novamente');
            console.log(error);
        }
    }

    function handleLogout() {

        localStorage.clear();
        history.push('/');
    }

    return (
        <div className='profile-container'>
            <header>
                <img src={LogoImg} alt='Be The Hero' />
                <span>Bem vinda, {ongName}</span>

                <Link className='button' to='/incidents/new'> Cadastrar novo caso </Link>
                <button onClick={() => { handleLogout() }} type='button'>
                    <FiPower size={18} color='#e02041' />
                </button>
            </header>
            <h1>Casos cadastrado</h1>

            <ul>
                {
                    incidents &&
                        incidents.length > 0 ?
                        incidents.map(incident => (
                            <li key={incident.id}>
                                <strong>Caso: </strong>
                                <p>{incident.title}</p>
                                <strong>Descricao: </strong>
                                <p>{incident.description}</p>
                                <strong>Valor: </strong>
                                <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>
                                <button onClick={() => { handleDeleteIncident(incident.id) }}>
                                    <FiTrash2 size={20} />
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
