<script setup>
import { defineProps, ref } from 'vue';
import { Handle, Position } from '@vue-flow/core';

const props = defineProps({
  id: String,
  name: String,
  photo: String,
  position: String,
  grade: Number,
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
      type="source"
      :position="direction === 'TB' ? Position.Bottom : Position.Right"
    />
    <div class="container">
      <p class="name">{{ name }}</p>
      <img :src="photo" />
    </div>

    <button v-if="grade !== 4" class="toggle-btn" @click="toggleVisibility">
      Toggle
    </button>
    <Handle
      v-if="grade !== 4"
      type="target"
      :position="direction === 'TB' ? Position.Top : Position.Left"
    />
  </div>
</template>

<style>
.node {
  background-color: grey;
  height: 80px;
  width: 150px;
  color: white;
  text-align: center;
  padding: 2px;
  border-radius: 10px;
}

.container {
  display: flex;
  gap: 4px;
}

.name {
  margin: 0;
}

.node img {
  width: 40px;
  height: 40px;
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
