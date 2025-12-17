<template>
  <div class="flex-grow container mx-auto px-4 lg:px-8 py-8 md:py-12 max-w-5xl">
    <div v-if="board">
      <nav
        aria-label="Breadcrumb"
        class="flex mb-6 text-sm text-text-sub-light dark:text-text-sub-dark"
      >
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <router-link to="/" class="inline-flex items-center hover:text-primary">
              <span class="material-symbols-outlined text-base mr-1">home</span>
              홈
            </router-link>
          </li>
          <li>
            <div class="flex items-center">
              <span class="material-symbols-outlined text-base mx-1">chevron_right</span>
              <router-link to="/boards" class="hover:text-primary">{{ board.category || '자유게시판' }}</router-link>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <span class="material-symbols-outlined text-base mx-1">chevron_right</span>
              <span class="font-medium text-text-main-light dark:text-text-main-dark truncate w-64"
                >{{ board.title }}</span
              >
            </div>
          </li>
        </ol>
      </nav>
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-8 space-y-8">
          <article
            class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <header class="mb-6 border-b border-gray-100 dark:border-gray-700 pb-6">
              <div class="flex items-center gap-3 mb-4">
                <span
                  class="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-yellow-900 dark:text-yellow-300"
                  >{{ board.category || '자유게시판' }}</span
                >
                <span class="text-text-sub-light dark:text-text-sub-dark text-sm"
                  >{{ new Date(board.createdAt).toLocaleString() }}</span
                >
              </div>
              <h1
                class="text-2xl md:text-3xl font-bold mb-4 text-text-main-light dark:text-text-main-dark leading-tight"
              >
                {{ board.title }}
              </h1>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center overflow-hidden"
                  >
                     <img v-if="board.writerAvatar" :src="board.writerAvatar" alt="Writer Avatar" class="w-full h-full object-cover" />
                    <span v-else class="material-symbols-outlined text-gray-400 dark:text-gray-300"
                      >person</span
                    >
                  </div>
                  <div>
                    <div class="font-semibold text-sm">{{ board.writer }}</div>
                    <div class="text-xs text-text-sub-light dark:text-text-sub-dark">
                      {{ board.writerStatus || '인증회원' }}
                    </div>
                  </div>
                </div>
                <div
                  class="flex items-center gap-4 text-text-sub-light dark:text-text-sub-dark text-sm"
                >
                  <div class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-base">visibility</span>
                    <span>{{ board.viewCount || 0 }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <span class="material-symbols-outlined text-base">chat_bubble_outline</span>
                    <span>{{ board.comments?.length || 0 }}</span>
                  </div>
                </div>
              </div>
            </header>
            <div
              class="prose dark:prose-invert max-w-none mb-8 text-text-main-light dark:text-text-main-dark leading-relaxed"
              v-html="board.content"
            >
            </div>
            <div
              class="flex items-center justify-center gap-4 pt-6 border-t border-gray-100 dark:border-gray-700"
            >
              <button
                @click="handleLike"
                class="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span class="material-symbols-outlined text-gray-400">thumb_up</span>
                <span class="font-medium text-sm">좋아요 {{ board.likeCount || 0 }}</span>
              </button>
              <button
                class="flex items-center gap-2 px-6 py-2.5 rounded-full border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <span class="material-symbols-outlined text-gray-400">share</span>
                <span class="font-medium text-sm">공유하기</span>
              </button>
            </div>
          </article>
          <section
            class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <h3 class="text-lg font-bold mb-6 flex items-center gap-2">
              댓글 <span class="text-primary">{{ board.comments?.length || 0 }}</span>
            </h3>
            <div class="mb-8 flex gap-4">
              <div
                class="w-10 h-10 rounded-full bg-primary flex-shrink-0 flex items-center justify-center font-bold text-sm text-black"
              >
                나
              </div>
              <div class="flex-grow">
                <textarea
                  v-model="newComment"
                  class="w-full rounded-xl border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-primary focus:border-transparent dark:text-white p-3 resize-none"
                  placeholder="따뜻한 조언의 한마디를 남겨주세요."
                  rows="3"
                ></textarea>
                <div class="flex justify-end mt-2">
                  <button
                    @click="handleCommentSubmit"
                    class="bg-black dark:bg-white text-white dark:text-black text-sm font-bold px-5 py-2 rounded-lg hover:opacity-80 transition-opacity"
                  >
                    등록하기
                  </button>
                </div>
              </div>
            </div>
            <div class="space-y-6">
              <div v-for="comment in board.comments" :key="comment.commentId" class="flex gap-4">
                <div
                  class="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex-shrink-0 flex items-center justify-center overflow-hidden"
                >
                  <img v-if="comment.writerAvatar" :src="comment.writerAvatar" alt="Commenter Avatar" class="w-full h-full object-cover"/>
                  <span v-else class="material-symbols-outlined">face</span>
                </div>
                <div class="flex-grow">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="font-bold text-sm">{{ comment.writer }}</span>
                    <span class="text-xs text-text-sub-light dark:text-text-sub-dark"
                      >{{ new Date(comment.createdAt).toLocaleString() }}</span
                    >
                  </div>
                  <p
                    class="text-sm text-text-main-light dark:text-text-main-dark leading-relaxed mb-2"
                  >
                    {{ comment.content }}
                  </p>
                </div>
              </div>
              <div v-if="board.comments && board.comments.length > 5" class="w-full h-px bg-gray-100 dark:bg-gray-700"></div>
            </div>
            <button
              v-if="board.comments && board.comments.length > 5"
              class="w-full mt-8 py-3 text-sm font-medium text-text-sub-light dark:text-text-sub-dark border border-gray-200 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              댓글 더보기
            </button>
          </section>
        </div>
        <aside class="lg:col-span-4 space-y-8">
        <!-- Sidebar content remains static for now -->
        <div
          class="bg-surface-light dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
        >
          <div class="flex flex-col items-center text-center">
            <div
              class="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-600 mb-4 overflow-hidden relative group"
            >
              <img v-if="board.writerAvatar" :src="board.writerAvatar" alt="Writer Avatar" class="w-full h-full object-cover" />
              <span v-else
                class="material-symbols-outlined text-4xl text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                >person</span
              >
            </div>
            <h3 class="font-bold text-lg mb-1">{{ board.writer }}</h3>
            <p class="text-sm text-text-sub-light dark:text-text-sub-dark mb-4">
              가입일: {{ board.writerJoinDate || '2023.01.15' }}
            </p>
            <div class="w-full grid grid-cols-2 gap-2 mb-4">
              <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl text-center">
                <div class="text-xs text-text-sub-light dark:text-text-sub-dark mb-1">
                  작성글
                </div>
                <div class="font-bold">{{ board.writerPostCount || 0 }}</div>
              </div>
              <div class="bg-gray-50 dark:bg-gray-800 p-3 rounded-xl text-center">
                <div class="text-xs text-text-sub-light dark:text-text-sub-dark mb-1">
                  작성댓글
                </div>
                <div class="font-bold">{{ board.writerCommentCount || 0 }}</div>
              </div>
            </div>
            <button
              class="w-full bg-primary text-black font-bold py-2.5 rounded-xl hover:bg-yellow-400 transition-colors text-sm"
            >
              쪽지 보내기
            </button>
          </div>
        </div>
      </aside>
      </div>
    </div>
     <div v-else class="text-center p-12">
      <p>게시글을 불러오는 중입니다...</p>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getBoardById, likeBoard } from '@/api/boards.api.js';
