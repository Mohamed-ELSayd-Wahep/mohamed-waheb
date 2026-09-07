/**
 * ==========================================================================
 * المنطق البرمجي التفاعلي لموقع معرض الأعمال (Portfolio Interaction Script)
 * المطور ومصمم الواجهات: محمد وهيب (Mohamed Waheb)
 * تضمين المشاريع الحقيقية المنشورة على Vercel
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. تهيئة النمط (Dark / Light Mode)
  initThemeToggle();

  // 2. قائمة الهواتف الذكية (Mobile Navigation Menu)
  initMobileMenu();

  // 3. شريط التنقل الذكي وتحديد الأقسام النشطة (Sticky Nav & ScrollSpy)
  initScrollSpy();

  // 4. تصفية وتصنيف المشاريع (Portfolio Filtering)
  initPortfolioFilter();

  // 5. نافذة تفاصيل المشروع المنبثقة (Project Details Modal)
  initProjectModal();

  // 6. التحقق من نموذج التواصل وإرساله (Contact Form Validation)
  initContactForm();

  // 7. عداد الإحصائيات التفاعلي (Animated Counters)
  initAnimatedCounters();

  // 8. زر العودة للأعلى (Back to Top Button)
  initBackToTop();
});

/* ==========================================================================
   بيانات المشاريع الحقيقية المنشورة (Projects Data Store - Vercel Live Links)
   ========================================================================== */
