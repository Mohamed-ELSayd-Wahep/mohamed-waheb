/**
 * ==========================================================================
 * عيادة ابتسامة النيل لطب الأسنان (Nile Smile Dental Clinic)
 * المنطق البرمجي التفاعلي الكامل (Interactive JavaScript ES6+)
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initServicesFilter();
  initBookingSystem();
  initBeforeAfterSlider();
  initFaqAccordion();
  initQuickStatsCounter();
  initFooterYear();
});

/* ==========================================================================
   1. شريط التنقل العلوي (Sticky Navbar & Scroll Spy)
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('main-navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('shadow-md', 'bg-white/95');
      navbar.classList.remove('bg-white/80');
    } else {
      navbar.classList.remove('shadow-md', 'bg-white/95');
      navbar.classList.add('bg-white/80');
    }
  });

  // التمرير السلس وتحديد الرابط النشط
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('text-sky-600', 'font-bold');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('text-sky-600', 'font-bold');
      }
    });
  });
}

/* ==========================================================================
   2. القائمة المتجاوبة للأجهزة الذكية (Mobile Navigation Drawer)
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('close-mobile-menu');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  function toggleMenu(show) {
    if (show) {
      mobileMenu.classList.remove('hidden');
      document.body.classList.add('overflow-hidden');
    } else {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    }
  }

  menuBtn.addEventListener('click', () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));

  menuLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });

  // إغلاق عند النقر خارج القائمة
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) toggleMenu(false);
  });
}

/* ==========================================================================
   3. تصفية الخدمات الطبية (Services Filtering)
   ========================================================================== */
function initServicesFilter() {
  const filterBtns = document.querySelectorAll('.service-filter-btn');
  const serviceCards = document.querySelectorAll('.service-card-item');

  if (!filterBtns.length || !serviceCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // إزالة الحالة النشطة من كل الأزرار
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-sky-600', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-slate-700', 'hover:bg-slate-100');
      });

      // تنشيط الزر الحالي
      btn.classList.add('active', 'bg-sky-600', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-slate-700', 'hover:bg-slate-100');

      const filter = btn.getAttribute('data-filter');

      // تصفية البطاقات مع حركة ناعمة
      serviceCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.classList.remove('hidden');
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.classList.add('hidden');
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   4. نظام حجز المواعيد التفاعلي (Interactive Booking System & Voucher Modal)
   ========================================================================== */
function initBookingSystem() {
  const bookingModal = document.getElementById('booking-modal');
  const receiptModal = document.getElementById('receipt-modal');
  const modalCloseBtns = document.querySelectorAll('.close-modal-trigger');
  const openModalBtns = document.querySelectorAll('.open-booking-modal');

  // تعيين الحد الأدنى لتاريخ اليوم
  const today = new Date().toISOString().split('T')[0];
  const dateInputs = document.querySelectorAll('input[type="date"]');
  dateInputs.forEach(input => {
    input.setAttribute('min', today);
  });

  // فتح نافذة الحجز مع دعم التعبئة المسبقة
  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetService = btn.getAttribute('data-service');
      const targetDoctor = btn.getAttribute('data-doctor');

      if (bookingModal) {
        bookingModal.classList.add('active');
        document.body.classList.add('overflow-hidden');

        // تعبئة الخدمة إن وجدت
        if (targetService) {
          const serviceSelect = bookingModal.querySelector('#modal-service');
          if (serviceSelect) serviceSelect.value = targetService;
        }

        // تعبئة الطبيب إن وجد
        if (targetDoctor) {
          const doctorSelect = bookingModal.querySelector('#modal-doctor');
          if (doctorSelect) doctorSelect.value = targetDoctor;
        }
      }
    });
  });

  // إغلاق المودال
  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      closeAllModals();
    });
  });

  // إغلاق عند الضغط على الخلفية أو ESC
  [bookingModal, receiptModal].forEach(modal => {
    if (!modal) return;
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeAllModals();
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });

  function closeAllModals() {
    if (bookingModal) bookingModal.classList.remove('active');
    if (receiptModal) receiptModal.classList.remove('active');
    document.body.classList.remove('overflow-hidden');
  }

  // معالجة نماذج الحجز (سواء في المودال أو القسم المدمج)
  const forms = [
    document.getElementById('modal-booking-form'),
    document.getElementById('inline-booking-form')
  ];

  forms.forEach(form => {
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // جمع البيانات
      const name = form.querySelector('[name="patient_name"]')?.value.trim();
      const phone = form.querySelector('[name="patient_phone"]')?.value.trim();
      const service = form.querySelector('[name="service"]')?.value;
      const doctor = form.querySelector('[name="doctor"]')?.value;
      const date = form.querySelector('[name="booking_date"]')?.value;
      const timeSlot = form.querySelector('[name="time_slot"]')?.value;
      const notes = form.querySelector('[name="notes"]')?.value.trim() || 'لا توجد ملاحظات إضافية';

      // التحقق من صحة المدخلات
      if (!name || name.length < 3) {
        showToast('يرجى إدخال الاسم الثلاثي بشكل صحيح', 'warning');
        return;
      }

      if (!phone || phone.length < 8) {
        showToast('يرجى إدخال رقم هاتف أو واتساب صالح', 'warning');
        return;
      }

      if (!service) {
        showToast('يرجى اختيار الخدمة الطبية المطلوبة', 'warning');
        return;
      }

      if (!date) {
        showToast('يرجى تحديد موعد وتاريخ الزيارة', 'warning');
        return;
      }

      if (!timeSlot) {
        showToast('يرجى اختيار الفترة الزمنية المفضلة', 'warning');
        return;
      }

      // إظهار زر التحميل التفاعلي
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        جارٍ تأكيد الحجز وإصدار الإيصال...
      `;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // إغلاق مودال الحجز وفتح إيصال التأكيد
        if (bookingModal) bookingModal.classList.remove('active');

        const bookingId = 'NS-' + Math.floor(100000 + Math.random() * 900000);
        showBookingReceipt({
          id: bookingId,
          name,
          phone,
          service,
          doctor: doctor || 'أي طبيب متاح وفق الموعد',
          date,
          timeSlot,
          notes
        });

        // تنظيف النموذج
        form.reset();
        showToast('تم تأكيد حجزك بنجاح في ابتسامة النيل!', 'success');
      }, 900);
    });
  });
}

/**
 * عرض نافذة وإيصال الحجز الرقمي المخصص
 */
function showBookingReceipt(data) {
  const receiptModal = document.getElementById('receipt-modal');
  if (!receiptModal) return;

  // تعبئة البيانات في عناصر الإيصال
  const idEl = document.getElementById('receipt-id');
  const nameEl = document.getElementById('receipt-name');
  const phoneEl = document.getElementById('receipt-phone');
  const serviceEl = document.getElementById('receipt-service');
  const doctorEl = document.getElementById('receipt-doctor');
  const dateEl = document.getElementById('receipt-date');
  const timeEl = document.getElementById('receipt-time');
  const whatsappBtn = document.getElementById('receipt-whatsapp-btn');

  if (idEl) idEl.textContent = data.id;
  if (nameEl) nameEl.textContent = data.name;
  if (phoneEl) phoneEl.textContent = data.phone;
  if (serviceEl) serviceEl.textContent = data.service;
  if (doctorEl) doctorEl.textContent = data.doctor;
  if (dateEl) dateEl.textContent = data.date;
  if (timeEl) timeEl.textContent = data.timeSlot;

  // تجهيز رابط الواتساب الجاهز
  if (whatsappBtn) {
    const waText = encodeURIComponent(
      `مرحباً عيادة ابتسامة النيل، أود تأكيد موعد الكشف الخاص بي:\n\n` +
      `🎫 كود الحجز: ${data.id}\n` +
      `👤 الاسم: ${data.name}\n` +
      `📱 الهاتف: ${data.phone}\n` +
      `🩺 الخدمة: ${data.service}\n` +
      `👨‍⚕️ الطبيب: ${data.doctor}\n` +
      `📅 التاريخ: ${data.date}\n` +
      `⏰ الفترة: ${data.timeSlot}\n\nشكراً لكم!`
    );
    whatsappBtn.setAttribute('href', `https://wa.me/201000000000?text=${waText}`);
  }

  receiptModal.classList.add('active');
  document.body.classList.add('overflow-hidden');
}

