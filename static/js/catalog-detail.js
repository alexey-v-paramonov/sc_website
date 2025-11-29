/**
 * Catalog Detail Page Functionality
 * Handles audio player, voting, and stream selection
 */

function initializeCatalogDetail() {
  // Check if we're on a detail page
  const testAudioEl = document.getElementById('stream-audio');
  const testPlayerBtn = document.querySelector('.player-btn');
  const testVotingBar = document.getElementById('radio-voting-bar');
  
  if (!testAudioEl && !testVotingBar) {
    // Not on a detail page, skip initialization
    return;
  }
  
  // Audio Player Logic
  const playPauseButtons = document.querySelectorAll('.play-pause-btn');
  const audioElements = document.querySelectorAll('.stream-audio');
  const volumeSlider = document.getElementById('volume-slider');

  // Volume slider (vanilla)
  const sliders = Array.from(document.querySelectorAll('.volume-slider'));
  let isDown = false;
  let activeSlider = null;
  let activeFill = null;
  let savedVolume = 0.7; // track volume before mute
  let isMuted = false;

  function setVolumeFor(slider, fill, e) {
    if (!slider || !fill) return;
    const rect = slider.getBoundingClientRect();
    const offset = e.pageX - (rect.left + window.pageXOffset);
    const width = rect.width || 1;
    let percent = (offset / width) * 100;
    percent = Math.max(0, Math.min(100, percent));
    fill.style.width = percent + '%';
    // apply volume to the audio player if present
    try {
      const audioEl = document.getElementById('stream-audio');
      if (audioEl) audioEl.volume = percent / 100;
    } catch (e) {
      // ignore in environments without DOM or audio
    }
  }

  sliders.forEach(slider => {
    const fill = slider.querySelector('.volume-fill');

    slider.addEventListener('mousedown', function (e) {
      isDown = true;
      activeSlider = slider;
      activeFill = fill;
      setVolumeFor(activeSlider, activeFill, e);
      // prevent text selection while dragging
      e.preventDefault();
    });

    slider.addEventListener('click', function (e) {
      setVolumeFor(slider, fill, e);
    });
  });

  // Use event handlers that won't duplicate
  const handleMouseUp = function () {
    isDown = false;
    activeSlider = null;
    activeFill = null;
  };

  const handleMouseMove = function (e) {
    if (isDown && activeSlider && activeFill) {
      setVolumeFor(activeSlider, activeFill, e);
    }
  };

  // Remove old listeners if they exist
  if (window._catalogDetailMouseUp) {
    document.removeEventListener('mouseup', window._catalogDetailMouseUp);
  }
  if (window._catalogDetailMouseMove) {
    document.removeEventListener('mousemove', window._catalogDetailMouseMove);
  }

  // Add new listeners and store references
  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('mousemove', handleMouseMove);
  window._catalogDetailMouseUp = handleMouseUp;
  window._catalogDetailMouseMove = handleMouseMove;

  // Volume icon mute/unmute toggle
  const volumeIcon = document.querySelector('.volume-icon');
  
  if (volumeIcon) {
    volumeIcon.addEventListener('click', function (e) {
      e.stopPropagation(); // prevent event bubbling
      const audioEl = document.getElementById('stream-audio');
      if (!audioEl) return;
      
      if (isMuted) {
        // unmute: restore saved volume
        audioEl.volume = savedVolume;
        isMuted = false;
        volumeIcon.classList.remove('active');
        // restore visual slider
        const fill = document.querySelector('.volume-fill');
        if (fill) fill.style.width = (savedVolume * 100) + '%';
      } else {
        // mute: save current volume and set to 0
        savedVolume = audioEl.volume;
        audioEl.volume = 0;
        isMuted = true;
        volumeIcon.classList.add('active');
        // update visual slider
        const fill = document.querySelector('.volume-fill');
        if (fill) fill.style.width = '0%';
      }
    });
  }

  // Update links when stream select changes
  const streamSelect = document.getElementById('stream-select');
  const linkM3U = document.getElementById('link-m3u');
  const linkPLS = document.getElementById('link-pls');
  const linkWeb = document.getElementById('link-web');

  console.log('Stream select found:', !!streamSelect);

  function updateStreamLinks() {
    if (!streamSelect) return;
    const selectedOption = streamSelect.options[streamSelect.selectedIndex];
    const streamId = selectedOption ? selectedOption.getAttribute('data-id') : null;
    const streamUrl = selectedOption ? selectedOption.value : null;

    if (streamId) {
      if (linkM3U) linkM3U.href = '/listen/stream_' + streamId + '.m3u';
      if (linkPLS) linkPLS.href = '/listen/stream_' + streamId + '.pls';
    }
    if (streamUrl && linkWeb) {
      linkWeb.href = streamUrl;
    }
  }

  if (streamSelect) {
    // Initialize NiceSelect2 if available
    if (typeof NiceSelect !== 'undefined') {
      try {
        // Destroy existing instance if any
        if (streamSelect.niceSelect) {
          streamSelect.niceSelect.destroy();
        }
        NiceSelect.bind(streamSelect);
      } catch (e) {
        console.log('NiceSelect initialization skipped:', e);
      }
    }
    
    streamSelect.addEventListener('change', updateStreamLinks);
    // ensure links are in sync on load
    updateStreamLinks();
  }

  // Player controls (vanilla JS) — works only if <audio id="stream-audio"> exists
  const playerBtn = document.querySelector('.player-btn');
  const audioEl = document.getElementById('stream-audio');
  const playerTimeEl = document.querySelector('.player-time');
  let playerTimer = null;
  let elapsedSeconds = 0;

  console.log('Player button:', !!playerBtn);
  console.log('Audio element:', !!audioEl);

  function formatTime(sec) {
    const m = Math.floor(sec / 60).toString().padStart(2, '0');
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return m + ':' + s;
  }

  if (audioEl && playerBtn) {
    console.log('Initializing audio player...');
    // set initial volume from UI fill if present
    const initialFill = document.querySelector('.volume-fill');
    if (initialFill) {
      const pct = parseFloat(initialFill.style.width) || 70;
      audioEl.volume = pct / 100;
    }

    // toggle play/pause
    playerBtn.addEventListener('click', function () {
      console.log('Player button clicked, paused:', audioEl.paused);
      if (audioEl.paused) {
        // start loading / playing
        playerBtn.classList.add('loading');
        audioEl.play().catch(err => {
          console.error('Playback failed:', err);
          playerBtn.classList.remove('loading');
        });
      } else {
        // stop playback
        audioEl.pause();
      }
    });

    // when playback actually starts
    audioEl.addEventListener('playing', function () {
      playerBtn.classList.remove('loading');
      playerBtn.classList.add('playing');
      playerBtn.classList.add('active');
      // start timer
      if (playerTimer) clearInterval(playerTimer);
      playerTimer = setInterval(function () {
        elapsedSeconds += 1;
        if (playerTimeEl) playerTimeEl.textContent = formatTime(elapsedSeconds);
      }, 1000);
    });

    // loading state
    audioEl.addEventListener('waiting', function () {
      playerBtn.classList.add('loading');
    });

    // pause/stop
    audioEl.addEventListener('pause', function () {
      playerBtn.classList.remove('playing');
      playerBtn.classList.remove('loading');
      playerBtn.classList.remove('active');
      if (playerTimer) { clearInterval(playerTimer); playerTimer = null; }
      elapsedSeconds = 0;
      if (playerTimeEl) playerTimeEl.textContent = '00:00';
    });

    // switch stream when select changes
    if (streamSelect) {
      streamSelect.addEventListener('change', function () {
        const newUrl = streamSelect.value;
        audioEl.src = newUrl;
        audioEl.load();
        // always start playing when a new stream is selected
        playerBtn.classList.add('loading');
        audioEl.play().catch(err => console.error('Playback failed after stream switch:', err));
      });
    }
  }

  // Voting Bar
  const votingBar = document.getElementById('radio-voting-bar');
  if (votingBar) {
    const votingItems = document.querySelectorAll('.voting-item');
    let hasVoted = false;
    const serverUrl = votingBar.getAttribute('data-server-url');
    const radioId = parseInt(votingBar.getAttribute('data-radio-id'));
    
    // Get translated messages
    const messages = {
      success: votingBar.getAttribute('data-msg-success'),
      alreadyVoted: votingBar.getAttribute('data-msg-already-voted'),
      forbidden: votingBar.getAttribute('data-msg-forbidden'),
      error: votingBar.getAttribute('data-msg-error'),
      networkError: votingBar.getAttribute('data-msg-network-error')
    };

    function showAlert(message, type) {
      const alert = document.getElementById('vote-alert');
      alert.textContent = message;
      alert.className = `index vote-alert ${type}`;
      alert.style.display = 'block';

      setTimeout(() => {
        alert.style.display = 'none';
      }, 5000);
    }

    function disableVoting() {
      hasVoted = true;
      votingItems.forEach(item => {
        item.classList.add('disabled');
      });
    }

    async function submitVote(radioId, score, serverUrl) {
      if(hasVoted){
        showAlert(messages.alreadyVoted, 'success');
        return;
      };
      try {
        const response = await fetch(`${serverUrl}api/v1/catalog/vote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            radio_id: radioId,
            score: score
          })
        });

        if (response.ok) {
          showAlert(messages.success, 'success');
          disableVoting();
        } else if (response.status === 403) {
          showAlert(messages.forbidden, 'error');
          disableVoting();
        } else {
          showAlert(messages.error, 'error');
        }
      } catch (error) {
        showAlert(messages.networkError, 'error');
      }
    }

    votingItems.forEach(item => {
      const score = parseInt(item.getAttribute('data-score'), 10);

      // Click event for voting
      item.addEventListener('click', () => {
        submitVote(radioId, score, serverUrl);
      }, { once: true });
    });
  }
}

// Initialize on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeCatalogDetail);
} else {
  initializeCatalogDetail();
}

// Export for use by SPA
window.initializeCatalogDetail = initializeCatalogDetail;
