<script setup>
import { defineProps, ref } from 'vue';
import { Handle, Position } from '@vue-flow/core';

const props = defineProps({
  id: String,
  name: String,
  photo: String,
  position: String,
  bossId: String,
  direction: String,
  hideNodes: Function,
});

const isHidden = ref(false);

const toggleVisibility = () => {
  props.hideNodes(props.id);
};
</script>

<template>
  <div class="node">
    <Handle
      type="target"
      :position="direction === 'TB' ? Position.Top : Position.Left"
    />
    <p>{{ name }}</p>
    <img :src="photo" />
    <Handle
      type="source"
      :position="direction === 'TB' ? Position.Bottom : Position.Right"
    />
    <button class="toggle-btn" @click="toggleVisibility">
      Скрыть/показать
    </button>
  </div>
</template>

<style>
.node {
  background-color: #1a192b;
  height: 200px;
  width: 200px;
  color: white;
  text-align: center;
  padding: 10px;
  border-radius: 10px;
}

.node img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.toggle-btn {
  background-color: #4a5568;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.toggle-btn:hover {
  background-color: #2563eb;
  transition: background-color 0.2s;
}
</style>
