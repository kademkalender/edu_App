# 🚀 Kurulum Talimatları

Bu paket **Expo SDK 54** ile hazırlandı — Expo Go uygulamanla doğrudan uyumlu.

## Adım 1: Zip dosyasını çıkar

Zip'i indir, çıkar ve klasörü Desktop'a koy:
```
~/Desktop/edu-app/
```

## Adım 2: Eski projeyi yedekle (opsiyonel)

Eski projeyi tutmak istiyorsan adını değiştir, böylece karışmaz:
```bash
cd ~/Desktop
mv prototip-app prototip-app-eski
```

(Eski projeyi silmek istemiyorsun zaten — GitHub'da da yedeği var.)

## Adım 3: Paketleri kur

```bash
cd ~/Desktop/edu-app
npm install
```

1-2 dakika sürer. Sonunda "vulnerabilities" uyarısı çıkabilir — görmezden gel, bildiğimiz npm gürültüsü.

## Adım 4: Mobilde test (Expo Go ile)

```bash
npx expo start
```

QR kod çıkacak. iPhone'unda:
1. Aynı WiFi ağında olduğundan emin ol
2. **Kamera** uygulamasını aç
3. QR'a tut → "Open in Expo Go" bildirimine bas
4. İlk yükleme 2-3 dakika sürer, sabret

## Adım 5: Web'de test (opsiyonel)

Tarayıcıda da denemek istersen:
```bash
npx expo start --web
```

## Önemli Notlar

### `babel.config.js`'e plugin eklemeye GEREK YOK
Expo SDK 54'te `babel-preset-expo` Reanimated için gerekli plugin'i otomatik içeriyor. Eklersek çakışma olur. Bu yüzden dosya şöyle:
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

### Eski projenle bu yeni proje arasındaki tek fark
- Expo SDK 56 → 54
- React Native 0.85 → 0.81
- Reanimated 3 → 4 (yeni worklets sistemi)
- Diğer her şey (kodun mantığı, ekranlar, animasyonlar) **aynı**

## Sorun Giderme

### "Project is incompatible with this version of Expo Go"
App Store'dan Expo Go'yu güncelle. SDK 54 desteklemesi gerek.

### Metro bundler / Babel hatası
```bash
rm -rf node_modules/.cache .expo
npx expo start --clear
```

### Hâlâ çalışmıyor — eski projeye dön
```bash
cd ~/Desktop/prototip-app-eski
npx expo start --web
```
Eski sürüm web'de çalışıyor, yedek olarak hazır.

## GitHub'a Push (opsiyonel)

Bu yeni projeyi de GitHub'a koymak istersen:
```bash
cd ~/Desktop/edu-app
git init
git add .
git commit -m "İlk commit: SDK 54 mobil uyumlu sürüm"

# GitHub'da yeni repo oluştur, sonra:
git remote add origin https://github.com/KULLANICI_ADIN/REPO_ADI.git
git branch -M main
git push -u origin main
```

Veya mevcut repo'yu güncelle:
```bash
cd ~/Desktop/edu-app
git init
git remote add origin https://github.com/kademkalender/prototip-app.git
git fetch
git checkout -b sdk-54-version
git add .
git commit -m "SDK 54 mobil uyumlu sürüm"
git push -u origin sdk-54-version
```
