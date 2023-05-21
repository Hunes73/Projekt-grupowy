import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Pressable, Linking } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
  Colors,
  RegularTextInput,
  AppTextInput,
  LinkTextInput,
  AppText,
  Avatar,
  Bubble,
  Line,
  HeaderTextInput,
  MsgBox,
} from '../../components/styles';
//SecureStoring accessToken
import * as SecureStore from 'expo-secure-store';
import { default as baseURL } from '../../components/AxiosAuth';
import axios from 'axios';
import Loading from '../../components/Loading';
import { Fontisto } from '@expo/vector-icons';

const { darkLight, link, black, primary } = Colors;

const generateBoxShadowStyle = (
  xOffset,
  yOffset,
  shadowColorIos,
  shadowOpacity,
  shadowRadius,
  elevation,
  shadowColorAndroid,
) => {
  if (Platform.OS === 'ios') {
    styles.boxShadow = {
      shadowColor: shadowColorIos,
      shadowOpacity,
      shadowRadius,
      shadowOffset: { width: xOffset, height: yOffset },
    };
  } else if (Platform.OS === 'android') {
    styles.boxShadow = { elevation, shadowColor: shadowColorAndroid };
  }
};

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (!result) {
    alert('Nie uzyskano danych z klucza: ' + key);
  }
  return result;
}

