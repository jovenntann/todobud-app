import { ref } from 'vue';

export default function useTodos(todos) {
  const fetchTodos = async () => {
    const response = await fetch('http://0.0.0.0:8000/public/guests/2/todos/', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      todos.value = data.results;
    } else {
      console.error('Error fetching todos:', response.statusText);
    }
  };

  return {
    fetchTodos,
  };
}
