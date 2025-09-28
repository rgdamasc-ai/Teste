#!/bin/bash

echo "🏗️  Wall Simulator - Build Script"
echo "=================================="

# Verificar se Cordova está instalado
if ! command -v cordova &> /dev/null; then
    echo "❌ Cordova não encontrado. Instale com: npm install -g cordova"
    exit 1
fi

echo "✅ Cordova encontrado"

# Preparar projeto
echo "📦 Preparando projeto..."
cordova prepare android

# Tentar build se Android SDK estiver disponível
if [ -n "$ANDROID_HOME" ]; then
    echo "🔨 Android SDK encontrado. Compilando APK..."
    cordova build android --debug
    
    if [ $? -eq 0 ]; then
        echo "✅ APK gerado com sucesso!"
        echo "📍 Localização: platforms/android/app/build/outputs/apk/debug/"
        ls -la platforms/android/app/build/outputs/apk/debug/*.apk
    else
        echo "❌ Erro na compilação do APK"
    fi
else
    echo "⚠️  Android SDK não configurado"
    echo "💡 Para gerar APK:"
    echo "   1. Instale Android Studio"
    echo "   2. Configure ANDROID_HOME"
    echo "   3. Execute este script novamente"
    echo ""
    echo "🌐 Alternativa: Use o PWA builder online"
    echo "   - PWABuilder: https://www.pwabuilder.com/"
    echo "   - Upload a pasta 'www/' do projeto"
fi

echo ""
echo "📱 Para testar no navegador:"
echo "   cd www && python3 -m http.server 8080"
echo "   Depois abra: http://localhost:8080"

echo ""
echo "✨ Build concluído!"