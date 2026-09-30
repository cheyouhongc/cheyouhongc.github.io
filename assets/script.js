/* ==========================================================================
   車宥鋐 | 魔術方塊選手  —  互動腳本
   --------------------------------------------------------------------------
   ★★★  想更新成績資料？請只改下面的 SITE_DATA 就好 ★★★
   ========================================================================== */

/* --------------------------------------------------------------------------
   SITE DATA  ──  所有可編輯內容集中在這裡
   --------------------------------------------------------------------------
   時間格式說明：
     · 'time' → 把「秒數」自動轉成 2:13.58 這種 WCA 標準格式
     · 'int'  → 整數
   -------------------------------------------------------------------------- */
const SITE_DATA = {

    /* --- 基本資料 --- */
    name: '車宥鋐',
    nameEn: 'Yu-Hung Che',
    school: '澎湖科技大學',
    wcaId: '2019CHEY01',
    region: '中華台北',

    /* --- Hero 三／四個重點數字（會自動跑數字動畫） --- */
    stats: [
        { label: '世界紀錄 · 五魔方', value: 133.58, format: 'time' },  // 2:13.58
        { label: '個人平均 · 五魔方', value: 152.17, format: 'time' },  // 2:32.17
        { label: 'WCA 參賽場次',       value: 1,      format: 'int'  },
        { label: 'WCA 最佳排名',       value: 23,     format: 'rank' },
    ],

    /* --- 賽事成績卡片 --- */
    achievements: [
        {
            tone: 'gold',
            icon: '🏆',
            title: '五魔方個人世界紀錄',
            event: '2:13.58',
            time: 'Megaminx WR',
            date: '目前個人最佳',
        },
        {
            tone: 'silver',
            icon: '🎯',
            title: 'NxN 2019 · 台灣站',
            event: '第 23 名',
            time: '五魔方單人項目',
            date: 'WCA 官方賽事',
        },
        {
            tone: 'bronze',
            icon: '🎓',
            title: '澎湖科技大學',
            event: '在學選手',
            time: '持續精進中',
            date: '訓練基地',
        },
    ],

    /* --- 專長進度條（percent 0–100） --- */
    skills: [
        { name: '五魔方 Megaminx',      percent: 95 },
        { name: '2x2 速解',             percent: 90 },
        { name: '3x3 速解',             percent: 85 },
        { name: '4x4 速解',             percent: 78 },
        { name: '金字塔魔方 Pyraminx',  percent: 70 },
    ],

    /* --- 精彩時刻圖片 ---
       往下加就對了，只要把圖片丟進 assets/img/ 再多一行物件即可。
       src     : 圖片路徑
       title   : 滑鼠移入時顯示的標題
       desc    : 標題下方的小字說明                                  */
    gallery: [
        { src: 'assets/img/wca-profile.png', title: 'WCA 個人檔案',    desc: '世界魔術方塊協會 官方登錄紀錄' },
        { src: 'assets/img/megaminx.jpg',    title: '五魔方 Megaminx', desc: 'GAN MGX Maglev 旗艦競速方' },
        { src: 'assets/img/gan356.jpg',      title: '主力競速方',      desc: 'GAN 356 RS 日常練習夥伴' },
        { src: 'assets/img/cubes-chart.jpg', title: '方塊尺寸圖鑑',    desc: '從 2x2 到 12 面體的世界紀錄方' },
    ],

    /* --- 聯絡方式 --- */
    contact: [
        { icon: '📧', label: 'Email',     value: 'cheyouhongc25@gmail.com', href: 'mailto:cheyouhongc25@gmail.com' },
        { icon: '📱', label: '電話',       value: '0925-070-205',            href: 'tel:0925070205' },
        { icon: '💻', label: 'GitHub',    value: 'github.com/cheyouhongc',  href: 'https://github.com/cheyouhongc', external: true },
        { icon: '📍', label: '學校',       value: '澎湖科技大學',              href: null },
    ],
};

/* --------------------------------------------------------------------------
   以下為程式邏輯，通常不需要修改
   -------------------------------------------------------------------------- */
