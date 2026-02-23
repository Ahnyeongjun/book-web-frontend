"use server";
import fs from "fs";
import path from "path";
import csv from "csv-parser";

/**
 * 서버 액션은 서버와 클라이언트 간의 통신을 간소화하기 위해 설계되었으며,
 * 서버 액션은 RSC와 함께 컴파일됨, RSC는 렌더링 최적화를 목적으로 설계되었고 서버 액션은 RSC의 실행 컨텍스트에서 동작함
 * 이로 인해 서버 액션은 RSC를 통해 클라이언트와 서버간 통신에 사용하는것이 목적에 부합하며 복잡한 비즈니스 로직이나 파일 시스템 접근과 같은 작업은 API 라우트에서 처리해야함.
 * (아래 코드가 개발환경과 달리 Vercel의 배포환경에서는 작동하지 않는 이유는 서버액션을 Vercel의 서버리스함수로 변환할때
 * 서버 컴포넌트와 서버 액션이 별도의 edge 함수로 추출되어 서버 액션이 Next.js 노드 서버가 아닌 별도의 실행 환경에서 실행되므로 로컬파일에 접근할 수 없음
 * 이는 클라이언트와 서버 간 통신을 간소화하고 성능을 최적화하기 위한 설계이나 개발환경은 별도의 edge 함수로 추출되지 않으므로 로컬파일에 접근이 가능한 거였음)
 */
export async function getCSVData(isbn: string) {
  const csvFilePath = path.join(process.cwd(), "public", "data", "NL_BO_SPECIES_MASTER_NEW_202112.csv");
  const indexFilePath = path.join(process.cwd(), "public", "data", "index.json");

  if (!isbn) {
    return { message: "isbn이 제공되지 않았습니다." };
  }

  try {
    // 미리 생성된 인덱스 로드
    const index = JSON.parse(fs.readFileSync(indexFilePath, "utf-8"));

    // 인덱스에서 데이터 위치 확인
    const offset = index[isbn];
    if (offset === undefined) {
      return { message: "데이터를 찾을 수 없습니다." };
    }

    // CSV 파일에서 데이터 읽기
    const result = await new Promise((resolve, reject) => {
      const stream = fs
        .createReadStream(csvFilePath, { start: offset })
        .pipe(
          csv({
            headers: [
              //헤더를 못읽어서 직접 헤더 작성
              "SEQ_NO",
              "ISBN_THIRTEEN_NO",
              "VLM_NM",
              "TITLE_NM",
              "AUTHR_NM",
              "PUBLISHER_NM",
              "PBLICTE_DE",
              "ADTION_SMBL_NM",
              "PRC_VALUE",
              "IMAGE_URL",
              "BOOK_INTRCN_CN",
              "KDC_NM",
              "TITLE_SBST_NM",
              "AUTHR_SBST_NM",
              "TWO_PBLICTE_DE",
              "INTNT_BOOKST_BOOK_EXST_AT",
              "PORTAL_SITE_BOOK_EXST_AT",
              "ISBN_NO",
            ],
          })
        )
        .on("data", (data) => {
          console.log("데이터 처리 중:");
          if (data.ISBN_THIRTEEN_NO === isbn) {
            // 조건에 맞는 데이터를 찾으면 바로 resolve
            resolve(data);
            stream.destroy(); // 스트림 강제 종료
          }
        })
        .on("error", (error) => {
          reject(error); // 에러 발생 시 Promise를 실패 상태로 설정
        })
        .on("end", () => {
          resolve(null); // 데이터가 없으면 null 반환
        })
        .on("close", () => {
          // 스트림이 닫혔지만 조건에 맞는 데이터를 찾지 못한 경우
          resolve(null); // null 반환
        });
    });

    if (result) {
      return { data: result };
    } else {
      return { message: "데이터를 찾을 수 없습니다." };
    }
  } catch (error) {
    return { error };
  }
}
