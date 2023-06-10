document.querySelector('#month').value = new Date().getMonth() + 1;
document.querySelector('#year').value = new Date().getFullYear();
// Line chart
fetch('http://localhost:8089/bill/turnover')
  .then(res => res.json())
  .then(data => {
    var date = new Date();
    date = date.getMonth() + 1;
    // console.log(data);
    var arr = Array(date).fill(0);
    const labels_line = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    data.data.forEach(user => {
      for (let i = 0; i < date; i++) {
        if ((i + 1).toString() === user.month) arr[i] = user.sum;
      }
    })
    const data_line = {
      labels: labels_line,
      datasets: [
        // {
        //     label: '2022',
        //     backgroundColor: "blue",
        //     borderColor: 'blue',
        //     data: [0,27,56,34,24,50,32,67,21,25,98,56],
        //     tension: 0.4,
        // },
        {
          label: '2023',
          backgroundColor: "blue",
          borderColor: 'blue',
          data: arr,//,55,46,34,56,13,77,44
          tension: 0.4,
        },
      ],
    }
    const config_line = {
      type: 'line',
      data: data_line,
    }
    const canvas_line = document.getElementById('canvas_line')
    const chart_line = new Chart(canvas_line, config_line);
  })
  .catch(error => console.log(error));



function generateRandomColor() {

  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);


  const color = `rgb(${red}, ${green}, ${blue})`;

  return color;
}
var Color = [];
function generateRandomUniqueColor() {
  let color;

  do {
    color = generateRandomColor();
  } while (Color.includes(color));


  return color;
}


// Doughnut chart
fetch('http://localhost:8089/bill/getstatistics/ratetype')
  .then(res => res.json())
  .then(data => {
    var name = [];
    var count = [];
    //console.log(data);
    data.data.forEach(user => {
      // console.log(user);
      name.push(user.masp);
      count.push(user.soluong);
      Color.push(generateRandomUniqueColor());

    })
    const data_doughnut = {
      labels: name,
      datasets: [{

        data: count,
        backgroundColor: Color,
        hoverOffset: 4
      }]
    };
    const config_doughnut = {
      type: 'doughnut',
      data: data_doughnut,
    }

    const canvas_doughnut = document.getElementById('canvas_doughnut');
    const chart_doughnut = new Chart(canvas_doughnut, config_doughnut);
  })
  .catch(error => console.log(error));


fetch(`http://localhost:8089/bill/getstatistics/month=${new Date().getMonth() + 1}&year=${new Date().getFullYear()}`)
  .then(res => res.json())
  .then(data => {
    var name = [];
    var count = [];
    //console.log(data);
    data.data.forEach(user => {
      //console.log(user);
      name.push(user.masp);
      count.push(user.soluong);
      if (count5 === 4) return;
      count5++;
    })

    // Bar chart
    // bar chart data
    console.log(name);
    const data_bar = {
      labels: name,
      datasets: [{
        data: count,
        label: 'Số lượng',
        backgroundColor: [
          '#31ad50',
        ],
      }]
    };

    // get bar chart canvas

    const config_bar = {
      type: 'bar',
      data: data_bar,
    }

    const canvas_bar = document.getElementById('canvas_bar');
    const chart_bar = new Chart(canvas_bar, config_bar);
  })
  .catch(error => console.log(error));

var count5 = 0;
document.querySelector('#bt').addEventListener('click', function () {
  const month = document.querySelector('#month').value;
  const year = document.querySelector('#year').value;
  fetch(`http://localhost:8089/bill/getstatistics/month=${month}&year=${year}`)
    .then(res => res.json())
    .then(data => {
      var name = [];
      var count = [];
      //console.log(data);
      data.data.forEach(user => {
        //console.log(user);
        name.push(user.masp);
        count.push(user.soluong);
        if (count5 === 4) return;
        count5++;
      })

      // Bar chart
      // bar chart data
      console.log(name);
      const data_bar = {
        labels: name,
        datasets: [{
          data: count,
          label: 'Số lượng',
          backgroundColor: [
            '#31ad50',
          ],
        }]
      };

      // get bar chart canvas

      const config_bar = {
        type: 'bar',
        data: data_bar,
      }

      const canvas_bar = document.getElementById('canvas_bar');
      const chart_bar = new Chart(canvas_bar, config_bar);
    })
    .catch(error => console.log(error));

})



fetch(`http://localhost:8089/taikhoan/sumcustomer`)
  .then(res => res.json())
  .then(data => {
    document.querySelector('#number_customer').textContent = data.data;
    //console.log(data);

  })
  .catch(error => console.log(error));

var datee = new Date();
fetch(`http://localhost:8089/bill/sum/month=${datee.getMonth() + 1}&year=${datee.getFullYear()}`)
  .then(res => res.json())
  .then(data => {
    document.querySelector('#number_bill').textContent = data.data;
    //console.log(data);

  })
  .catch(error => console.log(error));


document.querySelector('#bt').addEventListener('click', function () {
  const month = document.querySelector('#month').value;
  const year = document.querySelector('#year').value;
  fetch(`http://localhost:8089/bill/sum/month=${month}&year=${year}`)
    .then(res => res.json())
    .then(data => {
      document.querySelector('#number_bill').textContent = data.data;
      //console.log(data);

    })
    .catch(error => console.log(error));
})

fetch(`http://localhost:8089/bill/totalsell/year=${datee.getFullYear()}`)
  .then(res => res.json())
  .then(data => {
    document.querySelector('#number_sales').textContent = `${data.data.toLocaleString()} đ`;
    //console.log(data);

  })
  .catch(error => console.log(error));


document.querySelector('#bt').addEventListener('click', function () {
  const month = document.querySelector('#month').value;
  const year = document.querySelector('#year').value;
  fetch(`http://localhost:8089/bill/totalsell/year=${year}`)
    .then(res => res.json())
    .then(data => {
      document.querySelector('#number_sales').textContent = `${data.data.toLocaleString()} đ`;
      //console.log(data);

    })
    .catch(error => console.log(error));
})

fetch(`http://localhost:8089/taikhoan/sumemployee`)
  .then(res => res.json())
  .then(data => {
    document.querySelector('#number_employee').textContent = data.data;
    //console.log(data);

  })
  .catch(error => console.log(error));