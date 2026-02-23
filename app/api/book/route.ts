// import fs from "fs";
// import path from "path";
// import csv from "csv-parser";
// import { NextResponse } from "next/server";
// export async function GET(request: Request) {
//   const filePath = path.join(process.cwd(), "data", "NL_BO_SPECIES_MASTER_NEW_202112.csv");

//   const { searchParams } = new URL(request.url);
//   const targetId = searchParams.get("id"); // id 값을 기준으로 필터링

//   try {
//     const result = await new Promise((resolve, reject) => {
//       const stream = fs
//         .createReadStream(filePath)
//         .pipe(csv())
//         .on("data", (data) => {
//           if (data.ISBN_THIRTEEN_NO === targetId) {
//             // 조건에 맞는 데이터를 찾으면 바로 resolve
//             resolve({
//               ISBN_THIRTEEN_NO: data.ISBN_THIRTEEN_NO,
//               TITLE_NM: data.TITLE_NM,
//             });

//             stream.destroy(); // 스트림 강제 종료
//           }
//         })
//         .on("error", (error) => {
//           reject(error); // 에러 발생 시 Promise를 실패 상태로 설정
//         })
//         .on("close", () => {
//           // 스트림이 닫혔지만 조건에 맞는 데이터를 찾지 못한 경우
//           resolve(null); // null 반환
//         });
//     });

//     // 결과 반환
//     if (result) {
//       return NextResponse.json({ data: result });
//     } else {
//       return NextResponse.json({ message: "No matching data found" }, { status: 404 });
//     }
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 }); // 에러 처리
//   }
// }

// import fs from "fs";
// import { NextResponse } from "next/server";
// import path from "path";

// export async function GET(request: Request) {
//   const { searchParams } = new URL(request.url);
//   const targetId = searchParams.get("id"); // 검색할 ID 값

//   // JSON 파일 경로 설정
//   const filePath = path.join(process.cwd(), "data", "NL_BO_SPECIES_MASTER_NEW_202112.json");

//   try {
//     // JSON 파일을 읽고 파싱
//     const jsonData = JSON.parse(await fs.promises.readFile(filePath, "utf-8"));

//     // targetId에 해당하는 데이터 검색
//     const result = jsonData.find((item) => item.ISBN_THIRTEEN_NO === targetId);

//     // 결과 반환
//     if (result) {
//       return NextResponse.json({ data: result });
//     } else {
//       return NextResponse.json({ message: "No matching data found" }, { status: 404 });
//     }
//   } catch (error) {
//     // 에러 처리
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import csv from "csv-parser";

const csvFilePath = path.join(process.cwd(), "public", "data", "NL_BO_SPECIES_MASTER_NEW_202112.csv");
const indexFilePath = path.join(process.cwd(), "public", "data", "index.json");

// 클라이언트 요청 처리
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isbns = searchParams.getAll("isbn");
  if (isbns.length === 0) {
    return NextResponse.json({ message: "ISBN이 제공되지 않았습니다." }, { status: 400 });
  }

  try {
    const index = JSON.parse(fs.readFileSync(indexFilePath, "utf-8"));
    const results: { [key: string]: string | null } = {};

    for (const isbn of isbns) {
      const offset = index[isbn];
      if (offset === undefined) {
        results[isbn] = null;
        continue;
      }

      const result: string | null = await new Promise((resolve) => {
        const stream = fs
          .createReadStream(csvFilePath, { start: offset })
          .pipe(
            csv({
              headers: [
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
            if (data.ISBN_THIRTEEN_NO === isbn) {
              resolve(data);
              stream.destroy();
            }
          })
          .on("end", () => resolve(null))
          .on("close", () => resolve(null));
      });

      results[isbn] = result;
    }

    return NextResponse.json({ data: results });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
