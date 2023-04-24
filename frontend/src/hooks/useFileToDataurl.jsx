import { useEffect, useState } from "react";

export default function useFileToDataurl([data]) {
  const [paintings, setPaintings] = useState();

  useEffect(() => {
    if (data) {
      Promise.all(
        data.map((image) => {
          return fetch(image.image)
            .then((response) => response.blob())
            .then((blob) => {
              // Blob을 Data URL 형식으로 변환합니다.
              return new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = () => {
                  // 변환된 Data URL을 resolve 함수를 호출하여 반환합니다.
                  resolve(reader.result);
                };
              });
            });
        })
      ).then((results) => {
        // 모든 reader.result 값을 배열로 출력합니다.
        console.log(results);
        setPaintings(results);
      });
    }
  }, [data]);

  return { paintings };
}
