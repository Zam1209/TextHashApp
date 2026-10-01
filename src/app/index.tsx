import CryptoJS from 'crypto-js';
import { useState } from 'react';
import { ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [hashResult, setHashResult] = useState('');
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [bigO, setBigO] = useState<string>('');
  const [processedText, setProcessedText] = useState('');

  const handleCifrar = () => {
    if (!inputText.trim()) return;

    // tiempo de ejec T(n)
    const start = performance.now();
    const hash = CryptoJS.SHA256(inputText).toString();
    const end = performance.now();

    const duration = parseFloat((end - start).toFixed(4));

    setHashResult(hash);
    setExecutionTime(duration);
    setProcessedText(inputText);
    
    // big O 
    setBigO('O(n)');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Encabezado */}
      <View style={styles.headerBox}>
        <Text style={styles.title}>Text Hash</Text>
        <Text style={styles.subtitle}>
          Herramienta de Cifrado Seguro y Analisis de Complejidad Algoritmica
        </Text>
      </View>

      {/* Panel de entrada */}
      <View style={styles.inputCard}>
        <Text style={styles.inputLabel}>Ingresa el texto a procesar:</Text>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ej. MiClaveSecreta123..."
          placeholderTextColor="#a7a8bc"
        />

        {processedText !== '' && (
          <View style={styles.previewBox}>
            <Text style={styles.previewLabel}>Entrada procesada:</Text>
            <Text style={styles.previewValue}>"{processedText}"</Text>
          </View>
        )}

        <TouchableOpacity style={styles.btnCifrar} onPress={handleCifrar} activeOpacity={0.8}>
          <Text style={styles.btnText}> GENERAR HASH</Text>
        </TouchableOpacity>
      </View>

      {/* Tarjeta de metricas y resultados */}
      {hashResult !== '' && (
        <View style={styles.resultsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}> Metricas de Rendimiento</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.metricLabel}>Hash SHA-256 Generado:</Text>
            <View style={styles.hashContainer}>
              <Text style={styles.hashText}>{hashResult}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Tiempo T(n)</Text>
              <Text style={styles.statValue}>{executionTime} ms</Text>
            </View>

            <View style={[styles.statBox, styles.statBoxHighlight]}>
              <Text style={styles.statLabel}>Complejidad Algoritmica</Text>
              <Text style={styles.bigOValue}>{bigO}</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}