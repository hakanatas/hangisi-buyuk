/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 5. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: '3/4, 0,7, %72, 2/3: hangisi büyük?', en: '3/4, 0.7, 72%, 2/3: which is biggest?',
      note: 'Dört arkadaş aynı kitabı okuyor. Ali kitabın 3 bölü 4’ünü, Ece 0,7’sini, Can yüzde 72’sini, Deniz 2 bölü 3’ünü okudu. Kim daha çok okudu?' },
    { scene: 2, start: 10.8, end: 18.2, tr: 'Varsayım: paydası büyük olan büyük mü?', en: 'Guess: is a bigger denominator bigger?',
      note: 'Bir varsayım: paydası büyük olan kesir daha büyüktür. Deneyelim: 1 bölü 3 ile 1 bölü 4. Aynı bütünü 3’e ve 4’e bölelim.' },
    { scene: 2, start: 18.6, end: 27.8, tr: '1/3 > 1/4: varsayım yanlış', en: '1/3 > 1/4: the guess is wrong',
      note: 'Bütün daha çok parçaya bölününce parçalar küçülür: 1 bölü 3, 1 bölü 4’ten büyük. Varsayım yanlış. Paylar aynıysa paydası küçük olan büyüktür.' },
    { scene: 3, start: 28.6, end: 38.0, tr: 'Payda aynı: payı büyük olan büyük', en: 'Same denominator: bigger numerator wins',
      note: 'Paydalar aynıysa parçalar eşittir; çok parçası olan büyüktür: 5 bölü 8, 3 bölü 8’den büyük. Sayı doğrusunda da sağdaki kesir büyüktür.' },
    { scene: 3, start: 38.4, end: 45.8, tr: 'Farklı gösterimler: aynı gösterime çevir', en: 'Different forms: make them the same',
      note: 'Peki gösterimler farklıysa? Hepsini aynı gösterime, örneğin yüzdeye çevirelim.' },
    { scene: 4, start: 46.6, end: 57.0, tr: '%67, %70, %72, %75', en: '67%, 70%, 72%, 75%',
      note: '3 bölü 4, 75 bölü 100, yani yüzde 75. 0,7, yüzde 70. 2 bölü 3 yaklaşık 0,67, yani yaklaşık yüzde 67. Sayı doğrusunda 0,6 ile 0,8 arasına yakından bakalım.' },
    { scene: 4, start: 57.4, end: 63.8, tr: 'En çok Ali okudu', en: 'Ali read the most',
      note: 'Sıralama: 2 bölü 3, 0,7, yüzde 72, 3 bölü 4. Kitabın en büyük kısmını Ali okudu.' },
    { scene: 5, start: 64.6, end: 73.4, tr: '3/7 mi, 5/9 mu? Yarımla karşılaştır', en: '3/7 or 5/9? Compare with a half',
      note: 'Tahmin için bir kısa yol: kesri yarımla karşılaştır. 7’nin yarısı 3,5; 3 daha az, yani 3 bölü 7 yarımdan az. 9’un yarısı 4,5; 5 daha fazla, yani 5 bölü 9 yarımdan fazla.' },
    { scene: 5, start: 73.8, end: 79.8, tr: 'Hesaplamadan hızlı tahmin', en: 'A quick estimate without calculating',
      note: 'Demek ki 5 bölü 9 daha büyük. Yarımla karşılaştırmak, hesaplamadan hızlı tahmin etmemizi sağlar.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Aynı paydaya, aynı paya bak', en: 'Look at equal denominators or numerators',
      note: 'Aklında kalsın: payda aynıysa payı büyük olan, pay aynıysa paydası küçük olan büyüktür. Gösterimler farklıysa aynı gösterime çevir.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Yarımla karşılaştır!', en: 'Compare with a half!',
      note: 'Hızlı tahmin için yarımla karşılaştır!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
