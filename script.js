const textInput = document.getElementById('textInput');
const sizeSelect = document.getElementById('sizeSelect');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrcodeDiv = document.getElementById('qrcode');

let qrInstance = null;

function generateQR() {
  const text = textInput.value.trim();
  if (!text) {
    alert('Please enter some text or a URL first.');
    return;
  }

  qrcodeDiv.innerHTML = '';
  const size = parseInt(sizeSelect.value);

  qrInstance = new QRCode(qrcodeDiv, {
    text: text,
    width: size,
    height: size,
    colorDark: '#0f172a',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });

  downloadBtn.style.display = 'block';
}

function downloadQR() {
  const img = qrcodeDiv.querySelector('img');
  const canvas = qrcodeDiv.querySelector('canvas');
  const src = img ? img.src : (canvas ? canvas.toDataURL('image/png') : null);

  if (!src) return;

  const link = document.createElement('a');
  link.href = src;
  link.download = 'qrcode.png';
  link.click();
}

generateBtn.addEventListener('click', generateQR);
downloadBtn.addEventListener('click', downloadQR);

textInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') generateQR();
});
