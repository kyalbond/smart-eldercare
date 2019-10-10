import { Component, ElementRef, ViewChild  } from '@angular/core';
import { Chart } from "chart.js";
import { MqqtService } from '../mqqt.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.page.html',
  styleUrls: ['./graph.page.scss'],
})
export class GraphPage{
  @ViewChild("doughnutCanvas", { read: ElementRef, static: true }) doughnutCanvas: ElementRef;
  private doughnutChart: Chart;

  constructor(public mqqtService: MqqtService) {}

  ngOnInit() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Kitchen", "Dining", "Toilet", "Living","Bedroom"],
        datasets: [
          {
            data: [0,0,0,0,0],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#FFCE56"]
          }
        ]
      }
    });
  }

  public updateData() {
    this.doughnutChart.data.datasets[0].data[0] = this.mqqtService.graphData[0];
    this.doughnutChart.data.datasets[0].data[1] = this.mqqtService.graphData[1];
    this.doughnutChart.data.datasets[0].data[2] = this.mqqtService.graphData[2];
    this.doughnutChart.data.datasets[0].data[3] = this.mqqtService.graphData[3];
    this.doughnutChart.data.datasets[0].data[4] = this.mqqtService.graphData[4];

    this.doughnutChart.update();
  }
}
