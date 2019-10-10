import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { MqqtService } from '../mqqt.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.page.html',
  styleUrls: ['./graph.page.scss'],
})
export class GraphPage implements OnInit{
  @ViewChild('doughnutCanvas', { read: ElementRef, static: true }) doughnutCanvas: ElementRef;
  private doughnutChart: Chart;

  constructor(public mqqtService: MqqtService) {
  }

  ngOnInit() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ['Kitchen', 'Dining', 'Toilet', 'Living', 'Bedroom'],
        datasets: [
          {
            data: [0, 0, 0, 0, 0],
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#FF6384',
              '#FFCE56'
            ]}
        ]
      }
    });
    this.updateData();
    setInterval(() => {
      this.updateData();
    }, 2500);
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