(function () {
    'use strict';

    /* ---------- 小工具 ---------- */
    const $  = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    /** 秒數 → WCA 時間格式 (133.58 → "2:13.58") */
    function formatTime(totalSeconds) {
        const m = Math.floor(totalSeconds / 60);
        const s = (totalSeconds % 60).toFixed(2).padStart(5, '0');
        return `${m}:${s}`;
    }

    /** 依 format 設定輸出字串 */
    function formatValue(value, format) {
        switch (format) {
            case 'time': return formatTime(value);
            case 'rank': return `第 ${value} 名`;
            case 'int':
            default:     return String(value);
        }
    }

    /* ======================================================================
       1. 渲染：Hero 數據
       ====================================================================== */
    function renderStats() {
        const wrap = $('#heroStats');
        if (!wrap) return;

        wrap.innerHTML = SITE_DATA.stats.map((s, i) => `
            <div class="stat" data-reveal style="transition-delay:${i * 90}ms">
                <span class="stat-number" data-count="${s.value}" data-format="${s.format || 'int'}">0</span>
                <span class="stat-label">${s.label}</span>
            </div>
        `).join('');
    }

    /* ======================================================================
       2. 渲染：賽事成績卡片
       ====================================================================== */
    function renderAchievements() {
        const wrap = $('#achievementsGrid');
        if (!wrap) return;

        wrap.innerHTML = SITE_DATA.achievements.map((a, i) => `
            <div class="card achievement-card ${a.tone}" data-reveal style="transition-delay:${i * 120}ms">
                <span class="medal">${a.icon}</span>
                <h3>${a.title}</h3>
                <p class="achievement-event">${a.event}</p>
                <p class="achievement-time">${a.time}</p>
                <p class="achievement-date">${a.date}</p>
            </div>
        `).join('');
    }

    /* ======================================================================
       3. 渲染：專長進度條
       ====================================================================== */
    function renderSkills() {
        const wrap = $('#skillsList');
        if (!wrap) return;

        wrap.innerHTML = SITE_DATA.skills.map((s, i) => `
            <div class="skill-item" data-reveal style="transition-delay:${i * 80}ms">
                <span class="skill-name">${s.name}</span>
                <div class="skill-bar">
                    <div class="skill-progress" data-percent="${s.percent}"></div>
                </div>
            </div>
        `).join('');
    }

    /* ======================================================================
       4. 渲染：圖片集
       ====================================================================== */
    function renderGallery() {
        const wrap = $('#galleryGrid');
        if (!wrap) return;

        wrap.innerHTML = SITE_DATA.gallery.map((g, i) => `
            <figure class="gallery-item" data-reveal style="transition-delay:${(i % 3) * 110}ms"
                    data-full="${g.src}" data-title="${g.title}">
                <img src="${g.src}" alt="${g.title}" class="gallery-img" loading="lazy">
                <figcaption class="gallery-overlay">
                    <h3>${g.title}</h3>
                    <p>${g.desc}</p>
                </figcaption>
            </figure>
        `).join('');
    }

    /* ======================================================================
       5. 渲染：聯絡資訊
       ====================================================================== */
    function renderContact() {
        const wrap = $('#contactList');
        if (!wrap) return;

        wrap.innerHTML = SITE_DATA.contact.map((c, i) => {
            const inner = `
                <span class="contact-icon">${c.icon}</span>
                <span>
                    <span class="contact-label">${c.label}</span>
                    ${c.value}
                </span>`;

            const node = c.href
                ? `<a href="${c.href}"${c.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${inner}</a>`
                : `<div class="contact-static">${inner}</div>`;

            return `<div class="contact-item" data-reveal style="transition-delay:${i * 90}ms">${node}</div>`;
        }).join('');
    }

    /* ======================================================================
       6. 填入純文字欄位
       ====================================================================== */
    function renderText() {
        const map = {
            '[data-name]':    SITE_DATA.name,
            '[data-name-en]': SITE_DATA.nameEn,
            '[data-school]':  SITE_DATA.school,
            '[data-wca-id]':  SITE_DATA.wcaId,
        };

        Object.entries(map).forEach(([sel, text]) => {
            $$(sel).forEach(el => { el.textContent = text; });
        });

        // Hero 副標題：WCA 認證選手 | 學校
        const sub = $('#heroSubtitle');
        if (sub) {
            sub.innerHTML = `WCA 認證選手 <span class="dot"></span> ${SITE_DATA.school}`;
        }

        const year = $('#footerYear');
        if (year) year.textContent = new Date().getFullYear();

        document.title = `${SITE_DATA.name} | 魔術方塊選手`;
    }

    /* ======================================================================
       7. 數字計數動畫
       ====================================================================== */
    function animateCounters(root = document) {
        $$('[data-count]', root).forEach(el => {
            if (el.dataset.done) return;
            el.dataset.done = '1';

            const target = parseFloat(el.dataset.count);
            const format = el.dataset.format || 'int';
            const duration = 1600;
            let start = null;

            const step = (ts) => {
                if (start === null) start = ts;
                const p = Math.min((ts - start) / duration, 1);
                const eased = 1 - Math.pow(1 - p, 3);          // easeOutCubic
                el.textContent = formatValue(target * eased, format);

                if (p < 1) requestAnimationFrame(step);
                else el.textContent = formatValue(target, format);
            };

            requestAnimationFrame(step);
        });
    }

    /* ======================================================================
       8. 進度條動畫
       ====================================================================== */
    function animateBars(root = document) {
        $$('.skill-progress', root).forEach(bar => {
            if (bar.dataset.done) return;
            bar.dataset.done = '1';
            bar.style.setProperty('--target-width', bar.dataset.percent + '%');
            requestAnimationFrame(() => {
                bar.style.width = bar.dataset.percent + '%';
            });
        });
    }

    /* ======================================================================
       9. 滾動進場觀察器
       ====================================================================== */
    function initReveal() {
        const items = $$('[data-reveal]');
        if (!items.length) return;

        /** 立即顯示全部（不支援 IO 時的退路） */
        const showAll = () => {
            items.forEach(el => {
                el.classList.add('visible');
                el.style.transitionDelay = '0ms';
                animateCounters(el);
                animateBars(el);
            });
        };

        // 不支援 IntersectionObserver 時直接顯示
        if (!('IntersectionObserver' in window)) return showAll();

        const io = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const el = entry.target;

                // 依序出場的延遲時間已在各 render 函式內寫在 inline style
                el.classList.add('visible');
                animateCounters(el);
                animateBars(el);

                obs.unobserve(el);
            });
        }, { threshold: 0.16, rootMargin: '0px 0px -40px 0px' });

        items.forEach(el => io.observe(el));

        /* 保險：若使用者完全沒有捲動（例如鍵盤直接跳到頁尾），
           觀察器可能一直不觸發，數字會卡在 0。
           8 秒後把仍未進場的元素直接補上最終值。 */
        setTimeout(() => {
            $$('[data-count]:not([data-done])').forEach(el => {
                el.dataset.done = '1';
                el.textContent = formatValue(parseFloat(el.dataset.count), el.dataset.format || 'int');
            });
            $$('.skill-progress:not([data-done])').forEach(bar => {
                bar.dataset.done = '1';
                bar.style.width = bar.dataset.percent + '%';
            });
        }, 8000);
    }

    /* ======================================================================
       10. 導航：捲動陰影 + 當前區段高亮
       ====================================================================== */
    function initNav() {
        const nav = $('.navbar');
        const links = $$('.nav-link');
        const sections = links
            .map(l => {
                const id = l.getAttribute('href');
                return id && id.startsWith('#') ? $(id) : null;
            })
            .filter(Boolean);

        const onScroll = () => {
            if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);

            // 找出目前視線範圍內的區段
            const mark = window.scrollY + window.innerHeight * 0.32;
            let currentId = sections.length ? sections[0].id : null;

            sections.forEach(sec => {
                if (sec.offsetTop <= mark) currentId = sec.id;
            });

            links.forEach(l => {
                l.classList.toggle('active', l.getAttribute('href') === '#' + currentId);
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }

    /* ======================================================================
       11. 行動版選單
       ====================================================================== */
    function initMobileNav() {
        const btn = $('#hamburger');
        const menu = $('.nav-menu');
        if (!btn || !menu) return;

        const close = () => {
            menu.classList.remove('open');
            btn.classList.remove('open');
            btn.setAttribute('aria-expanded', 'false');
        };

        btn.addEventListener('click', () => {
            const open = menu.classList.toggle('open');
            btn.classList.toggle('open', open);
            btn.setAttribute('aria-expanded', String(open));
        });

        $$('.nav-link', menu).forEach(l => l.addEventListener('click', close));

        document.addEventListener('click', e => {
            if (!menu.contains(e.target) && !btn.contains(e.target)) close();
        });

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') close();
        });

        // 視窗放大回桌面尺寸時自動關閉
        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) close();
        });
    }

    /* ======================================================================
       12. 圖片燈箱
       ====================================================================== */
    function initLightbox() {
        let box, img, cap, lastFocus;

        const build = () => {
            box = document.createElement('div');
            box.className = 'lightbox';
            box.setAttribute('role', 'dialog');
            box.setAttribute('aria-modal', 'true');
            box.innerHTML = `
                <button class="lightbox-close" aria-label="關閉">&times;</button>
                <figure class="lightbox-inner">
                    <img alt="">
                    <figcaption></figcaption>
                </figure>`;

            // 樣式直接注入，避免再多一個 CSS 檔
            const style = document.createElement('style');
            style.textContent = `
                .lightbox{position:fixed;inset:0;z-index:10000;display:none;
                    align-items:center;justify-content:center;padding:32px;
                    background:rgba(3,4,8,.93);backdrop-filter:blur(10px);
                    animation:lbIn .3s cubic-bezier(.22,1,.36,1)}
                .lightbox.open{display:flex}
                .lightbox-inner{max-width:1000px;width:100%;margin:0;text-align:center}
                .lightbox-inner img{width:100%;max-height:80vh;object-fit:contain;
                    border-radius:14px;border:1px solid rgba(255,255,255,.12);
                    box-shadow:0 30px 80px rgba(0,0,0,.7)}
                .lightbox-inner figcaption{margin-top:18px;color:#a6b0cc;font-size:.95rem;
                    letter-spacing:.04em}
                .lightbox-close{position:absolute;top:18px;right:24px;
                    width:46px;height:46px;font-size:2rem;line-height:1;
                    color:#f0f4ff;background:rgba(255,255,255,.08);
                    border:1px solid rgba(255,255,255,.14);border-radius:50%;
                    transition:background .25s,transform .25s}
                .lightbox-close:hover{background:rgba(255,255,255,.18);transform:rotate(90deg)}
                @keyframes lbIn{from{opacity:0}to{opacity:1}}
                @media(max-width:560px){.lightbox{padding:16px}
                    .lightbox-close{top:10px;right:12px;width:40px;height:40px}}
            `;
            document.head.appendChild(style);
            document.body.appendChild(box);

            img  = $('img', box);
            cap  = $('figcaption', box);

            box.addEventListener('click', e => {
                if (e.target === box || e.target.closest('.lightbox-close')) close();
            });
            document.addEventListener('keydown', e => {
                if (e.key === 'Escape' && box.classList.contains('open')) close();
            });
        };

        const open = (item) => {
            if (!box) build();
            lastFocus = document.activeElement;
            img.src = item.dataset.full;
            img.alt = item.dataset.title || '';
            cap.textContent = item.dataset.title || '';
            box.classList.add('open');
            document.body.style.overflow = 'hidden';
            $('.lightbox-close', box).focus();
        };

        const close = () => {
            if (!box) return;
            box.classList.remove('open');
            document.body.style.overflow = '';
            lastFocus?.focus();
        };

        document.addEventListener('click', e => {
            const item = e.target.closest('.gallery-item');
            if (item) open(item);
        });
    }

    /* ======================================================================
       13. 啟動
       ====================================================================== */
    function init() {
        renderText();
        renderStats();
        renderAchievements();
        renderSkills();
        renderGallery();
        renderContact();

        initNav();
        initMobileNav();
        initReveal();
        initLightbox();

        // 視覺動態預設不載入字體時，避免版面跳動
        if (document.fonts?.ready) {
            document.fonts.ready.then(() => document.body.classList.add('fonts-ready'));
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
