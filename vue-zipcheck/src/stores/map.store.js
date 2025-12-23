import { defineStore } from 'pinia';

export const useMapStore = defineStore('map', {
	state: () => ({
		// 서울 중심 좌표 기본값
		latitude: 37.5665,
		longitude: 126.978,
		zoom: 7,
		// 사용자가 뷰포트를 설정했는지 여부를 추적하는 플래그
		hasBeenSet: false,
	}),
	actions: {
		setViewport(payload) {
			if (payload.lat && payload.lng && payload.zoom) {
				this.latitude = payload.lat;
				this.longitude = payload.lng;
				this.zoom = payload.zoom;
				this.hasBeenSet = true;
			}
		},
	},
});
