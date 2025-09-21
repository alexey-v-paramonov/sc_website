
document.addEventListener('DOMContentLoaded', function() {
    // --- Global variables for audio player and visualizer ---
    let player;
    let audioContext;
    let analyser;
    let source;
    let animationFrameId;
    let currentlyPlayingItem = null;

    const catalogItems = document.querySelectorAll('.catalog-thumb-wrap');

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
            analyser.fftSize = 64; // Small FFT for fewer bars
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
        
        // Stop visualization on the old item
        stopVisualization();
        
        // Set new stream URL and handle loading
        player.src = streamUrl;
        currentlyPlayingItem = item;
        
        // Wait for the audio to be ready before playing
        const playAudio = async () => {
            try {
                await player.play();
                const card = currentlyPlayingItem.closest('.catalog-card');
                if (card) {
                    card.classList.add('is-playing');
                    startVisualization(currentlyPlayingItem);
                }
            } catch (error) {
                console.error("Error playing audio:", error);
                // Reset state on error
                currentlyPlayingItem = null;
                const card = item.closest('.catalog-card');
                if (card) {
                    card.classList.remove('is-playing');
                }
            }
        };
        
        // Small delay to ensure previous audio has stopped
        setTimeout(playAudio, 100);
    }

    function startVisualization(item) {
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

            // Wave visualization
            const wavePoints = 32; // Number of points for the wave
            const step = Math.floor(bufferLength / wavePoints);
            const maxWaveHeight = cardHeight * 0.10; // 10% of card height

            // Draw top wave
            ctx.beginPath();
            ctx.strokeStyle = 'rgba(79, 131, 91, 0.8)';
            ctx.lineWidth = 2;
            
            for (let i = 0; i < wavePoints; i++) {
                const value = dataArray[i * step];
                const waveHeight = (value / 255) * maxWaveHeight;
                const x = (i / (wavePoints - 1)) * cardWidth;
                const y = waveHeight;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();

            // Draw bottom wave (mirrored)
            ctx.beginPath();
            for (let i = 0; i < wavePoints; i++) {
                const value = dataArray[i * step];
                const waveHeight = (value / 255) * maxWaveHeight;
                const x = (i / (wavePoints - 1)) * cardWidth;
                const y = cardHeight - waveHeight;
                
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
        draw();
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

    // --- Event Listeners ---
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
});