const projectsData = {
  'project-1': {
    title: 'شركة "Tito\'s Decoration" للديكور والتشطيبات الفاخرة',
    category: 'موقع شركات ومؤسسات راقية',
    tag: 'corporate',
    shortDesc: 'موقع تعريفي بريطاني فاخر لشركة تشطيبات وديكور داخلي بلندن، يركز على الهوية البصرية السينمائية وحساب عروض الأسعار.',
    fullDesc: 'موقع وهوية رقمية راقية صممها وبرمجها محمد وهيب لشركة التشطيبات والديكور الداخلي البريطانية Tito\'s Decoration. يعتمد الموقع على خطوط كلاسيكية فخمة (Cinzel & Poppins)، وتنسيق شبكي متجاوب لمعارض الصور والمشاريع المنفذة عبر مختلف مدن المملكة المتحدة، مع نموذج تواصل واستشارات هندسية سريع.',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    tags: ['HTML5', 'Tailwind CSS', 'JavaScript (ES6+)', 'Cinzel & Poppins Typography', 'Fit-Out & Luxury UI'],
    features: [
      'تصميم فاخر بألوان كلاسيكية (Gold & Navy) يعكس فخامة التشطيبات البريطانية',
      'يتضمن آلة حاسبة تكاليف دقيقة مخصصة (Tito\'s Precision Cost Estimator) مع إصدار فواتير رسمي',
      'معرض أعمال ومشاريع بتصنيفات متجاوبة وسريعة التصفح على الهواتف',
      'نموذج طلب عروض أسعار تفاعلي للمشاريع السكنية والتجارية',
      'منشور ومتاح حياً على Vercel مع سرعة استجابة فائقة'
    ],
    liveUrl: 'https://titos-bay.vercel.app/',
    codeUrl: '#'
  },
  'project-2': {
    title: 'مركز "ابتسامة النيل" لطب وجراحة الأسنان',
    category: 'موقع طبي ونظام حجز مواعيد ذكي',
    tag: 'corporate',
    shortDesc: 'بوابة إلكترونية متكاملة لعيادة أسنان تتيح للمرضى حجز المواعيد، مقارنة صور قبل وبعد العلاج، واستلام إيصال رقمي فوري.',
    fullDesc: 'صفحة هبوط وموقع طبي تفاعلي صممه وبرمجه محمد وهيب لمركز طب أسنان متقدم (Nile Smile Dental Clinic). يشتمل على عارض مقارنة تفاعلي لصور الحالات (Before/After Slider بالسحب)، ونظام فلترة ذكي للخدمات الطبية، ونظام حجز إلكتروني متكامل يصدر إيصال حجز رقمي مؤكد مع خيار المتابعة والتأكيد عبر واتساب وطباعة الكوبون.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
    tags: ['HTML5 / RTL', 'Tailwind CSS', 'JavaScript (ES6+)', 'Before/After Slider', 'Digital Voucher System'],
    features: [
      'نظام حجز مواعيد استشاريين متكامل مع توليد إيصال رقمي مؤكد بكود حجز',
      'عارض مقارنة تفاعلي بالسحب (Before / After Slider) لنتائج تجميل الأسنان',
      'تصفية فورية للخدمات الطبية مع تعبئة تلقائية لنموذج الحجز',
      'شريط سفلي عائم للهواتف الذكية للوصول السريع ومحادثة واتساب فورية'
    ],
    liveUrl: 'https://my-ten-ashy.vercel.app/',
    codeUrl: '#'
  },
  'project-3': {
    title: 'متجر "تيك هاب" (TechHub) للإلكترونيات الذكية',
    category: 'متجر إلكتروني متكامل',
    tag: 'ecommerce',
    shortDesc: 'متجر إلكتروني عصري وفائق السرعة للإلكترونيات والأجهزة الذكية والساعات وسماعات الصوت بنمط Stitch UI المبتكر.',
    fullDesc: 'متجر إلكتروني متكامل ومتقدم في مجال الإلكترونيات والتقنيات العصرية (TechHub Store) صممه وبرمجه محمد وهيب. يتميز بسلة تسوق تفاعلية سريعة، شريط إعلانات علوي، تصنيف ذكي للمنتجات، وبطاقات منتجات غنية تدعم الشراء بنقرة واحدة، مع مراعاة أعلى معايير التجاوب على الهواتف.',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
    tags: ['E-Commerce UI', 'Tailwind CSS', 'JavaScript (ES6+)', 'Interactive Cart', 'Stitch UI Style'],
    features: [
      'سلة تسوق عائمة ومحدثة لحظياً بدون الحاجة لإعادة تحميل الصفحة',
      'تصفية سريعة للمنتجات (ساعات ذكية، سماعات، أجهزة منزلية، مستلزمات عمل)',
      'شريط عروض وتخفيضات تفاعلي ونظام وسوم الخصومات الفورية',
      'مُحسّن لمحركات البحث وسريع التحميل على خوادم Vercel العالمية'
    ],
    liveUrl: 'https://techhub-umber.vercel.app/',
    codeUrl: '#'
  },
  'project-4': {
    title: 'بوابة ومعرض الأعمال الرقمي "محمد وهيب"',
    category: 'تطبيق ويب وصفحة هبوط تفاعلية',
    tag: 'webapp',
    shortDesc: 'المنصة الرسمية لمعرض أعمال وحلول الويب لمحمد وهيب بدعم كامل لـ RTL والوضع الليلي وتصفية المشاريع.',
    fullDesc: 'بوابة إلكترونية ومعرض أعمال شخصي لمحمد وهيب تم تطويره ليكون نموذجاً حياً لأعلى معايير تصميم الواجهات وتجربة المستخدم. يحتوي على نظام متكامل للتصفية الديناميكية، نوافذ منبثقة تفاعلية للمشاريع، عدادات رقمية متحركة، ونموذج تواصل ذكي مع التحقق الفوري.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    tags: ['Full RTL Support', 'Tailwind CSS', 'Vanilla JavaScript', 'Dark & Light Mode', 'Vercel Deployed'],
    features: [
      'دعم كامل للوضع الليلي والنهاري مع حفظ التفضيل عبر LocalStorage',
      'تأثيرات زجاجية راقية (Glassmorphism) مع رسوم متحركة خفيفة وناعمة',
      'نموذج تواصل تفاعلي ذكي يتحقق من صحة المدخلات ويصدر إشعار Toast',
      'متوافق 100% مع معايير الأداء والسرعة في Google PageSpeed'
    ],
    liveUrl: 'https://mohamed-waheb.vercel.app/',
    codeUrl: '#'
  }
};

