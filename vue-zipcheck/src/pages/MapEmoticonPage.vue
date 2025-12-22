
<script setup>
import { onMounted, ref } from 'vue';
import EmoticonSidebar from '@/components/map-emoticon/EmoticonSidebar.vue';
import KakaoMap from '@/components/map/KakaoMap.vue';
import ToastMessage from '@/components/common/ToastMessage.vue';
import EmoticonSelectionModal from '@/components/map-emoticon/EmoticonSelectionModal.vue';
import { calculateDistance } from '@/utils/geolocation.js';
import { addEmoticon } from '@/api/map.api.js';

const currentUserPosition = ref(null);
const clickedMapPosition = ref(null);

// Toast state
const showToast = ref(false);
const toastMessage = ref('');
const toastType = ref('info');

// Modal state
const showEmoticonModal = ref(false);
const currentDistance = ref(0);

onMounted(() => {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				currentUserPosition.value = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				console.log('현재 위치:', currentUserPosition.value);
			},
			(error) => {
				console.error('Geolocation 에러:', error);
                toastMessage.value = '위치 정보를 가져오는 데 실패했습니다.';
                toastType.value = 'error';
                showToast.value = true;
			}
		);
	} else {
        toastMessage.value = '이 브라우저에서는 위치 정보 서비스를 지원하지 않습니다.';
        toastType.value = 'error';
        showToast.value = true;
	}
});

const handleMapClick = (clickedPos) => {
	if (!currentUserPosition.value) {
        toastMessage.value = '현재 위치 정보를 아직 가져오지 못했습니다.';
        toastType.value = 'error';
        showToast.value = true;
		return;
	}

	const distance = calculateDistance(
		currentUserPosition.value.lat,
		currentUserPosition.value.lng,
		clickedPos.lat,
		clickedPos.lng
	);

	console.log(`클릭된 위치와의 거리: ${distance.toFixed(2)} 미터`);

	if (distance <= 10) {
		clickedMapPosition.value = clickedPos; // API 호출을 위해 클릭 위치 저장
		currentDistance.value = distance;
        showEmoticonModal.value = true;
	} else {
        toastMessage.value = `현재 위치에서 너무 멉니다. (거리: ${distance.toFixed(2)}m)`;
        toastType.value = 'error';
        showToast.value = true;
	}
};

const handleEmoticonSelect = async (emoticon) => {
	if (!clickedMapPosition.value) return;

    const emoticonData = {
        latitude: clickedMapPosition.value.lat,
        longitude: clickedMapPosition.value.lng,
        emoticonType: emoticon.name,
    };

    try {
        await addEmoticon(emoticonData);
        toastMessage.value = `'${emoticon.name}' 감정을 등록했습니다!`;
        toastType.value = 'success';
        showToast.value = true;
    } catch (error) {
        console.error('이모티콘 등록 실패:', error);
        toastMessage.value = '감정 등록에 실패했습니다. 다시 시도해주세요.';
        toastType.value = 'error';
        showToast.value = true;
    }
};
</script>

<template>
	<main class="flex-1 relative flex">
		<EmoticonSidebar />
		<KakaoMap
			@map-click="handleMapClick"
			:user-position="currentUserPosition"
		/>
        <ToastMessage
            v-model:show="showToast"
            :message="toastMessage"
            :type="toastType"
        />
        <EmoticonSelectionModal
            :show="showEmoticonModal"
            :distance="currentDistance"
            @close="showEmoticonModal = false"
            @select="handleEmoticonSelect"
        />
	</main>
</template>
