"use server";
import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { CSVBook } from "@/types/api";
import { unstable_cache } from "next/cache";

//타이머 상수
const MAX_EXECUTION_TIME = 9000; // 9초
const CHECK_INTERVAL = 1000; // 1초마다 시간 체크

const now = new Date();
const getBirthdayBook = unstable_cache(
  async (): Promise<CSVBook[]> => {
    const filePath = path.join(process.cwd(), "public", "data", "NL_BO_SPECIES_MASTER_NEW_202112.csv");
    try {
      const result: CSVBook[] | null = await new Promise((resolve, reject) => {
        const startTime = Date.now(); //이 함수가 시작된 시간 타이머용
        const koreaTime = new Date( //버셀 UTC기준으로 한국시간 조정 +9
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate(),
          now.getUTCHours() + 9,
          now.getUTCMinutes(),
          now.getUTCSeconds()
        );
        const month = (koreaTime.getMonth() + 1).toString().padStart(2, "0");
        const day = koreaTime.getDate().toString().padStart(2, "0");
        const toDayDate = `${month}-${day}`;
        const bookData: CSVBook[] = [];

        const checkTimeAndResolve = () => {
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime >= MAX_EXECUTION_TIME) {
            console.log("최종 경과된 시간:", elapsedTime, "배열에 최종 저장된 데이터 수:", bookData.length);
            stream.destroy();
            resolve(bookData);
          } else {
            console.log("경과된 시간:", elapsedTime, "배열에 임시 저장된 데이터 수:", bookData.length);
            timer = setTimeout(checkTimeAndResolve, CHECK_INTERVAL);
          }
        };
        let timer = setTimeout(checkTimeAndResolve, CHECK_INTERVAL);

        const stream = fs.createReadStream(filePath).pipe(csv());
        stream.on("data", (row) => {
          const spltit = row.TWO_PBLICTE_DE.split("-");
          if (`${spltit[1]}-${spltit[2]}` === toDayDate && row.IMAGE_URL.includes("image.aladin.co.kr")) {
            bookData.push(row);
            // if (bookData.length === 12) {//숫자 대신 시간으로 제한
            //   resolve(bookData);
            //   stream.destroy();
            // }
          }
        });

        stream.on("end", () => {
          resolve(bookData); //스트림을 읽었을 때 resolve로 반환
          clearTimeout(timer);
          console.log("함수 종료 시간", Date.now() - startTime, "저장된 데이터 수:", bookData.length);
        });

        stream.on("error", (error) => {
          reject(error); // 에러 발생 시 Promise를 실패 상태로 설정
          clearTimeout(timer);
          console.log("함수 종료 시간", Date.now() - startTime, "저장된 데이터 수:", bookData.length);
        });

        stream.on("close", () => {
          resolve(null); // 스트림이 닫혔지만 조건에 맞는 데이터를 찾지 못한 경우
          clearTimeout(timer);
          console.log("함수 종료 시간", Date.now() - startTime, "저장된 데이터 수:", bookData.length);
        });
      });

      if (result) {
        return result;
      } else {
        throw new Error("일치하는 정보가 없습니다");
      }
    } catch (error) {
      throw error;
    }
  },
  [now.getUTCMonth().toString() + now.getUTCDate().toString()], //날짜가 동일한경우는 캐시가 유효
  {
    tags: ["birth-day-book-data"],
    revalidate: 24 * 60 * 60, // 24시간만 유효
  }
);

export default getBirthdayBook;
