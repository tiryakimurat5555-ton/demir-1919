// Bütün testlerden önce: savaş eğitimi (3.13) eski senaryolarda atlanır; egitim.test.js kendisi açar
import { EGITIM_AYAR } from '../src/oyun/uzay/savas';
EGITIM_AYAR.zorunlu = false;

// Uzun senaryo testleri (Sinyal Arayışı baştan sona) tam takımda 5 sn sınırına yaklaşıyor
import { setDefaultTimeout } from 'bun:test';
setDefaultTimeout(30000);
