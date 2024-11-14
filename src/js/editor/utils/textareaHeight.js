// 추가
// textarea 자동 높이 조절
export const textareaHeight = () => {
  const adjustTextareaHeight = (textareaEl) => {
    textareaEl.style.height = "auto"; // 높이를 초기화
    textareaEl.style.height = `${textareaEl.scrollHeight}px`; // 내용에 맞는 높이로 설정
  };

  const textareaEls = document.querySelectorAll("textarea");
  console.log(textareaEls);
  // 페이지 로드 시 textarea 높이 조절
  textareaEls.forEach((textareaEl) => {
    adjustTextareaHeight(textareaEl);

    // 입력 시 높이 자동 조절
    textareaEl.addEventListener("input", (e) => {
      adjustTextareaHeight(e.target);

      if (e.target.value.length === 0) {
        e.target.style.height = "90px"; // 초기화 높이 설정
      }
    });
  });
};