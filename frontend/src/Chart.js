import {
    Chart as ChartJS,
    CategoryScale, // X ekseni için
    LinearScale,   // Y ekseni için
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Gerekli bileşenleri kaydet
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export default ChartJS;
