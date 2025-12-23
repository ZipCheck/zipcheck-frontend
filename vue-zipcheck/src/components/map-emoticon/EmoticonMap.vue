<template>
	<section class="flex-grow relative h-full w-full bg-gray-200 dark:bg-gray-900">
		<div id="emoticon-map" class="w-full h-full z-0"></div>
		<div class="absolute bottom-8 right-8 z-20">
			<button
				class="w-14 h-14 bg-primary text-black rounded-full shadow-lg flex items-center justify-center border-4 border-surface-light dark:border-surface-dark hover:opacity-90 transition-opacity"
				type="button"
				@click="toggleEmoticonMap"
			>
				<span class="material-symbols-outlined text-[28px]">add_reaction</span>
			</button>
		</div>
	</section>
</template>

<script setup>
import { onMounted, shallowRef, watch } from 'vue';
import { useRouter } from 'vue-router';
import { loadKakaoMap } from '@/utils/kakao';

const props = defineProps({
	stickers: {
		type: Array,
		default: () => [],
	},
	userPosition: {
		type: Object,
		default: null,
	},
	initialZoom: {
		type: Number,
		default: 7,
	},
});

const emit = defineEmits(['update:map-viewport', 'select-apartment']);

const map = shallowRef(null);
const router = useRouter();
let overlays = [];
let clusterer = null;
let markers = [];
const MAX_EMOTIONS = 3;
const CLUSTER_THRESHOLD_LEVEL = 6;

const initMap = () => {
	const container = document.getElementById('emoticon-map');
	const initialCenter = props.userPosition
		? new window.kakao.maps.LatLng(props.userPosition.lat, props.userPosition.lng)
		: new window.kakao.maps.LatLng(37.566826, 126.9786567);

	const options = {
		center: initialCenter,
		level: props.initialZoom,
	};

	map.value = new window.kakao.maps.Map(container, options);

	const mapTypeControl = new window.kakao.maps.MapTypeControl();
	map.value.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
	const zoomControl = new window.kakao.maps.ZoomControl();
	map.value.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

	window.kakao.maps.event.addListener(map.value, 'idle', emitMapViewport);
	window.kakao.maps.event.addListener(map.value, 'zoom_changed', emitMapViewport);

	emitMapViewport();
	updateRender(props.stickers);
};

// userPosition prop이 변경되면 지도의 중심을 부드럽게 이동
watch(
	() => props.userPosition,
	newPosition => {
		if (newPosition && map.value) {
			const center = new window.kakao.maps.LatLng(
				newPosition.lat,
				newPosition.lng,
			);
			map.value.panTo(center);
		}
	},
);

onMounted(async () => {
	try {
		await loadKakaoMap();
		initMap();
	} catch (error) {
		console.error(
			'Kakao Maps SDK load failed: check network connectivity or API key.',
			error,
		);
	}
});

const clearOverlays = () => {
	overlays.forEach(overlay => overlay.setMap(null));
	overlays = [];
};

const clearClusters = () => {
	if (clusterer) {
		clusterer.clear();
	}
	markers = [];
};

const getEmotionCount = emotion => {
	const value =
		emotion?.count ?? emotion?.total ?? emotion?.value ?? emotion?.amount ?? 0;
	return typeof value === 'number' ? value : Number(value) || 0;
};

const getEmotionEmoji = emotion => {
	return (
		emotion?.emoji ||
		emotion?.emoticon ||
		emotion?.icon ||
		emotion?.stickerEmoji ||
		''
	);
};

const normalizeEmotions = emotions => {
	if (!Array.isArray(emotions)) return [];
	return emotions
		.map(emotion => {
			return {
				emoji: getEmotionEmoji(emotion),
				count: getEmotionCount(emotion),
			};
		})
		.filter(emotion => Boolean(emotion.emoji))
		.sort((a, b) => b.count - a.count);
};

