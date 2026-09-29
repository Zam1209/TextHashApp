import CryptoJS from 'crypto-js';
import { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [inputText, setInputText] = useState('');
  const [hashResult, setHashResult] = useState('');
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [bigO, setBigO] = useState<string>('');
  const [processedText, setProcessedText] = useState('');

  const handleCifrar = () => {
    if (!inputText.trim()) return;

    //tiempo de ejecuc T(n)
    const start = performance.now();
    const hash = CryptoJS.SHA256(inputText).toString();
    const end = performance.now();

    const duration = parseFloat((end - start).toFixed(4));

    setHashResult(hash);
    setExecutionTime(duration);
    setProcessedText(inputText);
    
    //big O 
    setBigO('O(n)');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Encabezado */}
      <View style={styles.headerBox}>
        <Text style={styles.title}>CryptoHash Studio ✨</Text>
        <Text style={styles.subtitle}>
          Herramienta de Cifrado Seguro & Análisis de Complejidad Algorítmica
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
          <Text style={styles.btnText}>⚡ GENERAR HASH</Text>
        </TouchableOpacity>
      </View>

      {/* Tarjeta de metricas y resultados */}
      {hashResult !== '' && (
        <View style={styles.resultsCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>📊 Métricas de Rendimiento</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.metricLabel}>Hash SHA-256 Generado:</Text>
            <View style={styles.hashContainer}>
              <Text style={styles.hashText}>{hashResult}</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Tiempo $T(n)$</Text>
              <Text style={styles.statValue}>{executionTime} ms</Text>
            </View>

            <View style={[styles.statBox, styles.statBoxHighlight]}>
              <Text style={styles.statLabel}>Complejidad</Text>
              <Text style={styles.bigOValue}>{bigO}</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f3f0f9', 
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  headerBox: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#4c1d95', 
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: '#6d28d9',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 18,
    opacity: 0.85,
  },
  inputCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#6d28d9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5b21b6',
    marginBottom: 8,
  },
  input: {
    width: '100%',
    backgroundColor: '#f5f3ff', 
    borderWidth: 1.5,
    borderColor: '#ddd6fe',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: '#2e1065',
  },
  previewBox: {
    marginTop: 12,
    padding: 10,
    backgroundColor: '#faf5ff',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#8b5cf6',
  },
  previewLabel: {
    fontSize: 11,
    color: '#7c3aed',
    fontWeight: '600',
  },
  previewValue: {
    fontSize: 13,
    color: '#4c1d95',
    fontStyle: 'italic',
  },
  btnCifrar: {
    backgroundColor: '#7c3aed', 
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 18,
    alignItems: 'center',
    shadowColor: '#7c3aed',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  btnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
    letterSpacing: 0.8,
  },
  resultsCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#4c1d95',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e9d5ff',
  },
  cardHeader: {
    borderBottomWidth: 1,
    borderBottomColor: '#f3e8ff',
    paddingBottom: 10,
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#4c1d95',
  },
  section: {
    marginBottom: 15,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6d28d9',
    marginBottom: 6,
  },
  hashContainer: {
    backgroundColor: '#2e1065', 
    padding: 12,
    borderRadius: 10,
  },
  hashText: {
    fontSize: 11,
    color: '#e9d5ff',
    fontFamily: 'monospace',
    lineHeight: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 5,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#f5f3ff',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd6fe',
  },
  statBoxHighlight: {
    backgroundColor: '#faf5ff',
    borderColor: '#c084fc',
  },
  statLabel: {
    fontSize: 12,
    color: '#6d28d9',
    fontWeight: '500',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 15,
    fontWeight: '700',
    color: '#4c1d95',
  },
  bigOValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#9333ea', 
  },
});