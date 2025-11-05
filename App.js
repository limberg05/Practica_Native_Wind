import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import './global.css';

const App = () => {
  const [tareas, setTareas] = useState([
    { id: 1, texto: 'Aprender React', completada: false },
    { id: 2, texto: 'Aprender Tailwind', completada: true },
  ]);

  const [nuevaTarea, setNuevaTarea] = useState('');

  const agregarTarea = () => {
    if (nuevaTarea.trim() === '') return;

    const tarea = {
      id: Date.now(),
      texto: nuevaTarea,
      completada: false,
    };

    setTareas([...tareas, tarea]);
    setNuevaTarea('');
  };

  const toggleTarea = (id) => {
    setTareas(
      tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
      )
    );
  };

  const eliminarTarea = (id) => {
    setTareas(tareas.filter((tarea) => tarea.id !== id));
  };

  const tareasCompletadas = tareas.filter((item) => item.completada).length;
  const totalTareas = tareas.length;

  return (
    <View className="flex-1 bg-gray-100 p-6 pt-20">
      <Text className="text-3xl font-bold text-gray-800 mb-2">Mis tareas</Text>
      <Text className="text-base text-gray-600 mb-5">
        {tareasCompletadas} de {totalTareas} completadas
      </Text>

      <View className="flex-row mb-5">
        <TextInput
          className="flex-1 bg-white px-4 py-3 rounded-lg border border-gray-300 text-gray-800 mr-2"
          placeholder="Escribe una tarea..."
          value={nuevaTarea}
          onChangeText={setNuevaTarea}
        />
        <TouchableOpacity
          className="bg-blue-500 px-4 py-3 rounded-lg"
          onPress={agregarTarea}
        >
          <Text className="text-white font-semibold">Agregar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {tareas.map((tarea) => (
          <View
            key={tarea.id}
            className="flex-row items-center justify-between bg-white rounded-lg p-4 mb-3 border border-gray-200"
          >
            <TouchableOpacity onPress={() => toggleTarea(tarea.id)}>
              <Text
                className={`text-lg ${
                  tarea.completada
                    ? 'line-through text-gray-400'
                    : 'text-gray-800'
                }`}
              >
                {tarea.texto}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-red-500 px-3 py-1 rounded-lg"
              onPress={() => eliminarTarea(tarea.id)}
            >
              <Text className="text-white font-medium">X</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default App;
