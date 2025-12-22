<template>
  <section class="flex-grow relative h-full w-full bg-gray-200 dark:bg-gray-900 overflow-hidden">
    <!-- 지도를 표시할 영역 (ID 필수) -->
    <div id="map" class="w-full h-full z-0"></div>

    <!-- 기존 UI 요소 (버튼 등) 유지 -->
		<div class="absolute bottom-8 right-8 z-20 flex flex-col gap-3 items-end">
			<div
				class="bg-surface-light dark:bg-surface-dark text-xs px-3 py-1.5 rounded-lg shadow-md mb-1 animate-bounce border border-gray-100 dark:border-gray-700"
			>
				위치 인증 후 후기를 남겨보세요!
			</div>
			<button
				class="w-14 h-14 bg-gray-300 dark:bg-gray-700 rounded-full shadow-lg flex items-center justify-center text-white cursor-not-allowed border-4 border-surface-light dark:border-surface-dark"
				disabled=""
			>
				<span class="material-symbols-outlined text-[28px]">add_reaction</span>
			</button>
		</div>
		<div class="absolute bottom-8 right-28 z-20 flex gap-2">
			<div
				class="flex flex-col bg-surface-light dark:bg-surface-dark rounded-lg shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden"
			>
				<button
					class="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 border-b border-gray-100 dark:border-gray-700 transition-colors"
				>
					<span
						class="material-symbols-outlined text-gray-600 dark:text-gray-300 text-[20px]"
						>add</span
					>
				</button>
				<button
					class="p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
				>
					<span
						class="material-symbols-outlined text-gray-600 dark:text-gray-300 text-[20px]"
						>remove</span
					>
				</button>
			</div>
			<button
				class="p-2 bg-surface-light dark:bg-surface-dark rounded-lg shadow-md border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
			>
				<span
					class="material-symbols-outlined text-gray-600 dark:text-gray-300 text-[20px]"
					>my_location</span
				>
			</button>
		</div>
  </section>
</template>

<script setup>
import { onMounted, ref, watch, shallowRef } from 'vue';

const props = defineProps({
  properties: {
    type: [Array, Object],
    default: () => [],
  },
  userPosition: {
    type: Object,
    default: null,
  },
});

const map = shallowRef(null);
let markers = []; // 마커들을 담을 배열
let overlays = []; // 오버레이들을 담을 배열

onMounted(() => {
  if (window.kakao && window.kakao.maps) {
    initMap();
  } else {
    // SDK가 아직 로드되지 않았을 경우 0.5초마다 체크 (최대 10번 시도)
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      if (window.kakao && window.kakao.maps) {
        clearInterval(interval);
        initMap();
      } else if (attempts >= 10) {
        clearInterval(interval);
        console.error('Kakao Maps SDK 로드 실패: 인터넷 연결이나 API 키 설정을 확인해주세요.');
      }
    }, 500);
  }
});

const initMap = () => {
  const container = document.getElementById('map');
  const options = {
    center: new window.kakao.maps.LatLng(37.566826, 126.9786567), // 초기 중심 좌표 (서울시청)
    level: 3,
  };
  map.value = new window.kakao.maps.Map(container, options);

  // 컨트롤러 추가
  const mapTypeControl = new window.kakao.maps.MapTypeControl();
  map.value.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
  const zoomControl = new window.kakao.maps.ZoomControl();
  map.value.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

  // Add event listeners for map idle and zoom_changed
  window.kakao.maps.event.addListener(map.value, 'idle', emitMapViewport);
  window.kakao.maps.event.addListener(map.value, 'zoom_changed', emitMapViewport);

  // 지도 클릭 이벤트 추가
  window.kakao.maps.event.addListener(map.value, 'click', function (mouseEvent) {
    // 클릭한 위도, 경도 정보를 가져옵니다
    const latlng = mouseEvent.latLng;
    emit('map-click', {
        lat: latlng.getLat(),
        lng: latlng.getLng(),
    });
  });

  // Initial emit of map viewport after map is ready
  emitMapViewport();

  // properties prop이 초기화되거나 변경될 때 마커를 그립니다.
  drawMarkers(props.properties);
};

