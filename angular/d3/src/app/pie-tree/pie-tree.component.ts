import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
import { tap } from 'rxjs/operators';
import { ServiceService } from '../json/service.service';

@Component({
  selector: 'app-pie-tree',
  templateUrl: './pie-tree.component.html',
  styleUrls: ['./pie-tree.component.css']
})
export class PieTreeComponent implements OnInit {
 

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.loadJSONData();
  }

  loadJSONData(): void {
    this.service.loadJSONData('/assets/code.json')
      .pipe(
        tap((code: any) => {
          // Set a uniform value for each data point
          code.forEach((d: { value: number; }) => {
            d.value = 5; // Set the same value for each data point
          });
          this.renderD3Pie(code);
        })
      )
      .subscribe({
        error: (error: any) => {
          console.error('Error loading JSON data:', error);
        }
      });
  }

   renderD3Pie(data: any): void {
    const width = 1500; // Define width first
    const height = Math.min(width, 500);
    const radius = Math.min(width, height) / 2;
    const arc = d3.arc()
      .innerRadius(radius * 0.57)
      .outerRadius(radius - 4);

    const pie = d3.pie<any, { value: number }>() // Specify the type for the data
      .padAngle(1 / radius)
      .sort(null)
      .value((d) => d.value);

    const color = d3.scaleOrdinal()
      .domain(data.map((d: { name: string }) => d.name))
      .range(d3.quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;");

    svg.append("g")
      .selectAll()
      .data(pie(data))
      .join("path")
      .attr("fill", (d: any) => color(d.data.name) as string) // Cast 'color' to string
      .attr("d", arc as any) // Assuming 'arc' is already correctly defined
      .append("title")
      .text((d: any) => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "middle")
      .selectAll()
      .data(pie(data))
      .join("text")
      .attr("transform", (d: any) => `translate(${arc.centroid(d)})`)
      .call((text: any) =>
        text.append("tspan")
          .attr("y", "-0.5em")
          .attr("font-weight", "bold")
          .text((d: any) => d.data.name)
      )
      .call((text: any) =>
        text.append("tspan")
          .attr("x", 0)
          .attr("y", "2.8em")
          .attr("fill-opacity", 0.7)
        // .text((d: any) => d.data.value.toLocaleString("en-US"))
      );

    document.body.appendChild(svg.node());
  }
}

