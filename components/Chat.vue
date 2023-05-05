<template>
    <ul ref="activityList" role="list" class="space-y-6 overflow-y-auto h-96">

      <li v-for="(activityItem, activityItemIdx) in activity" :key="activityItem.id" class="relative flex gap-x-4">
        <div :class="[activityItemIdx === activity.length - 1 ? 'h-6' : '-bottom-6', 'absolute left-0 top-0 flex w-6 justify-center']">
          <div class="w-px bg-gray-200" />
        </div>

        <template v-if="activityItem.type === 'replied'">
          <img :src="activityItem.person.imageUrl" alt="" class="relative mt-3 h-6 w-6 flex-none rounded-full bg-gray-50" />
          <div class="flex-auto rounded-md p-3 ring-1 ring-inset ring-gray-200">
            <div class="flex justify-between gap-x-4">
              <div class="py-0.5 text-xs leading-5 text-gray-500">
                <span class="font-medium text-gray-900">{{ activityItem.person.name }}</span> replied
              </div>
              <time :datetime="activityItem.dateTime" class="flex-none py-0.5 text-xs leading-5 text-gray-500">{{ activityItem.date }}</time>
            </div>
            <p class="text-sm leading-6 text-gray-500">{{ activityItem.comment }}</p>
          </div>
        </template>

        <template v-else-if="activityItem.type === 'create'">
          <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
            <CheckCircleIcon v-if="activityItem.type === 'create'" class="h-6 w-6 text-green-600" aria-hidden="true" />
            <div v-else class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
          </div>
          <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
            <span class="font-medium text-gray-900">{{ activityItem.person.name }}</span> task {{ activityItem.type }}d.
          </p>
          <time :datetime="activityItem.dateTime" class="flex-none py-0.5 text-xs leading-5 text-gray-500">{{ activityItem.date }}</time>
        </template>
  
        <template v-else-if="activityItem.type === 'update'">
          <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
            <InformationCircleIcon v-if="activityItem.type === 'update'" class="h-6 w-6 text-blue-600" aria-hidden="true" />
            <div v-else class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
          </div>
          <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
            <span class="font-medium text-gray-900">{{ activityItem.person.name }}</span> task {{ activityItem.type }}d.
          </p>
          <time :datetime="activityItem.dateTime" class="flex-none py-0.5 text-xs leading-5 text-gray-500">{{ activityItem.date }}</time>
        </template>

        <template v-else-if="activityItem.type === 'delete'">
          <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
            <XCircleIcon v-if="activityItem.type === 'delete'" class="h-6 w-6 text-red-600" aria-hidden="true" />
            <div v-else class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
          </div>
          <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
            <span class="font-medium text-gray-900">{{ activityItem.person.name }}</span> task {{ activityItem.type }}d.
          </p>
          <time :datetime="activityItem.dateTime" class="flex-none py-0.5 text-xs leading-5 text-gray-500">{{ activityItem.date }}</time>
        </template>

        <template v-else-if="activityItem.type === 'read'">
          <div class="relative flex h-6 w-6 flex-none items-center justify-center bg-white">
            <CheckCircleIcon v-if="activityItem.type === 'read'" class="h-6 w-6 text-black-600" aria-hidden="true" />
            <div v-else class="h-1.5 w-1.5 rounded-full bg-gray-100 ring-1 ring-gray-300" />
          </div>
          <p class="flex-auto py-0.5 text-xs leading-5 text-gray-500">
            <span class="font-medium text-gray-900">{{ activityItem.person.name }}</span>
          </p>
          <time :datetime="activityItem.dateTime" class="flex-none py-0.5 text-xs leading-5 text-gray-500">{{ activityItem.date }}</time>
        </template>
      </li>

      <div v-if="isTyping" class="flex items-center mt-3 ml-3">
          <img
            src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/plant.png"
            alt=""
            class="h-6 w-6 flex-none rounded-full bg-gray-50"
          />
          <div class="ml-3 rounded-md p-3 ring-1 ring-inset ring-gray-200">
            <div class="typing-effect border-b-2 border-gray-500"></div>
          </div>
        </div>

    </ul>
  
    <!-- New comment form -->
    <div class="mt-6 flex gap-x-3">
      <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-6 w-6 flex-none rounded-full bg-gray-50" />
      <div class="relative flex-auto">
        <div class="overflow-hidden rounded-lg pb-12 shadow-sm ring-1 ring-inset ring-gray-300">
          <label for="comment" class="sr-only">Add your comment</label>
          <textarea rows="2" name="comment" id="comment" class="block w-full resize-none border-0 bg-transparent py-1.5 px-3 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Add your comment..." />
        </div>
  
        <div class="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
          <div class="flex items-center space-x-5">
            <div class="flex items-center">
              <button type="button" class="-m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                <PaperClipIcon class="h-5 w-5" aria-hidden="true" />
                <span class="sr-only">Attach a file</span>
              </button>
            </div>
            <div class="flex items-center">
              <Listbox as="div" v-model="selected">
                <ListboxLabel class="sr-only">Your mood</ListboxLabel>
                <div class="relative">
                  <ListboxButton class="relative -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
                    <span class="flex items-center justify-center">
                      <span v-if="selected.value === null">
                        <FaceSmileIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                        <span class="sr-only">Add your mood</span>
                      </span>
                      <span v-if="!(selected.value === null)">
                        <span :class="[selected.bgColor, 'flex h-8 w-8 items-center justify-center rounded-full']">
                          <component :is="selected.icon" class="h-5 w-5 flex-shrink-0 text-white" aria-hidden="true" />
                        </span>
                        <span class="sr-only">{{ selected.name }}</span>
                      </span>
                    </span>
                  </ListboxButton>
  
                  <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100" leave-to-class="opacity-0">
                    <ListboxOptions class="absolute bottom-10 z-10 -ml-6 w-60 rounded-lg bg-white py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                      <ListboxOption as="template" v-for="mood in moods" :key="mood.value" :value="mood" v-slot="{ active }">
                        <li :class="[active ? 'bg-gray-100' : 'bg-white', 'relative cursor-default select-none px-3 py-2']">
                          <div class="flex items-center">
                            <div :class="[mood.bgColor, 'flex h-8 w-8 items-center justify-center rounded-full']">
                              <component :is="mood.icon" :class="[mood.iconColor, 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
                            </div>
                            <span class="ml-3 block truncate font-medium">{{ mood.name }}</span>
                          </div>
                        </li>
                      </ListboxOption>
                    </ListboxOptions>
                  </transition>
                </div>
              </Listbox>
            </div>
          </div>
          <button type="submit" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" @click="submitComment">Send</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onUpdated } from 'vue'
  import useTodos from '~/composables/useTodos';
  import { CheckCircleIcon, InformationCircleIcon, XCircleIcon } from '@heroicons/vue/24/solid'
  import {
    FaceFrownIcon,
    FaceSmileIcon,
    FireIcon,
    HandThumbUpIcon,
    HeartIcon,
    PaperClipIcon,
    XMarkIcon,
  } from '@heroicons/vue/20/solid'
  import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
  
  const todos = inject('todos');
  const { fetchTodos } = useTodos(todos); 

  const activityList = ref(null);
  const activity = ref([
    {
      id: 1,
      type: 'replied',
      person: {
        name: 'TodoBud AI',
        imageUrl:
          'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/plant.png',
      },
      comment: 'How is your day? Maximize your productivity and well-being with a real-life project manager who handles your to-do list, helps you get more done, reviews your weekly progress, celebrates wins, and collaborates with high performers at organizations like Meta, Square, Etsy, and more.',
      date: '',
      dateTime: '2023-01-23T15:56',
    }
  ])

  const moods = [
    { name: 'Excited', value: 'excited', icon: FireIcon, iconColor: 'text-white', bgColor: 'bg-red-500' },
    { name: 'Loved', value: 'loved', icon: HeartIcon, iconColor: 'text-white', bgColor: 'bg-pink-400' },
    { name: 'Happy', value: 'happy', icon: FaceSmileIcon, iconColor: 'text-white', bgColor: 'bg-green-400' },
    { name: 'Sad', value: 'sad', icon: FaceFrownIcon, iconColor: 'text-white', bgColor: 'bg-yellow-400' },
    { name: 'Thumbsy', value: 'thumbsy', icon: HandThumbUpIcon, iconColor: 'text-white', bgColor: 'bg-blue-500' },
    { name: 'I feel nothing', value: null, icon: XMarkIcon, iconColor: 'text-gray-400', bgColor: 'bg-transparent' },
  ]
  
  const selected = ref(moods[5])

  const isTyping = ref(false)



  const scrollToBottom = () => {
    activityList.value.scrollTop = activityList.value.scrollHeight
  }

  const submitComment = async () => {
    const comment = document.getElementById('comment').value
    if (!comment) return

    try {
      isTyping.value = true
      const userNewActivity = {
        id: 2,
        type: 'replied',
        person: {
          name: 'John Doe',
          imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        },
        comment: comment,
        date: '',
        dateTime: '',
      }

      activity.value.push(userNewActivity)
      document.getElementById('comment').value = ''
  
      const response = await fetch('http://0.0.0.0:8000/public/guests/2/chats/', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: comment
        })
      })

      if (!response.ok) {
        isTyping.value = false
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const responseData = await response.json()
      console.log(responseData)

      isTyping.value = false

      // Add API response to the activity array
      const newActivity = {
        id: 10,
        type: 'replied',
        person: {
          name: 'TodoBud AI',
          imageUrl: 'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/plant.png',
        },
        comment: responseData.response,
        date: '',
        dateTime: '',
      }
      activity.value.push(newActivity)
      console.log(activity)

      // Add todos from the response to the activity array
      for (const todo of responseData.todos) {
      const todoActivity = {
        id: todo.id,
        type: todo.action,
        person: { name: todo.title },
        date: '',
        dateTime: todo.due_date,
      };
      activity.value.push(todoActivity);
      await new Promise((resolve) => setTimeout(resolve, 500));

      await fetchTodos();
    }

    } catch (error) {
      console.error(error)
    }
  }

  onUpdated(() => {
    scrollToBottom();
  });


  </script>

<style scoped>
  .typing-effect {
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid;
    animation: typing 2s steps(30, end),
              blink-caret 0.5s step-end infinite alternate;
  }

  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes blink-caret {
    50% { border-color: transparent; }
  }
</style>