const CompanyProfileEditing = ({ route, navigation }) => {
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [token, setToken] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [companyProfile, setcompanyProfile] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [linkedin, setLinkedin] = useState('');
  const [twitter, setTwitter] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [NIP, setNIP] = useState('');
  const [REGON, setREGON] = useState('');
  const [KRS, setKRS] = useState('');
  const [adress, setAdress] = useState('');
  const [companyName, setCompanyName] = useState('');

  generateBoxShadowStyle(0, 8, '#0F0F0F33', 0.2, 15, 2, '#0F0F0F33');

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function getAccessToken() {
    const t = await getValueFor('accessToken');
    setToken(t);
  }

  async function getUserInfo() {
    const u = await getValueFor('user');
    setUserInfo(JSON.parse(u));
  }

  const handleMessage = (message, type = 'FAILED') => {
    setMessage(message);
    setMessageType(type);
  };

  function nipPatternValidation(name) {
    const regex = new RegExp('^(PL[0-9]{10})+$');
    return regex.test(name);
  }

  function regonPatternValidation(name) {
    if (name.length === 9) {
      const regex = new RegExp('^([0-9]{9})+$');
      return regex.test(name);
    } else if (name.length === 14) {
      const regex = new RegExp('^([0-9]{14})+$');
      return regex.test(name);
    } else {
      return false;
    }
  }

  function krsPatternValidation(name) {
    if (name === '' || name === null) {
      return true;
    }
    const regex = new RegExp('^([0-9]{10})+$');
    return regex.test(name);
  }

  function facebookPatternValidation(name) {
    if (name === '' || name === null) {
      return true;
    }
    const regex = new RegExp(
      /(?:https?:\/\/)?(?:www\.)?facebook\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*?(\/)?([\w\-\.]{5,})/,
    );
    return regex.test(name);
  }
  function instagramPatternValidation(name) {
    if (name === '' || name === null) {
      return true;
    }
    const regex = new RegExp(/(https?:\/\/)?(www\.)?instagram\.com\/[A-Za-z0-9_.]{1,30}\/?/);
    return regex.test(name);
  }
  function twitterPatternValidation(name) {
    if (name === '' || name === null) {
      return true;
    }
    const regex = new RegExp(/(https?:\/\/)?(www\.)?twitter\.com\/[A-Za-z0-9_]{5,15}(\?(\w+=\w+&?)*)?/);
    return regex.test(name);
  }
  function linkedinPatternValidation(name) {
    if (name === '' || name === null) {
      return true;
    }
    const regex = new RegExp(/(https?:\/\/)?(www\.)?linkedin\.com\/[A-Za-z0-9_.]{1,30}/);
    return regex.test(name);
  }
  function websitePatternValidation(name) {
    if (name === '' || name === null) {
      return true;
    }
    const regex = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/);
    return regex.test(name);
  }

  function isNipValid(nip) {
    const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];

    function getOnlyDigits(value) {
      return value.replace(/[^0-9]/gi, '');
    }

    nip = getOnlyDigits(nip);

    let sum = 0;
    for (let i = 0; i < weights.length; i++) {
      sum += weights[i] * parseInt(nip[i]);
    }

    const checkSum = sum % 11;

    if (checkSum !== parseInt(nip[9])) {
      return false;
    }

    return true;
  }

  function isRegonValid(regon) {
    const weights9 = [8, 9, 2, 3, 4, 5, 6, 7];
    const weights14 = [2, 4, 8, 5, 0, 9, 7, 3, 6, 1, 2, 4, 8];

    function getOnlyDigits(value) {
      return value.replace(/[^0-9]/gi, '');
    }

    regon = getOnlyDigits(regon);

    function isCorrect(value, weights) {
      let sum = 0;

      for (let i = 0; i < weights.length; i++) {
        sum += weights[i] * parseInt(value[i]);
      }

      const checkValue = parseInt(value[weights.length]);
      const checkSum = sum % 11;

      if (checkSum === 10) {
        return checkValue === 0;
      }

      return checkSum === checkValue;
    }

    let isValid;

    if (regon.length === 9) {
      isValid = isCorrect(regon, weights9);
    } else {
      isValid = isCorrect(regon, weights14);
    }

    if (!isValid) {
      return false;
    }

    return true;
  }

  const OpenLinkElement = ({ link, children1, children2, color }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL('https://' + link);

      if (supported) {
        await Linking.openURL('https://' + link);
      } else {
        Alert.alert(`Nie można otworzyć takiego URL'a: https://${link}`);
      }
    }, [link]);

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft: 0 }}>
        <AppText style={{ fontSize: 18, marginRight: 15 }}>{children1}</AppText>
        <TouchableOpacity onPress={handlePress}>
          <Fontisto name={children2} color={color} size={22} />
        </TouchableOpacity>
      </View>
    );
  };

  useEffect(() => {
    getAccessToken();
    getUserInfo();
  }, []);

  useEffect(() => {
    if (userInfo) {
      let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: baseURL + '/public/api/company/getProfileByUsername/' + userInfo.username,
        headers: {},
      };

      const fetchData = async () => {
        try {
          const result = await axios.request(config);
          console.log(result.data);
          setcompanyProfile(result.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }
  }, [userInfo]);

  useEffect(() => {
    setCompanyName(companyProfile.name);
    setAdress(companyProfile.companyAdress);
    setDescription(companyProfile.description);
    setFacebook(companyProfile.facebook);
    setInstagram(companyProfile.instagram);
    setKRS(companyProfile.krs);
    setLinkedin(companyProfile.linkedin);
    setNIP(companyProfile.nip);
    setREGON(companyProfile.regon);
    setTwitter(companyProfile.twitter);
    setWebsite(companyProfile.website);
  }, [companyProfile]);

  async function updateCompanyProfile() {
    handleMessage('');
    if (
      !facebookPatternValidation(facebook) ||
      !twitterPatternValidation(twitter) ||
      !instagramPatternValidation(instagram) ||
      !websitePatternValidation(website) ||
      !linkedinPatternValidation(linkedin) 
    ) {
      handleMessage('Źle wpisano link', 'FAILED');
      return;
    }
    if(!nipPatternValidation(NIP) || !isNipValid(NIP)) {
      handleMessage('Źle wpisano NIP', 'FAILED');
      return;
    }
    if(!regonPatternValidation(REGON) || !isRegonValid(REGON)) {
      handleMessage('Źle wpisano REGON', 'FAILED');
      return;
    }
    if(!krsPatternValidation(KRS)) {
      handleMessage('Źle wpisano KRS', 'FAILED');
      return;
    }

    const response = await axios
      .put(
        baseURL + '/api/company/updateProfileByUsername/' + userInfo.username,
        {
          name: companyName,
          description: description,
          nip: NIP,
          regon: REGON,
          krs: KRS,
          website: website,
          facebook: facebook,
          linkedin: linkedin,
          twitter: twitter,
          instagram: instagram,
          address: adress,
        },
        {
          params: { username: userInfo.username },
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        },
      )
      .catch((error) => {
        handleMessage('Wystąpił błąd', 'FAILED');
        console.log(error);
      });
    if ((response.status = 200)) {
      handleMessage('Zapisano zmiany!', 'SUCCESS');
    }
  }

  function ListLinks() {
    if (companyProfile) {
      function setValid(text, id) {
        if (id === 1) {
          return facebookPatternValidation(text);
        }
        if (id === 2) {
          return instagramPatternValidation(text);
        }
        if (id === 3) {
          return linkedinPatternValidation(text);
        }
        if (id === 5) {
          return twitterPatternValidation(text);
        }
        if (id === 6) {
          return websitePatternValidation(text);
        }
      }
      function changeLink(text, id) {
        if (id === 1) {
          setFacebook(text);
        }
        if (id === 2) {
          setInstagram(text);
        }
        if (id === 3) {
          setLinkedin(text);
        }
        if (id === 5) {
          setTwitter(text);
        }
        if (id === 6) {
          setWebsite(text);
        }
      }
      const links = [
        { id: 1, name: 'Facebook:', data: facebook },
        { id: 2, name: 'Instagram:', data: instagram },
        { id: 3, name: 'LinkedIn:', data: linkedin },
        { id: 5, name: 'Twitter:', data: twitter },
        { id: 6, name: 'Twoja strona:', data: website },
      ];
      const list = links.map((item) => (
        <View flexDirection="row" alignItems="center" style={{ marginBottom: 10 }} key={item.id}>
          <AppText style={{ width: '25%', alignContent: 'flex-start', alignItems: 'flex-start' }}>{item.name}</AppText>
          <LinkTextInput
            maxLength={100}
            style={{ flexWrap: 'wrap', width: '70%' }}
            defaultValue={item.data}
            onChangeText={(newText) => {
              changeLink(newText, item.id);
            }}
            placeholder="Wpisz adres"
            autoComplete="off"
            autoCorrect={false}
            checkRegex={setValid(item.data, item.id)}
          />
        </View>
      ));
      return <View style={styles.ListElement}>{list}</View>;
    } else {
      return <View></View>;
    }
  }
  return (
    <>
      {companyProfile ? (
        <ScrollView nestedScrollEnabled={true} style={{ flex: 1, backgroundColor: primary }} height={300}>
          <View style={{ flexDirection: 'row', margin: 15, justifyContent: 'space-between' }}>
            <Avatar resizeMode="contain" source={require('../../assets/img/avatar1.png')}></Avatar>
            <View style={{ width: '65%', alignItems: 'center', justifyContent: 'space-around' }}>
              <Pressable
                onPress={() => {}}
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? 'lightgrey' : darkLight,
                    marginTop: 0,
                    padding: 7,
                    borderRadius: 15,
                    fontSize: 16,
                    marginBottom: 10,
                    alignItems: 'center',
                    marginRight: 5,
                    flexDirection: 'row',
                  },
                ]}
              >
                <AppText style={{ color: primary }}>Zmień zdjęcie profilowe</AppText>
              </Pressable>
              <HeaderTextInput
                multiline={true}
                maxLength={100}
                style={{ width: '100%', marginLeft: 10, marginRight: 10, color: black, fontSize: 22 }}
                value={companyName}
                onChangeText={setCompanyName}
                placeholder="Wpisz nazwę firmy"
              />
            </View>
          </View>

          <AppText style={styles.About}>O firmie:</AppText>
          <RegularTextInput
            maxLength={255}
            multiline={true}
            style={{ marginHorizontal: 15, color: black, fontSize: 15, flexWrap: 'wrap' }}
            value={description}
            onChangeText={setDescription}
          ></RegularTextInput>
          <View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <AppText style={styles.ListHeader}>Adres:</AppText>
              <AppTextInput
                maxLength={100}
                multiline={true}
                style={{ flexWrap: 'wrap', width: '75%' }}
                defaultValue={adress}
                onChangeText={(newText) => {
                  setAdress(newText);
                }}
                placeholder="Wpisz adres"
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <AppText style={styles.ListHeader}>NIP:</AppText>
              <AppTextInput
                maxLength={10}
                keyboardType="number-pad"
                multiline={true}
                style={{ flexWrap: 'wrap', width: '75%' }}
                defaultValue={NIP}
                onChangeText={(newText) => {
                  setNIP(newText);
                }}
                placeholder="Wpisz NIP"
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <AppText style={styles.ListHeader}>REGON:</AppText>
              <AppTextInput
                maxLength={14}
                keyboardType="number-pad"
                multiline={true}
                style={{ flexWrap: 'wrap', width: '75%' }}
                defaultValue={REGON}
                onChangeText={(newText) => {
                  setREGON(newText);
                }}
                placeholder="Wpisz REGON"
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
              <AppText style={styles.ListHeader}>KRS:</AppText>
              <AppTextInput
                maxLength={10}
                keyboardType="number-pad"
                multiline={true}
                style={{ flexWrap: 'wrap', width: '75%' }}
                defaultValue={KRS}
                onChangeText={(newText) => {
                  setKRS(newText);
                }}
                placeholder="Wpisz numer KRS"
              />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Line style={{ width: '90%' }} />
            </View>
          </View>
          <View style={{ width: '100%', flexDirection: 'column', justifyContent: 'space-around', margin: 10 }}>
            <AppText style={{ fontSize: 19, color: black, marginBottom: 15 }}>Media Społecznościowe: </AppText>
            {ListLinks()}
          </View>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              alignContent: 'center',
              marginBottom: 15,
            }}
          >
            <MsgBox type={messageType}>{message}</MsgBox>
            <Pressable
              onPress={() => {
                updateCompanyProfile();
              }}
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? 'lightgrey' : darkLight,
                },
                styles.ModalButton,
              ]}
            >
              <AppText style={{ color: primary, fontSize: 16 }}>Zapisz</AppText>
            </Pressable>
          </View>
        </ScrollView>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default CompanyProfileEditing;

const styles = StyleSheet.create({
  HeaderViewStyle: {
    justifyContent: 'flex-end',
  },
  ContentLabelStyle: {
    flexDirection: 'row',
    width: '100%',
    height: 35,
  },
  IconStyle: {
    height: 30,
    width: 30,
    tintColor: darkLight,
  },
  ListHeader: {
    fontSize: 19,
    color: black,
    marginHorizontal: 10,
  },
  ListElement: {
    color: black,
    marginHorizontal: 15,
  },
  About: {
    fontFamily: 'LexendDeca-SemiBold',
    fontSize: 22,
    marginHorizontal: 10,
    color: black,
  },
  ModalButton: {
    padding: 7,
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    alignItems: 'center',
    marginRight: 5,
    flexDirection: 'row',
  },
});
