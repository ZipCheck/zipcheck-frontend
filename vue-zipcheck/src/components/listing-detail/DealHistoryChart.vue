<template>
  <div class="bg-card-light dark:bg-card-dark p-6 rounded-2xl shadow-soft border border-gray-50 dark:border-gray-800">
    <h3 class="text-lg font-bold mb-4">{{ chartTitle }}</h3>
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps({
  deals: {
    type: Array,
    required: true,
  },
  chartType: {
    type: String,
    default: 'price', // 'price' or 'pricePerArea'
  }
});

const chartTitle = computed(() => 
  props.chartType === 'price' ? '실거래가 변동' : '면적당 가격 변동'
);

const chartData = computed(() => {
  const sortedDeals = [...props.deals].sort((a, b) => 
    new Date(a.dealYear, a.dealMonth - 1, a.dealDay) - new Date(b.dealYear, b.dealMonth - 1, b.dealDay)
  );

  const labels = sortedDeals.map(deal => `${deal.dealYear}.${String(deal.dealMonth).padStart(2, '0')}`);
  
  const data = sortedDeals.map(deal => {
    const price = parseInt(String(deal.dealAmount).replace(/,/g, ''), 10);
    if (props.chartType === 'pricePerArea') {
      // 3.3058을 곱해 평당가로 환산 (1㎡ = 0.3025평)
      return Math.round((price / deal.excluUseAr) * 3.3058);
    }
    return price;
  });

  return {
    labels,
    datasets: [
      {
        label: props.chartType === 'price' ? '거래가 (만원)' : '평당가 (만원)',
        backgroundColor: '#FFC857',
        borderColor: '#FFC857',
        data,
        tension: 0.1,
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          let label = context.dataset.label || '';
          if (label) {
            label += ': ';
          }
          if (context.parsed.y !== null) {
            label += context.parsed.y.toLocaleString() + '만원';
          }
          return label;
        }
      }
    }
  },
  scales: {
    y: {
      ticks: {
        callback: function(value) {
          return (value / 10000).toFixed(1) + '억';
        }
      }
    }
  }
};
</script>
