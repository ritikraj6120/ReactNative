import React, {useState} from 'react';
import Voice from '@react-native-voice/voice';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
const Home = () => {
  const [pitch, setPitch] = useState('');
  const [error, setError] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = e => {
    setStarted('True');
  };
  const onSpeechEnd = () => {
    setStarted(null);
    setEnd('True');
  };
  const onSpeechError = e => {
    setError(JSON.stringify(e.error));
  };
  const onSpeechResults = e => {
    setResults(e.value);
  };
  const onSpeechPartialResults = e => {
    setPartialResults(e.value);
  };
  const onSpeechVolumeChanged = e => {
    setPitch(e.value);
  };
  const startSpeechRecognizing = async () => {
    setPitch('');
    setError('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
    setEnd('');
    try {
      await Voice.start('en-US', {
        EXTRA_SPEECH_INPUT_MINIMUM_LENGTH_MILLIS: 2000,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const stopSpeechRecognizing = async () => {
    try {
      await Voice.stop();
      setStarted(null);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {!started ? (
        <TouchableHighlight
          onPress={startSpeechRecognizing}
          style={{marginVertical: 100}}>
          <Image
            source={{
              uri: 'https://png.pngtree.com/png-vector/20190329/ourlarge/pngtree-vector-microphone-icon-png-image_889382.jpg',
            }}
          />
        </TouchableHighlight>
      ) : (
        <TouchableHighlight
          onPress={stopSpeechRecognizing}
          style={{marginVertical: 100}}>
          <Image
            source={{
              uri: 'https://preview.redd.it/axorctfsk4v01.jpg?auto=webp&s=b9f5f8c1a353bd10aa7f3fa61e24b756ff042a7b',
            }}
          />
        </TouchableHighlight>
      )}
      <ScrollView >
        {partialResults.map((result, index) => {
          return (
            <Text key={`partial-result-${index}`}>
              {result}
            </Text>
          );
        })}
      </ScrollView>
    </>
  );
};

export default Home;
