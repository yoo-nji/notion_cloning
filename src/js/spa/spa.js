import { posts } from "../editor/components/Posts.js";
import { textareaHeight } from "../editor/utils/textareaHeight.js";

// 사이드바 제목 불러오기
export async function loadTitles() {
  try {
    const response = await fetch(`https://kdt-api.fe.dev-cos.com/documents`, {
      method: "GET",
      headers: {
        "x-username": "isix",
      },
    });
    if (!response.ok) throw new Error("API 오류발생");
    const documents = await response.json();

    console.log("data", documents);

    const documentList = document.querySelector(".documentList");
    documentList.innerHTML = "";

    documents.forEach((Document) => {
      const newLi = document.createElement("li");
      newLi.classList.add("documentItem");

      newLi.innerHTML = `
        <div class="rotateAndPage">
          <button class="rotateButton">
            <img src="/assets/right_arrow.svg" />
          </button>
          <a href="/documents/${Document.id}" class="documentTitle">${Document.title}</a>
          <div class="documentButton">
            <button class="addButton"><img src="/assets/add.svg" /></button>
            <button class="removeButton">
              <img src="/assets/remove.png" />
            </button>
          </div>
        </div>
      `;
      const titleLink = newLi.querySelector(".documentTitle");
      titleLink.addEventListener("click", (event) => {
        event.preventDefault(); // 기본 링크 동작 막기
        navigate(`/documents/${Document.id}`);
      });
      documentList.appendChild(newLi);
    });
  } catch (error) {
    console.error(error);
  }
}

// 클릭하면 해당 고유 ID에 따라 해당 URL로 이동
export function navigate(path) {
  window.history.pushState({}, "", window.location.origin + path);
  router();
}

// 에디터에 해당 페이지 내용 불러오기
async function loadContent(documentId) {
  // HTML 요소 불러오기
  const contentArea = document.querySelector(".contentInput");
  const titleArea = document.querySelector(".titleInput");

  try {
    const response = await fetch(
      `https://kdt-api.fe.dev-cos.com/documents/${documentId}`,
      {
        method: "GET",
        headers: {
          "x-username": "isix",
        },
      }
    );
    if (!response.ok) throw new Error("Load error");
    const contentData = await response.json();

    // 1. 제목 및 내용 텍스트 에리어 생성
    titleArea.innerHTML = "";
    contentArea.innerHTML = "";
    const titleText = document.createElement("titleInput");
    const contentText = document.createElement("contentInput");
    titleText.value = `${contentData.title}` || "제목을 입력해 주세요.";
    contentText.value = `${contentData.content}` || "내용을 입력해 주세요";

    // 3. 원래의 에리어 안으로 넣기
    titleArea.appendChild(titleText);
    contentArea.appendChild(contentText);
  } catch (error) {
    console.error(error);
  }
}

// 라우터
export function router() {
  const path = window.location.pathname;

  // 메인화면 라우터
  if (path === "/") {
    const reset = document.querySelector("main");
    reset.innerHTML = `
    <article>
    <div>
    <textarea class="titleInput" placeholder="제목을 입력해 주세요">여기는 1팀 노션 페이지입니다 🎉</textarea>
    <textarea class="contentInput" placeholder="내용을 입력해 주세요">구웃</textarea>
    </div>
    </article> 
    `;
    textareaHeight();
    loadTitles();
  }

  // document 라우터 -> 상세 loadContent
  else if (path.startsWith("/documents/")) {
    const documentId = path.split("/")[2];
    posts(documentId);
    // loadTitles();
  } else if (path === "/index.html") {
    window.history.replaceState({}, "", "/");
    loadTitles();
  }

  // 오류 라우터 -> 오류처리
  else {
    alert("경로를 찾을 수 없습니다.");
  }
}

// 앞으로 가기/뒤로 가기

window.addEventListener("load", router);
window.addEventListener("popstate", router);
