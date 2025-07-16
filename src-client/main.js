import { globalState } from './state.js';
import { elements } from './domElements.js';

import { initializeWebSocket, sendWebSocketMessage, closeWebSocket } from './websocketService.js';
import { initGlobalErrorHandling, appendLog } from './loggerService.js';
import { initInputService } from './services/inputService.js';
import { stopVideoPlayback } from './services/videoPlaybackService.js';
import { closeAudio } from './services/audioPlaybackService.js';

import { initSidebarControls } from './ui/sidebarControls.js';
import { initTaskbarControls } from './ui/taskbarControls.js';
import { initAppDrawer } from './ui/appDrawer.js';
import { initHeaderControls } from './ui/headerControls.js';

document.addEventListener('DOMContentLoaded', () => {
    initGlobalErrorHandling();

    // 🔹 Extract deviceId from URL query param
    const params = new URLSearchParams(window.location.search);
    const deviceId = params.get('deviceId');

    if (deviceId) {
        globalState.selectedDeviceId = deviceId;
        appendLog(`Selected device from URL: ${deviceId}`);
    } else {
        appendLog('No device ID found in URL. Redirecting to landing page...', true);
        window.location.href = '/landing.html'; // ⬅ Redirect to landing page
        return;
    }

    initHeaderControls();
    initSidebarControls();
    initTaskbarControls();
    initAppDrawer();

    initInputService();

    initializeWebSocket();

    appendLog('Simba Client Initialized.');

    window.addEventListener('beforeunload', () => {
        if (globalState.isRunning || (globalState.ws && globalState.ws.readyState === WebSocket.OPEN)) {
            sendWebSocketMessage({ action: 'disconnect' });

            if (globalState.checkStateIntervalId) {
                clearInterval(globalState.checkStateIntervalId);
                globalState.checkStateIntervalId = null;
            }
            closeAudio();
            stopVideoPlayback();

            closeWebSocket();
            appendLog('Attempted cleanup on page unload.');
        }
    });

    if (elements.toggleLogBtn && elements.logContent) {
        elements.toggleLogBtn.addEventListener('click', () => {
            const isExpanded = elements.toggleLogBtn.getAttribute('aria-expanded') === 'true';
            elements.toggleLogBtn.setAttribute('aria-expanded', (!isExpanded).toString());
            elements.toggleLogBtn.textContent = isExpanded ? 'Show Logs' : 'Hide Logs';
            elements.logContent.classList.toggle('hidden', isExpanded);
        });
    }
});