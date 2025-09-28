# 📱 Wall Simulator - App Android

## 🎯 Sobre o App
O Wall Simulator é um aplicativo móvel que permite simular uma parede de casa onde você pode:
- 🎨 Alterar cores da parede (seletor personalizado + cores predefinidas)
- 📐 Mudar formato da parede (retangular, arredondado, oval, arco)
- 🧱 Aplicar texturas (lisa, tijolo, madeira, pedra, listras)
- 🖼️ Adicionar imagens pessoais na parede
- ➕ Inserir molduras decorativas
- 💡 Controlar iluminação/brilho
- 📱 Interface otimizada para touch

## 📂 Arquivos do Projeto

### Estrutura Principal:
```
WallSimulatorApp/
├── www/                    # Arquivos do app web
│   ├── index.html         # Página principal
│   ├── styles.css         # Estilos responsivos
│   ├── script.js          # Lógica mobile-otimizada
│   ├── sw.js             # Service Worker (offline)
│   └── manifest.json     # PWA Manifest
├── config.xml            # Configuração Cordova
├── package.json          # Dependências Node.js
└── platforms/android/    # Projeto Android gerado
```

### Recursos Implementados:
- ✅ **Touch & Drag**: Sistema completo para arrastar elementos
- ✅ **Gestos Mobile**: Toque duplo para remover, toque longo para selecionar  
- ✅ **Interface Responsiva**: Adaptado para diferentes tamanhos de tela
- ✅ **Feedback Haptico**: Vibração em interações (se suportado)
- ✅ **PWA Ready**: Pode ser instalado como Progressive Web App
- ✅ **Offline Support**: Service Worker para funcionar offline

## 🚀 Como Gerar o APK

### Opção 1: Usando Android Studio (Recomendado)
1. Instale o Android Studio
2. Configure o Android SDK
3. Execute: `cordova build android --release`

### Opção 2: Online APK Builders
Você pode usar serviços online para converter o PWA em APK:

1. **PWABuilder** (Microsoft):
   - Acesse: https://www.pwabuilder.com/
   - Upload o projeto www/ ou URL do app
   - Gere APK automaticamente

2. **ApkOnline**:
   - Acesse: https://www.apkonline.net/
   - Upload os arquivos HTML/CSS/JS
   - Configure como PhoneGap app

3. **Monaca**:
   - Crie conta em https://monaca.io/
   - Import projeto Cordova
   - Build na nuvem

### Opção 3: Instalação Como PWA
1. Abra o app em Chrome Android
2. Menu → "Instalar app" ou "Adicionar à tela inicial"
3. O app funcionará como nativo

## 📱 Instruções de Uso Mobile

### Controles:
- **Cores**: Toque nas cores predefinidas ou use o seletor
- **Formato**: Dropdown para alterar forma da parede
- **Textura**: Selecione entre as opções disponíveis
- **Imagens**: Botão "Escolher arquivo" para upload
- **Brilho**: Deslize o controle para ajustar

### Interações:
- **Arrastar**: Toque e arraste para mover elementos
- **Remover**: Toque duplo no elemento OU toque no botão ×
- **Redimensionar**: Elementos se adaptam automaticamente
- **Vibração**: Feedback haptico em cada ação (se disponível)

## 🔧 Configurações Técnicas

### Permissões Android:
- `READ_EXTERNAL_STORAGE`: Para acessar imagens
- `WRITE_EXTERNAL_STORAGE`: Para salvar configurações
- `CAMERA`: Para capturar fotos (futuro)
- `VIBRATE`: Para feedback haptico

### Plugins Cordova Incluidos:
- `cordova-plugin-file`: Acesso a arquivos
- `cordova-plugin-camera`: Funcionalidades de câmera  
- `cordova-plugin-vibration`: Feedback haptico
- `cordova-plugin-statusbar`: Customização status bar

### Configurações de Performance:
- Viewport otimizado para mobile
- Prevenção de zoom indesejado
- Touch events otimizados
- Animações suaves com CSS3
- Carregamento offline com Service Worker

## 🎨 Personalização

### Adicionar Novas Cores:
Edite `script.js` na função `initializePresetColors()`

### Novas Texturas:
Adicione classes CSS em `styles.css` na seção "Texturas"

### Novos Formatos:
Implemente em `changeWallShape()` no script.js

## 📊 Compatibilidade

### Dispositivos Suportados:
- **Android**: 7.0+ (API 24+)
- **RAM**: Mínimo 2GB recomendado
- **Armazenamento**: 50MB livres
- **Internet**: Não obrigatória após instalação

### Navegadores Suportados:
- Chrome 80+
- Firefox 75+
- Samsung Internet 12+
- WebView Android 80+

## 🚨 Solução de Problemas

### App não carrega:
1. Verificar conexão com internet na primeira execução
2. Limpar cache do navegador/WebView
3. Reinstalar o app

### Imagens não aparecem:
1. Verificar se o formato é suportado (JPG, PNG, GIF)
2. Confirmar tamanho do arquivo (máx 5MB)
3. Verificar permissões de armazenamento

### Touch não funciona:
1. Atualizar navegador/WebView
2. Verificar se há outros apps interferindo
3. Reiniciar dispositivo

## 📄 Licença
Este projeto é opensource e pode ser modificado livremente.

## 👨‍💻 Desenvolvimento
Criado com Apache Cordova + HTML5 + CSS3 + JavaScript ES6