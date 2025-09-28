class MobileWallSimulator {
    constructor() {
        this.wall = document.getElementById('wall');
        this.wallItems = document.getElementById('wallItems');
        this.wallColor = document.getElementById('wallColor');
        this.wallShape = document.getElementById('wallShape');
        this.wallTexture = document.getElementById('wallTexture');
        this.imageUpload = document.getElementById('imageUpload');
        this.addFrameBtn = document.getElementById('addFrame');
        this.clearWallBtn = document.getElementById('clearWall');
        this.brightness = document.getElementById('brightness');
        this.brightnessValue = document.getElementById('brightnessValue');
        
        this.itemCounter = 0;
        this.isDragging = false;
        this.currentTouch = null;
        this.dragOffset = { x: 0, y: 0 };
        
        this.initializeEventListeners();
        this.initializePresetColors();
        this.initializeTouchEvents();
    }
    
    initializeEventListeners() {
        // Mudança de cor
        this.wallColor.addEventListener('change', (e) => {
            this.changeWallColor(e.target.value);
        });
        
        // Mudança de formato
        this.wallShape.addEventListener('change', (e) => {
            this.changeWallShape(e.target.value);
        });
        
        // Mudança de textura
        this.wallTexture.addEventListener('change', (e) => {
            this.changeWallTexture(e.target.value);
        });
        
        // Upload de imagem
        this.imageUpload.addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });
        
        // Adicionar moldura
        this.addFrameBtn.addEventListener('click', () => {
            this.addDecorativeFrame();
        });
        
        // Limpar parede
        this.clearWallBtn.addEventListener('click', () => {
            this.clearWall();
        });
        
        // Controle de brilho
        this.brightness.addEventListener('input', (e) => {
            this.changeBrightness(e.target.value);
        });
        
        // Prevent default behaviors that interfere with touch
        document.addEventListener('touchmove', (e) => {
            if (this.isDragging) {
                e.preventDefault();
            }
        }, { passive: false });
        
        document.addEventListener('touchstart', (e) => {
            if (e.target.closest('.wall-item')) {
                e.preventDefault();
            }
        }, { passive: false });
    }
    
    initializePresetColors() {
        const colorBtns = document.querySelectorAll('.color-btn');
        colorBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const color = e.target.dataset.color;
                this.wallColor.value = color;
                this.changeWallColor(color);
            });
            
            // Touch feedback
            btn.addEventListener('touchstart', (e) => {
                e.target.style.transform = 'scale(1.2)';
            });
            
            btn.addEventListener('touchend', (e) => {
                setTimeout(() => {
                    e.target.style.transform = '';
                }, 150);
            });
        });
    }
    
    initializeTouchEvents() {
        // Touch events for dragging items
        this.wallItems.addEventListener('touchstart', (e) => {
            const wallItem = e.target.closest('.wall-item');
            if (wallItem) {
                this.startTouch(e, wallItem);
            }
        });
        
        this.wallItems.addEventListener('touchmove', (e) => {
            if (this.isDragging) {
                this.handleTouch(e);
            }
        });
        
        this.wallItems.addEventListener('touchend', (e) => {
            this.endTouch(e);
        });
        
        // Double tap to remove items
        let lastTap = 0;
        this.wallItems.addEventListener('touchend', (e) => {
            const wallItem = e.target.closest('.wall-item');
            if (wallItem && !this.isDragging) {
                const currentTime = new Date().getTime();
                const tapLength = currentTime - lastTap;
                if (tapLength < 500 && tapLength > 0) {
                    this.removeWallItem(wallItem);
                }
                lastTap = currentTime;
            }
        });
    }
    
    startTouch(e, element) {
        this.isDragging = true;
        this.currentTouch = element;
        
        const touch = e.touches[0];
        const rect = element.getBoundingClientRect();
        const wallRect = this.wall.getBoundingClientRect();
        
        this.dragOffset.x = touch.clientX - rect.left;
        this.dragOffset.y = touch.clientY - rect.top;
        
        element.classList.add('dragging');
        element.style.zIndex = '1000';
        
        // Show remove button
        element.classList.add('show-remove');
        
        e.preventDefault();
    }
    
    handleTouch(e) {
        if (!this.isDragging || !this.currentTouch) return;
        
        const touch = e.touches[0];
        const wallRect = this.wall.getBoundingClientRect();
        
        const x = touch.clientX - wallRect.left - this.dragOffset.x;
        const y = touch.clientY - wallRect.top - this.dragOffset.y;
        
        // Limitar movimento dentro da parede
        const maxX = this.wall.offsetWidth - this.currentTouch.offsetWidth;
        const maxY = this.wall.offsetHeight - this.currentTouch.offsetHeight;
        
        const clampedX = Math.max(0, Math.min(x, maxX));
        const clampedY = Math.max(0, Math.min(y, maxY));
        
        this.currentTouch.style.left = clampedX + 'px';
        this.currentTouch.style.top = clampedY + 'px';
        
        e.preventDefault();
    }
    
    endTouch(e) {
        if (this.currentTouch) {
            this.currentTouch.classList.remove('dragging');
            this.currentTouch.style.zIndex = 'auto';
            
            // Hide remove button after delay
            setTimeout(() => {
                if (this.currentTouch) {
                    this.currentTouch.classList.remove('show-remove');
                }
            }, 2000);
        }
        
        this.isDragging = false;
        this.currentTouch = null;
    }
    
    changeWallColor(color) {
        this.wall.style.backgroundColor = color;
        this.addColorTransition();
        this.hapticFeedback();
    }
    
    changeWallShape(shape) {
        this.wall.classList.remove('rounded', 'oval', 'arch');
        
        if (shape !== 'rectangular') {
            this.wall.classList.add(shape);
        }
        
        this.addShapeTransition();
        this.hapticFeedback();
    }
    
    changeWallTexture(texture) {
        this.wall.classList.remove('brick', 'wood', 'stone', 'stripes');
        
        if (texture !== 'none') {
            this.wall.classList.add(texture);
        }
        
        this.hapticFeedback();
    }
    
    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            // Check file size (limit to 5MB for mobile)
            if (file.size > 5 * 1024 * 1024) {
                alert('Imagem muito grande! Escolha uma imagem menor que 5MB.');
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                this.addImageToWall(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    }
    
    addImageToWall(imageSrc) {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = 'Imagem da parede';
        img.draggable = false;
        
        const wallItem = this.createWallItem();
        wallItem.appendChild(img);
        
        // Posicionar aleatoriamente na parede
        const maxX = Math.max(0, this.wall.offsetWidth - 120);
        const maxY = Math.max(0, this.wall.offsetHeight - 120);
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        wallItem.style.left = randomX + 'px';
        wallItem.style.top = randomY + 'px';
        
        this.wallItems.appendChild(wallItem);
        this.hapticFeedback();
        
        // Clear the file input
        this.imageUpload.value = '';
    }
    
    addDecorativeFrame() {
        const frame = document.createElement('div');
        frame.className = 'decorative-frame';
        frame.innerHTML = `
            <div style="
                width: 100px; 
                height: 80px; 
                background: linear-gradient(45deg, #8B4513, #A0522D);
                border: 6px solid #654321;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 12px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.3);
                cursor: move;
                text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
            ">
                🖼️ QUADRO
            </div>
        `;
        
        const wallItem = this.createWallItem();
        wallItem.appendChild(frame);
        
        // Posicionar aleatoriamente
        const maxX = Math.max(0, this.wall.offsetWidth - 100);
        const maxY = Math.max(0, this.wall.offsetHeight - 80);
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        wallItem.style.left = randomX + 'px';
        wallItem.style.top = randomY + 'px';
        
        this.wallItems.appendChild(wallItem);
        this.hapticFeedback();
    }
    
    createWallItem() {
        const wallItem = document.createElement('div');
        wallItem.className = 'wall-item';
        wallItem.id = `item-${this.itemCounter++}`;
        
        // Adicionar botão de remover
        const removeBtn = document.createElement('button');
        removeBtn.innerHTML = '×';
        removeBtn.className = 'remove-btn';
        
        removeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.removeWallItem(wallItem);
        });
        
        removeBtn.addEventListener('touchend', (e) => {
            e.stopPropagation();
            this.removeWallItem(wallItem);
        });
        
        wallItem.appendChild(removeBtn);
        
        return wallItem;
    }
    
    removeWallItem(item) {
        if (confirm('Remover este item da parede?')) {
            item.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
                if (item.parentNode) {
                    item.parentNode.removeChild(item);
                }
            }, 300);
            this.hapticFeedback();
        }
    }
    
    clearWall() {
        if (confirm('Tem certeza que deseja limpar toda a parede?')) {
            while (this.wallItems.firstChild) {
                this.wallItems.removeChild(this.wallItems.firstChild);
            }
            this.hapticFeedback();
        }
    }
    
    changeBrightness(value) {
        this.brightnessValue.textContent = value + '%';
        this.wall.style.filter = `brightness(${value}%)`;
    }
    
    addColorTransition() {
        this.wall.style.transition = 'background-color 0.5s ease';
        setTimeout(() => {
            this.wall.style.transition = '';
        }, 500);
    }
    
    addShapeTransition() {
        this.wall.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        setTimeout(() => {
            this.wall.style.transition = '';
        }, 800);
    }
    
    hapticFeedback() {
        // Haptic feedback for mobile devices
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
}

// Device detection and optimization
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Prevent zoom on double tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Initialize the wall simulator
    new MobileWallSimulator();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Add mobile-specific optimizations
    if (isMobile()) {
        document.body.classList.add('mobile-device');
        
        // Prevent scrolling when touching the wall
        const wall = document.getElementById('wall');
        wall.addEventListener('touchmove', (e) => {
            e.preventDefault();
        }, { passive: false });
    }
});

// Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}