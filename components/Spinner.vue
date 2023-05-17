<template>
  <span class="spinner" />
</template>

<style lang="scss" scoped>
.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #cc5500;
  border-bottom-color: lightgray;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 0.75s linear infinite;
  display: block;
  margin: 20px auto;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>