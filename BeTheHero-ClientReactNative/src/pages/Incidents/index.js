import React, { useState, useEffect } from 'react';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';

import Logo from '../../assets/logo.png';
import styles from './styles';

import api from '../../services/api';

import { Container } from './styleComponent';

export default function Incidents({ navigation }) {

    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        if (loading) {
            return;
        }
        if (total > 0 && incidents.length === total) {
            return;
        }

        setPage(page + 1);
        setLoading(true);

        const response = await api.get('/incidents', {
            params: { page }
        });

        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);

        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return (
        <Container>
            <View style={styles.header}>
                <Image style={styles.logoImg} source={Logo} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            <FlatList
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={true}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                ListEmptyComponent={() => (
                    <View style={styles.incident}>
                        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>Sem casos disponiveis!</Text>
                    </View>
                )}
                renderItem={({ item: incident }) => (


                    <View style={styles.incident}>

                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>

                        <Text style={styles.incidentProperty}>CASO:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>

                        <Text style={styles.incidentProperty}>VALOR:</Text>
                        <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

                        <TouchableOpacity
                            style={styles.detailButton}
                            onPress={() => { navigateDetail(incident) }}
                        >
                            {/* importar icone */}
                            <Text style={styles.detailButtonText}>Ver mais detalhes</Text>
                        </TouchableOpacity>

                    </View>
                )} />


        </Container>
    );
}
