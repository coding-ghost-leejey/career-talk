document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     0. Theme Switcher (Light mode default)
     ========================================== */
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const currentTheme = localStorage.getItem('theme');

  // Check saved theme
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      
      // Save current theme preference
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
  }


  /* ==========================================
     1. Scroll & Indicator Interaction
     ========================================== */
  const slides = document.querySelectorAll('section.slide');
  const navDots = document.querySelectorAll('.nav-dot');
  const animateElements = document.querySelectorAll('.animate-on-scroll');

  // Active section tracking & Scroll trigger animation
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -20% 0px', // Trigger slightly before center
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const slideId = entry.target.id;
        const index = parseInt(slideId.replace('slide-', ''));
        
        // Update nav dots
        navDots.forEach(dot => dot.classList.remove('active'));
        if (navDots[index]) {
          navDots[index].classList.add('active');
        }

        // Add visible animations
        entry.target.querySelectorAll('.animate-on-scroll').forEach(el => {
          el.classList.add('visible');
        });

        // Trigger typewriter on slide 13
        if (index === 13) {
          startTypewriter();
        }
      }
    });
  }, observerOptions);

  slides.forEach(slide => observer.observe(slide));

  // Nav dot click - smooth scroll
  navDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const slideIndex = dot.getAttribute('data-slide');
      const targetSlide = document.getElementById(`slide-${slideIndex}`);
      if (targetSlide) {
        targetSlide.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });


  /* ==========================================
     2. Hero 3D Card Effect (0. Cover)
     ========================================== */
  const coverSection = document.getElementById('slide-0');
  const heroCard = document.getElementById('hero-card');

  if (coverSection && heroCard) {
    coverSection.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const cardX = rect.left + rect.width / 2;
      const cardY = rect.top + rect.height / 2;
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const angleX = (cardY - mouseY) / 12;
      const angleY = (mouseX - cardX) / 12;

      heroCard.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });

    coverSection.addEventListener('mouseleave', () => {
      heroCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
  }


  /* ==========================================
     3. Icebreaking 1 Poll (1. Icebreaking)
     ========================================== */
  const questionItems = document.querySelectorAll('.question-item');
  const pollContainer = document.getElementById('poll-container');

  const pollData = {
    1: {
      question: "오늘 아침 눈뜨자마자 가장 먼저 연 앱은 무엇인가요?",
      subInfo: "공동 연구 결과: 60%가 기상 직후 스마트폰 확인",
      options: [
        { text: "메신저 / SNS (카카오톡 등)", percent: 41.6, insight: "정보의 생산이 아닌 단순 '확인(Check)'을 위해 가장 먼저 메신저를 엽니다." },
        { text: "시간 / 날씨 확인", percent: 41.6, insight: "시간과 기상 정보를 보기 위한 무의식적이고 즉각적인 생활 루틴 확인입니다." },
        { text: "뉴스 및 정보 검색", percent: 16.6, insight: "기상 즉시 포털 뉴스를 통해 세상의 빠른 변화를 파악하려는 욕구입니다." },
        { text: "기타 생산성 / 알람 해제", percent: 0.2, insight: "알람 해제 이후 즉시 다른 확인용 서비스로 전환되는 양상을 보입니다." }
      ]
    },
    2: {
      question: "하루 중 폰에서 가장 오래 켜두는 앱은 어떤 건가요?",
      subInfo: "글로벌 분석: 사용자는 소수의 앱에 체류시간을 집중함",
      options: [
        { text: "YouTube / TikTok (동영상)", percent: 40, insight: "숏폼과 무한 알고리즘 추천이 사용자의 이탈을 방지하고 체류를 유도합니다." },
        { text: "Instagram / SNS", percent: 28, insight: "끝이 없고 계속 새로고침되는 피드 구조가 끝없이 스크롤하게 만듭니다." },
        { text: "카카오톡 / 메시지", percent: 18, insight: "지속적인 대화 및 알림 루프가 사용자를 계속 앱에 머무르게 설계합니다." },
        { text: "기타 학습 / 게임 / 브라우저", percent: 14, insight: "체류를 늘리는 뚜렷한 가치(재미, 보상 등)가 명확한 서비스들입니다." }
      ]
    },
    3: {
      question: "그 앱을 켜자마자 제일 먼저 습관적으로 누르는 버튼은?",
      subInfo: "행동 연구: 켜자마자 바로 누르는 Checking Habit 패턴",
      options: [
        { text: "안 읽은 채팅방 / 알림 배지", percent: 45, insight: "가장 먼저 보는 빨간 배지나 알림을 인지적 스트레스 완화를 위해 누릅니다." },
        { text: "홈 Feed / 스토리 영역", percent: 25, insight: "엄지손가락이 닿기 쉬운 최적의 위치에서 최신 소식을 새로고침합니다." },
        { text: "Shorts / 추천 썸네일", percent: 20, insight: "메인 화면에서 가장 시선을 끄는 비주얼 요소와 추천 경로를 즉각 누릅니다." },
        { text: "검색창 / 장바구니", percent: 10, insight: "앱을 둘러보기 전에 이미 목적하고 들어온 특정 버튼으로 즉시 이동합니다." }
      ]
    }
  };

  function renderPoll(questionId) {
    const data = pollData[questionId];
    if (!data || !pollContainer) return;

    pollContainer.innerHTML = `
      <div class="poll-header-info">
        <span class="poll-badge"><i class="fa-solid fa-square-poll-vertical"></i> RESEARCH</span>
        <div class="poll-subinfo">${data.subInfo}</div>
      </div>
      <div class="poll-question">${data.question}</div>
      <div class="poll-options">
        ${data.options.map((opt, i) => `
          <button class="poll-option-btn" data-index="${i}">
            <span class="btn-txt">
              <span>${opt.text}</span>
              <span class="percent-val" style="display:none; font-weight:700;">${opt.percent}%</span>
            </span>
            <span class="progress-bar"></span>
          </button>
        `).join('')}
      </div>
      <div class="phone-footer" id="poll-footer">보기를 눌러 UX 리서치 분석 데이터를 확인해 보세요.</div>
    `;

    // Attach click events to poll options
    const optionBtns = pollContainer.querySelectorAll('.poll-option-btn');
    const pollFooter = pollContainer.querySelector('#poll-footer');

    optionBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const selectedIndex = parseInt(this.getAttribute('data-index'));
        
        // Toggle selected state
        optionBtns.forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');

        // Reveal percentages with smooth bar fill
        optionBtns.forEach(b => {
          const idx = parseInt(b.getAttribute('data-index'));
          const pVal = b.querySelector('.percent-val');
          const bar = b.querySelector('.progress-bar');
          
          if (pVal && bar) {
            pVal.style.display = 'inline';
            bar.style.width = `${data.options[idx].percent}%`;
          }
        });

        // Show UX Insight in the footer
        if (pollFooter) {
          pollFooter.classList.add('reveal-insight');
          pollFooter.innerHTML = `
            <div class="insight-label"><i class="fa-solid fa-lightbulb"></i> UX INSIGHT</div>
            <div class="insight-content">${data.options[selectedIndex].insight}</div>
          `;
        }
      });
    });
  }

  // Initial Poll Load
  renderPoll(1);

  // Question click switches poll
  questionItems.forEach(item => {
    item.addEventListener('click', function() {
      questionItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      const qId = this.getAttribute('data-q');
      renderPoll(qId);
    });
  });


  /* ==========================================
     4. Flip Cards (2. Icebreaking 2)
     ========================================== */
  const flipCards = document.querySelectorAll('.flip-card');
  flipCards.forEach(card => {
    card.addEventListener('click', function() {
      this.classList.toggle('flipped');
    });
  });


  /* ==========================================
     4-1. UI Core Principles (4. UI Core Principles Grid Feedback)
     ========================================== */
  const feedbackBtn = document.getElementById('principle-feedback-btn');

  if (feedbackBtn) {
    feedbackBtn.addEventListener('click', function() {
      if (this.classList.contains('loading') || this.classList.contains('success')) return;

      this.classList.add('loading');
      const btnTxt = this.querySelector('.btn-demo-txt');
      btnTxt.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> 결제 중...`;

      setTimeout(() => {
        this.classList.remove('loading');
        this.classList.add('success');
        btnTxt.innerHTML = `<i class="fa-solid fa-circle-check"></i> 결제 성공`;

        setTimeout(() => {
          this.classList.remove('success');
          btnTxt.innerHTML = `<i class="fa-solid fa-hand-pointer"></i> 결제 요청 터치`;
        }, 1800);
      }, 1000);
    });
  }


  /* ==========================================
     4-1-2. UX 5 Elements Interaction (5. UX 5 Elements)
     ========================================== */
  const pyramidLayers = document.querySelectorAll('.pyramid-layer');
  const detailCards = document.querySelectorAll('.ux-detail-card');

  if (pyramidLayers) {
    pyramidLayers.forEach(layer => {
      layer.addEventListener('click', function() {
        const layerNum = this.getAttribute('data-layer');

        // Toggle pyramid layers active
        pyramidLayers.forEach(l => l.classList.remove('active'));
        this.classList.add('active');

        // Toggle detail cards active
        if (detailCards) {
          detailCards.forEach(card => {
            if (card.getAttribute('data-layer') === layerNum) {
              card.classList.add('active');
            } else {
              card.classList.remove('active');
            }
          });
        }
      });
    });
  }


  /* ==========================================
     4-2. Double Diamond Interaction (6. Design Thinking & Double Diamond)
     ========================================== */
  const diamondCards = document.querySelectorAll('.diamond-card');
  const diamondLeft = document.querySelector('.diamond-block.shape-left');
  const diamondRight = document.querySelector('.diamond-block.shape-right');
  const stepDots = document.querySelectorAll('.step-dot');

  if (diamondCards) {
    diamondCards.forEach(card => {
      card.addEventListener('click', function() {
        const phase = this.getAttribute('data-phase');

        // Toggle cards
        diamondCards.forEach(c => c.classList.remove('active'));
        this.classList.add('active');

        // Toggle step dots
        if (stepDots) {
          stepDots.forEach(dot => {
            if (dot.getAttribute('data-phase') === phase) {
              dot.classList.add('active');
            } else {
              dot.classList.remove('active');
            }
          });
        }

        // Toggle Diamond blocks active highlighting
        if (phase === 'discover' || phase === 'define') {
          if (diamondLeft) diamondLeft.classList.add('active');
          if (diamondRight) diamondRight.classList.remove('active');
          
          // Toggle lines
          if (diamondLeft) {
            const lines = diamondLeft.querySelectorAll('.line-element');
            lines.forEach(l => {
              if (l.classList.contains(`line-${phase === 'discover' ? 'diverge' : 'converge'}`)) {
                l.classList.add('active');
              } else {
                l.classList.remove('active');
              }
            });
          }
        } else {
          if (diamondLeft) diamondLeft.classList.remove('active');
          if (diamondRight) diamondRight.classList.add('active');

          // Toggle lines
          if (diamondRight) {
            const lines = diamondRight.querySelectorAll('.line-element');
            lines.forEach(l => {
              if (l.classList.contains(`line-${phase === 'develop' ? 'diverge' : 'converge'}`)) {
                l.classList.add('active');
              } else {
                l.classList.remove('active');
              }
            });
          }
        }
      });
    });
  }


  /* ==========================================
     5. Cafe Analogy Tab Toggle (3. UI/UX Definition)
     ========================================== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const cafeVisualBox = document.getElementById('cafe-visual-box');
  const cafeTextBox = document.getElementById('cafe-text-box');

  const analogyTexts = {
    ui: {
      title: "UI (User Interface) — 눈에 보이는 물리적 설계",
      desc: "카페 인테리어, 메뉴판의 타이포그래피, 의자의 높낮이와 테이블의 간격, 아늑함을 주는 조명의 색상 등 눈과 피부에 직접 닿는 실체적인 디자인 규칙들입니다.",
      features: [
        "눈에 띄는 명확한 폰트와 레이아웃",
        "브랜드 아이덴티티가 묻어나는 키 컬러 매칭",
        "터치하기 쉬운 직관적인 버튼의 크기와 배치"
      ]
    },
    ux: {
      title: "UX (User Experience) — 여정에서 느끼는 경험",
      desc: "카페에 들어와서 혼잡하지 않게 주문을 하고, 찾던 조용한 좌석을 발견한 뒤, 나가기 전까지 대접받는 전체 흐름입니다. 앱 상에서는 스트레스 없이 즉시 원하는 목표를 완수하는 만족도입니다.",
      features: [
        "대기 없이 원클릭으로 결제하는 결제 플로우",
        "사용자가 길을 잃지 않는 명확한 정보 탐색 경로",
        "불편함을 느끼는 미세한 순간을 지우는 완만한 흐름"
      ]
    }
  };

  function renderAnalogy(tab) {
    if (!cafeTextBox || !cafeVisualBox) return;
    const data = analogyTexts[tab];

    cafeTextBox.innerHTML = `
      <div class="analogy-info">
        <h3>${data.title}</h3>
        <p>${data.desc}</p>
        <div class="feature-list">
          ${data.features.map(f => `
            <div class="feature-item">
              <i class="fa-solid fa-circle-check"></i>
              <span>${f}</span>
            </div>
          `).join('')}
        </div>
      </div>
      <div class="analogy-char-box">
        <img src="images/irangi_coffee.svg" alt="Coffee Irangi" class="analogy-char-img">
      </div>
    `;

    // Highlight visual styles
    if (tab === 'ui') {
      cafeVisualBox.className = 'display-visual highlight-ui';
    } else {
      cafeVisualBox.className = 'display-visual highlight-ux';
    }
  }

  // Initial Load
  renderAnalogy('ui');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      tabBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      const tabKey = this.getAttribute('data-tab');
      renderAnalogy(tabKey);
    });
  });


  /* ==========================================
     6. Runaway Button (5. Good vs Bad UX)
     ========================================== */
  const runBtn = document.getElementById('run-btn');
  const badZone = document.getElementById('bad-zone');
  const badHint = document.getElementById('bad-hint');
  const goodBtn = document.getElementById('good-btn');
  const goodMsg = document.getElementById('good-msg');

  if (runBtn && badZone && badHint) {
    runBtn.addEventListener('mouseenter', runaway);
    runBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Even if clicked (which is extremely hard), alert user
      alert("집념이 대단하시네요! 하지만 이런 불편한 버튼은 나쁜 사용성입니다.");
    });
  }

  function runaway() {
    const zoneRect = badZone.getBoundingClientRect();
    const btnRect = runBtn.getBoundingClientRect();

    // Calculate maximum boundaries inside the badUX zone
    const maxX = zoneRect.width - btnRect.width;
    const maxY = zoneRect.height - btnRect.height;

    // Generate random coordinates
    const newX = Math.max(10, Math.floor(Math.random() * maxX));
    const newY = Math.max(10, Math.floor(Math.random() * maxY));

    runBtn.style.left = `${newX}px`;
    runBtn.style.top = `${newY}px`;

    // Reveal warning hint
    badHint.classList.add('show');
  }

  if (goodBtn && goodMsg) {
    goodBtn.addEventListener('click', () => {
      goodMsg.classList.add('visible');
      goodBtn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        goodBtn.style.transform = 'scale(1)';
      }, 150);
    });
  }


  /* ==========================================
     7. Service Creation 6 Steps (6. Service process)
     ========================================== */
  const timelineNodes = document.querySelectorAll('.timeline-node');
  const timelineBar = document.getElementById('timeline-bar');
  const processCardsContainer = document.getElementById('process-cards');

  const processData = {
    1: {
      title: "Step 1. 리서치 (Research)",
      subtitle: "누구를 위해, 어떤 문제를 풀어야 하는가",
      desc: "방향성이 한 번 엇나가면 후속 작업이 전부 어긋납니다. 실제 타겟 사용자와 시장의 결핍을 예리하게 검출하는 기초 철학 단계입니다.",
      details: [
        { icon: "fa-solid fa-comments", title: "사용자 심층 인터뷰", desc: "실사용자 대상 대면 대화를 통해 진짜 잠재된 니즈 확인" },
        { icon: "fa-solid fa-clipboard-question", title: "데이터 설문조사", desc: "대규모 수치 통계를 수집하여 유의미한 정량 패턴 파악" },
        { icon: "fa-solid fa-chart-line", title: "경쟁사 전방위 분석", desc: "유사 서비스들이 가진 단점과 우수한 사용성 벤치마킹" },
        { icon: "fa-solid fa-database", title: "사용 지표 분석", desc: "앱 내부 유저 로그 데이터를 활용하여 막히는 지점을 파악" }
      ]
    },
    2: {
      title: "Step 2. 기획 및 전략 (Strategy)",
      subtitle: "무엇을 언제, 어떤 순서로 만들 것인가",
      desc: "리서치 자료를 조합해 명확한 한 문장의 과제를 도출하고, 팀원들과 함께 MVP(최소 기능 제품) 범위를 설정합니다.",
      details: [
        { icon: "fa-solid fa-bullseye", title: "핵심 과제 정의", desc: "우리가 해결해야 할 본질적 원인을 날카롭게 정리" },
        { icon: "fa-solid fa-star", title: "우선순위 정렬", desc: "개발 리소스와 기간을 고려하여 핵심 기능 먼저 개발 제안" },
        { icon: "fa-solid fa-route", title: "사용자 여정 맵", desc: "사용자가 전체 화면을 어떤 단계로 진입할지 로드맵 수립" },
        { icon: "fa-solid fa-handshake", title: "다직군 조율 회의", desc: "기획자, 마케터와 조율하여 구현 가능한 비즈니스 타겟 일치" }
      ]
    },
    3: {
      title: "Step 3. 구조 설계 (Information Architecture)",
      subtitle: "뼈대와 우선순위를 논리적으로 다듬기",
      desc: "색감이나 화려한 아이콘은 신경 쓰지 않습니다. 오직 '어느 위치에 어떤 데이터가 있어야 편한가' 정보 설계에만 초점을 맞춥니다.",
      details: [
        { icon: "fa-solid fa-sitemap", title: "정보 구조도 (I.A)", desc: "화면 단위들의 위계와 메뉴 계층을 입체적으로 정렬" },
        { icon: "fa-solid fa-border-all", title: "와이어프레임", desc: "핵심 버튼, 텍스트 상자 등을 흑백으로 간단히 시각화" },
        { icon: "fa-solid fa-eye", title: "초기 가독성 확인", desc: "시선이 자연스럽게 위에서 아래로 물 흐르듯 흘러가는지 테스트" },
        { icon: "fa-solid fa-arrows-split-up-and-left", title: "예외 흐름 체크", desc: "오류가 발생하거나 취소했을 때의 중간 경로 설계" }
      ]
    },
    4: {
      title: "Step 4. UI 비주얼 디자인 (Visual Design)",
      subtitle: "눈을 사로잡으며 브랜드를 일치시키는 단계",
      desc: "설계된 회색 뼈대에 고유한 타이포그래피, 가독성 높은 그리드, 브랜드를 대변하는 정교한 스타일을 씌워 활력을 부여합니다.",
      details: [
        { icon: "fa-solid fa-palette", title: "컬러 시스템 규정", desc: "의미와 상태에 부합하는 일관성 있는 색 적용" },
        { icon: "fa-solid fa-font", title: "서체 위계 디자인", desc: "글의 크기와 굵기를 활용하여 정보의 중요도 표시" },
        { icon: "fa-solid fa-shapes", title: "아이콘 및 자산화", desc: "인터페이스에 필요한 디자인 애셋을 규격화하여 구축" },
        { icon: "fa-solid fa-layer-group", title: "반응형 가이드", desc: "웹, 태블릿, 모바일 등 기기별 해상도 확장 가이드 마련" }
      ]
    },
    5: {
      title: "Step 5. 프로토타이핑 & 테스트 (Testing)",
      subtitle: "진짜 앱처럼 작동하게 만들어 관찰하기",
      desc: "Figma 등을 통해 각 화면을 선으로 엮어 흐름을 생성한 후, 타겟 사용자에게 전달하여 헤매는 시점을 면밀히 분석합니다.",
      details: [
        { icon: "fa-solid fa-bolt", title: "인터랙티브 목업", desc: "가상의 완성물처럼 작동하는 클릭형 대화식 시제품" },
        { icon: "fa-solid fa-users-viewfinder", title: "사용성 테스트 (UT)", desc: "유저가 과제를 수행하며 머뭇거리거나 헤매는 지점 분석" },
        { icon: "fa-solid fa-comments-dollar", title: "정성 피드백 분석", desc: "동작 후 사용자들이 느낀 불편 사항을 인터뷰 기록" },
        { icon: "fa-solid fa-rotate-left", title: "점진적 반복 보완", desc: "드러난 결함을 다시 1~4단계로 피드백하여 개선" }
      ]
    },
    6: {
      title: "Step 6. 개발 협업 & 출시 (Hand-off)",
      subtitle: "실체화된 코드로 다듬고 관리하기",
      desc: "Figma 좌표와 디자인 가이드를 개발 팀에게 누락 없이 전달하고, 개발 단계에서 오차가 없도록 끝까지 동행하여 배포합니다.",
      details: [
        { icon: "fa-solid fa-file-export", title: "디자인 핸드오프", desc: "여백, 크기, 트랜지션 명세를 상세 수치로 전달" },
        { icon: "fa-solid fa-magnifying-glass", title: "QA (품질 검수)", desc: "개발된 결과물 화면과 원안을 대조하여 시각 완성도 검사" },
        { icon: "fa-solid fa-gauge", title: "출시 후 대시보드", desc: "런칭 후 유저 이탈 지점 및 행동 분석 툴 지속 추적" },
        { icon: "fa-solid fa-arrows-rotate", title: "서비스 순환 개선", desc: "출시 뒤 쌓인 새로운 요구를 수집해 업데이트 기획 연계" }
      ]
    }
  };

  function renderProcessStep(stepNum) {
    if (!processCardsContainer) return;
    const step = processData[stepNum];

    processCardsContainer.innerHTML = `
      <div class="process-detail-card active">
        <h3><i class="fa-solid fa-gears"></i> ${step.title}</h3>
        <p class="lead-text">${step.subtitle}</p>
        <p style="color: #aaaaaa; margin-bottom: 24px; font-size: 14px; max-width: 900px;">${step.desc}</p>
        <div class="detail-grid">
          ${step.details.map(d => `
            <div class="detail-item">
              <i class="${d.icon}"></i>
              <div>
                <h4>${d.title}</h4>
                <p>${d.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // Adjust timeline progress bar width
    const percentage = ((stepNum - 1) / 5) * 100;
    if (timelineBar) {
      timelineBar.style.width = `${percentage}%`;
    }
  }

  // Initial Load Step 1
  renderProcessStep(1);

  timelineNodes.forEach(node => {
    node.addEventListener('click', function() {
      timelineNodes.forEach(n => n.classList.remove('active'));
      this.classList.add('active');
      const stepNum = this.getAttribute('data-step');
      renderProcessStep(parseInt(stepNum));
    });
  });



  /* ==========================================
     10. FAQ Accordion (12. Q&A)
     ========================================== */
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        accordionItems.forEach(i => i.classList.remove('active'));
        
        // Toggle current item
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });


  /* ==========================================
     11. Typewriter Animation (13. Closing)
     ========================================== */
  const textVal = "낙서 한 장에서 시작된 크리에이티브가 세상을 더 이롭게 바꿉니다.";
  const typewriterElement = document.getElementById('typewriter');
  let isTyped = false;

  function startTypewriter() {
    if (isTyped || !typewriterElement) return;
    isTyped = true;

    let index = 0;
    typewriterElement.innerHTML = "";

    function type() {
      if (index < textVal.length) {
        typewriterElement.innerHTML += textVal.charAt(index);
        index++;
        setTimeout(type, 80);
      }
    }

    type();
  }

});
