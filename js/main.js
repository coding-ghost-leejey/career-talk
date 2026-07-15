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

        // Trigger typewriter on slide 14
        if (index === 14) {
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

  function activatePhase(phase) {
    // Toggle cards active state
    diamondCards.forEach(c => {
      if (c.getAttribute('data-phase') === phase) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    // Toggle step dots active state
    stepDots.forEach(dot => {
      if (dot.getAttribute('data-phase') === phase) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    // Toggle Diamond blocks active highlighting
    if (phase === 'discover' || phase === 'define') {
      if (diamondLeft) diamondLeft.classList.add('active');
      if (diamondRight) diamondRight.classList.remove('active');
      
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
  }

  // Cards click event
  if (diamondCards) {
    diamondCards.forEach(card => {
      card.addEventListener('click', function() {
        const phase = this.getAttribute('data-phase');
        activatePhase(phase);
      });
    });
  }

  // Step dots click event
  if (stepDots) {
    stepDots.forEach(dot => {
      dot.addEventListener('click', function() {
        const phase = this.getAttribute('data-phase');
        activatePhase(phase);
      });
    });
  }


  /* ==========================================
     4-2b. Design Thinking 5 Stages Interaction (Slide 9)
     ========================================== */
  const stageNodes = document.querySelectorAll('.stage-node');
  const stageDescCards = document.querySelectorAll('.stage-desc-card');

  if (stageNodes && stageDescCards) {
    stageNodes.forEach(node => {
      node.addEventListener('click', function() {
        const stageIdx = this.getAttribute('data-stage');

        // Toggle nodes active
        stageNodes.forEach(n => n.classList.remove('active'));
        this.classList.add('active');

        // Toggle cards active
        stageDescCards.forEach(c => {
          if (c.getAttribute('data-stage') === stageIdx) {
            c.classList.add('active');
          } else {
            c.classList.remove('active');
          }
        });
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


  /* ==========================================
     12. UI/UX Card Quiz (5. Card Quiz Slide)
     ========================================== */
  const quizData = [
    { id: 1, title: "OTT 영상 위에 마우스를 올리면 예고편이 재생된다", type: "UX", icon: "fa-solid fa-play", desc: "사용자가 영상을 일일이 클릭해 진입하기 전에, 썸네일 위에서 머무는(Hover) 행동만으로 예고편을 재생시켜 빠른 탐색을 돕는 기획" },
    { id: 2, title: "쇼핑몰 옷 이미지 위에 호버하면 사진이 확대된다", type: "UI", icon: "fa-solid fa-magnifying-glass", desc: "상품 목록 페이지에서 옷 디테일을 시각적으로 바로 확인할 수 있도록, 마우스 포인트가 올라갈 때 이미지가 확대 연출되는 디자인" },
    { id: 3, title: "배달 주문 후 지도로 배달원의 실시간 위치를 보여준다", type: "UX", icon: "fa-solid fa-motorcycle", desc: "주문 완료 후 배달 오토바이가 어디쯤 움직이고 있는지 실시간으로 중계하여, 하염없이 기다리는 유저의 인지적 불안을 지워주는 경험 기획" },
    { id: 4, title: "화면을 내려도 메뉴 바가 항상 화면 맨 위에 붙어있다", type: "UI", icon: "fa-solid fa-thumbtack", desc: "상세 내용을 확인하기 위해 아래로 길게 스크롤하더라도 핵심 경로 이동을 바로 돕도록 메뉴 바를 시각적으로 상단에 밀착 고정하는 배치" },
    { id: 5, title: "인스타그램 피드를 내리면 끝없이 다음 글이 연결된다", type: "UX", icon: "fa-solid fa-arrows-up-down", desc: "다음 페이지 번호를 찾아 클릭하는 불필요한 단계를 제거하고, 스크롤을 내리는 행동만으로 끊임없이 다음 글을 서빙하는 무한스크롤 설계" },
    { id: 6, title: "데이터를 로딩할 때 가상의 회색 박스들을 먼저 띄운다", type: "UI", icon: "fa-solid fa-table-cells-large", desc: "텍스트와 그림이 채워질 공간에 깜빡이는 임시 뼈대(스케톤 화면)를 띄워, 빈 화면 대비 대기 시간이 짧게 느껴지도록 만드는 시각 장치" },
    { id: 7, title: "블로그나 메일을 쓰다 나가도 내용이 자동 저장된다", type: "UX", icon: "fa-solid fa-floppy-disk", desc: "인터넷 연결 불안정이나 실수로 화면을 종료했을 때의 작업 손실을 막기 위해 작성 중이던 본문을 알아서 임시 보관해두는 조작 안전장치" },
    { id: 8, title: "비밀번호 입력 필드 옆에 눈 모양 표시를 둔다", type: "UI", icon: "fa-solid fa-eye-slash", desc: "입력된 비밀번호(●●●●)를 눈 모양 심볼 터치 하나로 텍스트로 보게 하거나 숨기게 전환시켜 조작 실수를 고치게 돕는 인터페이스" },
    { id: 9, title: "검색창을 터치하면 내 이전 검색어들을 먼저 띄운다", type: "UX", icon: "fa-solid fa-clock-rotate-left", desc: "유저가 텍스트 입력을 시작하기도 전에 최근 찾았던 단어나 실시간 유용한 키워드를 추천하여 타이핑 단계를 최소화해주는 동선 기획" },
    { id: 10, title: "주변 환경이 어두워지면 밤 배경 화면으로 전환된다", type: "UI", icon: "fa-solid fa-circle-half-stroke", desc: "낮과 밤 환경에 대응해 눈의 피로를 최소화하고 가독성을 보장하기 위해 배경과 명도를 어둡게 설계한 다크 모드 옵션 제공" }
  ];

  const quizGrid = document.getElementById('quiz-grid');
  const checkedCountEl = document.getElementById('checked-cards-count');
  const btnRevealAll = document.getElementById('btn-reveal-all');
  const btnResetQuiz = document.getElementById('btn-reset-quiz');
  
  let checkedCards = new Set();

  // 피셔-예이츠 셔플 알고리즘
  function shuffle(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  }

  function renderQuiz() {
    if (!quizGrid) return;
    
    // 카드를 랜덤하게 섞은 후 렌더링
    const shuffledData = shuffle(quizData);
    
    quizGrid.innerHTML = shuffledData.map(item => `
      <div class="quiz-card" data-id="${item.id}" data-type="${item.type}">
        <div class="quiz-card-inner">
          <div class="quiz-card-front">
            <div class="quiz-icon"><i class="${item.icon}"></i></div>
            <h3>${item.title}</h3>
            <div class="quiz-click-me">
              <i class="fa-solid fa-hand-pointer"></i>
              <span>클릭하여 정답 확인</span>
            </div>
          </div>
          <div class="quiz-card-back type-${item.type.toLowerCase()}">
            <div class="badge-container">
              <span class="badge-type">${item.type}</span>
            </div>
            <p>${item.desc}</p>
            <div class="back-footer">
              <i class="fa-solid fa-rotate-left"></i>
              <span>다시 뒤집기</span>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // 이벤트 리스너 재부착
    const cards = quizGrid.querySelectorAll('.quiz-card');
    cards.forEach(card => {
      card.addEventListener('click', function() {
        const cardId = parseInt(this.getAttribute('data-id'));
        
        // 플립 애니메이션 토글
        this.classList.toggle('flipped');
        
        if (this.classList.contains('flipped')) {
          checkedCards.add(cardId);
        }
        
        updateProgress();
      });
    });
  }

  function updateProgress() {
    if (checkedCountEl) {
      checkedCountEl.textContent = checkedCards.size;
    }
  }

  // 전체 정답 공개
  if (btnRevealAll) {
    btnRevealAll.addEventListener('click', () => {
      const cards = document.querySelectorAll('.quiz-card');
      cards.forEach(card => {
        card.classList.add('flipped');
        const cardId = parseInt(card.getAttribute('data-id'));
        checkedCards.add(cardId);
      });
      updateProgress();
    });
  }

  // 다시 풀기 (초기화 및 재셔플)
  if (btnResetQuiz) {
    btnResetQuiz.addEventListener('click', () => {
      const cards = document.querySelectorAll('.quiz-card');
      cards.forEach(card => card.classList.remove('flipped'));
      checkedCards.clear();
      updateProgress();
      
      // 약간의 딜레이를 주어 뒤집힌 후 부드럽게 다시 셔플되게 처리
      setTimeout(() => {
        renderQuiz();
      }, 300);
    });
  }

  // 초기 실행
  renderQuiz();


  /* ==========================================
     13. UI/UX Glossary (6. Glossary Slide)
     ========================================== */
  const glossaryData = [
    {
      id: 1,
      name: "컴포넌트 / 에셋",
      eng: "Component / Asset",
      category: "structure",
      desc: "UI를 구성하는 재사용 가능한 독립적인 디자인 요소들(버튼, 입력 필드, 아이콘 등)과 이에 사용되는 이미지, 폰트 등의 모든 리소스를 의미합니다.",
      demoHTML: `<div class="demo-empty-view-box"><i class="fa-solid fa-cubes" style="font-size:3rem;color:#6c5ce7;"></i><h5>Component Set</h5><p>공통 규칙으로 만들어진 디자인 부품 그룹</p></div>`
    },
    {
      id: 2,
      name: "그리드",
      eng: "Grid System",
      category: "structure",
      desc: "화면의 레이아웃을 체계적이고 질서 있게 배치하기 위해 세로 열(Column)과 가로 행(Row), 그리고 간격(Gutter)으로 화면을 분할하는 격자 가이드 시스템입니다.",
      demoHTML: `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;width:100%;max-width:220px;height:90px;">
        <div style="background:rgba(108,92,231,0.2);border:1px dashed #6c5ce7;border-radius:4px;"></div>
        <div style="background:rgba(108,92,231,0.2);border:1px dashed #6c5ce7;border-radius:4px;"></div>
        <div style="background:rgba(108,92,231,0.2);border:1px dashed #6c5ce7;border-radius:4px;"></div>
        <div style="background:rgba(108,92,231,0.2);border:1px dashed #6c5ce7;border-radius:4px;"></div>
      </div>`
    },
    {
      id: 3,
      name: "헤더",
      eng: "Header",
      category: "structure",
      desc: "웹/앱 페이지 최상단에 위치하며 서비스의 로고, 검색창, 프로필, 주요 글로벌 메뉴 등을 담는 공통 영역입니다.",
      demoHTML: `<div style="width:100%;max-width:240px;padding:8px 12px;background:rgba(9,132,227,0.2);border:1px solid #0984e3;border-radius:6px;display:flex;justify-content:space-between;align-items:center;box-sizing:border-box;">
        <span style="font-weight:bold;font-size:0.75rem;color:#0984e3;">LOGO</span>
        <div style="display:flex;gap:10px;"><span style="font-size:0.65rem;color:#aaa;">메뉴1</span><span style="font-size:0.65rem;color:#aaa;">메뉴2</span></div>
      </div>`
    },
    {
      id: 4,
      name: "푸터",
      eng: "Footer",
      category: "structure",
      desc: "웹/앱 페이지 최하단에 위치하며 저작권 정보(Copyright), 사업자 정보, 사이트맵, 고객센터 번호 등을 제공하는 공통 영역입니다.",
      demoHTML: `<div style="width:100%;max-width:240px;padding:10px;background:rgba(225,112,85,0.12);border:1px solid #e17055;border-radius:6px;text-align:center;font-size:0.65rem;color:#999;box-sizing:border-box;">
        <p style="margin:0 0 2px 0;">© 2026 Blackcrown Inc.</p>
        <p style="margin:0;font-size:0.55rem;color:#777;">이용약관 | 개인정보처리방침</p>
      </div>`
    },
    {
      id: 5,
      name: "네비게이션",
      eng: "Navigation",
      category: "structure",
      desc: "사용자가 원하는 정보나 페이지로 막힘없이 쉽게 이동할 수 있도록 안내해주는 메뉴, 링크, 버튼들의 체계적인 안내 시스템입니다.",
      demoHTML: `<div class="demo-breadcrumb-box">
        <span class="bc-item">홈</span><span class="bc-sep">></span>
        <span class="bc-item">카테고리</span><span class="bc-sep">></span>
        <span class="bc-item active">세부제품</span>
      </div>`
    },
    {
      id: 6,
      name: "GNB, LNB, SNB, FNB",
      eng: "Global / Local / Side / Footer Navigation",
      category: "structure",
      desc: "GNB는 최상단 전체 서비스 공통 메뉴, LNB는 카테고리 내부 하위 분류 메뉴, SNB는 측면 사이드바 메뉴, FNB는 하단 정보 메뉴를 뜻합니다.",
      demoHTML: `<div class="demo-layout-box">
        <div class="gnb-area">GNB</div>
        <div class="body-container">
          <div class="snb-area">SNB</div>
          <div class="main-content-area">
            <div class="lnb-area">LNB</div>
            <div class="content-fill">콘텐츠 영역</div>
          </div>
        </div>
        <div class="fnb-area">FNB</div>
      </div>`
    },
    {
      id: 7,
      name: "탭바",
      eng: "Tab Bar",
      category: "component",
      desc: "모바일 앱 화면 최하단에 아이콘과 글자로 표시되어, 주요 최상위 메뉴 간의 탭 전환을 터치 한 번으로 돕는 모바일 전용 네비게이션입니다.",
      demoHTML: `<div style="display:flex;width:100%;max-width:240px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:8px;overflow:hidden;justify-content:space-around;padding:6px 0;">
        <div style="text-align:center;color:#6c5ce7;font-size:0.65rem;cursor:pointer;"><i class="fa-solid fa-house" style="font-size:1rem;display:block;margin-bottom:2px;"></i>홈</div>
        <div style="text-align:center;color:#888;font-size:0.65rem;cursor:pointer;"><i class="fa-solid fa-magnifying-glass" style="font-size:1rem;display:block;margin-bottom:2px;"></i>검색</div>
        <div style="text-align:center;color:#888;font-size:0.65rem;cursor:pointer;"><i class="fa-solid fa-user" style="font-size:1rem;display:block;margin-bottom:2px;"></i>MY</div>
      </div>`
    },
    {
      id: 8,
      name: "탭메뉴",
      eng: "Tab Menu",
      category: "component",
      desc: "콘텐츠를 대주제별로 묶어 상단에 나란히 늘어놓고, 클릭한 탭의 하위 내용만 실시간으로 아래 영역에 변경 노출해주는 시각 탭입니다.",
      demoHTML: `<div style="display:flex;border-bottom:2px solid rgba(255,255,255,0.1);width:100%;max-width:220px;box-sizing:border-box;">
        <div style="padding:6px 10px;color:#a29bfe;border-bottom:2px solid #6c5ce7;font-weight:bold;font-size:0.8rem;cursor:pointer;">상세설명</div>
        <div style="padding:6px 10px;color:#888;font-size:0.8rem;cursor:pointer;">구매평 (18)</div>
      </div>`
    },
    {
      id: 9,
      name: "체크박스 / 라디오 버튼",
      eng: "Checkbox / Radio Button",
      category: "component",
      desc: "체크박스는 다중 선택(여러 개 동시 선택) 시 사용하고, 라디오 버튼은 여러 선택지 중 오직 '하나만' 고를 수 있는 원형 버튼입니다.",
      demoHTML: `<div class="demo-checkbox-radio-box">
        <label class="demo-input-row"><input type="checkbox" checked> 필수 동의 (체크박스)</label>
        <label class="demo-input-row"><input type="radio" name="demo-r" checked> 남성 (라디오)</label>
        <label class="demo-input-row"><input type="radio" name="demo-r"> 여성 (라디오)</label>
      </div>`
    },
    {
      id: 10,
      name: "토글 버튼",
      eng: "Toggle Button / Switch",
      category: "component",
      desc: "전등 스위치와 같이, 특정 설정 상태를 활성화(ON) 또는 비활성화(OFF)로 부드러운 애니메이션과 함께 즉각 변경시키는 스위치입니다.",
      demoHTML: `<div class="demo-toggle-wrapper">
        <div class="demo-toggle-btn-box" id="demo-toggle-switch"><div class="toggle-knob"></div></div>
        <span style="font-size:0.8rem;color:#aaa;" id="demo-toggle-status">서비스 사용 안 함</span>
      </div>`
    },
    {
      id: 11,
      name: "드롭다운/셀렉트박스",
      eng: "Dropdown / Select Box",
      category: "component",
      desc: "클릭 시 하위 선택사항들이 목록 상자 모양으로 아래로 내려앉으며 보여져, 그 중 하나의 옵션을 골라 세팅하게 만드는 컨트롤러입니다.",
      demoHTML: `<div class="demo-select-box">
        <span>사이즈 선택</span>
        <i class="fa-solid fa-chevron-down" style="font-size:0.7rem;color:#888;"></i>
      </div>`
    },
    {
      id: 12,
      name: "아코디언",
      eng: "Accordion",
      category: "component",
      desc: "클릭 시 악기 아코디언처럼 화면을 수직으로 늘리며 하위 정보(상세 내용)를 슥 펼쳐 보여주는 압축형 UI 구조입니다.",
      demoHTML: `<div class="demo-accordion-box">
        <div class="demo-accordion-header" id="demo-accordion-header">
          <span>아코디언 질문 예시</span>
          <i class="fa-solid fa-chevron-down"></i>
        </div>
        <div class="demo-accordion-content" id="demo-accordion-content">
          이 공간이 본문 영역입니다. 다시 누르면 원래대로 닫히며 화면 효율을 높입니다.
        </div>
      </div>`
    },
    {
      id: 13,
      name: "타임피커/데이트피커",
      eng: "Time Picker / Date Picker",
      category: "component",
      desc: "키보드로 날짜나 시간을 치는 번거로움 대신, 가상 달력 팝업이나 회전식 드럼을 굴려 쉽게 입력시키는 디자인 폼입니다.",
      demoHTML: `<div style="display:flex;gap:8px;">
        <input type="date" class="demo-picker-input" value="2026-07-15">
        <input type="time" class="demo-picker-input" value="12:30">
      </div>`
    },
    {
      id: 14,
      name: "브레드크럼",
      eng: "Breadcrumbs",
      category: "component",
      desc: "사용자가 현재 접근 중인 서비스 페이지의 구조 계층(홈 > 의류 > 상의)을 위에서 선형 경로로 표기해주는 내비게이션 도구입니다.",
      demoHTML: `<div class="demo-breadcrumb-box">
        <span class="bc-item">의류</span><span class="bc-sep">/</span>
        <span class="bc-item">아우터</span><span class="bc-sep">/</span>
        <span class="bc-item active">패딩</span>
      </div>`
    },
    {
      id: 15,
      name: "페이징",
      eng: "Pagination",
      category: "component",
      desc: "방대한 글 데이터를 여러 쪽으로 나누어 하단에 [1] [2] [3] 등의 책 페이지 번호 목록 형태로 보여주는 정보 네비게이션입니다.",
      demoHTML: `<div style="display:flex;gap:4px;align-items:center;">
        <div style="width:20px;height:20px;border:1px solid rgba(255,255,255,0.1);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;cursor:pointer;"><</div>
        <div style="width:20px;height:20px;background:#6c5ce7;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;color:#fff;font-weight:bold;">1</div>
        <div style="width:20px;height:20px;border:1px solid rgba(255,255,255,0.1);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;cursor:pointer;">2</div>
        <div style="width:20px;height:20px;border:1px solid rgba(255,255,255,0.1);border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:0.7rem;cursor:pointer;">></div>
      </div>`
    },
    {
      id: 16,
      name: "슬라이더, 레인지 슬라이더",
      eng: "Slider / Range Slider",
      category: "component",
      desc: "바 위에 배치된 조절 장치를 끌어당겨 화면 밝기나 볼륨 크기 등을 수치 범위로 직관적으로 제어하는 요소입니다.",
      demoHTML: `<div style="width:100%;max-width:200px;display:flex;flex-direction:column;gap:6px;">
        <div style="position:relative;width:100%;height:4px;background:rgba(255,255,255,0.1);border-radius:3px;">
          <div style="position:absolute;left:0;width:70%;height:100%;background:#6c5ce7;border-radius:3px;"></div>
          <div style="position:absolute;left:70%;top:-4px;width:12px;height:12px;background:#fff;border-radius:50%;cursor:pointer;transform:translateX(-50%);box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div>
        </div>
        <span style="font-size:0.7rem;color:#999;text-align:right;">밝기 조절: 70%</span>
      </div>`
    },
    {
      id: 17,
      name: "캐러셀",
      eng: "Carousel",
      category: "component",
      desc: "슬라이드 트랙에 묶여 있는 여러 배너 이미지들을 좌우 터치를 통해 회전식 슬라이드로 순차 탐색시키는 영역입니다.",
      demoHTML: `<div class="demo-carousel-box">
        <div class="carousel-arrow" id="demo-carousel-left"><i class="fa-solid fa-chevron-left"></i></div>
        <div class="carousel-screen">
          <div class="carousel-track" id="demo-carousel-track">
            <div class="carousel-slide slide-a">BANNER 1</div>
            <div class="carousel-slide slide-b">BANNER 2</div>
            <div class="carousel-slide slide-c">BANNER 3</div>
          </div>
        </div>
        <div class="carousel-arrow" id="demo-carousel-right"><i class="fa-solid fa-chevron-right"></i></div>
      </div>`
    },
    {
      id: 18,
      name: "스와이프",
      eng: "Swipe Gesture",
      category: "pattern",
      desc: "화면 영역 위에 손가락을 얹어 한 방향으로 쓸어 넘기는 행동으로 다음 페이지 진입이나 메뉴 노출을 발동시키는 경험 제스처입니다.",
      demoHTML: `<div style="width:150px;height:60px;background:rgba(255,255,255,0.02);border:1px dashed rgba(255,255,255,0.15);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:0.75rem;color:#888;">
        <i class="fa-solid fa-angles-left" style="margin-right:6px;animation:bounceHorizontal 0.8s infinite alternate;"></i> 밀어서 밀착 메뉴
      </div>`
    },
    {
      id: 19,
      name: "프로그레스바",
      eng: "Progress Bar",
      category: "component",
      desc: "다운로드 상태나 진척 사항의 전체 볼륨 중 현재 진행량을 막대 바의 수평 게이지 채움으로 직관화해 표시하는 컨트롤입니다.",
      demoHTML: `<div class="demo-progress-wrapper">
        <div class="progress-bg"><div class="progress-fill" id="demo-progress-bar"></div></div>
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:0.7rem;color:#999;" id="demo-progress-txt">대기 중...</span>
          <button style="padding:3px 8px;background:#6c5ce7;color:#fff;border:none;border-radius:4px;font-size:0.7rem;cursor:pointer;" id="demo-progress-btn">진행하기</button>
        </div>
      </div>`
    },
    {
      id: 20,
      name: "툴팁",
      eng: "Tooltip",
      category: "component",
      desc: "마우스 커서를 특정 기호 위에 올려두면, 말풍선 형태로 작은 지시 문답이나 상세 주석 텍스트를 잠시 노출해 돕는 컴포넌트입니다.",
      demoHTML: `<div class="demo-tooltip-wrapper">
        <button class="tooltip-trigger-btn">팁 확인</button>
        <div class="tooltip-content-box">마우스 호버 시 툴팁이 활성화됩니다</div>
      </div>`
    },
    {
      id: 21,
      name: "팝업 / 모달",
      eng: "Pop-up / Modal",
      category: "component",
      desc: "현재 정보 페이지 위에 임시로 겹쳐 띄우는 새로운 확인 정보창입니다. 모달은 뒤 배경을 제어 불가 상태로 막는 속성이 강합니다.",
      demoHTML: `<div class="demo-modal-trigger" id="demo-modal-btn">가상 모달 띄우기</div>`
    },
    {
      id: 22,
      name: "딤",
      eng: "Dim / Dimmed Screen",
      category: "pattern",
      desc: "모달이나 메인 알림창이 화면에 노출될 때, 배경 화면 전체를 어두운 반투명 색상으로 가려 가독성과 주목도를 올리는 연출 효과입니다.",
      demoHTML: `<div style="position:relative;width:100%;max-width:220px;height:100px;border:1px solid rgba(255,255,255,0.1);border-radius:6px;background:url('images/irangi_smile.svg') center/cover;overflow:hidden;display:flex;align-items:center;justify-content:center;">
        <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.65);backdrop-filter:blur(1px);"></div>
        <span style="position:relative;color:#fff;font-size:0.75rem;font-weight:bold;">딤(Dim) 아웃 배경</span>
      </div>`
    },
    {
      id: 23,
      name: "토스트팝업 / 스낵바",
      eng: "Toast Pop-up / Snack Bar",
      category: "component",
      desc: "토스터기에서 식빵이 구워져 슥 솟구쳐 오르듯, 하단에서 가볍게 나타났다 사용자 확인 조작 없이 사라지는 비강제형 메시지 뷰입니다.",
      demoHTML: `<div style="display:flex;flex-direction:column;align-items:center;gap:10px;">
        <button style="padding:6px 12px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.12);color:#fff;border-radius:4px;font-size:0.75rem;cursor:pointer;" id="demo-toast-btn">토스트 실행</button>
        <div style="padding:6px 12px;background:#1e1e24;border:1px solid #00cec9;color:#00cec9;border-radius:4px;font-size:0.7rem;opacity:0;transform:translateY(8px);transition:all 0.25s ease;" id="demo-toast-popup">메시지 전달 완료!</div>
      </div>`
    },
    {
      id: 24,
      name: "바텀시트",
      eng: "Bottom Sheet",
      category: "component",
      desc: "모바일 인터페이스 전용 요소로, 화면 맨 하단 영역에서 수직 슬라이드로 올라와 상세 옵션이나 행동 리스트를 제공하는 시트입니다.",
      demoHTML: `<div class="demo-bottom-sheet-container">
        <button class="sheet-btn" id="demo-sheet-trigger">시트 올리기</button>
        <div class="sheet-overlay" id="demo-sheet-panel">
          <div class="sheet-handle"></div>
          <div class="sheet-items">
            <div class="sheet-item" onclick="alert('복사됨')">텍스트 복사하기</div>
            <div class="sheet-item" onclick="alert('종료됨')">메뉴 종료</div>
          </div>
        </div>
      </div>`
    },
    {
      id: 25,
      name: "다양한 메뉴 아이콘들",
      eng: "Menu Icons",
      category: "component",
      desc: "버튼의 텍스트가 없더라도 기능적 의미를 시각 기호로 즉시 인지하도록 매칭해 둔 유용한 픽토그램/아이콘 소스들입니다.",
      demoHTML: `<div style="display:flex;gap:12px;font-size:1.1rem;color:#a29bfe;">
        <i class="fa-solid fa-house" title="홈"></i>
        <i class="fa-solid fa-magnifying-glass" title="검색"></i>
        <i class="fa-solid fa-gear" title="설정"></i>
        <i class="fa-solid fa-trash" title="삭제"></i>
      </div>`
    },
    {
      id: 26,
      name: "엠프티 화면",
      eng: "Empty State Screen",
      category: "pattern",
      desc: "조회 내역 데이터나 저장된 장바구니 리스트가 공백 상태일 때, 당황하지 않게 유용한 아이콘과 안내 텍스트로 보완한 빈 화면 레이아웃입니다.",
      demoHTML: `<div class="demo-empty-view-box">
        <i class="fa-solid fa-circle-exclamation" style="font-size:2rem;"></i>
        <h5>내역이 없습니다</h5>
        <p>새로운 소식이 전송되면 알려드려요</p>
      </div>`
    },
    {
      id: 27,
      name: "코치마크",
      eng: "Coach Mark",
      category: "pattern",
      desc: "첫 진입 유저 대상 튜토리얼 설계로, 조작 버튼 위에 반투명 형광펜 형태로 가이드를 얹어 핵심 조작을 짚어 설명하는 오버레이입니다.",
      demoHTML: `<div style="position:relative;width:100%;max-width:200px;height:100px;border:1px solid rgba(255,255,255,0.1);border-radius:6px;background:rgba(255,255,255,0.01);overflow:hidden;padding:10px;box-sizing:border-box;">
        <div style="width:16px;height:16px;background:#6c5ce7;border-radius:50%;border:2px solid #fff;box-shadow:0 0 8px #6c5ce7;"></div>
        <div style="position:absolute;top:28px;left:10px;background:#6c5ce7;color:#fff;padding:3px 6px;border-radius:4px;font-size:0.6rem;white-space:nowrap;">[탭] 메뉴를 여세요!</div>
      </div>`
    },
    {
      id: 28,
      name: "시스템 컬러",
      eng: "System Colors",
      category: "pattern",
      desc: "제품 내부에서 정보적 피드백을 색상으로 전달하기 위한 공통 약속입니다. 성공은 초록, 경고는 노랑, 위험/에러는 빨강을 적용합니다.",
      demoHTML: `<div style="display:flex;gap:8px;">
        <span style="width:20px;height:20px;background:#00b894;border-radius:50%;display:inline-block;" title="정상 완료"></span>
        <span style="width:20px;height:20px;background:#d63031;border-radius:50%;display:inline-block;" title="오류 경고"></span>
        <span style="width:20px;height:20px;background:#fdcb6e;border-radius:50%;display:inline-block;" title="시스템 보류"></span>
      </div>`
    },
    {
      id: 29,
      name: "브레이크 포인트",
      eng: "Break Point",
      category: "structure",
      desc: "반응형 웹 코딩 시 뷰포트의 넓이가 변함에 따라 모바일, 테블릿, PC 가로 레이아웃이 분기되는 고정 수치 해상도 한계선을 지칭합니다.",
      demoHTML: `<div style="font-size:0.7rem;color:#aaa;text-align:center;">
        <div>미디어 쿼리(Media Query) 레이아웃 전환</div>
        <div style="margin-top:6px;font-weight:bold;color:#6c5ce7;">768px / 1024px</div>
      </div>`
    },
    {
      id: 30,
      name: "로더 / 스피너",
      eng: "Loader / Spinner",
      category: "component",
      desc: "네트워크 통신 중 페이지 응답을 대기하고 있음을 원형 고리 그래픽의 회전 운동 등으로 표현해 알려주는 로딩 지시자입니다.",
      demoHTML: `<div class="demo-loader-box">
        <div class="loader-circle"></div>
      </div>`
    },
    {
      id: 31,
      name: "테이블",
      eng: "Table",
      category: "structure",
      desc: "세로 열과 가로 행의 정밀 격자 구조를 차용해 방대한 정보나 데이터 리스트를 구조화해 열람하도록 돕는 정형 표 폼입니다.",
      demoHTML: `<table style="width:100%;max-width:200px;border-collapse:collapse;font-size:0.65rem;border:1px solid rgba(255,255,255,0.08);">
        <tr style="background:rgba(255,255,255,0.04);font-weight:bold;border-bottom:1px solid rgba(255,255,255,0.08);">
          <th style="padding:3px;">옵션</th><th style="padding:3px;">상태</th>
        </tr>
        <tr>
          <td style="padding:3px;color:#aaa;">무선연결</td><td style="padding:3px;color:#00cec9;">지원</td>
        </tr>
      </table>`
    },
    {
      id: 32,
      name: "카드 디자인",
      eng: "Card Design",
      category: "pattern",
      desc: "특정 개별 콘텐츠의 이미지, 텍스트, 상태 정보를 네모난 카드 한 판넬의 프레임 안에 패키지화해 시각적 안정감을 주는 구조 패턴입니다.",
      demoHTML: `<div style="width:130px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;">
        <div style="height:55px;background:linear-gradient(135deg,#6c5ce7,#a29bfe);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:bold;font-size:0.75rem;">Card View</div>
        <div style="padding:6px;font-size:0.65rem;color:#fff;">타이틀 영역</div>
      </div>`
    },
    {
      id: 33,
      name: "텍스트 필드/텍스트 박스",
      eng: "Text Field / Text Box",
      category: "component",
      desc: "아이디, 검색어 등의 문자열 데이터 값을 사용자가 키패드로 쳐서 직접 시스템에 입력하도록 자리를 만들어 둔 박스 영역입니다.",
      demoHTML: `<div style="width:100%;max-width:180px;display:flex;flex-direction:column;gap:4px;">
        <span style="font-size:0.7rem;color:#999;">아이디</span>
        <input type="text" placeholder="아이디를 입력하세요" style="width:100%;padding:6px 10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:4px;font-size:0.75rem;color:#fff;" readonly>`
    },
    {
      id: 34,
      name: "검색필드",
      eng: "Search Field",
      category: "component",
      desc: "텍스트 박스 안에 검색을 직관화하는 돋보기 아이콘을 고정 연동하여 정보의 검색 실행을 유도하는 전문 입력 창입니다.",
      demoHTML: `<div style="position:relative;width:100%;max-width:180px;">
        <input type="text" placeholder="통합 검색" style="width:100%;padding:6px 25px 6px 10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:20px;font-size:0.75rem;color:#fff;box-sizing:border-box;" readonly>
        <i class="fa-solid fa-magnifying-glass" style="position:absolute;right:10px;top:7px;font-size:0.75rem;color:#888;"></i>
      </div>`
    },
    {
      id: 35,
      name: "플레이스홀더",
      eng: "Placeholder",
      category: "component",
      desc: "입력창이 비어있을 때 어떤 텍스트를 기입해야 하는지 힌트나 입력 길잡이 문구를 박스 안에 흐리게 노출해두는 디자인 규칙입니다.",
      demoHTML: `<input type="text" placeholder="입력 전 미리 띄워진 문답" style="width:100%;max-width:180px;padding:6px 10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);border-radius:4px;font-size:0.75rem;color:#555;" readonly>`
    },
    {
      id: 36,
      name: "플로팅 버튼",
      eng: "Floating Action Button (FAB)",
      category: "component",
      desc: "화면 페이지 스크롤과 상관없이 화면 모서리 위 지정된 위치에 둥둥 떠서 핵심 기능 실행을 신속히 돕는 모바일 최적화 버튼입니다.",
      demoHTML: `<div style="position:relative;width:100%;max-width:180px;height:100px;border:1px dashed rgba(255,255,255,0.12);border-radius:6px;background:rgba(255,255,255,0.01);">
        <div style="position:absolute;bottom:8px;right:8px;width:30px;height:30px;background:#6c5ce7;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:0.95rem;box-shadow:0 3px 8px rgba(108,92,231,0.3);"><i class="fa-solid fa-plus"></i></div>
      </div>`
    },
    {
      id: 37,
      name: "CTA",
      eng: "Call To Action Button",
      category: "pattern",
      desc: "화면에서 기업과 사용자가 만나는 가장 주된 핵심 단계를 클릭하도록 강하게 눈길을 이끄는 최대 강조 스타일링 버튼입니다.",
      demoHTML: `<div class="demo-cta-box">
        <button class="demo-cta-btn">무료 신청하기</button>
      </div>`
    },
    {
      id: 38,
      name: "스플래시",
      eng: "Splash Screen",
      category: "pattern",
      desc: "앱을 클릭하자마자 서비스 구동 전 짧은 초 단위 대기 시간 동안 브랜드 첫인상을 알리기 위해 전체 창에 띄우는 ان트로 뷰입니다.",
      demoHTML: `<div style="position:relative;width:100%;max-width:160px;height:100px;border:1px solid rgba(255,255,255,0.12);border-radius:6px;background:#121216;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;">
        <i class="fa-solid fa-bolt" style="font-size:1.3rem;color:#fdcb6e;animation:float 2s ease-in-out infinite;"></i>
        <span style="font-size:0.55rem;color:#777;font-weight:bold;">LOADING PRESENTATION</span>
      </div>`
    },
    {
      id: 39,
      name: "디폴트",
      eng: "Default Value / State",
      category: "structure",
      desc: "유저가 커스터마이징을 하기 전, 시스템이 최적의 상태로 미리 규정해 선택해 둔 초기 고정 값 혹은 기초 활성화 정보값입니다.",
      demoHTML: `<div style="font-size:0.75rem;color:#888;">
        기본 언어 설정(Default): <strong style="color:#a29bfe;">한국어 (Korean)</strong>
      </div>`
    },
    {
      id: 40,
      name: "스케렐톤",
      eng: "Skeleton Loading UI",
      category: "pattern",
      desc: "로딩 시간 동안 깜빡이는 흰 빈칸 대신, 글과 그림 영역 레이아웃대로 깜빡이는 흑백 뼈대를 띄워 대기 감도를 단축하는 UI입니다.",
      demoHTML: `<div class="demo-skeleton-card">
        <div class="ske-circle"></div>
        <div class="ske-line title"></div>
        <div class="ske-line desc1"></div>
      </div>`
    },
    {
      id: 41,
      name: "온보딩",
      eng: "Onboarding Experience",
      category: "pattern",
      desc: "신규 가입 유저가 제품 사용법과 핵심 강점을 손쉽게 숙지하도록 도와주는 첫 페이지 진입 가이드 투어 단계입니다.",
      demoHTML: `<div style="position:relative;width:100%;max-width:160px;height:100px;border:1px solid rgba(255,255,255,0.1);border-radius:6px;background:rgba(255,255,255,0.01);display:flex;flex-direction:column;justify-content:space-between;padding:10px;box-sizing:border-box;">
        <div style="text-align:center;"><i class="fa-solid fa-shield-halved" style="font-size:1.2rem;color:#00cec9;margin-bottom:4px;"></i><h6 style="margin:0;font-size:0.7rem;color:#fff;">보안 연결 완료</h6></div>
        <div style="display:flex;justify-content:center;gap:3px;"><span style="width:4px;height:4px;background:#444;border-radius:50%;"></span><span style="width:4px;height:4px;background:#00cec9;border-radius:50%;"></span><span style="width:4px;height:4px;background:#444;border-radius:50%;"></span></div>
      </div>`
    },
    {
      id: 42,
      name: "뱃지",
      eng: "Badge",
      category: "component",
      desc: "아이콘 구석 등에 부착해 읽지 않은 알람의 개수(숫자 빨간칩)나 신규 등록(N 마크) 등 업데이트 현황을 간편 요약해 알리는 칩입니다.",
      demoHTML: `<div style="position:relative;display:inline-block;padding:8px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:6px;">
        <i class="fa-solid fa-bell" style="font-size:1.2rem;color:#aaa;"></i>
        <span style="position:absolute;top:-3px;right:-3px;background:#ff7675;color:#fff;font-size:0.55rem;font-weight:bold;padding:1px 4px;border-radius:8px;">NEW</span>
      </div>`
    }
  ];

  const glossaryList = document.getElementById('glossary-list');
  const glossaryDetail = document.getElementById('glossary-detail-panel');
  const filterBtns = document.querySelectorAll('.filter-tab-btn');

  function renderGlossaryItems(category = 'all') {
    if (!glossaryList) return;

    const filtered = glossaryData.filter(item => {
      if (category === 'all') return true;
      return item.category === category;
    });

    glossaryList.innerHTML = filtered.map(item => `
      <button class="glossary-item-btn" data-id="${item.id}">
        <span class="glossary-num">${String(item.id).padStart(2, '0')}</span>
        <span class="glossary-title">${item.name}</span>
        <i class="fa-solid fa-chevron-right glossary-arrow"></i>
      </button>
    `).join('');

    // 리스트 클릭 이벤트 추가
    const itemBtns = glossaryList.querySelectorAll('.glossary-item-btn');
    itemBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        itemBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const termId = parseInt(this.getAttribute('data-id'));
        const term = glossaryData.find(t => t.id === termId);
        if (term) {
          showGlossaryDetail(term);
        }
      });
    });
  }

  function showGlossaryDetail(term) {
    if (!glossaryDetail) return;

    let categoryKorean = "";
    if (term.category === "structure") categoryKorean = "기본 / 구조";
    else if (term.category === "component") categoryKorean = "컴포넌트";
    else if (term.category === "pattern") categoryKorean = "패턴 / 경험";

    glossaryDetail.innerHTML = `
      <div class="detail-header">
        <div class="term-name-group">
          <h2>${term.name}</h2>
          <span class="term-eng">${term.eng}</span>
        </div>
        <span class="term-category-badge">${categoryKorean}</span>
      </div>
      <div class="term-description-box">
        <h4>개념 설명</h4>
        <p>${term.desc}</p>
      </div>
      <div class="term-demo-section">
        <span class="demo-label"><i class="fa-solid fa-code"></i> INTERACTIVE PREVIEW DEMO</span>
        ${term.demoHTML}
      </div>
    `;

    // 꽂혀진 HTML 데모 컴포넌트에 마이크로 클릭 리스너 연결
    bindDemoInteractions(term.id);
  }

  function bindDemoInteractions(id) {
    // 10. 토글 버튼 (Toggle Button)
    if (id === 10) {
      const toggleSwitch = document.getElementById('demo-toggle-switch');
      const toggleStatus = document.getElementById('demo-toggle-status');
      if (toggleSwitch && toggleStatus) {
        toggleSwitch.addEventListener('click', function() {
          this.classList.toggle('active');
          if (this.classList.contains('active')) {
            toggleStatus.textContent = "서비스 동작 중 (ON)";
            toggleStatus.style.color = "#00cec9";
          } else {
            toggleStatus.textContent = "서비스 사용 안 함 (OFF)";
            toggleStatus.style.color = "#aaa";
          }
        });
      }
    }

    // 12. 아코디언 (Accordion)
    if (id === 12) {
      const accHeader = document.getElementById('demo-accordion-header');
      const accContent = document.getElementById('demo-accordion-content');
      if (accHeader && accContent) {
        accHeader.addEventListener('click', function() {
          this.classList.toggle('active');
          accContent.classList.toggle('active');
        });
      }
    }

    // 17. 캐러셀 (Carousel)
    if (id === 17) {
      const track = document.getElementById('demo-carousel-track');
      const btnLeft = document.getElementById('demo-carousel-left');
      const btnRight = document.getElementById('demo-carousel-right');
      
      if (track && btnLeft && btnRight) {
        let currentSlideIdx = 0;
        const totalSlides = 3;

        function updateSlide() {
          track.style.transform = `translateX(-${currentSlideIdx * 100}%)`;
        }

        btnRight.addEventListener('click', () => {
          currentSlideIdx = (currentSlideIdx + 1) % totalSlides;
          updateSlide();
        });

        btnLeft.addEventListener('click', () => {
          currentSlideIdx = (currentSlideIdx - 1 + totalSlides) % totalSlides;
          updateSlide();
        });
      }
    }

    // 19. 프로그레스바 (Progress Bar)
    if (id === 19) {
      const progBtn = document.getElementById('demo-progress-btn');
      const progBar = document.getElementById('demo-progress-bar');
      const progTxt = document.getElementById('demo-progress-txt');

      if (progBtn && progBar && progTxt) {
        progBtn.addEventListener('click', () => {
          progBtn.disabled = true;
          progBtn.style.opacity = '0.5';
          progTxt.textContent = "작업 진행 중...";
          
          let width = 0;
          const interval = setInterval(() => {
            if (width >= 100) {
              clearInterval(interval);
              progTxt.textContent = "진행 완료 (100%)";
              progBtn.disabled = false;
              progBtn.style.opacity = '1';
            } else {
              width += 10;
              progBar.style.width = `${width}%`;
            }
          }, 150);
        });
      }
    }

    // 21. 팝업 / 모달 (Modal / PopUp)
    if (id === 21) {
      const modalBtn = document.getElementById('demo-modal-btn');
      if (modalBtn) {
        modalBtn.addEventListener('click', () => {
          // 모달 오버레이 및 창 생성
          const overlay = document.createElement('div');
          overlay.className = 'demo-modal-overlay';
          overlay.id = 'demo-modal-overlay-el';
          overlay.innerHTML = `
            <div class="demo-modal-content">
              <h4>모달 팝업 창</h4>
              <p>뒤의 화면 영역 조작은 일시적으로 차단되고 이 창이 최우선시됩니다.</p>
              <button id="demo-modal-close-btn">닫기</button>
            </div>
          `;
          
          // 패널 안에 삽입
          const parentSection = modalBtn.closest('.term-demo-section');
          if (parentSection) {
            parentSection.appendChild(overlay);
            
            const closeBtn = document.getElementById('demo-modal-close-btn');
            closeBtn.addEventListener('click', () => {
              overlay.remove();
            });
          }
        });
      }
    }

    // 23. 토스트 알림 (Toast Pop-up / Snack Bar)
    if (id === 23) {
      const toastBtn = document.getElementById('demo-toast-btn');
      const toastPopup = document.getElementById('demo-toast-popup');
      if (toastBtn && toastPopup) {
        toastBtn.addEventListener('click', () => {
          toastPopup.style.opacity = '1';
          toastPopup.style.transform = 'translateY(0)';
          
          setTimeout(() => {
            toastPopup.style.opacity = '0';
            toastPopup.style.transform = 'translateY(8px)';
          }, 1500);
        });
      }
    }

    // 24. 바텀 시트 (Bottom Sheet)
    if (id === 24) {
      const sheetTrigger = document.getElementById('demo-sheet-trigger');
      const sheetPanel = document.getElementById('demo-sheet-panel');
      if (sheetTrigger && sheetPanel) {
        sheetTrigger.addEventListener('click', (e) => {
          e.stopPropagation();
          sheetPanel.classList.add('active');
        });

        // 닫기 클릭 바인딩
        document.addEventListener('click', () => {
          sheetPanel.classList.remove('active');
        });
      }
    }
  }

  // 필터 버튼 이벤트 연결
  if (filterBtns) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const category = this.getAttribute('data-category');
        renderGlossaryItems(category);

        // 상세 설명 리셋
        if (glossaryDetail) {
          glossaryDetail.innerHTML = `
            <div class="empty-detail-state">
              <i class="fa-solid fa-book-open"></i>
              <h3>용어를 선택해 주세요</h3>
              <p>좌측 용어 목록에서 단어를 클릭하면 상세 설명과 조작 가능한 예시 데모가 여기에 나타납니다.</p>
            </div>
          `;
        }
      });
    });
  }

  // 초기 렌더링
  renderGlossaryItems('all');

});
