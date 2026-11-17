// eas init sonrası app.json'a güncelleme adresini yazar (Expo Go'da açmak için gerekli).
const fs = require('fs');
const yol = require('path').join(__dirname, '..', 'app.json');
const app = JSON.parse(fs.readFileSync(yol, 'utf8'));
const kimlik = app.expo && app.expo.extra && app.expo.extra.eas && app.expo.extra.eas.projectId;
if (!kimlik) {
  console.error('Proje kimliği bulunamadı.');
  process.exit(1);
}
app.expo.updates = { ...(app.expo.updates || {}), url: 'https://u.expo.dev/' + kimlik };
fs.writeFileSync(yol, JSON.stringify(app, null, 2) + '\n');
console.log('Güncelleme adresi yazıldı: https://u.expo.dev/' + kimlik);
