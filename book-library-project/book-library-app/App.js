
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TextInput, Button, Card, Text } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:8080/api/books'; // Replace with actual IP if needed

export default function App() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({ title: '', author: '', isbn: '' });

  const fetchBooks = async () => {
    try {
      const res = await axios.get(API_URL);
      setBooks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addBook = async () => {
    try {
      await axios.post(API_URL, form);
      setForm({ title: '', author: '', isbn: '' });
      fetchBooks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBooks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="titleLarge">Book Library</Text>
      <TextInput label="Title" value={form.title} onChangeText={text => setForm({ ...form, title: text })} />
      <TextInput label="Author" value={form.author} onChangeText={text => setForm({ ...form, author: text })} />
      <TextInput label="ISBN" value={form.isbn} onChangeText={text => setForm({ ...form, isbn: text })} />
      <Button mode="contained" onPress={addBook}>Add Book</Button>
      <FlatList data={books} keyExtractor={item => item.id.toString()} renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Title title={item.title} subtitle={`by ${item.author}`} />
          <Card.Content><Text>ISBN: {item.isbn}</Text></Card.Content>
          <Card.Actions><Button onPress={() => deleteBook(item.id)}>Delete</Button></Card.Actions>
        </Card>
      )} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, marginTop: 40 },
  card: { marginVertical: 5 }
});
