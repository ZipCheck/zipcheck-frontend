<template>
  <transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3>장소에 대한 감정을 선택하세요</h3>
            <p class="distance-info">현재 위치와 {{ distance.toFixed(1) }}m 떨어져 있습니다.</p>
          </div>
          <div class="modal-body">
            <div class="emoticon-grid">
              <button
                v-for="emoticon in emoticons"
                :key="emoticon.name"
                class="emoticon-btn"
                @click="selectEmoticon(emoticon)"
              >
                <span class="emoticon-icon">{{ emoticon.icon }}</span>
                <span class="emoticon-name">{{ emoticon.name }}</span>
              </button>
            </div>
          </div>
          <div class="modal-footer">
            <button class="modal-default-button" @click="$emit('close')">
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
  show: Boolean,
  distance: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(['close', 'select']);

const emoticons = ref([
    { name: '좋아요', icon: '😄' },
    { name: '최고예요', icon: '😍' },
    { name: '웃겨요', icon: '😂' },
    { name: '슬퍼요', icon: '😢' },
    { name: '화나요', icon: '😠' },
    { name: '별로예요', icon: '🤔' },
]);

const selectEmoticon = (emoticon) => {
  emit('select', emoticon);
  emit('close');
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  margin: auto;
}

.modal-container {
  width: 350px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #333;
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
}

.modal-header .distance-info {
    text-align: center;
    font-size: 0.9rem;
    color: #666;
    margin-top: 8px;
    margin-bottom: 20px;
}

.emoticon-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
}

.emoticon-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    border: 1px solid #eee;
    border-radius: 12px;
    background-color: #f9f9f9;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
}

.emoticon-btn:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.emoticon-icon {
    font-size: 2.5rem;
}

.emoticon-name {
    margin-top: 8px;
    font-size: 0.85rem;
    color: #333;
}


.modal-footer {
    text-align: center;
    margin-top: 25px;
}

.modal-default-button {
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #eee;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
