const socket = new WebSocket('ws://localhost:5000');

// WebSocket olaylarını yönetin
socket.onopen = () => {
    console.log('WebSocket connection established');
};

socket.onmessage = (event) => {
    console.log('Message from server:', event.data);
};

socket.onclose = () => {
    console.log('WebSocket connection closed');
};

export default socket;