/* ==========================================================================
   1. التبديل بين الوضع الليلي والنهاري (Theme Toggle)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  if (!themeToggleBtn) return;

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    if (themeIcon) themeIcon.className = 'fas fa-moon text-yellow-400';
  } else {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    if (themeIcon) themeIcon.className = 'fas fa-sun text-yellow-400';
  }

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      localStorage.setItem('theme', 'light');
      if (themeIcon) themeIcon.className = 'fas fa-moon text-yellow-400';
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
      localStorage.setItem('theme', 'dark');
      if (themeIcon) themeIcon.className = 'fas fa-sun text-yellow-400';
    }
  });
}

/* ==========================================================================
   2. قائمة الهواتف الذكية (Mobile Navigation Menu)
   ========================================================================== */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;

  if (!mobileMenuBtn || !mobileMenu) return;

  const toggleMenu = () => {
    const isOpen = !mobileMenu.classList.contains('hidden');
    if (isOpen) {
      mobileMenu.classList.add('hidden');
      if (menuIcon) menuIcon.className = 'fas fa-bars text-xl';
    } else {
      mobileMenu.classList.remove('hidden');
      if (menuIcon) menuIcon.className = 'fas fa-times text-xl';
    }
  };

  mobileMenuBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      if (menuIcon) menuIcon.className = 'fas fa-bars text-xl';
    });
  });

  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target) && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      if (menuIcon) menuIcon.className = 'fas fa-bars text-xl';
    }
  });
}

/* ==========================================================================
   3. شريط التنقل وتحديد الأقسام النشطة (Sticky Navbar & ScrollSpy)
   ========================================================================== */
function initScrollSpy() {
  const navbar = document.getElementById('mainNav');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('shadow-lg', 'bg-slate-900/95', 'border-slate-800');
      } else {
        navbar.classList.remove('shadow-lg');
      }
    }

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active', 'text-sky-400');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active', 'text-sky-400');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   4. تصفية وتصنيف المشاريع (Portfolio Filter)
   ========================================================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');

  if (!filterBtns.length || !projectItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active', 'bg-sky-500', 'text-white', 'shadow-md', 'shadow-sky-500/25');
        b.classList.add('bg-slate-800/80', 'text-slate-300', 'hover:bg-slate-700');
      });

      btn.classList.add('active', 'bg-sky-500', 'text-white', 'shadow-md', 'shadow-sky-500/25');
      btn.classList.remove('bg-slate-800/80', 'text-slate-300', 'hover:bg-slate-700');

      const filterValue = btn.getAttribute('data-filter');

      projectItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category').split(' ');
        item.classList.remove('fade-in');

        if (filterValue === 'all' || itemCategories.includes(filterValue)) {
          item.classList.remove('hide');
          setTimeout(() => {
            item.classList.add('fade-in');
          }, 10);
        } else {
          item.classList.add('hide');
        }
      });
    });
  });
}

/* ==========================================================================
   5. نافذة تفاصيل المشروع المنبثقة (Project Details Modal)
   ========================================================================== */
