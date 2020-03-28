import styled from 'styled-components';

export const Container = styled.View`
    flex: 1;
    paddingHorizontal: 24px;
    marginTop: 20px;
`
export const Header = styled.View`
    flexDirection: row;
    justifyContent: space-between;
    alignItems: center;
`
export const Title = styled.Text`
    fontSize: 30px;
    marginBottom: 16px;
    marginTop: 48px;
    color: #13131a;
    fontWeight: bold;
`
export const Description = styled.View`
    flexDirection: row;
    justifyContent: space-between;
    marginBottom: 16px;
`
export const DescriptionText = styled.Text`
    fontSize: 16px;
    color: #737380;
`
export const DescriptionTextBold = styled.Text`
    fontSize: 16px;
    lineHeight: 24px;
    color: #737380;
    fontWeight: bold;
`
export const ChatBox = styled.FlatList`
    flex: 1;
    backgroundColor: #fff;
    borderRadius: 8px;
    elevation: 5;
    transform: scaleY(-1);
    paddingHorizontal: 16px;
    marginBottom: 16px;
`
export const ChatBoxMessage = styled.View`
    paddingVertical: 10px;
    paddingHorizontal: 15px;
    borderRadius: 8px;
    marginTop: 16px;
    transform: scaleY(-1);
    flexDirection: column;

    ${props => props.from === 'hero' && `
        borderTopRightRadius: 0;
        alignItems: flex-end;
        backgroundColor: rgba(0,255,0,0.2);
        marginLeft: 10%;
    `}
    ${props => props.from === 'ong' && `
        borderTopLeftRadius: 0;
        alignItems: flex-start;
        backgroundColor: rgba(0,0,255,0.2);
        marginRight: 10%;
    `}
`
export const ChatBoxMessageText = styled.Text`
    fontSize: 16px;
`
export const ChatBoxMessageDate = styled.Text`
    fontSize: 12px;
    fontWeight: bold;
`


export const SendMessageBox = styled.View`
    marginBottom: 16px;
    flexDirection: row;
`
export const SendMessageBoxInput = styled.TextInput`
    fontSize: 16px;
    color: #737380;
    maxHeight: 150px;
    flex: 1;

    elevation: 5;
    backgroundColor: #fff;
    paddingVertical: 10px;
    paddingHorizontal: 20px;
    borderRadius: 8px;
`
export const SendMessageBoxButton = styled.TouchableOpacity`
    width: 50px;
    backgroundColor: rgba(0,255,0,1);
    borderRadius: 8px;
    justifyContent: center;
    alignItems: center;
    marginLeft: 16px;
`
export const SendMessageBoxButtonText = styled.Text`
    fontWeight: bold;
    color: #fff;
`