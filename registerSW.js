if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/record-needles/sw.js', { scope: '/record-needles/' })})}