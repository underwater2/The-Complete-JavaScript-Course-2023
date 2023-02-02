import { useEffect, useRef, useState } from "react";
import axios from "axios";

import ReactApexChart from "react-apexcharts";

function ChartBox() {
  const [data, setData] = useState({
    labels: [
      "TR",
      "결제/쿠폰/포인트",
      "고장/수리",
      "기타",
      "매장",
      "배송",
      "상품/재고",
      "상품권",
      "습득물",
      "주차",
      "피해/불만",
      "행사/할인",
      "환불",
    ],
    series: [
      {
        name: "합계",
        data: [
          {
            x: "TR",
            y: 0,
          },
          {
            x: "결제/쿠폰/포인트",
            y: 0,
          },
          {
            x: "고장/수리",
            y: 0,
          },
          {
            x: "기타",
            y: 0,
          },
          {
            x: "매장",
            y: 0,
          },
          {
            x: "배송",
            y: 0,
          },
          {
            x: "상품/재고",
            y: 0,
          },
          {
            x: "상품권",
            y: 0,
          },
          {
            x: "습득물",
            y: 0,
          },
          {
            x: "주차",
            y: 0,
          },
          {
            x: "피해/불만",
            y: 0,
          },
          {
            x: "환불",
            y: 0,
          },
        ],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 380,
      },
      xaxis: {
        type: "category",
        labels: {
          formatter: function (val) {
            return val;
          },
        },
      },
      title: {
        text: "",
      },
      tooltip: {
        x: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  });
  const [totalCount, setTotalCount] = useState(0);
  let interval = useRef(null);

  function get_chart() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    let minutes = date.getMinutes();
    let hour = date.getHours();
    let time = `${hour >= 10 ? hour : "0" + hour}:${
      minutes >= 10 ? minutes : "0" + minutes
    }`;

    let start_date = `${year}${month >= 10 ? month : "0" + month}${
      day >= 10 ? day : "0" + day
    }`;

    axios
      .post(
        "https://t2w425htc9.execute-api.ap-northeast-2.amazonaws.com/erody-dev-chatbot-classification",
        {
          classification: "classification",
          start_date: start_date,
        }
      )
      .then(function (response) {
        let res = response.data["message"];
        let d = [];
        let temp_total_count = 0;
        for (var i in data.labels) {
          if (typeof res[data.labels[i]] !== "undefined") {
            d.push({ x: data.labels[i], y: Number(res[data.labels[i]]) });
            temp_total_count += Number(res[data.labels[i]]);
          } else {
            d.push({ x: data.labels[i], y: 0 });
          }
        }

        setTotalCount(temp_total_count);

        setData((ppi) => ({
          ...ppi,
          series: [
            {
              data: d,
            },
          ],
          options: {
            title: {
              text: "마지막 업데이트 - " + time,
            },
          },
        }));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const tempStyle = {
    boder: "1px solid black",
    fontSize: "25px",
    paddingLeft: "10px",
    paddingTop: "10px",
    height: "50px",
  };

  useEffect(() => {
    get_chart();

    setInterval(() => {
      get_chart();
    }, 60000);
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <div>
      <div style={tempStyle}>
        <h2>총 갯수 : {totalCount} 개</h2>
        <br></br>
      </div>
      <div>
        <ReactApexChart
          type="bar"
          series={data.series}
          options={data.options}
          width={1300}
        />
      </div>
    </div>
  );
}

export default ChartBox;
