import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import { MarqueeText } from '../../src/index';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Marquee Text</Text>
      </View>
      <View style={styles.textContainer}>
        <MarqueeText
          speed={1}
          text="Smooth marque text for news, updates, and more!"
          textStyles={styles.text}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    backgroundColor: '#021526',
    padding: 20,
  },
  title: {
    textAlign: 'center',
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textContainer: {
    backgroundColor: '#D7DBDD',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
});
