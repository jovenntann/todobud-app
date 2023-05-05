<template>
  <div class="p-6 space-y-6 overflow-y-auto" style="max-height: 600px;">
    <h3>Todo Items</h3>
    <fieldset class="border-b border-t border-gray-200">
      <legend class="sr-only">Notifications</legend>
      <div class="divide-y divide-gray-200">
        <div v-for="todo in todos" :key="todo.id" class="relative flex items-start pb-4 pt-3.5">
          <div class="min-w-0 flex-1 text-sm leading-6">
            <label :for="'todo-' + todo.id" class="font-medium text-gray-900">{{ todo.title }}</label>
            <p :id="'todo-' + todo.id + '-description'" class="text-gray-500">{{ todo.notes }}</p>
            <p class="text-gray-400 italic">Status: {{ todo.status }}</p>
          </div>
          <div class="ml-3 flex h-6 items-center">
            <input :id="'todo-' + todo.id" :aria-describedby="'todo-' + todo.id + '-description'" name="todos" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" :checked="isDone(todo)" @change="toggleStatus(todo)" />
          </div>  
        </div>
      </div>
    </fieldset>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const todos = inject('todos');

const isDone = (todo) => todo.status === 'done';

const toggleStatus = (todo) => {
  todo.status = isDone(todo) ? 'todo' : 'done';
};

</script>
