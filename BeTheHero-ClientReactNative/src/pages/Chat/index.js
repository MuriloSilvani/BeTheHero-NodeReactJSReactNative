import React, { useState, useEffect } from 'react';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';

import Logo from '../../assets/logo.png';

import api from '../../services/api';

import {
    Container,
    Header,
    Title,
    Description,
    DescriptionText,
    DescriptionTextBold,

    SendMessageBox,
    SendMessageBoxInput,
    SendMessageBoxButton,
    SendMessageBoxButtonText,

    ChatBox,
    ChatBoxMessage,
    ChatBoxMessageText,
    ChatBoxMessageDate
} from './styleComponent';

export default function Chat({ navigation, route }) {

    const incident = route.params.incident;

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');

    function navigateBack() {
        navigation.navigate('Detail', { incident });
    }

    async function loadMessages() {

        const response = await api
            .get(`/messages/${incident.id}/${1}`);

        setMessages(response.data);

    }

    async function addMessage() {

        if (text != '') {
            const message = { message: text, date: Date(), hero_id: 1, incident_id: incident.id, from: "hero" };

            setMessages([message, ...messages]);
            await api.post('/messages',
                message
            );
            loadMessages();
            setText('');
        }
    }

    useEffect(() => {
        loadMessages();
    }, []);

    return (
        <Container>
            <Header>
                <Image source={Logo} />
                <TouchableOpacity
                    onPress={navigateBack}
                >
                    <Text>back</Text>
                </TouchableOpacity>
            </Header>

            <Title>{incident.name}</Title>
            <Description>
                <DescriptionText>
                    {incident.title}
                </DescriptionText>
                <DescriptionTextBold>
                    {Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(incident.value)}
                </DescriptionTextBold>
            </Description>




            <ChatBox
                data={messages}
                keyExtractor={message => String(message.id ? message.id : 0)}
                showsVerticalScrollIndicator={true}
                onEndReached={loadMessages}
                onEndReachedThreshold={0.2}
                renderItem={({ item: message }) => (
                    <ChatBoxMessage
                        from={message.from}
                    >
                        <ChatBoxMessageText>
                            {message.message}
                        </ChatBoxMessageText>
                        <ChatBoxMessageDate>
                            {message.date}
                        </ChatBoxMessageDate>
                    </ChatBoxMessage>
                )}
                ListEmptyComponent={
                    <ChatBoxMessage from='receive'>
                        <ChatBoxMessageText>
                            Olá, envia uma mensagem para começar a conversa!
                        </ChatBoxMessageText>
                    </ChatBoxMessage>
                }
            />


            <SendMessageBox>
                <SendMessageBoxInput
                    onChangeText={setText}
                    value={text}
                    multiline={true}
                    placeholder='Digite sua mensagem...' />
                <SendMessageBoxButton
                    onPress={() => {
                        addMessage()
                    }}>
                    <SendMessageBoxButtonText>Ok</SendMessageBoxButtonText>
                </SendMessageBoxButton>
            </SendMessageBox>

        </Container>
    );
}
