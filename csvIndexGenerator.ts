const fs = require("fs");
const path = require("path");
const readline = require("readline");

// CSV 파일 경로와 출력될 인덱스 파일 경로 설정
const csvFilePath = path.join(process.cwd(), "data", "NL_BO_SPECIES_MASTER_NEW_202112.csv");
const indexFilePath = path.join(process.cwd(), "data", "index.json");

async function createIndex() {
  const index: { [key: string]: number } = {}; // ISBN -> 파일 오프셋 매핑
  let offset = 0; // 현재 바이트 위치
  let isFirstLine = true; // 헤더 행인지 확인
  let isbnColumnIndex = -1; // ISBN 열의 인덱스

  const stream = fs.createReadStream(csvFilePath);
  const rl = readline.createInterface({ input: stream });

  rl.on("line", (line: string) => {
    if (isFirstLine) {
      // 첫 번째 줄(헤더)을 처리
      const headers = line.split(",");
      isbnColumnIndex = headers.indexOf("ISBN_THIRTEEN_NO"); // ISBN 열 찾기

      if (isbnColumnIndex === -1) {
        console.error("CSV 파일에 'ISBN_THIRTEEN_NO' 열이 없습니다.");
        rl.close();
        return;
      }

      isFirstLine = false;
    } else {
      // 데이터 행 처리
      const columns = line.split(",");
      let isbn = columns[isbnColumnIndex]; // ISBN 값 추출

      if (isbn) {
        isbn = isbn.replace(/^"|"$/g, ""); // 큰따옴표 제거
        index[isbn] = offset; // ISBN과 현재 오프셋 매핑
      }
    }

    offset += Buffer.byteLength(line, "utf8") + 1; // 현재 줄의 바이트 길이 + 줄바꿈 문자
  });

  rl.on("close", () => {
    fs.writeFileSync(indexFilePath, JSON.stringify(index, null, 2)); // JSON으로 저장
    console.log("인덱스 생성 완료:", indexFilePath);
  });

  rl.on("error", (error: Error) => {
    console.error("인덱스 생성 중 오류 발생:", error);
  });
}

// 실행
createIndex();