/* ==========================================================================
   5. عارض مقارنة قبل وبعد التفاعلي (Before / After Interactive Slider)
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById('smile-comparison');
  const overlay = document.getElementById('comparison-overlay');
  const handle = document.getElementById('comparison-handle');

  if (!container || !overlay || !handle) return;

  let isDragging = false;

  function updateSlider(clientX) {
    const rect = container.getBoundingClientRect();
    let x = clientX - rect.left;

    // تقييد النسبة بين 5% و 95% لجماليات العرض
    let percent = (x / rect.width) * 100;
    if (percent < 5) percent = 5;
    if (percent > 95) percent = 95;

    // في اتجاه RTL: العرض من جهة اليمين
    const rtlPercent = 100 - percent;
    overlay.style.width = `${rtlPercent}%`;
    handle.style.left = `${percent}%`;
  }

  // أحداث الفأرة
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSlider(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSlider(e.clientX);
  });

  // أحداث اللمس للهواتف
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    if (e.touches[0]) updateSlider(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || !e.touches[0]) return;
    updateSlider(e.touches[0].clientX);
  }, { passive: true });
}

/* ==========================================================================
   6. أوكورديون الأسئلة الشائعة (FAQ Accordion)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // إغلاق بقية العناصر
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      // فتح العنصر إذا لم يكن مفتوحاً
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. عدادات الإحصائيات السريعة (Stats Counter Animation)
   ========================================================================== */
function initQuickStatsCounter() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = 1600;
          const step = Math.ceil(target / (duration / 25));
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              counter.textContent = target.toLocaleString('ar-EG');
              clearInterval(timer);
            } else {
              counter.textContent = current.toLocaleString('ar-EG');
            }
          }, 25);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('quick-stats');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   8. نظام إشعارات التوست (Toast Notifications)
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-xl text-sm font-medium border';

  let bgClass = 'bg-slate-900 text-white border-slate-700';
  let icon = `
    <svg class="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
  `;

  if (type === 'success') {
    bgClass = 'bg-emerald-900/95 text-emerald-100 border-emerald-700';
    icon = `
      <svg class="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    `;
  } else if (type === 'warning') {
    bgClass = 'bg-amber-900/95 text-amber-100 border-amber-700';
    icon = `
      <svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
    `;
  }

  toast.className += ` ${bgClass}`;
  toast.innerHTML = `
    <div class="flex-shrink-0">${icon}</div>
    <div class="flex-1">${message}</div>
  `;

  container.appendChild(toast);

  // إظهار التوست
  setTimeout(() => toast.classList.add('show'), 50);

  // إخفاء التوست تلقائياً بعد 3.5 ثوانٍ
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ==========================================================================
   9. تحديث السنة الحالية في الفوتر
   ========================================================================== */
function initFooterYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toLocaleString('ar-EG', { useGrouping: false });
  }
}
