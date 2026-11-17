/**
 * MOOD COMFY — Premium Landing Page Interactive Application
 * Automatic 3-Second Hero Carousel, Synchronized Visuals, & Order Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Global State ---
  const state = {
    pricePerUnit: 599,
    mrpPerUnit: 699,
    quantity: 1,
    isGift: false,
    giftRecipient: '',
    giftMessage: '',
    deliveryMethod: 'express_1hr',
    paymentMethod: 'upi',
    pincode: '560001',
    is1HourEligible: true,
    audioPlaying: false,
    audioContext: null,
    audioTimer: null,
    heroSlideIndex: 0,
    heroTimer: null
  };

  // --- Metro & Hub Pincode Prefixes for 1-Hour Delivery (Jaipur, Delhi, Gurugram, Noida + Metro) ---
  const expressPincodePrefixes = ['302', '110', '122', '201', '560', '400', '411', '500', '600', '700'];

  // =========================================================================
  // 1. Automatic 3-Second Hero Background Slideshow Carousel
  // =========================================================================
  const heroSlides = document.querySelectorAll('.hero-bg-slide');
  const heroDots = document.querySelectorAll('.hero-slide-dot');

  function goToHeroSlide(index) {
    if (!heroSlides.length) return;

    heroSlides.forEach(slide => slide.classList.remove('active'));
    heroDots.forEach(dot => dot.classList.remove('active'));

    state.heroSlideIndex = (index + heroSlides.length) % heroSlides.length;

    heroSlides[state.heroSlideIndex]?.classList.add('active');
    heroDots[state.heroSlideIndex]?.classList.add('active');
  }

  function startHeroAutoPlay() {
    stopHeroAutoPlay();
    state.heroTimer = setInterval(() => {
      goToHeroSlide(state.heroSlideIndex + 1);
    }, 3000); // 3 seconds interval
  }

  function stopHeroAutoPlay() {
    if (state.heroTimer) {
      clearInterval(state.heroTimer);
      state.heroTimer = null;
    }
  }

  heroDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToHeroSlide(idx);
      startHeroAutoPlay(); // Restart timer on click
    });
  });

  // Start auto-play on initial load
  if (heroSlides.length > 0) {
    startHeroAutoPlay();
  }

  // =========================================================================
  // 2. Navigation & Scroll Effects
  // =========================================================================
  const siteHeader = document.querySelector('.site-header');
  const mobileStickyBar = document.querySelector('.mobile-sticky-bar');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header scroll background
    if (scrollY > 50) {
      siteHeader?.classList.add('scrolled');
    } else {
      siteHeader?.classList.remove('scrolled');
    }

    // Mobile sticky bottom CTA appearance
    if (mobileStickyBar) {
      if (scrollY > 450) {
        mobileStickyBar.classList.add('visible');
      } else {
        mobileStickyBar.classList.remove('visible');
      }
    }
  });

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  mobileMenuBtn?.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.right = '0';
      navLinks.style.backgroundColor = '#faf5ee';
      navLinks.style.padding = '24px';
      navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      navLinks.style.gap = '16px';
    }
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 992 && navLinks) {
        navLinks.style.display = 'none';
      }
    });
  });

  // =========================================================================
  // 3. "What's Inside" Biology Anatomy Diagram Auto-Cycle & Interactive Tour
  // =========================================================================
  const calloutCards = document.querySelectorAll('.anatomy-callout-card');
  const hotspotPins = document.querySelectorAll('.hotspot-pin');
  const diagramStatusText = document.getElementById('diagramStatusText');

  const diagramItemsData = [
    { title: "01. Artisanal Dark Chocolate (55%)", desc: "Single-origin dark cocoa embossed with 'M' crest to relieve cramping" },
    { title: "02. Crispy Peri-Peri Makhana", desc: "Slow-roasted lotus seeds in zesty peri-peri spices with zero bloat" },
    { title: "03. Herbal Heat Cramp Patch", desc: "Air-activated herbal thermal patch delivering continuous 40°C soothing relief" },
    { title: "04. Luxe Satin Hair Scrunchie", desc: "Mulberry wine satin cloud designed to hold hair softly without tension" },
    { title: "05. Brass 'M' Charm Keychain", desc: "Weighted solid brass & rich enamel medallion with celestial MOOD monogram" },
    { title: "06. Gourmet Chocolate Bites", desc: "Velvety melt-in-mouth cocoa cubes for effortless sweet indulgence while resting" },
    { title: "07. Zesty Kaccha Aam Treats", desc: "Raw green mango candy drops with black salt crystals to awaken hormonal taste fatigue" },
    { title: "08. Calming Soy Scented Candle", desc: "Hand-poured pure soy wax in deep wine glass, scented with French lavender & vanilla" },
    { title: "09. Signature Canvas Pouch", desc: "Natural cotton zip pouch for discreetly carrying pads, balms, and daily essentials" },
    { title: "10. Feel-Good QR Experience", desc: "Gold-foil card linking to calming ambient lo-fi soundscapes and breathing guides" }
  ];

  let currentDiagramIndex = 0;
  let diagramTimer = null;

  function setDiagramActiveItem(index) {
    if (!calloutCards.length && !hotspotPins.length) return;
    currentDiagramIndex = index;

    calloutCards.forEach(card => {
      const itemIdx = parseInt(card.dataset.item, 10);
      if (itemIdx === index) {
        card.classList.add('active-callout');
      } else {
        card.classList.remove('active-callout');
      }
    });

    hotspotPins.forEach(pin => {
      const pinIdx = parseInt(pin.dataset.item, 10);
      if (pinIdx === index) {
        pin.classList.add('active-hotspot');
      } else {
        pin.classList.remove('active-hotspot');
      }
    });

    if (diagramStatusText && diagramItemsData[index]) {
      diagramStatusText.style.opacity = '0';
      setTimeout(() => {
        diagramStatusText.textContent = `${diagramItemsData[index].title} — ${diagramItemsData[index].desc}`;
        diagramStatusText.style.opacity = '1';
      }, 150);
    }
  }

  function startDiagramAutoCycle() {
    stopDiagramAutoCycle();
    diagramTimer = setInterval(() => {
      const nextIdx = (currentDiagramIndex + 1) % 10;
      setDiagramActiveItem(nextIdx);
    }, 3500); // Auto-cycle every 3.5 seconds
  }

  function stopDiagramAutoCycle() {
    if (diagramTimer) {
      clearInterval(diagramTimer);
      diagramTimer = null;
    }
  }

  calloutCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const idx = parseInt(card.dataset.item, 10);
      if (!isNaN(idx)) {
        setDiagramActiveItem(idx);
        startDiagramAutoCycle();
      }
    });
    card.addEventListener('click', () => {
      const idx = parseInt(card.dataset.item, 10);
      if (!isNaN(idx)) {
        setDiagramActiveItem(idx);
        startDiagramAutoCycle();
      }
    });
  });

  hotspotPins.forEach(pin => {
    pin.addEventListener('mouseenter', () => {
      const idx = parseInt(pin.dataset.item, 10);
      if (!isNaN(idx)) {
        setDiagramActiveItem(idx);
        startDiagramAutoCycle();
      }
    });
    pin.addEventListener('click', () => {
      const idx = parseInt(pin.dataset.item, 10);
      if (!isNaN(idx)) {
        setDiagramActiveItem(idx);
        startDiagramAutoCycle();
      }
    });
  });

  if (calloutCards.length > 0) {
    setDiagramActiveItem(0);
    startDiagramAutoCycle();
  }

  // =========================================================================
  // 4. Interactive Soundscape Preview (Item #10 QR Experience)
  // =========================================================================
  const btnPlayPreview = document.getElementById('btnPlayPreview');
  const audioSoundWave = document.getElementById('audioSoundWave');

  function playRelaxingChimes() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!state.audioContext) {
        state.audioContext = new AudioContext();
      }

      const ctx = state.audioContext;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const freqs = [369.99, 440.00, 493.88, 554.37, 659.25, 739.99];

      function triggerChime() {
        if (!state.audioPlaying) return;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        const freq = freqs[Math.floor(Math.random() * freqs.length)];
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.12, ctx.currentTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 2.6);

        const nextTime = 600 + Math.random() * 800;
        state.audioTimer = setTimeout(triggerChime, nextTime);
      }

      triggerChime();
    } catch (e) {
      console.log('AudioContext initialization note', e);
    }
  }

  btnPlayPreview?.addEventListener('click', () => {
    state.audioPlaying = !state.audioPlaying;

    if (state.audioPlaying) {
      btnPlayPreview.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
        <span>Pause Soundscape</span>
      `;
      audioSoundWave?.classList.add('playing');
      playRelaxingChimes();
      showToast('Playing relaxing ambient soundscape preview');
    } else {
      btnPlayPreview.innerHTML = `
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
        <span>Preview Soundscape</span>
      `;
      audioSoundWave?.classList.remove('playing');
      if (state.audioTimer) clearTimeout(state.audioTimer);
    }
  });

  // =========================================================================
  // 5. Lifestyle Gifting Persona Switcher (Auto-rotates every 3.5 seconds)
  // =========================================================================
  const personaTabs = document.querySelectorAll('.persona-tab');
  const personaTitle = document.getElementById('personaTitle');
  const personaText = document.getElementById('personaText');

  const personaKeys = ['partners', 'friends', 'self'];
  let currentPersonaIndex = 0;
  let personaTimer = null;

  const personaData = {
    partners: {
      title: "Be the Partner Who Truly Understands",
      text: "Never wonder 'What can I get you?' again. MOOD COMFY arrives right at her doorstep with soothing heat therapy, rich chocolates, crunchy snacks, and soft comforts. A thoughtful gesture that speaks love and care louder than words."
    },
    friends: {
      title: "Send a Warm Hug Across the City",
      text: "Whether your bestie has painful cramps or your sister is having an exhausting week, sending COMFY is the ultimate care package. Includes an optional personalized gift card."
    },
    self: {
      title: "Your Monthly Sanctuary & Self-Care Ritual",
      text: "You power through deadlines and life every single day. Give yourself permission to pause. Light the lavender candle, apply the soothing heat patch, and indulge in dark chocolate guilt-free."
    }
  };

  function setPersona(key) {
    const idx = personaKeys.indexOf(key);
    if (idx !== -1) currentPersonaIndex = idx;

    personaTabs.forEach(t => {
      if (t.dataset.persona === key) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });

    if (personaData[key] && personaTitle && personaText) {
      personaTitle.style.opacity = '0';
      personaText.style.opacity = '0';

      setTimeout(() => {
        personaTitle.textContent = personaData[key].title;
        personaText.textContent = personaData[key].text;
        personaTitle.style.opacity = '1';
        personaText.style.opacity = '1';
      }, 150);
    }
  }

  function startPersonaAutoPlay() {
    stopPersonaAutoPlay();
    personaTimer = setInterval(() => {
      currentPersonaIndex = (currentPersonaIndex + 1) % personaKeys.length;
      setPersona(personaKeys[currentPersonaIndex]);
    }, 3500); // 3.5s auto-rotation
  }

  function stopPersonaAutoPlay() {
    if (personaTimer) {
      clearInterval(personaTimer);
      personaTimer = null;
    }
  }

  personaTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.persona;
      setPersona(key);
      startPersonaAutoPlay(); // Restart timer on click
    });
  });

  if (personaTabs.length > 0) {
    startPersonaAutoPlay();
  }

  // =========================================================================
  // 6. Live Pincode Serviceability Checker (Jaipur, Delhi, Gurugram, Noida)
  // =========================================================================
  const pincodeInput = document.getElementById('pincodeInput');
  const btnCheckPincode = document.getElementById('btnCheckPincode');
  const pincodeResult = document.getElementById('pincodeResult');
  const cityPillBtns = document.querySelectorAll('.city-pill-btn, .chip-btn');

  function checkPincode(pin) {
    const cleanPin = pin.trim().replace(/\D/g, '');
    if (cleanPin.length !== 6) {
      pincodeResult.className = 'pincode-result-box';
      pincodeResult.style.display = 'block';
      pincodeResult.style.backgroundColor = '#ffebee';
      pincodeResult.style.color = '#c62828';
      pincodeResult.innerHTML = 'Please enter a valid 6-digit Indian PIN code.';
      return;
    }

    state.pincode = cleanPin;
    const isExpress = expressPincodePrefixes.some(prefix => cleanPin.startsWith(prefix));
    state.is1HourEligible = isExpress;

    pincodeResult.style.display = 'block';
    if (isExpress) {
      let cityLabel = '';
      if (cleanPin.startsWith('302')) cityLabel = ' in Jaipur';
      else if (cleanPin.startsWith('110')) cityLabel = ' in Delhi';
      else if (cleanPin.startsWith('122')) cityLabel = ' in Gurugram';
      else if (cleanPin.startsWith('201')) cityLabel = ' in Noida';
      else if (cleanPin.startsWith('560')) cityLabel = ' in Bengaluru';
      else if (cleanPin.startsWith('400')) cityLabel = ' in Mumbai';

      pincodeResult.className = 'pincode-result-box express';
      pincodeResult.innerHTML = `
        <strong>1-Hour Superfast Express Active${cityLabel}</strong><br>
        PIN <strong>${cleanPin}</strong> is serviceable by our central hub. Order now to receive MOOD COMFY within 60 minutes.
      `;
      showToast(`1-Hour express active${cityLabel} (${cleanPin})`);
    } else {
      pincodeResult.className = 'pincode-result-box standard';
      pincodeResult.innerHTML = `
        <strong>Pan-India Express Delivery Active</strong><br>
        PIN <strong>${cleanPin}</strong> is eligible for Free Pan-India Delivery (24-48 business hours via Bluedart / Delhivery Air).
      `;
      showToast(`Express delivery active for PIN ${cleanPin}`);
    }

    updateDeliveryOptionsInDrawer(isExpress);
  }

  btnCheckPincode?.addEventListener('click', () => {
    checkPincode(pincodeInput?.value || '');
  });

  pincodeInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      checkPincode(pincodeInput.value);
    }
  });

  cityPillBtns.forEach(pill => {
    pill.addEventListener('click', () => {
      const pin = pill.dataset.pin;
      if (pincodeInput) pincodeInput.value = pin;
      checkPincode(pin);
    });
  });

  // =========================================================================
  // 7. FAQ Accordion Logic
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    trigger?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  });

  // =========================================================================
  // 8. DUMMY ORDER PLACEMENT MODULE (Drawer / Modal Flow)
  // =========================================================================
  const orderModalOverlay = document.getElementById('orderModalOverlay');
  const btnCloseDrawer = document.getElementById('btnCloseDrawer');
  const openOrderTriggers = document.querySelectorAll('.btn-open-order');

  const qtyMinusBtn = document.getElementById('qtyMinusBtn');
  const qtyPlusBtn = document.getElementById('qtyPlusBtn');
  const qtyValueDisplay = document.getElementById('qtyValueDisplay');

  const isGiftCheckbox = document.getElementById('isGiftCheckbox');
  const giftMessagePane = document.getElementById('giftMessagePane');
  const giftNoteText = document.getElementById('giftNoteText');
  const giftRecipientName = document.getElementById('giftRecipientName');

  const orderFullName = document.getElementById('orderFullName');
  const orderPhone = document.getElementById('orderPhone');
  const orderAddress = document.getElementById('orderAddress');
  const orderCity = document.getElementById('orderCity');
  const orderPincode = document.getElementById('orderPincode');

  const summaryMrpTotal = document.getElementById('summaryMrpTotal');
  const summaryDiscount = document.getElementById('summaryDiscount');
  const summaryNetTotal = document.getElementById('summaryNetTotal');
  const btnConfirmOrder = document.getElementById('btnConfirmOrder');
  const btnConfirmText = document.getElementById('btnConfirmText');

  const deliveryExpressCard = document.getElementById('deliveryExpressCard');
  const deliveryStandardCard = document.getElementById('deliveryStandardCard');
  const paymentCards = document.querySelectorAll('.payment-radio-card');

  const orderFormStep = document.getElementById('orderFormStep');
  const confirmationScreen = document.getElementById('confirmationScreen');

  const confirmedOrderId = document.getElementById('confirmedOrderId');
  const confirmedCustName = document.getElementById('confirmedCustName');
  const confirmedPhone = document.getElementById('confirmedPhone');
  const confirmedAddress = document.getElementById('confirmedAddress');
  const confirmedDeliveryType = document.getElementById('confirmedDeliveryType');
  const confirmedItemDetails = document.getElementById('confirmedItemDetails');
  const confirmedAmount = document.getElementById('confirmedAmount');
  const btnDownloadReceipt = document.getElementById('btnDownloadReceipt');
  const btnOrderAnother = document.getElementById('btnOrderAnother');

  function openOrderDrawer() {
    orderModalOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
    updatePriceSummary();
  }

  function closeOrderDrawer() {
    orderModalOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  openOrderTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openOrderDrawer();
    });
  });

  btnCloseDrawer?.addEventListener('click', closeOrderDrawer);

  orderModalOverlay?.addEventListener('click', (e) => {
    if (e.target === orderModalOverlay) {
      closeOrderDrawer();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && orderModalOverlay?.classList.contains('open')) {
      closeOrderDrawer();
    }
  });

  qtyMinusBtn?.addEventListener('click', () => {
    if (state.quantity > 1) {
      state.quantity--;
      qtyValueDisplay.textContent = state.quantity;
      updatePriceSummary();
    }
  });

  qtyPlusBtn?.addEventListener('click', () => {
    if (state.quantity < 10) {
      state.quantity++;
      qtyValueDisplay.textContent = state.quantity;
      updatePriceSummary();
    }
  });

  function updatePriceSummary() {
    const mrpTotal = state.quantity * state.mrpPerUnit;
    const netTotal = state.quantity * state.pricePerUnit;
    const discount = mrpTotal - netTotal;

    if (summaryMrpTotal) summaryMrpTotal.textContent = `₹${mrpTotal}`;
    if (summaryDiscount) summaryDiscount.textContent = `-₹${discount}`;
    if (summaryNetTotal) summaryNetTotal.textContent = `₹${netTotal}`;
    if (btnConfirmText) btnConfirmText.textContent = `Confirm & Place Order • ₹${netTotal}`;
  }

  isGiftCheckbox?.addEventListener('change', (e) => {
    state.isGift = e.target.checked;
    if (state.isGift) {
      giftMessagePane?.classList.add('show');
    } else {
      giftMessagePane?.classList.remove('show');
    }
  });

  orderPincode?.addEventListener('input', (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 6);
    e.target.value = val;
    if (val.length === 6) {
      const isExpress = expressPincodePrefixes.some(prefix => val.startsWith(prefix));
      updateDeliveryOptionsInDrawer(isExpress);
    }
  });

  function updateDeliveryOptionsInDrawer(isExpress) {
    if (deliveryExpressCard && deliveryStandardCard) {
      if (isExpress) {
        deliveryExpressCard.style.display = 'flex';
        deliveryExpressCard.classList.add('selected');
        deliveryStandardCard.classList.remove('selected');
        state.deliveryMethod = 'express_1hr';
      } else {
        deliveryExpressCard.style.display = 'none';
        deliveryStandardCard.classList.add('selected');
        state.deliveryMethod = 'standard_2day';
      }
    }
  }

  deliveryExpressCard?.addEventListener('click', () => {
    deliveryExpressCard.classList.add('selected');
    deliveryStandardCard?.classList.remove('selected');
    state.deliveryMethod = 'express_1hr';
  });

  deliveryStandardCard?.addEventListener('click', () => {
    deliveryStandardCard.classList.add('selected');
    deliveryExpressCard?.classList.remove('selected');
    state.deliveryMethod = 'standard_2day';
  });

  paymentCards.forEach(card => {
    card.addEventListener('click', () => {
      paymentCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      state.paymentMethod = card.dataset.payment;
    });
  });

  function validateOrderForm() {
    let isValid = true;

    if (!orderFullName?.value.trim() || orderFullName.value.trim().length < 2) {
      orderFullName?.classList.add('invalid');
      isValid = false;
    } else {
      orderFullName?.classList.remove('invalid');
    }

    const phoneVal = orderPhone?.value.trim().replace(/\D/g, '') || '';
    if (phoneVal.length !== 10 || !/^[6-9]/.test(phoneVal)) {
      orderPhone?.classList.add('invalid');
      isValid = false;
    } else {
      orderPhone?.classList.remove('invalid');
    }

    if (!orderAddress?.value.trim() || orderAddress.value.trim().length < 5) {
      orderAddress?.classList.add('invalid');
      isValid = false;
    } else {
      orderAddress?.classList.remove('invalid');
    }

    if (!orderCity?.value.trim()) {
      orderCity?.classList.add('invalid');
      isValid = false;
    } else {
      orderCity?.classList.remove('invalid');
    }

    const pinVal = orderPincode?.value.trim().replace(/\D/g, '') || '';
    if (pinVal.length !== 6) {
      orderPincode?.classList.add('invalid');
      isValid = false;
    } else {
      orderPincode?.classList.remove('invalid');
    }

    return isValid;
  }

  [orderFullName, orderPhone, orderAddress, orderCity, orderPincode].forEach(input => {
    input?.addEventListener('input', () => {
      input.classList.remove('invalid');
    });
  });

  btnConfirmOrder?.addEventListener('click', (e) => {
    e.preventDefault();

    if (!validateOrderForm()) {
      showToast('Please fill all required fields correctly');
      return;
    }

    btnConfirmOrder.disabled = true;
    btnConfirmOrder.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin-icon">
        <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
        <path d="M12 2a10 10 0 0 1 10 10"></path>
      </svg>
      Securing Your Order...
    `;

    setTimeout(() => {
      btnConfirmOrder.disabled = false;
      renderOrderConfirmation();
    }, 1200);
  });

  function renderOrderConfirmation() {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const mockId = `#MC-${randomNum}`;

    const custName = orderFullName?.value.trim() || 'Valued Customer';
    const custPhone = orderPhone?.value.trim() || '';
    const custAddr = `${orderAddress?.value.trim()}, ${orderCity?.value.trim()} - ${orderPincode?.value.trim()}`;
    const totalPayable = state.quantity * state.pricePerUnit;

    const deliverySpeedText = state.deliveryMethod === 'express_1hr'
      ? '1-Hour Superfast Express (Delivery within 60 mins)'
      : 'Standard Express (Bluedart Air / 2 Business Days)';

    if (confirmedOrderId) confirmedOrderId.textContent = mockId;
    if (confirmedCustName) confirmedCustName.textContent = custName;
    if (confirmedPhone) confirmedPhone.textContent = `+91 ${custPhone}`;
    if (confirmedAddress) confirmedAddress.textContent = custAddr;
    if (confirmedDeliveryType) confirmedDeliveryType.textContent = deliverySpeedText;
    if (confirmedItemDetails) confirmedItemDetails.textContent = `${state.quantity} × MOOD COMFY Signature Box (10 Essentials)`;
    if (confirmedAmount) confirmedAmount.textContent = `₹${totalPayable} (Prepaid Demo Confirmation)`;

    if (orderFormStep) orderFormStep.style.display = 'none';
    if (document.querySelector('.drawer-footer')) document.querySelector('.drawer-footer').style.display = 'none';
    if (confirmationScreen) confirmationScreen.classList.add('show');

    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(item => item.classList.remove('active'));
    stepItems[1]?.classList.add('active');

    showToast('Prototype Order Placed Successfully');
  }

  btnDownloadReceipt?.addEventListener('click', () => {
    const mockId = confirmedOrderId?.textContent || '#MC-999999';
    const custName = confirmedCustName?.textContent || '';
    const phone = confirmedPhone?.textContent || '';
    const addr = confirmedAddress?.textContent || '';
    const total = confirmedAmount?.textContent || '₹599';

    const receiptContent = `
========================================
       MOOD COMFY — ORDER RECEIPT
       (Demo Prototype Confirmation)
========================================
Order ID:       ${mockId}
Date:           ${new Date().toLocaleDateString('en-IN', { dateStyle: 'full' })}
Time:           ${new Date().toLocaleTimeString('en-IN')}

CUSTOMER DETAILS:
Name:           ${custName}
Phone:          ${phone}
Delivery To:    ${addr}

ORDERED ITEMS:
- MOOD COMFY Signature Period Comfort Box
  Quantity:     ${state.quantity} Box(es)
  Prepaid Rate: ₹599 per box
  Packaging:    Designer Maroon Rigid Keepsake Box
  Contents:     10 Curated Items
                (Dark Chocolate Bar, Chocolate Bites,
                 Peri-Peri Makhana, Kaccha Aam Treats,
                 Herbal Heat Patch, Scented Candle,
                 Satin Scrunchie, Canvas Travel Pouch,
                 Brass M Keychain, Feel-Good QR Audio)

GIFT MESSAGE:   ${state.isGift ? `"${giftNoteText?.value.trim() || 'Thinking of you with love and comfort.'}"` : 'None (Self-order)'}

PAYMENT SUMMARY:
Subtotal MRP:   ₹${state.quantity * state.mrpPerUnit}
Launch Rebate:  -₹${state.quantity * 100}
Shipping:       FREE
Total Paid:     ${total}
Status:         PROTOTYPE DEMO SUCCESSFUL (No real charge)

Thank you for choosing MOOD COMFY.
Your Box Full of Comfort.
========================================
    `.trim();

    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MOOD_COMFY_Receipt_${mockId.replace('#', '')}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Mock receipt downloaded to files');
  });

  btnOrderAnother?.addEventListener('click', () => {
    if (orderFormStep) orderFormStep.style.display = 'flex';
    if (document.querySelector('.drawer-footer')) document.querySelector('.drawer-footer').style.display = 'flex';
    if (confirmationScreen) confirmationScreen.classList.remove('show');

    const stepItems = document.querySelectorAll('.step-item');
    stepItems.forEach(item => item.classList.remove('active'));
    stepItems[0]?.classList.add('active');

    state.quantity = 1;
    if (qtyValueDisplay) qtyValueDisplay.textContent = '1';
    updatePriceSummary();

    if (orderFullName) orderFullName.value = '';
    if (orderPhone) orderPhone.value = '';
    if (orderAddress) orderAddress.value = '';
    if (orderCity) orderCity.value = '';
    if (giftNoteText) giftNoteText.value = '';
    if (isGiftCheckbox) isGiftCheckbox.checked = false;
    giftMessagePane?.classList.remove('show');
  });

  // =========================================================================
  // 9. Toast Notification Utility
  // =========================================================================
  function showToast(message) {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-gold);"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
});
