import { ref } from 'vue';

export default function useTodos(todos) {
  const apiBaseUrl = ref(import.meta.env.VITE_API_BASE_URL);

  const fetchTodos = async () => {
    const response = await fetch(`${apiBaseUrl.value}/todos/`, {
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