const drawEmotionOverlays = list => {
	if (!map.value || !window.kakao || !window.kakao.maps) return;
	clearOverlays();

	const items = Array.isArray(list) ? list : [];
	items.forEach(item => {
		if (item?.latitude == null || item?.longitude == null) return;

		const emotions = normalizeEmotions(item.emotions);
		if (emotions.length === 0) return;
		const visibleEmotions = emotions.slice(0, MAX_EMOTIONS);
		const remainingCount = emotions.length - visibleEmotions.length;
		const lat = Number(item.latitude);
		const lng = Number(item.longitude);
		if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
		const position = new window.kakao.maps.LatLng(lat, lng);

		const content = document.createElement('button');
		content.type = 'button';
		content.className = 'emotion-marker emotion-marker--stack';
		const pillsMarkup = visibleEmotions
			.map(emotion => {
				const countMarkup = emotion.count
					? `<span class="emotion-marker__count">${emotion.count}</span>`
					: '';
				return `
					<span class="emotion-marker__pill">
						<span class="emotion-marker__emoji">${emotion.emoji}</span>
						${countMarkup}
					</span>
				`;
			})
			.join('');

		const moreMarkup =
			remainingCount > 0
				? `
					<span class="emotion-marker__pill emotion-marker__pill--more">
						<span class="emotion-marker__more">+${remainingCount}</span>
					</span>
				`
				: '';

		content.innerHTML = pillsMarkup + moreMarkup;

		content.onclick = () => {
			const aptId = item.aptId ?? item.aptSeq;
			if (aptId) {
				emit('select-apartment', aptId);
			}
		};

		const overlay = new window.kakao.maps.CustomOverlay({
			map: map.value,
			position,
			content,
			yAnchor: 1.1,
		});

		overlays.push(overlay);
	});
};

const drawClusters = list => {
	if (!map.value || !window.kakao || !window.kakao.maps) return;
	clearClusters();

	const items = Array.isArray(list) ? list : [];
	items.forEach(item => {
		if (item?.latitude == null || item?.longitude == null) return;
		const lat = Number(item.latitude);
		const lng = Number(item.longitude);
		if (!Number.isFinite(lat) || !Number.isFinite(lng)) return;
		const marker = new window.kakao.maps.Marker({
			position: new window.kakao.maps.LatLng(lat, lng),
		});
		markers.push(marker);
	});

	if (!clusterer) {
		clusterer = new window.kakao.maps.MarkerClusterer({
			map: map.value,
			averageCenter: true,
			minLevel: CLUSTER_THRESHOLD_LEVEL,
		});
	}

	clusterer.addMarkers(markers);
};

const updateRender = list => {
	if (!map.value) return;
	const zoomLevel = map.value.getLevel();
	if (zoomLevel >= CLUSTER_THRESHOLD_LEVEL) {
		clearOverlays();
		drawClusters(list);
		return;
	}

	clearClusters();
	drawEmotionOverlays(list);
};

const emitMapViewport = () => {
	if (!map.value) return;

	const bounds = map.value.getBounds();
	const sw = bounds.getSouthWest();
	const ne = bounds.getNorthEast();

	const currentKakaoZoomLevel = map.value.getLevel();
	const backendCompatibleZoomLevel = 15 - currentKakaoZoomLevel;

	emit('update:map-viewport', {
		minLatitude: sw.getLat(),
		maxLatitude: ne.getLat(),
		minLongitude: sw.getLng(),
		maxLongitude: ne.getLng(),
		zoomLevel: backendCompatibleZoomLevel,
	});

	updateRender(props.stickers);
};

watch(
	() => props.stickers,
	newList => {
		updateRender(newList);
	},
);

const toggleEmoticonMap = () => {
	router.push('/map');
};
</script>

<style>
.emotion-marker {
	display: inline-flex;
	align-items: center;
	gap: 6px;
	padding: 6px 10px;
	border-radius: 9999px;
	background: rgba(255, 255, 255, 0.95);
	border: 1px solid rgba(15, 23, 42, 0.12);
	box-shadow: 0 6px 16px rgba(15, 23, 42, 0.15);
	font-weight: 700;
	line-height: 1;
	cursor: pointer;
	white-space: nowrap;
	transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.emotion-marker--stack {
	gap: 4px;
	padding: 6px 8px;
}

.emotion-marker__pill {
	display: inline-flex;
	align-items: center;
	gap: 4px;
	padding: 4px 8px;
	border-radius: 9999px;
	background: rgba(248, 250, 252, 0.9);
	border: 1px solid rgba(148, 163, 184, 0.3);
}

.emotion-marker__pill--more {
	background: rgba(226, 232, 240, 0.95);
}

.emotion-marker__more {
	font-size: 12px;
	font-weight: 700;
	color: #334155;
}

.emotion-marker:hover {
	transform: translateY(-2px);
	box-shadow: 0 10px 20px rgba(15, 23, 42, 0.18);
}

.emotion-marker__emoji {
	font-size: 18px;
}

.emotion-marker__count {
	font-size: 12px;
	color: #475569;
}
</style>
