const startOverlay = document.getElementById('start-overlay');
  const startButton = document.getElementById('start-button');
  const blogContainer = document.getElementById('blog-container');

  // 데이터
  const data = {
    title: '자기소개',
    intro: {
      name: '이름: 위정우',
      age: '나이: 17세',
      description: '세계 여행을 한번 시도하는 것이 꿈인 고등학생입니다.'
    },
    posts: [
      { title: '나의 꿈', content: '여행 다니면서 외국 친구들을 많이 사귀고, 다양한 문화를 직접 체험해보고 싶어요.' },
      { title: '올해 나의 목표', content: '올해 학교 축구대회에서 3승을 거두는 것이 목표입니다! 친구들과 열심히 준비하고 있어요.' },
      { title: '나의 취미', content: '요즘에는 기타를 치는 게 재미있고, 음악 들으면서 아무 생각 없이 멍때리는 시간이 제일 좋아요.' },
    ]
  };

  // 단어별로 span 감싸기 함수
  function wrapWords(text) {
    return text.split(' ').map(word => {
      const span = document.createElement('span');
      span.classList.add('word', 'floating');
      span.textContent = word + ' ';
      return span;
    });
  }

  // 글 내용 세팅
  function setupContent() {
    // 제목
    const titleEl = document.getElementById('title');
    wrapWords(data.title).forEach(span => titleEl.appendChild(span));

    // 소개
    const nameEl = document.getElementById('name');
    wrapWords(data.intro.name).forEach(span => nameEl.appendChild(span));

    const ageEl = document.getElementById('age');
    wrapWords(data.intro.age).forEach(span => ageEl.appendChild(span));

    const descEl = document.getElementById('description');
    wrapWords(data.intro.description).forEach(span => descEl.appendChild(span));

    // 게시물
    const postsList = document.getElementById('posts-list');
    data.posts.forEach(post => {
      const li = document.createElement('li');
      li.style.marginBottom = '15px';

      const titleSpans = wrapWords(post.title);
      titleSpans.forEach(span => {
        span.style.fontWeight = 'bold';
        li.appendChild(span);
      });

      const br = document.createElement('br');
      li.appendChild(br);

      const contentSpans = wrapWords(post.content);
      contentSpans.forEach(span => li.appendChild(span));

      postsList.appendChild(li);
    });
  }

  // 스페이스바 누를 때마다 단어 하나씩 떠다니는 애니메이션 제거 (정렬)
  let currentIndex = 0;
  function arrangeNextWord() {
    const allWords = document.querySelectorAll('.word');
    if (currentIndex >= allWords.length) return;

    const word = allWords[currentIndex];
    word.classList.remove('floating');
    word.style.transform = 'translate(0, 0) rotate(0deg)';
    currentIndex++;
  }

  // 시작 버튼 클릭 이벤트
  startButton.addEventListener('click', () => {
    startOverlay.style.display = 'none';
    blogContainer.style.display = 'block';
    blogContainer.setAttribute('aria-hidden', 'false');
    setupContent();
  });

  // 스페이스바 이벤트 리스너
  window.addEventListener('keydown', e => {
    if(e.code === 'Space' || e.key === ' ') {
      e.preventDefault();
      arrangeNextWord();
    }
  });
