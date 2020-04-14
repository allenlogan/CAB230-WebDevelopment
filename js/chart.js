import {searchButton} from './search.js';

export function Chart(searchButton, query)
{
  const result = Array.from(searchButton);
  const chartData =
  {
    labels:result.map (result => result.LGA),
    datasets:
    [
      {
        label: [query],
        data: result.map (result => result.total),
        backgroundColor: ['#f38b4a', "#56d798"]
      }
    ]
  };
  const element =
  (
    <div id = "chart">
      <Bar data = {chartData} options{{}}/>
    </div>
  );
  ReactDOM.render(element, document.getElementById('app'))
}
