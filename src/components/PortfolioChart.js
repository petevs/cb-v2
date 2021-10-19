import React from 'react'
import Chart from 'react-apexcharts'
import styled from 'styled-components'

const PortfolioChart = ({categories, customOptions, data, tooltip}) => {

    const defaultOptions = {
        chart: {
          toolbar: {
            // show: false,
            tools: {
                download: false,
            }
          },
          animations: {
            enabled: false,
          }
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          labels: {
            show: true,
            formatter: function (value) {
              return "$" + Math.round(value);
            },
            type: 'numeric',
            // style: {
            //   colors: ["#fff"],
            // },
          },
          // opposite: true,
        },
        xaxis: {
          type: "datetime",
          categories: categories,
          labels: {
            style: {
              colors: "#fff",
            },
          },
        },
        colors: ["#2E99FE", "#FF2F30"],
        tooltip: {
          ...tooltip,
          x: {
            format: "dd MMM HH:mm",
          },
          theme: "dark",
        },
        annotations: {
        },
        grid: {
          show: false,
          },
        legend: {
          position: "top",
          horizontalAlign: "right",
          labels: {
            colors: "#fff",
          },
        },
        markers: {
          size: 0,
        }
      };

    const options = {
        ...defaultOptions,
        ...customOptions
    }

    const series = data

    return (
        <ChartWrapper>
            <Chart
                series={series}
                options={options}
                type='area'
                width='100%'
                height="400px"
            />
    </ChartWrapper>
    )
}

export default PortfolioChart

const ChartWrapper = styled.div`
    // margin: 0 0 0 -1rem;

`