
// --- Global variables for audio player and visualizer ---
let player;
let audioContext;
let analyser;
let source;
let animationFrameId;
let currentlyPlayingItem = null;

// --- Audio Player and Visualizer Setup ---
function setupAudio(streamUrl, item) {
        if (!player) {
            player = document.createElement('audio');
            player.id = 'sc-catalog-audio-player';
            player.controls = true;
            player.crossOrigin = "anonymous"; // Required for audio analysis
            player.style.position = 'fixed';
            player.style.bottom = '20px';
            player.style.left = '20px';
            player.style.width = 'calc(100% - 40px)';
            player.style.zIndex = '9999';
            player.style.display = 'none'; // Hide the HTML5 player
            document.body.appendChild(player);

            player.addEventListener('play', () => {
                if (currentlyPlayingItem) {
                    startVisualization(currentlyPlayingItem);
                }
            });

            player.addEventListener('pause', stopVisualization);
            player.addEventListener('ended', stopVisualization);
        }

        // Create AudioContext after a user gesture (click)
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            analyser.fftSize = 256; // Increased FFT size for more frequency bins (128 bins)
            source = audioContext.createMediaElementSource(player);
            source.connect(analyser);
            analyser.connect(audioContext.destination);
        }

        // If it's the same stream, toggle play/pause
        if (player.src === streamUrl && !player.paused) {
            player.pause();
            return;
        }
        
        // Stop current playback before loading new stream
        if (!player.paused) {
            player.pause();
        }
        
        // Stop all other playing cards
        stopAllPlayingCards();
        
        // Set new stream URL and handle loading
        player.src = streamUrl;
        currentlyPlayingItem = item;
        
        // Add buffering state immediately
        const card = item.closest('.catalog-card');
        if (card) {
            card.classList.add('is-buffering');
        }
        
        // Wait for the audio to be ready before playing
        const playAudio = async () => {
            try {
                await player.play();
                const card = currentlyPlayingItem.closest('.catalog-card');
                if (card) {
                    card.classList.remove('is-buffering'); // Remove buffering state
                    card.classList.add('is-playing');
                    
                    // Ensure all other cards are completely cleaned up
                    document.querySelectorAll('.catalog-card.is-playing').forEach(otherCard => {
                        if (otherCard !== card) {
                            otherCard.classList.remove('is-playing');
                            const otherCanvas = otherCard.querySelector('.visualizer-canvas');
                            if (otherCanvas) {
                                const otherCtx = otherCanvas.getContext('2d');
                                otherCanvas.width = otherCanvas.width; // Complete reset
                                otherCtx.clearRect(0, 0, otherCanvas.width, otherCanvas.height);
                            }
                        }
                    });
                    
                    startVisualization(currentlyPlayingItem);
                    startTitleBlinking(card);
                }
            } catch (error) {
                console.error("Error playing audio:", error);
                // Reset state on error
                currentlyPlayingItem = null;
                const card = item.closest('.catalog-card');
                if (card) {
                    card.classList.remove('is-buffering');
                    card.classList.remove('is-playing');
                }
            }
        };
        
        // Small delay to ensure previous audio has stopped
        setTimeout(playAudio, 100);
    }

    function startVisualization(item) {
        // First, stop any existing visualization
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        
        const card = item.closest('.catalog-card');
        if (!card) return;

        let canvas = card.querySelector('.visualizer-canvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.classList.add('visualizer-canvas');
            card.querySelector('.catalog-card__inner').prepend(canvas);
        }

        const ctx = canvas.getContext('2d');
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        
        // Variables for smooth shaking
        let smoothShakeX = 0;
        let smoothShakeY = 0;
        const shakeSmoothing = 0.15; // Lower values = smoother

        function draw() {
            animationFrameId = requestAnimationFrame(draw);
            analyser.getByteFrequencyData(dataArray);

            const cardWidth = card.clientWidth;
            const cardHeight = card.clientHeight;
            canvas.width = cardWidth;
            canvas.height = cardHeight;

            ctx.clearRect(0, 0, cardWidth, cardHeight);

            // Calculate average intensity for shake effect
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
                sum += dataArray[i];
            }
            const avgIntensity = sum / bufferLength;
            const normalizedIntensity = avgIntensity / 255;

            // Apply smooth shake effect to thumbnail image
            const thumbnail = card.querySelector('.catalog-thumb');
            if (thumbnail) {
                const shakeIntensity = normalizedIntensity * 12;
                const targetShakeX = (Math.random() - 0.5) * shakeIntensity;
                const targetShakeY = (Math.random() - 0.5) * shakeIntensity;
                
                // Smooth interpolation for shake
                smoothShakeX += (targetShakeX - smoothShakeX) * shakeSmoothing;
                smoothShakeY += (targetShakeY - smoothShakeY) * shakeSmoothing;
                
                thumbnail.style.transition = 'none';
                thumbnail.style.transform = `scale(1.08) translate(${smoothShakeX}px, ${smoothShakeY}px)`;
            }

            // Spectrum analyzer bars around the perimeter
            const barsPerSide = 32; // Number of bars per side (doubled from 16)
            const totalBars = barsPerSide * 4; // 128 bars total around perimeter
            const step = Math.floor(bufferLength / totalBars);
            const maxBarLength = 20; // Maximum bar length in pixels
            
            // Winamp classic equalizer colors function
            function createWinampGradient(ctx, x1, y1, x2, y2, value) {
                const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
                const intensity = value / 255;
                
                if (intensity < 0.25) {
                    // Low intensity: pastel mint to pastel green
                    gradient.addColorStop(0, 'rgba(144, 238, 144, 0.7)'); // Light green
                    gradient.addColorStop(1, 'rgba(152, 251, 152, 0.8)'); // Pale green
                } else if (intensity < 0.5) {
                    // Medium-low: pastel green to pastel yellow
                    gradient.addColorStop(0, 'rgba(152, 251, 152, 0.7)'); // Pale green
                    gradient.addColorStop(1, 'rgba(255, 255, 153, 0.8)'); // Light yellow
                } else if (intensity < 0.75) {
                    // Medium-high: pastel yellow to pastel orange
                    gradient.addColorStop(0, 'rgba(255, 255, 153, 0.7)'); // Light yellow
                    gradient.addColorStop(1, 'rgba(255, 218, 185, 0.8)'); // Peach
                } else {
                    // High intensity: pastel orange to pastel red
                    gradient.addColorStop(0, 'rgba(255, 218, 185, 0.7)'); // Peach
                    gradient.addColorStop(1, 'rgba(255, 182, 193, 0.8)'); // Light pink
                }
                return gradient;
            }
            
            // Top side bars (extending downward into the card)
            const topBarWidth = cardWidth / barsPerSide;
            for (let i = 0; i < barsPerSide; i++) {
                const value = dataArray[i * step];
                const barLength = (value / 255) * maxBarLength;
                const x = i * topBarWidth;
                const y = 0;
                
                // Create Winamp-style gradient for each bar
                const gradient = createWinampGradient(ctx, x, y, x, y + barLength, value);
                ctx.fillStyle = gradient;
                
                ctx.fillRect(x, y, topBarWidth - 1, barLength);
            }
            
            // Right side bars (extending leftward into the card)
            const rightBarHeight = cardHeight / barsPerSide;
            for (let i = 0; i < barsPerSide; i++) {
                const value = dataArray[(barsPerSide + i) * step];
                const barLength = (value / 255) * maxBarLength;
                const x = cardWidth - barLength;
                const y = i * rightBarHeight;
                
                // Create Winamp-style gradient for each bar (horizontal)
                const gradient = createWinampGradient(ctx, cardWidth, y, cardWidth - barLength, y, value);
                ctx.fillStyle = gradient;
                
                ctx.fillRect(x, y, barLength, rightBarHeight - 1);
            }
            
            // Bottom side bars (extending upward into the card)
            const bottomBarWidth = cardWidth / barsPerSide;
            for (let i = 0; i < barsPerSide; i++) {
                const value = dataArray[(barsPerSide * 2 + i) * step];
                const barLength = (value / 255) * maxBarLength;
                const x = i * bottomBarWidth;
                const y = cardHeight - barLength;
                
                // Create Winamp-style gradient for each bar (bottom to top)
                const gradient = createWinampGradient(ctx, x, cardHeight, x, cardHeight - barLength, value);
                ctx.fillStyle = gradient;
                
                ctx.fillRect(x, y, bottomBarWidth - 1, barLength);
            }
            
            // Left side bars (extending rightward into the card)
            const leftBarHeight = cardHeight / barsPerSide;
            for (let i = 0; i < barsPerSide; i++) {
                const value = dataArray[(barsPerSide * 3 + i) * step];
                const barLength = (value / 255) * maxBarLength;
                const x = 0;
                const y = i * leftBarHeight;
                
                // Create Winamp-style gradient for each bar (horizontal)
                const gradient = createWinampGradient(ctx, x, y, x + barLength, y, value);
                ctx.fillStyle = gradient;
                
                ctx.fillRect(x, y, barLength, leftBarHeight - 1);
            }
        }
        draw();
    }

    // --- Title Character Blinking Functions ---
    let titleBlinkingInterval = null;

    function startTitleBlinking(card) {
        const titleLink = card.querySelector('.catalog-card-title a');
        if (!titleLink) return;

        // Split text into individual characters and wrap them in spans
        const originalText = titleLink.textContent;
        titleLink.innerHTML = originalText.split('').map(char => 
            char === ' ' ? ' ' : `<span class="char">${char}</span>`
        ).join('');

        const chars = titleLink.querySelectorAll('.char');
        const colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
            '#dda0dd', '#98d8c8', '#fdcb6e', '#6c5ce7', '#a29bfe',
            '#fd79a8', '#e17055', '#00b894', '#0984e3', '#b2bec3'
        ];

        // Start random blinking
        titleBlinkingInterval = setInterval(() => {
            chars.forEach(char => {
                if (Math.random() < 0.3) { // 30% chance to blink each character
                    const randomColor = colors[Math.floor(Math.random() * colors.length)];
                    char.style.color = randomColor;
                    
                    // Reset color after a short time
                    setTimeout(() => {
                        char.style.color = '#274c77';
                    }, 200 + Math.random() * 300); // Random duration between 200-500ms
                }
            });
        }, 150); // Check every 150ms
    }

    function stopTitleBlinking(card) {
        if (titleBlinkingInterval) {
            clearInterval(titleBlinkingInterval);
            titleBlinkingInterval = null;
        }

        const titleLink = card.querySelector('.catalog-card-title a');
        if (titleLink) {
            // Restore original text without spans
            const originalText = titleLink.textContent;
            titleLink.innerHTML = originalText;
            titleLink.style.color = '#000'; // Reset to original color
        }
    }

    function stopAllPlayingCards() {
        // Stop any running visualization first
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
        
        // Find all cards that are currently playing and stop them
        const playingCards = document.querySelectorAll('.catalog-card.is-playing');
        playingCards.forEach(card => {
            card.classList.remove('is-playing');
            stopTitleBlinking(card);
            
            // Clear canvas completely
            const canvas = card.querySelector('.visualizer-canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                canvas.width = canvas.width; // This completely clears the canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            
            // Reset thumbnail transform
            const thumbnail = card.querySelector('.catalog-thumb');
            if (thumbnail) {
                thumbnail.style.transition = 'transform 0.3s ease';
                thumbnail.style.transform = 'scale(1.08)';
            }
        });
        
        // Also remove buffering state from all cards
        const bufferingCards = document.querySelectorAll('.catalog-card.is-buffering');
        bufferingCards.forEach(card => {
            card.classList.remove('is-buffering');
        });
        
        // Clear all canvases to ensure no leftover visualization
        const allCanvases = document.querySelectorAll('.visualizer-canvas');
        allCanvases.forEach(canvas => {
            const ctx = canvas.getContext('2d');
            canvas.width = canvas.width; // Reset canvas completely
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
        
        // Reset currentlyPlayingItem
        currentlyPlayingItem = null;
}

function stopVisualization() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    if (currentlyPlayingItem) {
        const card = currentlyPlayingItem.closest('.catalog-card');
        if (card) {
            card.classList.remove('is-playing');
            card.classList.remove('is-buffering'); // Also remove buffering state
            stopTitleBlinking(card);
            const canvas = card.querySelector('.visualizer-canvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            // Reset thumbnail transform and restore transition
            const thumbnail = card.querySelector('.catalog-thumb');
            if (thumbnail) {
                thumbnail.style.transition = 'transform 0.3s ease';
                thumbnail.style.transform = 'scale(1.08)';
            }
        }
    }
}

// --- Event Listeners Initialization ---
function initCatalogListeners() {
    const catalogItems = document.querySelectorAll('.catalog-thumb-wrap');
    
    catalogItems.forEach(item => {
        const streamUrl = item.dataset.streamUrl;

        if (streamUrl) {
            item.classList.add('has-stream');
            item.addEventListener('click', function(event) {
                const playButtonRadius = 25;
                const rect = item.getBoundingClientRect();
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const clickX = event.offsetX;
                const clickY = event.offsetY;

                const isPlayButtonClick = Math.sqrt(Math.pow(clickX - centerX, 2) + Math.pow(clickY - centerY, 2)) <= playButtonRadius;

                if (isPlayButtonClick) {
                    event.preventDefault();
                    setupAudio(streamUrl, item);
                }
            });
        }
    });
}

// Export initialization function for SPA re-initialization
window.initializeCatalogAudio = function() {
    initCatalogListeners();
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initCatalogListeners);
