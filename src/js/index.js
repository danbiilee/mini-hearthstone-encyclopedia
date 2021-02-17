// api 요청
function loadCards() {
  return fetch(
    "https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/Hunter",
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "745f20ba89msh9b59bad4cddf49fp1054dcjsn929dfab44a2a",
        "x-rapidapi-host": "omgvamp-hearthstone-v1.p.rapidapi.com",
      },
    },
  )
    .then((response) => response.json())
    .then((json) => json.filter((item) => item.img && item.cost).slice(0, 20));
}

// dom 동적 추가
function renderCards(cards) {
  const container = document.querySelector(".cards");
  container.innerHTML = cards.map((card) => getHTMLString(card)).join("");
}

// dom 문자열 반환
function getHTMLString(card) {
  return `<li class="card">
            <img
              src="${card.img}"
              alt="${card.name}"
              class="card__thumbnail"
            />
            <div class="modal">
              <img
                class="modal__thumbnail"
                src="${card.img}"
              />
            </div>
          </li>`;
}

// 카드 클릭 이벤트 리스너 등록
function setCardEventListener() {
  const cards = document.querySelector(".cards");
  // cards.forEach((item) =>
  //   item.addEventListener("click", (e) => onClickCard(e)),
  // );
  cards.addEventListener("click", (e) => onClickCard(e, cards));
}

// 카드 클릭 이벤트 핸들러: 모달 오픈
function onClickCard(e, container) {
  const li = e.target.closest(".card");

  if (!li) {
    return;
  }
  if (!container.contains(li)) {
    return;
  }

  li.classList.add("active");
}

/*
1. 페이지 첫 로딩 시 api 요청(디폴트: 사냥꾼) -> promise 반환
2. 데이터 로드 성공 시 카드목록 렌더링
3. 실패 시 실패문구 렌더링 
4. 이벤트 핸들러 등록: 버튼 클릭 시 카드목록 필터링(디스플레이 클래스로 제어)
*/
loadCards()
  .then((cards) => {
    renderCards(cards); // 렌더
    // 이벤트 핸들러
    setCardEventListener(); // 카드 클릭
    // 버튼 클릭
  })
  .catch(console.log);
