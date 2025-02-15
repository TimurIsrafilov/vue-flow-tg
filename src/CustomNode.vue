<script setup>
import { Position, Handle } from '@vue-flow/core';

const props = defineProps({
  id: String,
  name: String,
  photo: String,
  position: String,
  grade: String,
  bossId: String,
  direction: String,
});
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
</style>