function initProjectModal() {
  const modal = document.getElementById('projectModal');
  const modalCloseBtn = document.getElementById('closeModalBtn');
  const detailButtons = document.querySelectorAll('.view-details-btn');

  if (!modal) return;

  const modalTitle = document.getElementById('modalTitle');
  const modalCategory = document.getElementById('modalCategory');
  const modalImage = document.getElementById('modalImage');
  const modalDescription = document.getElementById('modalDescription');
  const modalTags = document.getElementById('modalTags');
  const modalFeatures = document.getElementById('modalFeatures');
  const modalLiveLink = document.getElementById('modalLiveLink');
  const modalCodeLink = document.getElementById('modalCodeLink');

  detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-id');
      const data = projectsData[projectId];
      if (!data) return;

      if (modalTitle) modalTitle.textContent = data.title;
      if (modalCategory) modalCategory.textContent = data.category;
      if (modalImage) {
        modalImage.src = data.image;
        modalImage.alt = data.title;
      }
      if (modalDescription) modalDescription.textContent = data.fullDesc;

      if (modalTags) {
        modalTags.innerHTML = data.tags
          .map(tag => `<span class="px-3 py-1 rounded-full text-xs font-semibold bg-sky-500/10 text-sky-400 border border-sky-500/20">${tag}</span>`)
          .join('');
      }

      if (modalFeatures) {
        modalFeatures.innerHTML = data.features
          .map(feature => `<li class="flex items-start gap-2 text-slate-300 text-sm"><i class="fas fa-check-circle text-emerald-400 mt-1"></i> <span>${feature}</span></li>`)
          .join('');
      }

      if (modalLiveLink) {
        modalLiveLink.href = data.liveUrl;
        modalLiveLink.target = '_blank';
      }
      if (modalCodeLink) modalCodeLink.href = data.codeUrl;

      modal.classList.remove('hidden');
      modal.classList.add('flex');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  };

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. التحقق من نموذج التواصل وإرساله (Contact Form Validation)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameInput = document.getElementById('senderName');
    const emailInput = document.getElementById('senderEmail');
    const messageInput = document.getElementById('senderMessage');
    const submitBtn = document.getElementById('submitBtn');

    let isValid = true;

    if (!nameInput.value.trim() || nameInput.value.trim().length < 3) {
      showInputError(nameInput, 'يرجى إدخال اسمك الكريم (3 أحرف على الأقل)');
      isValid = false;
    } else {
      clearInputError(nameInput);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      showInputError(emailInput, 'يرجى إدخال بريد إلكتروني صحيح وموثوق');
      isValid = false;
    } else {
      clearInputError(emailInput);
    }

    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      showInputError(messageInput, 'يرجى كتابة تفاصيل مشروعك أو استفسارك (10 أحرف على الأقل)');
      isValid = false;
    } else {
      clearInputError(messageInput);
    }

    if (!isValid) return;

    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
      </svg>
      جاري إرسال رسالتك...
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnContent;
      form.reset();
      showToast('شكراً لتواصلك! تم استلام رسالتك بنجاح وسيتواصل معك محمد وهيب خلال 24 ساعة.');
    }, 1200);
  });

  function showInputError(input, message) {
    input.classList.add('border-rose-500', 'focus:ring-rose-500');
    let errorMsg = input.parentElement.querySelector('.error-msg');
    if (!errorMsg) {
      errorMsg = document.createElement('span');
      errorMsg.className = 'error-msg text-xs text-rose-400 mt-1 block';
      input.parentElement.appendChild(errorMsg);
    }
    errorMsg.textContent = message;
  }

  function clearInputError(input) {
    input.classList.remove('border-rose-500', 'focus:ring-rose-500');
    const errorMsg = input.parentElement.querySelector('.error-msg');
    if (errorMsg) errorMsg.remove();
  }
}

/* ==========================================================================
   إشعار منبثق عند إتمام الإجراء (Toast Notification)
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'fixed bottom-6 left-6 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-4 rounded-xl shadow-2xl transition-all duration-300';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <i class="fas fa-check-circle text-2xl"></i>
    <div>
      <p class="font-bold text-sm font-heading">تمت العملية بنجاح</p>
      <p class="text-xs text-emerald-100">${message}</p>
    </div>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4500);
}

/* ==========================================================================
   7. عداد الإحصائيات التفاعلي (Animated Counters)
   ========================================================================== */
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.counter-value');
  let hasAnimated = false;

  const handleScroll = () => {
    if (hasAnimated || !counters.length) return;

    const firstCounter = counters[0];
    const rect = firstCounter.getBoundingClientRect();

    if (rect.top <= window.innerHeight - 50) {
      hasAnimated = true;

      counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 1800;
        const step = target / (duration / 25);
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            counter.textContent = target + (counter.getAttribute('data-suffix') || '');
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current) + (counter.getAttribute('data-suffix') || '');
          }
        }, 25);
      });

      window.removeEventListener('scroll', handleScroll);
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll();
}

/* ==========================================================================
   8. زر العودة للأعلى (Back to Top Button)
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
      backToTopBtn.classList.remove('opacity-0', 'invisible');
      backToTopBtn.classList.add('opacity-100', 'visible');
    } else {
      backToTopBtn.classList.add('opacity-0', 'invisible');
      backToTopBtn.classList.remove('opacity-100', 'visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