import { createComment } from '@/api/comments.api.js';

const route = useRoute();
const board = ref(null);
const newComment = ref('');

const fetchBoard = async () => {
  try {
    const boardId = route.params.id;
    const data = await getBoardById(boardId);
    board.value = data;
  } catch (error) {
    console.error('Failed to fetch board details:', error);
    // Interceptor handles user notification
  }
};

const handleLike = async () => {
  if (!board.value) return;
  try {
    await likeBoard(board.value.boardId);
    // Optimistically update the like count, or refetch the board
    if (board.value.likeCount !== undefined) {
        board.value.likeCount++;
    } else {
        board.value.likeCount = 1;
    }
  } catch (error) {
    console.error('Failed to like the board:', error);
     // Interceptor handles user notification, but you could add specific UI feedback
  }
};

const handleCommentSubmit = async () => {
  if (!board.value || !newComment.value.trim()) {
    alert('댓글 내용을 입력해주세요.');
    return;
  }
  try {
    await createComment(board.value.boardId, { content: newComment.value });
    newComment.value = '';
    // Re-fetch board data to show the new comment
    await fetchBoard();
  } catch (error) {
    console.error('Failed to submit comment:', error);
  }
};

onMounted(() => {
  fetchBoard();
});
</script>
<style scoped></style>