// 마커와 오버레이 모두 지우는 함수
const clearMapObjects = () => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
  
  for (let i = 0; i < overlays.length; i++) {
    overlays[i].setMap(null);
  }
  overlays = [];
};

// 매물 데이터 기반으로 마커 또는 클러스터를 그리는 함수
const drawMarkers = (data) => {
  console.log(`KakaoMap: drawMarkers called`, data); 
  if (!map.value || !window.kakao || !window.kakao.maps) {
    return; // 지도 객체가 없으면 그릴 수 없음
  }

  clearMapObjects(); // 기존 객체 모두 제거

  const list = Array.isArray(data) ? data : [];

  if (list.length === 0) return;

  const firstItem = list[0];

  // 타입 판별
  if (firstItem.aptSeq !== undefined) {
      // 아파트 데이터 (상세 모드)
      drawApartments(list);
  } else if (firstItem.dealCount !== undefined) {
      // 클러스터 데이터 (광역 모드) - regionName, dealCount 포함
      drawClusters(list);
  } else {
      // 개별 매물 데이터 (혹시 모를 하위 호환)
      drawIndividualMarkers(list);
  }
};

const drawApartments = (list) => {
    list.forEach(item => {
        if (!item.latitude || !item.longitude) return;

        const position = new window.kakao.maps.LatLng(item.latitude, item.longitude);
        
        const content = document.createElement('div');
        content.className = 'apartment-marker';
        content.innerHTML = `
            <div class="apt-name">${item.aptName}</div>
            <div class="deal-count">${item.dealCount}건</div>
        `;
        
        content.onclick = () => {
             // 상세 조회 (2단계) - 아직 구현되지 않았지만 이벤트는 발생시킴
             console.log('Select Apartment:', item.aptSeq);
             emit('select-property', item.aptSeq);
        };

        const overlay = new window.kakao.maps.CustomOverlay({
            map: map.value,
            position: position,
            content: content,
            yAnchor: 1.2
        });
        
        overlays.push(overlay);
    });
};

const drawClusters = (list) => {
    list.forEach(item => {
        if (!item.latitude || !item.longitude) return;

        const position = new window.kakao.maps.LatLng(item.latitude, item.longitude);
        
        const content = document.createElement('div');
        content.className = 'cluster-overlay';
        content.innerText = item.dealCount; // 백엔드 필드명 dealCount 사용
        
        content.onclick = () => {
             const level = map.value.getLevel() - 1;
             map.value.setLevel(level > 0 ? level : 1, { animate: true });
             map.value.setCenter(position);
        };

        const overlay = new window.kakao.maps.CustomOverlay({
            map: map.value,
            position: position,
            content: content,
            yAnchor: 0.5
        });
        
        overlays.push(overlay);
    });
};

const drawIndividualMarkers = (list) => {
  const bounds = new window.kakao.maps.LatLngBounds();

  list.forEach((property) => {
    if (!property.latitude || !property.longitude) return;

    const lat = parseFloat(property.latitude);
    const lng = parseFloat(property.longitude);

    if (isNaN(lat) || isNaN(lng)) return;

    const position = new window.kakao.maps.LatLng(lat, lng);

    const marker = new window.kakao.maps.Marker({
      map: map.value,
      position: position,
      title: property.aptName,
    });

    markers.push(marker);
    bounds.extend(position);

    window.kakao.maps.event.addListener(marker, 'click', function() {
        const id = property.deal_id || property.no;
        console.log('KakaoMap: Marker clicked, emitting ID:', id);
        emit('select-property', id);
    });
  });
};

const emit = defineEmits(['select-property', 'update:map-viewport', 'map-click']);

