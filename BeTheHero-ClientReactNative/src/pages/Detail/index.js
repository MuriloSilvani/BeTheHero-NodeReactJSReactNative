import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';

import Logo from '../../assets/logo.png';
import styles from './styles';


export default function Detail({ navigation, route }) {

    const incident = route.params.incident;

    function navigateBack() {
        // navigation.navigate('Incidents');
        navigation.goBack();
    }

    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}`;

    function sendMail() {
        // expo-mail-composer
        // MailComposer.composeAsync({
        //     subject: `Herói do caso: ${incident.title}`,
        //     recipients: [incident.email],
        //     body: message
        // });s
        alert('vai de zap carai');
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image style={styles.logoImg} source={Logo} />
                <TouchableOpacity
                    onPress={navigateBack}
                >
                    {/* importar icone */}
                    <Text>back</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>

                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>
                <Text style={styles.incidentValue}>{incident.city}/{incident.uf}</Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>
                            WhatsApp
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendMail}>
                        <Text style={styles.actionText}>
                            E-mail
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    );
}
