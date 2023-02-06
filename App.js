import React, { useState } from 'react';
import { 
  Container,
  LogoUrL,
  LogoName,
  Input,
  Button,
  BtnText,
  Shorten
 } from './styles';

 import { TouchableWithoutFeedback, Keyboard, ToastAndroid} from 'react-native';
 import * as Clipboard from 'expo-clipboard';
//  "https://cutt.ly/api/api.php?key=[API_KEY]&short=$url&name=[CUSTOM_URL_ALIAS]"

export default function App() {
  const api = '01b6f542ccb023b46089b9ecd5581abf2d188'
  const [url, setUrl] = useState('')
  const [name, setName] = useState('')
  const [shortFinal, setShortFinal] = useState('')

  const short = async () => {
    Keyboard.dismiss()
    if(url.includes('https://') || url.includes('http://')) {
      await fetch(`https://cutt.ly/api/api.php?key=${api}&short=${url}&name=${name}`)
        .then(async response => {
          const data = await response.json()
          if(data.url.status === 3){
            ToastAndroid.show('Esse nome já esta em uso', ToastAndroid.SHORT)
            return
          }
          if(data.url.status === 2){
            ToastAndroid.show('url é invalida', ToastAndroid.SHORT)
            return
          }
          
          setShortFinal(data.url.shortLink)
          setUrl('')
          setName('')

        })
        return
    }

    ToastAndroid.show('url é invalida', ToastAndroid.SHORT)
  }

  async function copyUrl() {
    await Clipboard.setStringAsync(shortFinal)
    ToastAndroid.show('url copiada com sucesso!', ToastAndroid.SHORT);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <LogoUrL>
          url
          <LogoName>JBraz</LogoName>
        </LogoUrL>
        <Input
          placeholder="Digite a URL..."
          onChangeText={ (text) => setUrl(text) }
          value={url}
        />

        <Input
          placeholder="Nome personalizado."
          onChangeText={ (text) => setName(text) }
          value={name}
        />

        <Button
          onPress={ () => short() }
        >
          <BtnText>
            Encurtar
          </BtnText>
        </Button>
        <TouchableWithoutFeedback onPress={ shortFinal ? copyUrl : () => {} }>
          <Shorten>
            {shortFinal}
          </Shorten>
        </TouchableWithoutFeedback>

      </Container>
    </TouchableWithoutFeedback>
  );
}
