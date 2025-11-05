const form = document.getElementById('dataForm');
    const generateBtn = document.getElementById('generateBtn');
    const clearBtn = document.getElementById('clearBtn');
    const printBtn = document.getElementById('printBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    function formatDate(d) {
      if (!d) return '—';
      const date = new Date(d);
      return date.toLocaleDateString();
    }

    function populatePreview(data) {
      document.getElementById('c_childName').textContent = data.childName || '—';
      document.getElementById('c_gender').textContent = data.gender || '—';
      document.getElementById('c_dob').textContent = data.dob ? new Date(data.dob).toLocaleDateString() : '—';
      document.getElementById('c_time').textContent = data.time || '—';
      document.getElementById('c_place').textContent = data.place || '—';
      document.getElementById('c_mother').textContent = data.mother || '—';
      document.getElementById('c_father').textContent = data.father || '—';
      document.getElementById('c_regNo').textContent = data.regNo || '—';
      document.getElementById('c_issuer').textContent = data.issuer || '—';
      document.getElementById('c_notes').textContent = data.notes || '—';
      document.getElementById('c_issuedDate').textContent = new Date().toLocaleDateString();
      document.getElementById('c_signatureName').textContent = data.issuer || 'Registrar';
    }

    generateBtn.addEventListener('click', () => {
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      if (!data.childName || !data.dob) {
        alert('Please enter at least the child\'s name and date of birth.');
        return;
      }
      populatePreview(data);
      // scroll to preview
      document.getElementById('certificateContent').scrollIntoView({ behavior: 'smooth' });
    });

    clearBtn.addEventListener('click', () => {
      form.reset();
      populatePreview({});
    });

    printBtn.addEventListener('click', () => {
      window.print();
    });

    // Download certificate as PNG using html2canvas (inlined loader)
    downloadBtn.addEventListener('click', async () => {
      // load html2canvas dynamically
      if (!window.html2canvasLoaded) {
        const s = document.createElement('script');
        s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
        document.body.appendChild(s);
        await new Promise(res => s.onload = res);
        window.html2canvasLoaded = true;
      }
      const el = document.querySelector('.certificate');
      const canvas = await html2canvas(el, { scale: 2 });
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = (document.querySelector('[name=childName]')?.value || 'birth-certificate') + '.png';
      document.body.appendChild(a);
      a.click();
      a.remove();
    });

    // Initialize preview with placeholders
    populatePreview({});