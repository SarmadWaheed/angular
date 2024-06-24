
import { Component, OnInit,viewChild,ElementRef} from '@angular/core';
import * as d3 from 'd3';
import { tap } from 'rxjs/operators';
import { ServiceService } from '../json/service.service';


@Component({
  selector: 'app-d3-tree',
  templateUrl: './d3-tree.component.html',
  styleUrls: ['./d3-tree.component.css']
  
})
export class D3TreeComponent implements OnInit {

  constructor(private service: ServiceService) { }

  ngOnInit(): void {
    this.loadJSONData();
    
  }

  loadJSONData(): void {
    this.service.loadJSONData('/assets/data.json')
      .pipe(
        tap((datas: any) => {
          this.renderD3Tree(datas);
        })
      )
      .subscribe({
        error: (error: any) => {
          console.error('Error loading JSON data:', error);
        }

      });

    
          // Process pie data and render the pie chart
        
       
  }
  renderD3Tree(data: any): void {
    // Your D3 code here to render the tree
    const width = 920;
    const height = 1300;
    const cx = width * 0.5;
    const cy = height * 0.5;
    const radius = Math.min(width, height) / 2 - 30;

    const tree = d3.tree()
      .size([2 * Math.PI, radius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

    const root = tree(d3.hierarchy(data).sort((a, b) => d3.ascending(a.data.name, b.data.name)));

    const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-cx, -cy, width, height])
      .attr("style", "width: 50%; height: auto; font: 10px arial;");

    // Create a radial link generator
    const radialLinkGenerator = d3.linkRadial()
      .angle((d: any) => d.x) // Set the angle of the link
      .radius((d: any) => d.y); // Set the radius of the link

    // Append links
    svg.append("g")
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("stroke-opacity", 0.5)
      .attr("stroke-width", 1.5)
      .selectAll()
      .data(root.links())
      .join("path")
      .attr("d", function(d: any) { return radialLinkGenerator(d) as string; }); // Type assertion for d

    // Append nodes
    svg.append("g")
      .selectAll()
      .data(root.descendants())
      .join("circle")
      .attr("transform", (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0)`)
      .attr("fill", (d) => (d.children ? "blue" : "red"))
      .attr("r", 2);

    // Append labels
    svg.append("g")
      .attr("stroke-linejoin", "round")
      .attr("stroke-width", 3)
      .selectAll()
      .data(root.descendants())
      .join("text")
      .attr("transform", (d) => `rotate(${(d.x * 180) / Math.PI - 90}) translate(${d.y},0) rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr("dy", "0.31em")
      .attr("x", (d) => (d.x < Math.PI === !d.children ? 6 : -6))
      .attr("text-anchor", (d) => (d.x < Math.PI === !d.children ? "start" : "end"))
      .attr("paint-order", "stroke")
      
      .attr("stroke", "white")
      .attr("fill", "black")
      .text((d: any) => d.data.name); // Explicitly specify the type of 'd' as 'any'

    document.body.appendChild(svg.node());
  }




  

}
