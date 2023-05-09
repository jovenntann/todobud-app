<template>
  <div class="p-6 space-y-6 overflow-y-auto" style="max-height: 600px;">
    <h3>Todo Items</h3>
    <fieldset class="border-b border-t border-gray-200">
      <legend class="sr-only">Notifications</legend>
      <div class="divide-y divide-gray-200">
        <div v-for="todo in todos" :key="todo.id" class="relative flex items-start pb-4 pt-3.5">
          <div class="min-w-0 flex-1 text-sm leading-6">
            <label :for="'todo-' + todo.id" :class="getTitleClass(todo.priority)" class="font-medium">{{ getEmoji(todo.status) }} {{ todo.title }}</label>
            <p :id="'todo-' + todo.id + '-description'" class="text-gray-500">{{ todo.notes }}</p>
            <div class="w-full h-2 bg-gray-300 rounded">
              <div :style="{ width: getBarWidth(todo) }" class="mt-4 h-2 bg-green-400   rounded"></div>
            </div>
            <p class="text-gray-700 mt-2">Duration: {{ formatTime(todo.duration) }} | Time Spent: {{ formatTime(todo.time_spent) }}</p>
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

const getTitleClass = (priority) => {
  switch (priority) {
    case 'low':
      return 'text-gray-400';
    case 'medium':
      return 'text-black-500';
    case 'high':
      return 'text-red-500';
    default:
      return 'text-black-900';
  }
};

const getEmoji = (status) => {
  switch (status) {
    case 'todo':
      return '📝';
    case 'in_progress':
      return '🚧';
    case 'done':
      return '✅';
    default:
      return '';
  }
};

const getBarWidth = (todo) => {
  if (todo.time_spent === 0 && todo.duration === 0) {
    return '0%';
  }
  const percentage = Math.min((todo.time_spent / todo.duration) * 100, 100);
  return `${percentage}%`;
};

const formatTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return hours > 0
    ? `${hours}h ${remainingMinutes}m`
    : `${remainingMinutes}m`;
};
</script>