const emitMapViewport = () => {
    if (!map.value) return;

    const bounds = map.value.getBounds();
    const sw = bounds.getSouthWest();
    const ne = bounds.getNorthEast();

    // Kakao Map 레벨은 작을수록 확대 (1이 가장 확대), 클수록 축소 (14가 가장 축소)
    // 백엔드에서는 zoomLevel이 10 이하일 때 클러스터 모드라고 가정
    // 따라서 Kakao Map 레벨을 백엔드 기준에 맞게 역전시켜야 함.
    // 예: Kakao 레벨 1 -> 백엔드 14 (상세)
    //     Kakao 레벨 14 -> 백엔드 1 (광역)
    const currentKakaoZoomLevel = map.value.getLevel();
    const backendCompatibleZoomLevel = 15 - currentKakaoZoomLevel; // 15는 카카오맵 최대 레벨 14 + 1. 이 값은 조정 가능.

    const viewport = {
        minLatitude: sw.getLat(),
        maxLatitude: ne.getLat(),
        minLongitude: sw.getLng(),
        maxLongitude: ne.getLng(),
        zoomLevel: backendCompatibleZoomLevel, // 역전된 줌 레벨 사용
    };
    console.log('KakaoMap: Emitting map viewport:', viewport);
    emit('update:map-viewport', viewport);
};

let userPositionMarker = null; // 사용자 위치 마커 참조

// userPosition prop 변경을 감지하여 사용자 위치 마커 업데이트
watch(() => props.userPosition, (newUserPosition) => {
  if (map.value && newUserPosition) {
    const markerPosition = new window.kakao.maps.LatLng(newUserPosition.lat, newUserPosition.lng);

    // 기존 마커가 있으면 위치만 업데이트, 없으면 새로 생성
    if (userPositionMarker) {
      userPositionMarker.setPosition(markerPosition);
    } else {
      // 파란색 점으로 표현되는 마커 이미지
      const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_point.png';
      const imageSize = new window.kakao.maps.Size(12, 12);
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

      userPositionMarker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
      });
      userPositionMarker.setMap(map.value);
      // 처음 위치를 받았을 때만 지도의 중심을 이동
      map.value.setCenter(markerPosition);
    }
  }
}, { deep: true });

// properties prop 변경을 감지하여 마커 업데이트
watch(() => props.properties, (newProperties) => {
  if (map.value) { // 지도 객체가 초기화된 후에만 마커를 그립니다.
    drawMarkers(newProperties);
  }
}); // 배열 내부의 객체 변경도 감지 (필요시) -> deep: true 제거 (성능 이슈 방지)
</script>

<style scoped>
/* 기존 map-pattern 관련 스타일 제거 또는 필요에 따라 유지 */
/* .map-pattern {
	background-color: #e5e5f7;
	opacity: 0.8;
	background-image: linear-gradient(#d1d5db 1px, transparent 1px),
		linear-gradient(to right, #d1d5db 1px, transparent 1px);
	background-size: 40px 40px;
}
.dark .map-pattern {
	background-color: #1a1a1a;
	background-image: linear-gradient(#333 1px, transparent 1px),
		linear-gradient(to right, #333 1px, transparent 1px);
} */
</style>

<style>
.cluster-overlay {
  background: rgba(41, 98, 255, 0.9);
  color: #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-weight: bold;
  font-size: 14px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  border: 2px solid #fff;
  transition: transform 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cluster-overlay:hover {
  transform: scale(1.1);
  background: rgba(41, 98, 255, 1);
  z-index: 100;
}

.apartment-marker {
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 6px 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  text-align: center;
  font-size: 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.2s;
  min-width: 80px;
}
.apartment-marker .apt-name {
  font-weight: bold;
  color: #333;
  margin-bottom: 2px;
  white-space: nowrap;
}
.apartment-marker .deal-count {
  color: #2962ff;
  font-weight: bold;
}
.apartment-marker:hover {
  z-index: 100;
  transform: scale(1.1);
  background: #f8f9fa;
  border-color: #2962ff;
}
</style>
